import { BasePlayer } from './BasePlayer';
import { CONFIG } from 'src/config';
import { App } from '../../app';

enum VolumeSwitchDirection {
    HIGHER = 'up',
    LOWER = 'down',
}

export class VideoPlayer extends BasePlayer {
    static from(playerContainerEl: HTMLElement) {
        const playerEl = (playerContainerEl || App.appEl).querySelector<
            VElement
        >(CONFIG.SELECTORS.VIDEO_PLAYER);
        if (playerEl) return new this(playerEl, playerContainerEl!);
    }

    video: HTMLVideoElement | undefined;

    protected totalTimer: JQuery<HTMLElement> | undefined;
    protected currentTimer: JQuery<HTMLElement> | undefined;
    protected intervalVideoTimeCheckHandle = 0;
    protected _playBtn: JQuery<HTMLElement> | undefined;

    constructor(
        public playerEl: VElement,
        public playerContainerEl: HTMLElement,
    ) {
        super(playerEl!, playerContainerEl!);
        this.setUpDownKeyCommands();
    }

    protected get totalVideoTime() {
        this.totalTimer = $('.progress-time-total', this.playerContainerEl);
        return this.resolveVideoTimer(this.totalTimer);
    }

    protected get currentVideoTime() {
        this.currentTimer = $('.progress-time-current', this.playerContainerEl);
        return this.resolveVideoTimer(this.currentTimer);
    }

    protected get leftVideoTime() {
        return this.totalVideoTime - this.currentVideoTime;
    }

    // the last 6s content is advertisement which shall be skipped.
    protected get isADTime() {
        return this.leftVideoTime <= 5.5;
    }

    protected get playBtn() {
        return (this._playBtn ||= $(
            CONFIG.SELECTORS.PLAY_BUTTON,
            this.playerContainerEl,
        ));
    }

    get isPlaying() {
        // when video is playing, the play button has a rect element in svg. Otherwise, it hasn't.
        return this.playBtn && !$('svg rect', this.playBtn).length;
    }

    get vuePlayerCtrl() {
        return this.playerEl.__vue__ as VueVideo;
    }

    play() {
        if (!this.isPlaying) {
            this.vuePlayerCtrl && this.vuePlayerCtrl.play
                ? this.vuePlayerCtrl.play()
                : this.click(this.playBtn);
        }
        this.startAutoSkipAD();
    }

    stop() {
        this.stopAutoSkipAD();
        this.vuePlayerCtrl?.pause();
    }

    togglePlay() {
        this.isPlaying ? this.stop() : this.play();
    }

    protected startAutoSkipAD() {
        if (!this.intervalVideoTimeCheckHandle) {
            this.intervalVideoTimeCheckHandle = window.setInterval(
                () => this.checkIfPlayNextOnEnd(),
                500,
            );
        }
    }

    protected stopAutoSkipAD() {
        if (this.intervalVideoTimeCheckHandle) {
            window.clearInterval(this.intervalVideoTimeCheckHandle);
            this.intervalVideoTimeCheckHandle = 0;
        }
    }

    protected checkIfPlayNextOnEnd() {
        if (this.isADTime) {
            this.showNextWork();
        }
    }

    // convert time string "02:01:01" to 7261s
    protected resolveVideoTimer(timer: JQuery<HTMLElement>) {
        const str = timer.text();
        const arr = str.split(':').map((n) => Number(n));
        return arr.reduce((total, current) => (total = current + total * 60));
    }

    protected volume(direction = VolumeSwitchDirection.HIGHER) {
        if (this.vuePlayerCtrl) {
            let volume = this.vuePlayerCtrl.volume;
            volume ||= 0.1;
            volume = direction == 'up' ? (volume *= 1.382) : (volume *= 0.618);
            this.vuePlayerCtrl.volume =
                volume > 1 ? 1 : volume < 0.1 ? 0 : volume;
        }
    }

    volumeUp() {
        this.volume(VolumeSwitchDirection.HIGHER);
    }

    volumeDown() {
        this.volume(VolumeSwitchDirection.LOWER);
    }

    setUpDownKeyCommands() {
        this.addCommand({
            ArrowUp: () => {
                this.volumeUp();
            },
            ArrowDown: () => {
                this.volumeDown();
            },
        });
    }
}
