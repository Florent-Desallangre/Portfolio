import { ProcessStepIcon } from '@/components/portfolio/process-step-icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { processSteps, skills } from '@/lib/portfolio/content';

export function SkillsProcessSection() {
    return (
        <section className="portfolio-section-px grid gap-4 xl:grid-cols-2 md:px-8">
            <Card id="skills" className="glass-card scroll-mt-6 py-0">
                <CardHeader>
                    <CardTitle className="text-xl">Compétences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pb-6">
                    {skills.map((skill) => (
                        <div key={skill.label} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span>{skill.label}</span>
                                <span className="text-muted-foreground">{skill.value}%</span>
                            </div>
                            <Progress
                                value={skill.value}
                                className="bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:via-sky-400 [&>div]:to-blue-500 [&>div]:shadow-[0_0_14px_rgba(56,189,248,0.45)]"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card id="process" className="glass-card scroll-mt-6 py-0">
                <CardHeader>
                    <CardTitle className="text-xl">Mon process</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 pb-6 sm:grid-cols-2 md:grid-cols-4 md:gap-5 md:items-stretch">
                    {processSteps.map((step) => (
                        <div
                            key={step.step}
                            className="group bg-muted/15 border-border/80 hover:border-violet-400/45 flex h-full min-h-[240px] flex-col items-center rounded-xl border p-5 py-6 text-center transition-[border-color,box-shadow] duration-300 ease-out hover:shadow-md sm:min-h-[260px] lg:min-h-[280px] lg:p-6 lg:py-8"
                        >
                            <div className="flex w-full shrink-0 flex-col items-center">
                                <p className="text-primary mb-2 w-full text-base font-semibold tracking-[0.16em] lg:mb-3 lg:text-lg">
                                    {step.step}
                                </p>
                                <div
                                    className="mb-3 flex h-12 w-full shrink-0 items-center justify-center lg:mb-4 lg:h-14"
                                    aria-hidden
                                >
                                    <ProcessStepIcon stepId={step.step} />
                                </div>
                                <p className="text-base font-semibold leading-snug lg:text-lg">{step.title}</p>
                            </div>
                            <p className="text-muted-foreground mt-auto max-w-[16rem] pt-5 text-sm leading-relaxed lg:max-w-none lg:pt-6 lg:text-[0.9375rem]">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </section>
    );
}
