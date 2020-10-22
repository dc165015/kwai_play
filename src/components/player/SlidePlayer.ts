import { BasePlayer } from './BasePlayer';
import { CONFIG } from 'src/config';
import { getSafeIndex } from 'lib/util';
import { App } from '../../app';
import log from 'src/lib/logger';
import { WorkList } from '../user/WorkList';

enum PhotoSwitchDirection {
    NEXT = 'down',
    PREV = 'up',
}

export class SlidePlayer extends BasePlayer {
    static from(playerContainerEl?: HTMLElement) {
        const playerEl = (playerContainerEl || App.appEl).querySelector<
            VElement
        >(CONFIG.SELECTORS.SLIDE_PLAYER);
        if (playerEl) return new this(playerEl, playerContainerEl!);
    }

    slideImgIndex = -1;
    timeoutPlayHandle = 0;
    protected interval = CONFIG.SLIDE_INTERVAL;

    constructor(
        public playerEl: VElement,
        public playerContainerEl: HTMLElement,
    ) {
        super(playerEl!, playerContainerEl!);
        this.setUpDownKeyCommands();
        this.imgs.css('display', 'none');
    }

    play() {
        this.slide(PhotoSwitchDirection.NEXT);
        this.startAutoPlay();
    }

    protected startAutoPlay() {
        this.timeoutPlayHandle = window.setTimeout(
            () => this.play(),
            this.interval,
        );
    }

    get isPlaying() {
        return !!this.timeoutPlayHandle;
    }

    stop() {
        this.stopAutoPlay();
    }

    protected stopAutoPlay() {
        if (this.timeoutPlayHandle) {
            window.clearTimeout(this.timeoutPlayHandle);
            this.timeoutPlayHandle = 0;
        }
    }

    togglePlay() {
        if (this.timeoutPlayHandle) {
            this.stop();
        } else {
            this.play();
        }
    }

    reset() {
        super.reset();
        this.slideImgIndex = 0;
    }

    // the imgs may keep comming, so it has to retrieve imgs again.
    get imgs() {
        return $('.long-mode img.long-mode-item', this.playerContainerEl);
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
            if (
                direction == PhotoSwitchDirection.NEXT &&
                ++this.slideImgIndex == imgs.length
            ) {
                log('reached the last image, will show next work now.');
                this.stopAutoPlay();
                this.showNextWork();
            } else if (
                direction == PhotoSwitchDirection.PREV &&
                --this.slideImgIndex == -1
            ) {
                log('reached the first image, will show prev work now.');
                this.stopAutoPlay();
                this.showPrevWork();
            } else {
                this.showImg(imgs);
            }
        }
    }

    async showNextWork() {
        this.slideImgIndex = 0;
        await super.showNextWork();
    }

    async showPrevWork() {
        this.slideImgIndex = 0;
        await super.showPrevWork();
    }

    protected showImg(imgs: JQuery<HTMLElement>) {

        const currentImg = $(imgs[this.slideImgIndex]);
        log(`now show the #${this.slideImgIndex} image.`);

        // show the current
        currentImg.css('display', 'block');

        // hide the current after 1.2 times interval
        setTimeout(
            () => currentImg.css('display', 'none'),
            this.interval * 1.2,
        );
    }

    setUpDownKeyCommands() {
        this.addCommand({
            ArrowUp: () => {
                this.showPrevImg();
            },
            ArrowDown: () => {
                this.showNextImg();
            },
        });
    }
}
