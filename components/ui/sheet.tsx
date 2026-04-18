'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
    return <Dialog.Root {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof Dialog.Trigger>) {
    return <Dialog.Trigger {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof Dialog.Close>) {
    return <Dialog.Close {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>) {
    return <Dialog.Portal {...props} />;
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof Dialog.Overlay>) {
    return (
        <Dialog.Overlay
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/55 backdrop-blur-sm',
                className
            )}
            {...props}
        />
    );
}

type SheetContentProps = React.ComponentProps<typeof Dialog.Content> & {
    side?: 'right' | 'left';
};

function SheetContent({ side = 'right', className, children, ...props }: SheetContentProps) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <Dialog.Content
                aria-describedby={undefined}
                className={cn(
                    'data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex h-full flex-col border bg-background p-6 shadow-lg outline-none duration-300 ease-out',
                    side === 'right' &&
                        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 w-[min(100vw,20rem)] border-l sm:max-w-md',
                    side === 'left' &&
                        'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 w-[min(100vw,20rem)] border-r sm:max-w-md',
                    className
                )}
                {...props}
            >
                {children}
            </Dialog.Content>
        </SheetPortal>
    );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof Dialog.Title>) {
    return <Dialog.Title className={cn('text-lg font-semibold', className)} {...props} />;
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof Dialog.Description>) {
    return <Dialog.Description className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetPortal, SheetTitle, SheetTrigger };
