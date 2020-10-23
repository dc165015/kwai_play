import { BasePlayer } from './BasePlayer';
import { CONFIG } from 'src/config';
import { App } from '../../app';

export class VideoPlayer extends BasePlayer {
    static TailedADDuration = 5;
    static VolumeStep = 0.1;
    // it controls the volume of all comming videos in a conform way.
    static uniformVolume = 0.5;

    static from(playerContainerEl: HTMLElement) {
        const playerEl = (playerContainerEl || App.appEl).querySelector<
            HTMLElement
        >(CONFIG.SELECTORS.VIDEO_PLAYER);
        if (playerEl) return new this(playerEl, playerContainerEl!);
    }

    protected intervalVideoTimeCheckHandle = 0;

    videoEl: HTMLVideoElement | null | undefined;

    constructor(
        public playerEl: HTMLElement,
        public playerContainerEl: HTMLElement,
    ) {
        super(playerEl, playerContainerEl);
        this.getVideoEl();
    }

    protected getVideoEl() {
        this.videoEl = this.playerEl.querySelector('video');
        if (this.videoEl) {
            this.videoEl.volume = VideoPlayer.uniformVolume;
            this.onVideoSrcChange(this.videoEl);
        }
    }

    // the last 6s content is advertisement which shall be skipped.
    protected get isADTime() {
        if (this.videoEl) {
            return (
                this.videoEl.duration - this.videoEl.currentTime <=
                VideoPlayer.TailedADDuration
            );
        }
    }

    get isPlaying() {
        return this.videoEl && !this.videoEl.paused;
    }

    play() {
        this.videoEl?.play();
        this.startAutoSkipAD();
    }

    pause() {
        this.stopAutoSkipAD();
        this.videoEl?.pause();
    }

    togglePlay() {
        this.isPlaying ? this.pause() : this.play();
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

    set volume(n: number) {
        if (this.videoEl) {
            if (n < 0) {
                n = 0;
            } else if (n > 1) {
                n = 1;
            }
            VideoPlayer.uniformVolume = this.videoEl.volume = n;
        }
    }

    get volume() {
        return this.videoEl?.volume || 0;
    }

    protected onVideoSrcChange(video: HTMLVideoElement) {
        $(video).on(
            'loadeddata',
            () => (video.volume = VideoPlayer.uniformVolume),
        );
    }

    volumeUp() {
        this.volume += VideoPlayer.VolumeStep;
    }

    volumeDown() {
        this.volume -= VideoPlayer.VolumeStep;
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
