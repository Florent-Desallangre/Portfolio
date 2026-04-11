'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

const COUNT = 735;
/** Nuage compact : disque circulaire dans le plan XY */
const SPREAD_X = 1.89;
const SPREAD_Z = 0.72;
/** Rayon max (coherent avec la distribution sur le disque) */
const DISK_RADIUS = SPREAD_X * 0.52;
/**
 * Exposant radial : 0.5 = disque uniforme en surface ; > 0.5 = plus de particules vers le centre
 * (réduit le « trou » interne entre le cœur du visuel et l’anneau de particules).
 */
const RADIAL_PACK_EXP = 0.62;
/** Part des particules dans la couronne exterieure (pourtour du visuel → bord du canvas). */
const OUTER_RING_FRAC = 0.5;
const OUTER_RING_R0 = DISK_RADIUS * 0.74;
const OUTER_RING_R1 = DISK_RADIUS * 1.29;

function sampleDiskRadius(rnd: () => number): number {
    if (rnd() < OUTER_RING_FRAC) {
        const a = OUTER_RING_R0 * OUTER_RING_R0;
        const b = OUTER_RING_R1 * OUTER_RING_R1;
        return Math.sqrt(a + rnd() * (b - a));
    }
    return DISK_RADIUS * Math.pow(rnd(), RADIAL_PACK_EXP);
}
/** Taille monde — avec texture ronde, on peut rester modéré */
const POINT_SIZE = 0.032;

/** +10 % historique, puis encore +10 % sur la vitesse globale (1.1 * 1.1). */
const SPEED_FACTOR = 1.21;
/** ~11 % des particules : lerp vers le blanc + taille x2 au pic, puis retour. */
const TWINKLE_FRACTION = 0.09;
const TWINKLE_SPEED = 2.5;
/** Enveloppe sin^sharp : 0 au repos, 1 au pic (transition progressive). */
const TWINKLE_SHARP = 2.65;
/** Au pic : melange vers le blanc (facteur sur le lerp vers (1,1,1)). */
const TWINKLE_WHITE_MAX = 0.94;
/** Au pic : taille = base * (1 + TWINKLE_SIZE_EXTRA) → +100 % si extra = 1. */
const TWINKLE_SIZE_EXTRA = 1;

/** Impulsion radiale outward (XY) au big-bang — calibrée pour un pic lisible puis retour via confinement. */
const BIG_BANG_RADIAL = 0.011;
/** Petit couple tangentiel pour éviter un anneau trop parfait. */
const BIG_BANG_TANGENTIAL = 0.0035;
const BIG_BANG_Z = 0.00009;

type VortexParticlesCanvasProps = {
    className?: string;
    /** Compteur monotonique : chaque incrément déclenche une impulsion une fois (lu via ref dans la boucle RAF). */
    burstSignal?: number;
};

/** Points Three.js = carrés par défaut ; texture radiale = petits halos doux (poussière lumineuse). */
function createSoftParticleTexture(THREE: typeof import('three')) {
    const s = 128;
    const canvas = document.createElement('canvas');
    canvas.width = s;
    canvas.height = s;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }
    const cx = s / 2;
    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.95);
    g.addColorStop(0, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.35)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.08)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
}

/**
 * Particules orange / violet en halos doux (pas de carrés), sur la zone du vortex.
 */
