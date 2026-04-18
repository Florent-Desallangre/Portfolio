/** Navigation latérale : ancres sur la page d’accueil (scroll, pas de changement de route). */
export const portfolioNav = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Projets', href: '#projects' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
] as const;

export const panelContent = {
    code: `const developer = {
    passion: "Créer des solutions",
    skills: [
        "React",
        "Node.js",
        "TypeScript",
        "Tailwind",
    ],
    mindset: "Toujours apprendre",
    currentFocus:
        "Projets qui ont du sens",
    funFact: "Le café est mon carburant",
};

function buildTheFuture() {
    while (ideas.length > 0) {
        const idea = ideas.shift();
        ship(idea);
        learn();
    }
    return "Impact positif";
}`,
    thoughts: `Pensées du moment:

- La meilleure UX, c'est celle qu'on ne remarque pas.
- Un bon design doit respirer.
- React, c'est cool, mais l'architecture c'est la vraie puissance.
- Chaque projet est une occasion d'apprendre.

Objectif: clean code + wow effect.`,
    notes: `Notes rapides:

- Ajouter une section "Testimonials"
- Pages dédiées projets / contact au besoin
- Intégrer Three.js pour les planètes
- Ajouter des micro-interactions
- Optimiser Lighthouse performance`,
} as const;

export type PanelTab = keyof typeof panelContent;

/** Labels des onglets du panneau code (hero / carte interactive). */
export const panelTabLabels = [
    { key: 'code' as const, label: 'Code' },
    { key: 'thoughts' as const, label: 'Pensées' },
    { key: 'notes' as const, label: 'Notes' },
] satisfies ReadonlyArray<{ key: PanelTab; label: string }>;

/** Aperçu dans la carte projet : image statique, GIF (img) ou vidéo (voir `ProjectCardMedia`). */
export type PortfolioPreviewMedia = {
    /** URL publique, ex. `/projects/demo.webm`, capture PNG, ou `/projects/demo.gif` */
    src: string;
    /** Image fixe, GIF animé ou vidéo (mp4 / webm). */
    kind: 'image' | 'gif' | 'video';
    /** Pour `kind: 'video'` : image affichée avant lecture / quand la vidéo est à 0 (recommandé). */
    poster?: string;
};

/** Contenu affiché au verso de la carte projet (après rotation). */
export type PortfolioProjectFlipDetails = {
    paragraphs: readonly string[];
    bullets?: readonly string[];
};

export type PortfolioProject = {
    slug: string;
    tag: string;
    title: string;
    stack: string;
    description: string;
    points: readonly string[];
    status: string;
    previewMedia?: PortfolioPreviewMedia;
    flipDetails: PortfolioProjectFlipDetails;
};

export const projects: readonly PortfolioProject[] = [
    {
        slug: 'space-mission-3d',
        tag: 'Jeu 3D',
        title: 'Space Mission 3D (Three.js)',
        stack: 'JavaScript - Three.js',
        description:
            'Jeu 3D JavaScript avec pilotage de vaisseau, missions variées, système de combat et progression par crédits.',
        points: ['Missions course / poursuite / survie', "Boucle de jeu et gestion caméra", 'Système de progression et upgrades'],
        status: 'Projet en cours (prototype jouable)',
        previewMedia: {
            src: '/projects/demo-spaceShift.mp4',
            kind: 'video',
        },
        flipDetails: {
            paragraphs: [
                'Prototype jouable centré sur le pilotage arcade : physique du vaisseau, caméra suivie et boucle mission / score.',
                'La progression repose sur des crédits gagnés en mission pour débloquer upgrades et personnaliser l’expérience.',
            ],
            bullets: [
                'Scène Three.js avec éclairage et post-traitement légers pour lisibilité en mouvement',
                'Boucle de jeu modulaire : missions course, poursuite et survie avec paramètres ajustables',
            ],
        },
    },
    {
        slug: 'risk-detection',
        tag: 'Computer Vision',
        title: 'Détection de situations à risque',
        stack: 'Python - OpenCV - MediaPipe',
        description:
            'Analyse vidéo en temps réel avec détection multi-frames de situations critiques et génération d alertes exploitables.',
        points: ['Tracking pose et mains', 'Règles métier multi-frames', 'Captures automatiques de zones déclencheuses'],
        status: 'Projet en cours (proof of concept)',
        previewMedia: {
            src: '/projects/risk-detection-preview.png',
            kind: 'image',
        },
        flipDetails: {
            paragraphs: [
                'Chaîne de traitement vidéo orientée robustesse : lissage temporel des détections pour limiter les faux positifs en conditions réelles.',
                'Les règles métier combinent plusieurs frames pour décider quand une situation devient « à risque » et mérite une alerte ou une capture.',
            ],
            bullets: [
                'MediaPipe / OpenCV pour squelette et zones d’intérêt',
                'Export d’événements et captures pour analyse ou supervision',
            ],
        },
    },
    {
        slug: 'restaurant-manager',
        tag: 'Gestion restaurant',
        title: 'Restaurant Manager',
        stack: 'Web App - Réservations - Commandes',
        description:
            'Application métier pour gérer les réservations, la prise de commande en salle et la transmission en cuisine.',
        points: ['Plan de salle dynamique', 'Prise de commande mobile', 'Construction de menu et options tarifaires'],
        status: 'Projet en cours (MVP fonctionnel)',
        previewMedia: {
            src: '/projects/restaurantManagerDemo.mov',
            kind: 'video',
        },
        flipDetails: {
            paragraphs: [
                'Outil métier pensé pour le service en salle et la cuisine : réservations, plan de salle et commandes reliées au même référentiel.',
                'Le menu et les options tarifaires sont modélisés pour éviter les erreurs de saisie et accélérer la prise de commande.',
            ],
            bullets: [
                'Plan de salle éditable et statuts de table en temps réel',
                'Parcours mobile pour serveurs et vue cuisine pour la préparation',
            ],
        },
    },
];

export const skills = [
    { label: 'React / Next.js', value: 90 },
    { label: 'TypeScript', value: 85 },
    { label: 'Node.js', value: 80 },
    { label: 'Tailwind CSS', value: 90 },
    { label: 'MongoDB', value: 75 },
    { label: 'Git & DevOps', value: 70 },
] as const;

export const processSteps = [
    {
        step: '01',
        title: 'Découvrir',
        text: 'Comprendre le besoin et explorer les possibles.',
    },
    {
        step: '02',
        title: 'Concevoir',
        text: 'Structurer une solution claire et orientée usage.',
    },
    {
        step: '03',
        title: 'Développer',
        text: 'Coder proprement, tester vite et itérer.',
    },
    {
        step: '04',
        title: 'Déployer',
        text: 'Livrer, observer et améliorer en continu.',
    },
] as const;
