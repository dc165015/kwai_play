import { BasePlayer } from './BasePlayer';
import { CONFIG } from 'src/config';
import { getSafeIndex } from 'lib/util';
import { App } from '../../app';
import log from 'src/lib/logger';
import { MutationObservable } from '../../lib/MutationObservable';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

enum PhotoSwitchDirection {
    NEXT = 'down',
    PREV = 'up',
}

export class SlidePlayer extends BasePlayer {
    static from(playerContainerEl?: HTMLElement) {
        const playerEl = (playerContainerEl || App.appEl).querySelector<
            HTMLElement
        >(CONFIG.SELECTORS.SLIDE_PLAYER);
        if (playerEl) return new this(playerEl, playerContainerEl!);
    }

    protected timeoutPlayHandle = 0;
    protected currentImgHideTimeoutHandle = 0;
    protected currentImg: JQuery<HTMLElement> | undefined;
    protected watchImageInsertionObserver: MutationObserver | undefined;
    protected watchImageInsertionSubscription: Subscription | undefined;

    slideImgIndex = -1;
    imgs: JQuery<HTMLElement>;

    constructor(
        public playerEl: HTMLElement,
        public playerContainerEl: HTMLElement,
    ) {
        super(playerEl, playerContainerEl);
        this.imgs = this.getImgs();
        this.watchOnImageInsertion();
    }

    play() {
        this.slide(PhotoSwitchDirection.NEXT);
        this.startAutoSlide();
    }

    protected startAutoSlide() {
        this.timeoutPlayHandle = window.setTimeout(
            () => this.play(),
            CONFIG.SLIDE_INTERVAL,
        );
    }

    get isPlaying() {
        return !!this.timeoutPlayHandle;
    }

    pause() {
        this.stopAutoSlide();
    }

    protected stopAutoSlide() {
        if (this.timeoutPlayHandle) {
            window.clearTimeout(this.timeoutPlayHandle);
            this.timeoutPlayHandle = 0;
        }
    }

    togglePlay() {
        if (this.timeoutPlayHandle) {
            this.pause();
        } else {
            this.play();
        }
    }

    beforeUnload() {
        super.beforeUnload();
        this.slideImgIndex = 0;
        this.watchImageInsertionObserver?.disconnect();
        this.watchImageInsertionSubscription?.unsubscribe();
    }

    // the imgs may keep comming, so it has to retrieve imgs again.
    getImgs() {
        const imgs = $('.long-mode img.long-mode-item', this.playerContainerEl);
        this.setupImgs(imgs);
        return imgs;
    }

    protected setupImgs(imgs: JQuery<HTMLElement>) {
        imgs.attr('decoding', 'async');
        // imgs.attr('loading', 'lazy');
        // imgs.attr('importance', 'high');
    }

    protected watchOnImageInsertion() {
        const ob = new MutationObservable(this.playerEl, { childList: true });
        this.watchImageInsertionObserver = ob.mutationObserver;
        this.watchImageInsertionSubscription = ob
            .pipe(
                switchMap(({ mutations }) => {
                    const addedNodes: HTMLElement[] = [];
                    for (const mutation of mutations) {
                        if (mutation.addedNodes.length) {
                            const imgs = Array.from(mutation.addedNodes);
                            addedNodes.concat(imgs as HTMLElement[]);
                        }
                    }
                    return of(addedNodes);
                }),
            )
            .subscribe((nodes) => {
                const imgs = $(nodes);
                this.setupImgs(imgs);
                this.imgs.add(imgs);
            });
    }

    showNextImg(isManul = false) {
        this.slide(PhotoSwitchDirection.NEXT, isManul);
    }

    showPrevImg(isManul = false) {
        this.slide(PhotoSwitchDirection.PREV, isManul);
    }

    // param j is for slide backward/forward step.
    protected slide(direction = PhotoSwitchDirection.NEXT, isManul = false) {
        const imgs = this.imgs;
        if (imgs) {
            if (
                direction == PhotoSwitchDirection.NEXT &&
                ++this.slideImgIndex == imgs.length &&
                !isManul
            ) {
                log('reached the last image, will show next work now.');
                this.stopAutoSlide();
                this.showNextWork();
            } else if (
                direction == PhotoSwitchDirection.PREV &&
                --this.slideImgIndex == -1 &&
                !isManul
            ) {
                log('reached the first image, will show prev work now.');
                this.stopAutoSlide();
                this.showPrevWork();
            } else {
                this.showImg(isManul);
            }
        }
    }

    showNextWork() {
        this.slideImgIndex = 0;
        super.showNextWork();
    }

    showPrevWork() {
        this.slideImgIndex = 0;
        super.showPrevWork();
    }

    protected showImg(isManul = false) {
        this.slideImgIndex = getSafeIndex(this.slideImgIndex, this.imgs);
        log(`now show the #${this.slideImgIndex} image.`);

        if (isManul && this.currentImg) {
            this.currentImg.css('display', 'none');
            window.clearTimeout(this.currentImgHideTimeoutHandle);
        }
        const newComer = $(this.imgs.get(this.slideImgIndex));

        // show the current
        newComer.css('display', 'block');

        // hide the current after 1.2 times interval
        this.currentImgHideTimeoutHandle = window.setTimeout(
            () => newComer.css('display', 'none'),
            CONFIG.SLIDE_INTERVAL * 1.2,
        );

        this.currentImg = newComer;
    }

    setUpDownKeyCommands() {
        this.addCommand({
            ArrowUp: () => {
                this.showPrevImg(true);
            },
            ArrowDown: () => {
                this.showNextImg(true);
            },
        });
    }
}
