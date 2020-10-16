import { BasePlayer } from "./BasePlayer";
import { CONFIG } from 'src/config';

enum PhotoSwitchDirection {
    NEXT = 'down',
    PREV = 'up'
}

export class SlidePlayer extends BasePlayer {
    static from(playerPanel?: HTMLElement) {
        const playerContainer = $(CONFIG.SELECTORS.PLAYER_CONTAINER, playerPanel);
        const player = $(CONFIG.SELECTORS.SLIDE_PLAYER, playerContainer);
        if (player.length) return new this(playerContainer, player);
    }

    currentIndex = -1;
    timeoutPlayHandle = 0;

    protected interval = CONFIG.SLIDE_INTERVAL;

    constructor(playerContainer: JQuery<HTMLElement>, player: JQuery<HTMLElement>) {
        super(playerContainer, player);
        this.imgs.addClass('hide');
    }

    play() {
        this.slide(PhotoSwitchDirection.NEXT);
        if (this.doAutoPlay) {
            this.timeoutPlayHandle = window.setTimeout(() => this.play(), this.interval);
        }
    }

    stop() {
        window.clearTimeout(this.timeoutPlayHandle);
        this.timeoutPlayHandle = 0;
    }

    togglePlay() {
        if (this.timeoutPlayHandle) {
            this.stop();
        }
        else {
            this.play();
        }
    }

    stopAutoPlay() {
        super.stopAutoPlay();
        this.timeoutPlayHandle = 0;
    }

    // the imgs may keep comming, so it has to retrieve imgs again.
    get imgs() {
        return $('.long-mode img', this.playerContainer);
    }

    showNextImg() {
        this.slide(PhotoSwitchDirection.NEXT);
    }

    showPrevImg() {
        this.slide(PhotoSwitchDirection.PREV);
    }

    // param j is for slide backward/forward step.
    protected slide(direction = PhotoSwitchDirection.NEXT) {
        const imgs = this.imgs;
        if (imgs) {
            if (direction == PhotoSwitchDirection.NEXT && this.currentIndex + 1 == imgs.length) {
                this.showNextWork();
            }
            else if (direction == PhotoSwitchDirection.PREV && this.currentIndex == 0) {
                this.showPrevWork();
            }
            else {
                this.currentIndex++;
                this.showTheCurrent(imgs);
            }
        }
    }

    protected showTheCurrent(imgs: JQuery<HTMLElement>) {
        let theCurrent = $(imgs[this.currentIndex]);

        // show the current
        theCurrent.removeClass('hide');

        // hide the current after 1.1 times interval
        setTimeout(() => theCurrent.addClass('hide'), this.interval * 1.1);
    }

    reset() {
        super.reset();
        this.currentIndex = 0;
    }

}