export function VortexParticlesCanvas({ className, burstSignal = 0 }: VortexParticlesCanvasProps) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const burstSignalRef = useRef(burstSignal);
    burstSignalRef.current = burstSignal;

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) {
            return;
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            return;
        }

        let disposed = false;
        let rafId = 0;
        let cleanupResize: (() => void) | null = null;
        let disposeThree: (() => void) | null = null;

        const start = async () => {
            const THREE = await import('three');
            if (disposed) {
                return;
            }

            const tmpColor = new THREE.Color();
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(48, 1, 0.08, 40);
            camera.position.z = 3.45;

            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
                powerPreference: 'low-power',
            });
            renderer.setClearColor(0x000000, 0);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

            const particleMap = createSoftParticleTexture(THREE);

            const sizeMult = new Float32Array(COUNT);
            sizeMult.fill(1);

            const positions = new Float32Array(COUNT * 3);
            const velocities = new Float32Array(COUNT * 3);
            const phases = new Float32Array(COUNT);
            const colors = new Float32Array(COUNT * 3);
            const baseColors = new Float32Array(COUNT * 3);
            const twinklePhase = new Float32Array(COUNT);

            const rnd = () => Math.random();

            for (let i = 0; i < COUNT; i++) {
                const index = i * 3;
                const t = i / COUNT;
                const angle = rnd() * Math.PI * 2;
                const radius = sampleDiskRadius(rnd);
                positions[index] = Math.cos(angle) * radius;
                positions[index + 1] = Math.sin(angle) * radius;
                positions[index + 2] = (rnd() - 0.5) * SPREAD_Z;

                velocities[index] = (rnd() - 0.5) * 0.00009 * SPEED_FACTOR;
                velocities[index + 1] = (rnd() - 0.5) * 0.00007 * SPEED_FACTOR;
                velocities[index + 2] = (rnd() - 0.5) * 0.00005 * SPEED_FACTOR;
                phases[i] = rnd() * Math.PI * 2;
                twinklePhase[i] = rnd() < TWINKLE_FRACTION ? rnd() * Math.PI * 2 : -999;

                const purple = rnd() < 0.52;
                if (purple) {
                    tmpColor.setHSL(0.76 + rnd() * 0.07, 0.75 + rnd() * 0.15, 0.52 + rnd() * 0.12);
                } else {
                    tmpColor.setHSL(0.06 + rnd() * 0.05, 0.85 + rnd() * 0.1, 0.52 + rnd() * 0.12);
                }

                const vignette = 1 - Math.abs(t - 0.5) * 0.28;
                tmpColor.multiplyScalar(0.88 + vignette * 0.1);
                colors[index] = tmpColor.r;
                colors[index + 1] = tmpColor.g;
                colors[index + 2] = tmpColor.b;
                baseColors[index] = tmpColor.r;
                baseColors[index + 1] = tmpColor.g;
                baseColors[index + 2] = tmpColor.b;
            }

            let hasTwinkle = false;
            for (let i = 0; i < COUNT; i++) {
                if (twinklePhase[i] >= 0) {
                    hasTwinkle = true;
                    break;
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const colorBufferAttr = new THREE.BufferAttribute(colors, 3);
            colorBufferAttr.setUsage(THREE.DynamicDrawUsage);
            geometry.setAttribute('color', colorBufferAttr);
            const sizeMultAttr = new THREE.BufferAttribute(sizeMult, 1);
            sizeMultAttr.setUsage(THREE.DynamicDrawUsage);
            geometry.setAttribute('aSizeMult', sizeMultAttr);

            const material = new THREE.PointsMaterial({
                map: particleMap ?? undefined,
                size: POINT_SIZE,
                transparent: true,
                opacity: 0.72,
                depthWrite: false,
                depthTest: true,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true,
                vertexColors: true,
            });
            material.onBeforeCompile = (shader: { vertexShader: string }) => {
                shader.vertexShader = shader.vertexShader
                    .replace('#include <common>', '#include <common>\nattribute float aSizeMult;')
                    .replace('gl_PointSize = size;', 'gl_PointSize = size * aSizeMult;');
            };
            material.customProgramCacheKey = () => 'twinkle_aSizeMult_v1';

            const points = new THREE.Points(geometry, material);
            scene.add(points);
            const clock = new THREE.Clock();

            disposeThree = () => {
                geometry.dispose();
                material.dispose();
                particleMap?.dispose();
                renderer.dispose();
            };

            const resize = () => {
                const w = Math.max(1, wrap.clientWidth);
                const h = Math.max(1, wrap.clientHeight);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h, false);
            };

            const ro = new ResizeObserver(() => {
                resize();
            });
            ro.observe(wrap);
            cleanupResize = () => {
                ro.disconnect();
            };

            let lastProcessedBurst = 0;

            const tick = () => {
                if (disposed) {
                    return;
                }

                const time = clock.getElapsedTime();
                const posAttr = geometry.attributes.position;
                const arr = posAttr.array as Float32Array;

                const latestBurst = burstSignalRef.current;
                if (latestBurst > lastProcessedBurst) {
                    for (let i = 0; i < COUNT; i++) {
                        const index = i * 3;
                        const x = arr[index];
                        const y = arr[index + 1];
                        const r2 = x * x + y * y;
                        let nx: number;
                        let ny: number;
                        if (r2 < 1e-12) {
                            const a = rnd() * Math.PI * 2;
                            nx = Math.cos(a);
                            ny = Math.sin(a);
                        } else {
                            const r = Math.sqrt(r2);
                            nx = x / r;
                            ny = y / r;
                        }
                        const tx = -ny;
                        const ty = nx;
                        const radial = BIG_BANG_RADIAL * (0.55 + rnd() * 0.45) * SPEED_FACTOR;
                        const tangential = BIG_BANG_TANGENTIAL * (rnd() - 0.5) * SPEED_FACTOR;
                        velocities[index] += nx * radial + tx * tangential;
                        velocities[index + 1] += ny * radial + ty * tangential;
                        velocities[index + 2] += (rnd() - 0.5) * BIG_BANG_Z * SPEED_FACTOR;
                    }
                    lastProcessedBurst = latestBurst;
                }

                const hz = SPREAD_Z * 0.5;
                /** Au-delà du disque nominal : rappel progressif (pas de mur ni snap → pas d'anneaux). */
                const rLimit = DISK_RADIUS;
                const rEscape = DISK_RADIUS * 2.4;

                for (let i = 0; i < COUNT; i++) {
                    const index = i * 3;
                    arr[index] += velocities[index] + Math.sin(time * 0.26 + phases[i]) * 0.000024 * SPEED_FACTOR;
                    arr[index + 1] += velocities[index + 1] + Math.cos(time * 0.19 + phases[i] * 0.7) * 0.000018 * SPEED_FACTOR;
                    arr[index + 2] += velocities[index + 2] + Math.sin(time * 0.21 + phases[i] * 0.45) * 0.000016 * SPEED_FACTOR;

                    const x = arr[index];
                    const y = arr[index + 1];
                    const r2 = x * x + y * y;
                    if (r2 < 1e-12) {
                        continue;
                    }
                    const r = Math.sqrt(r2);
                    const nx = x / r;
                    const ny = y / r;

                    if (r > rEscape) {
                        const ang = rnd() * Math.PI * 2;
                        const rad = sampleDiskRadius(rnd) * 0.92;
                        arr[index] = Math.cos(ang) * rad;
                        arr[index + 1] = Math.sin(ang) * rad;
                        velocities[index] = (rnd() - 0.5) * 0.00009 * SPEED_FACTOR;
                        velocities[index + 1] = (rnd() - 0.5) * 0.00007 * SPEED_FACTOR;
                    } else if (r > rLimit) {
                        const over = r - rLimit;
                        const pull = over * 0.075;
                        arr[index] -= nx * pull;
                        arr[index + 1] -= ny * pull;

                        const vx = velocities[index];
                        const vy = velocities[index + 1];
                        const vr = vx * nx + vy * ny;
                        if (vr > 0) {
                            velocities[index] -= vr * nx * 0.42;
                            velocities[index + 1] -= vr * ny * 0.42;
                        }
                    }

                    if (arr[index + 2] > hz) arr[index + 2] = -hz;
                    if (arr[index + 2] < -hz) arr[index + 2] = hz;
                }

                if (hasTwinkle) {
                    const colorAttr = geometry.attributes.color;
                    const colArr = colorAttr.array as Float32Array;
                    const smArr = geometry.attributes.aSizeMult.array as Float32Array;
                    for (let i = 0; i < COUNT; i++) {
                        const tp = twinklePhase[i];
                        if (tp < 0) {
                            continue;
                        }
                        const index = i * 3;
                        const s = 0.5 + 0.5 * Math.sin(time * TWINKLE_SPEED + tp);
                        const u = Math.pow(Math.max(0, Math.min(1, s)), TWINKLE_SHARP);
                        const bw = u * TWINKLE_WHITE_MAX;
                        colArr[index] = baseColors[index] * (1 - bw) + bw;
                        colArr[index + 1] = baseColors[index + 1] * (1 - bw) + bw;
                        colArr[index + 2] = baseColors[index + 2] * (1 - bw) + bw;
                        smArr[i] = 1 + u * TWINKLE_SIZE_EXTRA;
                    }
                    colorAttr.needsUpdate = true;
                    geometry.attributes.aSizeMult.needsUpdate = true;
                }

                posAttr.needsUpdate = true;
                points.rotation.z = time * 0.009 * SPEED_FACTOR;
                // Oscillation faible : une rotation Y ~ lineaire en temps incline le disque → projection rectangulaire au bout de quelques minutes.
                points.rotation.y = Math.sin(time * 0.13) * 0.1 * SPEED_FACTOR;

                renderer.render(scene, camera);
                rafId = window.requestAnimationFrame(tick);
            };

            resize();

            if (disposed) {
                disposeThree?.();
                return;
            }

            rafId = window.requestAnimationFrame(tick);
        };

        void start();

        return () => {
            disposed = true;
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
            if (cleanupResize) {
                cleanupResize();
            }
            disposeThree?.();
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            className={cn(
                'pointer-events-none absolute inset-0 z-0 overflow-hidden [transform:translateZ(0)]',
                className
            )}
        >
            <canvas ref={canvasRef} className="block h-full w-full [transform:translateZ(0)]" aria-hidden />
        </div>
    );
}
