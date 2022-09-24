export {};

declare global {
    interface Config {
        PF2E: {
            actionTraits: Record<string, string>;
            traitsDescriptions: Record<string, string>;
        };
    }
    const CONFIG: Config;

    interface Game {
        i18n: {
            localize: (text: string) => string;
        };
    }
    const game: Game;

    interface Hooks {
        on: (hook: string, callback: Function) => boolean;
    }
    const Hooks: Hooks;

    interface ChatMessage {
        updateSource: (data: Record<string, unknown>) => void;
    }

    interface ChatMessageSource {
        flags: {
            pf2e: {
                context?: {
                    options?: string[];
                };
            };
        };
        flavor: string;
    }
}
