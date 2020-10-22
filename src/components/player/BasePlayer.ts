import log from 'lib/logger';
import { CONFIG } from 'src/config';
import { selectFirstFound } from 'lib/util';
import { Work } from '../user/Work';
import { WorkList } from '../user/WorkList';
import { PlayerCommandor, KeyCommandAction } from './PlayerCommandor';

export class BasePlayer {
    static count = 0;

    id = '#' + BasePlayer.count++;
    currentPlay: Work | undefined;
    commandor = new PlayerCommandor(this);

    protected playList: WorkList | undefined;

    constructor(
        protected originalPlayerEl: VElement,
        public playerContainerEl: HTMLElement,
    ) {
        this.enterFullScreen();
        window.setTimeout(()=>this.play());
    }

    get name() {
        return this.constructor.name + this.id;
    }

    toggleLike() {
        this.click(this.likeBtn);
    }

    setPlayList(playList: WorkList | undefined) {
        this.playList = playList || this.playList;
    }

    play() {}

    stop() {}

    togglePlay() {}

    reset() {
        this.stop();
        this.commandor.off();
    }

    get isConnected() {
        return this.originalPlayerEl.isConnected;
    }

    protected get nextBtn() {
        return selectFirstFound(CONFIG.SELECTORS.NEXTWORK_BUTTONS);
    }

    showNextWork() {
        const item = this.playList?.next();
        if (item) {
            this.currentPlay = item;
            item.click();
        } else {
            this.click(this.nextBtn);
        }
    }

    protected get prevBtn() {
        return selectFirstFound(CONFIG.SELECTORS.PREVWORK_BUTTONS);
    }

    showPrevWork() {
        this.click(this.prevBtn);
    }

    protected get likeBtn() {
        return $(CONFIG.SELECTORS.LIKE_BUTTON, this.playerContainerEl);
    }

    protected click($button: JQuery<HTMLElement> | undefined) {
        if ($button && $button.length) {
            $button.trigger('click');
        }
        return this;
    }

    protected enterFullScreen() {
        this.playerContainerEl.classList.add(CONFIG.CLASSLIST.FULLSCREEN);
    }

    quitFullScreen() {
        this.playerContainerEl.classList.remove(CONFIG.CLASSLIST.FULLSCREEN);
    }

    get isFullScreen() {
        return this.playerContainerEl.classList.contains(
            CONFIG.CLASSLIST.FULLSCREEN,
        );
    }

    toggleFullScreen() {
        this.isFullScreen ? this.quitFullScreen() : this.enterFullScreen();
    }

    receivePlayList(playList: WorkList | undefined) {
        if (playList) {
            log('Received play list:', playList);
            this.playList = playList;
        }
    }

    protected addCommand(commandsObj: Record<string, KeyCommandAction>) {
        this.commandor.setCommands(commandsObj);
    }
}
