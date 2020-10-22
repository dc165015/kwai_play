import { CONFIG } from 'src/config';
import { BasePlayer } from './BasePlayer';
import log from 'src/lib/logger';

export type KeyCommandAction = (e: JQuery.KeyboardEventBase) => any;

export class PlayerCommandor<P extends BasePlayer> {
    listener = (e: JQuery.KeyboardEventBase) => this.executeOnKey(e);

    commands: Map<string, KeyCommandAction> = new Map([
        [' ', () => this.player.togglePlay()],

        ['l', () => this.player.toggleLike()],

        ['Enter', () => this.player.toggleLike()],

        ['ArrowLeft', () => this.player.showPrevWork()],

        ['ArrowRight', () => this.player.showNextWork()],

        [
            'Escape',
            (e: JQuery.KeyboardEventBase) => {
                this.player.quitFullScreen();
                if (e.shiftKey) {
                    $(CONFIG.SELECTORS.CLOSE_BUTTON).trigger('click');
                }
            },
        ],
    ]);

    constructor(public player: P) {
        this.litsen();
    }

    setCommands(commandObj: Record<string, KeyCommandAction>) {
        for (const key in commandObj) {
            let action = commandObj[key];
            this.commands.set(key, action);
        }
    }

    protected executeOnKey(e: JQuery.KeyboardEventBase) {
        const action = this.commands.get(e.key);
        if (action) {
            e.preventDefault();
            e.stopPropagation();
            log(
                `${this.player.name} received command key: ${
                    e.key == ' ' ? 'Space' : e.key
                }`,
            );
            action(e);
        }
    }

    protected litsen() {
        log(`Start listening on Keys for ${this.player.name}.`);
        $(document).on('keydown', this.listener);
    }

    off() {
        log(`Stop listening on keys for ${this.player.name}.`);
        $(document).off('keydown', this.listener);
    }
}
