import { Button } from '@/components/ui/button';

type InteractivePanelExplorationCardProps = {
    exploration: boolean;
    light: boolean;
    sound: boolean;
    onToggleExploration: () => void;
    onToggleLight: () => void;
    onToggleSound: () => void;
};

export function InteractivePanelExplorationCard({
    exploration,
    light,
    sound,
    onToggleExploration,
    onToggleLight,
    onToggleSound,
}: InteractivePanelExplorationCardProps) {
    return (
        <div className="glass-card space-y-3 p-4">
            <h3 className="text-primary/90 text-[10px] font-semibold tracking-[0.22em] uppercase">Mode exploration</h3>
            <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                    <span>Exploration</span>
                    <Button variant={exploration ? 'default' : 'outline'} size="sm" className="h-6 min-w-14 px-2 text-[10px]" onClick={onToggleExploration}>
                        {exploration ? 'ON' : 'OFF'}
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <span>Lumière</span>
                    <Button variant={light ? 'default' : 'outline'} size="sm" className="h-6 min-w-14 px-2 text-[10px]" onClick={onToggleLight}>
                        {light ? 'ON' : 'OFF'}
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <span>Son</span>
                    <Button variant={sound ? 'default' : 'outline'} size="sm" className="h-6 min-w-14 px-2 text-[10px]" onClick={onToggleSound}>
                        {sound ? 'ON' : 'OFF'}
                    </Button>
                </div>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">Le code est une poésie logique, chaque bug une énigme à résoudre.</p>
        </div>
    );
}
