import { CONFIG } from 'src/config';
import { Work } from '../user/Work';
import { WorkList } from '../user/WorkList';
import { selectFirstFound } from '../../lib/util';

declare enum WorkSwitchDirection {
    NEXT = 'left',
    PREV = 'right'
}

export class BasePlayer {

    isFullScreen = false;
    currentPlay: Work | undefined;

    protected containerNextSibling: JQuery<HTMLElement>;
    protected doAutoPlay = true;
    protected playList: WorkList | undefined;

    constructor(public playerContainer: JQuery<HTMLElement>, protected originalPlayer: JQuery<HTMLElement>) {
        this.containerNextSibling = this.playerContainer.next();
        this.enterFullScreen();
    }

    toggleLike() {
        this.click(this.likeBtn);
    }

    play() { };
    stop() { };
    togglePlay() { };

    startAutoPlay(playList?: WorkList) {
        if (playList) {
            this.doAutoPlay = true;
            this.playList = playList;
        }
        this.play();
    }

    stopAutoPlay() {
        this.doAutoPlay = false;
    }

    reset() {
        this.stop();
        this.quitFullScreen();
    }

    destroy() {
        this.stop();
        this.originalPlayer.remove();
    }

    get currentPlaySrc() {
        return this.currentPlay?.src;
    }

    protected get nextBtn() {
        return selectFirstFound(CONFIG.SELECTORS.NEXTWORK_BUTTONS);
    }

    showNextWork() {
        const item = this.playList?.next();
        if (item) {
            this.currentPlay = item;
            item.click();
        }
        else  {
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
        return $(CONFIG.SELECTORS.LIKE_BUTTON, this.playerContainer);
    }

    protected click(button: JQuery<HTMLElement> | undefined) {
        if (button && button.length) {
            button.trigger('click');
        }
        return this;
    }

    protected switchWork(direction = WorkSwitchDirection.NEXT) {
        if (direction == WorkSwitchDirection.NEXT) {
            this.showNextWork();
        } else {
            this.showPrevWork();
        }
    }

    protected enterFullScreen() {
        this.playerContainer.prependTo(document.body);
        this.playerContainer.addClass('fullscreen');
        this.isFullScreen = true;
    }

    protected quitFullScreen() {
        this.playerContainer.removeClass('fullscreen');
        // recover to its original location in DOM
        this.containerNextSibling.before(this.playerContainer);
        this.isFullScreen = false;
    }

    toggleFullScreen() {
        this.isFullScreen ? this.quitFullScreen() : this.enterFullScreen();
    }

    receivePlayList(playList: WorkList | undefined) {
        if (playList) this.playList = playList;
    }
}