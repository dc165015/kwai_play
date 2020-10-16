import { BasePlayer } from "./BasePlayer";
import { CONFIG } from 'src/config';

enum VolumeSwitchDirection {
    HIGHER = 'up',
    LOWER = 'down'
}

export class VideoPlayer extends BasePlayer {
    static from(playerPanel?: HTMLElement) {
        const playerContainer = $(CONFIG.SELECTORS.PLAYER_CONTAINER, playerPanel);
        const player = $(CONFIG.SELECTORS.VIDEO_PLAYER, playerContainer);
        if (player.length) return new this(playerContainer, player);
    }

    protected totalTimer: JQuery<HTMLElement> | undefined;
    protected currentTimer: JQuery<HTMLElement> | undefined;
    protected intervalVideoTimeCheckHandle = 0;
    protected _playBtn: JQuery<HTMLElement> | undefined;

    protected get totalVideoTime() {
        this.totalTimer = $('.progress-time-total', this.playerContainer);
        return this.resolveVideoTimer(this.totalTimer);
    }

    protected get currentVideoTime() {
        this.currentTimer = $('.progress-time-current', this.playerContainer);
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
        return this._playBtn ||= $(CONFIG.SELECTORS.PLAY_BUTTON, this.playerContainer);
    }

    get isPlaying(){
        // when video is playing, the play button has a rect element in svg. Otherwise, it hasn't.
        return this.playBtn && !$('svg rect', this.playBtn).length;
    }

    play() {
        if (!this.isPlaying) {
            this.click(this.playBtn);
        }
        if (this.doAutoPlay) {
            this.intervalVideoTimeCheckHandle = window.setInterval(() => this.checkIfPlayNextOnEnd(), 500);
        }
    }

    stop() {
        if (this.isPlaying) {
            this.click(this.playBtn);
        }
    }

    stopAutoPlay() {
        super.stopAutoPlay();
        window.clearInterval(this.intervalVideoTimeCheckHandle);
        this.intervalVideoTimeCheckHandle = 0;
    }

    togglePlay() {
        this.click(this.playBtn);
    }

    protected checkIfPlayNextOnEnd() {
        if (this.isADTime) {
            this.showNextWork();
        }
    }

    // convert time string "02:01:01" to 7261s
    protected resolveVideoTimer(timer: JQuery<HTMLElement>) {
        const str = timer.text();
        const arr = str.split(':').map(n => Number(n));
        return arr.reduce((total, current) => total = current + total * 60);
    }

    protected get video() {
        return $<HTMLVideoElement>('video', this.playerContainer);
    }

    protected volume(direction = VolumeSwitchDirection.HIGHER) {
        const video = this.video.get(0);
        if (video) {
            let volume = video.volume;
            volume ||= 0.1;
            volume = direction == 'up' ? volume *= 1.1 : volume *= 0.9;
            video.volume = volume > 1 ? 1 : volume;
        }
    }

    volumeUp() {
        this.volume(VolumeSwitchDirection.HIGHER);
    }

    volumeDown() {
        this.volume(VolumeSwitchDirection.LOWER);
    }

};
