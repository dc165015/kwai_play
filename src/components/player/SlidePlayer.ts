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
    static from(playerMainContainerEl?: HTMLElement) {
        const playerEl = (playerMainContainerEl || App.appEl).querySelector<
            HTMLElement
        >(CONFIG.SELECTORS.SLIDE_PLAYER);
        if (playerEl) return new this(playerEl, playerMainContainerEl!);
    }

    protected timeoutPlayHandle = 0;
    protected currentImgHideTimeoutHandle = 0;
    protected currentImg: JQuery<HTMLElement> | undefined;
    protected watchImageInsertionObserver: MutationObserver | undefined;
    protected watchImageInsertionSubscription: Subscription | undefined;

    slideImgIndex = -1;
    imgs: JQuery<HTMLElement> | undefined;

    constructor(
        public playerEl: HTMLElement,
        public playerMainContainerEl: HTMLElement,
    ) {
        super(playerEl, playerMainContainerEl);
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
        const imgs = $(
            '.long-mode img.long-mode-item',
            this.playerMainContainerEl,
        );
        this.setupImgs(imgs);
        this.imgs = imgs;
    }

    protected setupImgs(imgs: JQuery<HTMLElement>) {
        imgs.css('display', 'none');
        imgs.attr('decoding', 'async');
        // imgs.attr('loading', 'lazy');
        // imgs.attr('importance', 'high');
    }

    protected watchOnImageInsertion() {
        if (!this.imgs) this.getImgs();
        const ob = new MutationObservable(this.playerEl, { childList: true });
        this.watchImageInsertionObserver = ob.mutationObserver;
        this.watchImageInsertionSubscription = ob
            .pipe(
                switchMap(({ mutations }) => {
                    const addedImgs: HTMLElement[] = [];
                    for (const mutation of mutations) {
                        let node: Node | null, i: number;
                        for (i = 0; (node = mutation.addedNodes.item(i)); i++) {
                            if (node instanceof HTMLIFrameElement) {
                                addedImgs.push(node);
                            }
                        }
                    }
                    return of(addedImgs);
                }),
            )
            .subscribe((nodes) => {
                const imgs = $(nodes);
                this.setupImgs(imgs);
                this.imgs?.add(imgs);
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

    protected cleanupBeforeSwitchWork() {
        this.slideImgIndex = 0;
        this.imgs = undefined;
    }

    protected showImg(isManul = false) {
        if (this.imgs) {
            this.slideImgIndex = getSafeIndex(this.slideImgIndex, this.imgs);
            
            if (isManul && this.currentImg) {
                this.currentImg.css('display', 'none');
                window.clearTimeout(this.currentImgHideTimeoutHandle);
            }
            
            const newComer = $(this.imgs.get(this.slideImgIndex));
            
            log(`now show the #${this.slideImgIndex} image.`);
            newComer.css('display', 'block');

            // hide the current after 1.2 times interval
            this.currentImgHideTimeoutHandle = window.setTimeout(
                () => newComer.css('display', 'none'),
                CONFIG.SLIDE_INTERVAL * 1.2,
            );

            this.currentImg = newComer;
        }
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
