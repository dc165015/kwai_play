// import {playerContainerClass, playerMainContainerClass, videoPlayerClass, slidePlayerClass} from "../stylesheets/variables.scss";
import SCSS from '../stylesheets/variables.scss';

export const CONFIG = {
    SLIDE_INTERVAL: Number(SCSS.slideInterval),

    MATCHES: {
        PROFILE_URL: /kuaishou\.com\/profile\/(.*)(\/|\?)?.*/,
    },

    PREFERENCES: {
        ENABLE_DEBUG: {
            key: 'debugEnabler',
            inputId: 'debugEnabler',
        },
    },

    CLASSLIST: {
        FULLSCREEN: SCSS.fullscreenClass,
    },

    SELECTORS: {
        APP: '#app',
        PROFILE_PANEL: '.profile',
        STATS_USERDATA_SUMMARY: '.user-data-summary',
        STATS_USERDATA_WORKCOUNT: '.user-data-item.work',
        PROFILE_WORKVIEW_PANEL: '.photo-preview',
        
        PLAYER_MAINCONTAINER: '.' + SCSS.playerMainContainerClass,
        PLAYER_CONTAINER: '.' + SCSS.playerContainerClass,
        VIDEO_PLAYER: '.' + SCSS.videoPlayerClass,
        SLIDE_PLAYER: '.' + SCSS.slidePlayerClass,

        CLOSE_BUTTON: '.close',
        LIKE_BUTTON: '.like-icon',
        PLAY_BUTTON: '.play-icon',
        NEXTWORK_BUTTONS: [
            '.arrow-right',
            '.photo-preview-btn-next',
            '.end-info-reco-next',
        ],
        PREVWORK_BUTTONS: [
            '.arrow-left',
            '.photo-preview-btn-prev',
            '.end-info-reco-replay',
        ],

        WORK_LIST: '.feed-list',
        WORK_CARD: '.work-card',
        WORK_CONTENT: '.work-card-thumbnail',
        WORK_LIKE: '.work-card-info-data-like',
    },
};
