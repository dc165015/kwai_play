import log from './lib/logger';
import { WorkFeed } from './data/types';
import { CONFIG } from './config/index';
import { selectChildEl } from './lib/util';
import { Work } from './components/user/Work';
import { UserProfile } from './components/user/profile';
import { PlayerContainerController } from './components/player/PlayerContainerController';
import { keepPlayHistory, fixPageLostOnRefresh } from './lib/history_patch';
import { createOptionsMenu } from './components/modal/options';

export class App {
    protected static _appEl: HTMLElement;
    protected static _userId: string | undefined;

    static feeds: WorkFeed[] = [];
    static albums: WorkFeed[] = [];
    static videos: WorkFeed[] = [];
    static url: string;
    static user: UserProfile;
    static ctrl: PlayerContainerController;

    static isProfilePage = !!location.href.match(CONFIG.MATCHES.PROFILE_URL);
    static workList: Work[];

    static get userId() {
        if (!this._userId) {
            const match = location.href.match(CONFIG.MATCHES.PROFILE_URL);
            this._userId = match?.[1];
            log(`Got userId is ${this._userId}.`);
        }
        return this._userId;
    }

    static get appEl() {
        if (!this._appEl) {
            this._appEl = selectChildEl(document.body, CONFIG.SELECTORS.APP)!;
            if (!this._appEl)
                throw new Error('It only works on Kuaishou website!');
        }
        return this._appEl;
    }

    static get player() {
        return this.ctrl?.player;
    }

    static play() {
        this.player?.play();
    }

    static init() {
        if (this.isProfilePage) {
            this.url = location.href;

            keepPlayHistory();
            fixPageLostOnRefresh();

            this.run();
        }
    }

    static run() {
        $(() => {
            if (this.appEl) {
                createOptionsMenu();

                this.user = new UserProfile();
                this.ctrl = new PlayerContainerController();
            }
        });
    }
}
