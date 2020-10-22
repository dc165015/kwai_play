export const CONFIG = {
    SLIDE_INTERVAL: 5000,

    MATCHES: {
        PROFILE_URL: /kuaishou\.com\/profile\/(.*)(\/|\?)?.*/,
    },

    PREFERENCES: {
        ENABLE_DEBUG: {
            key: 'debugEnabler',
            inputId: 'debugEnabler',
        }
    },

    CLASSLIST: {
        FULLSCREEN: 'fullscreen',
    },

    SELECTORS: {
        APP: '#app',
        PROFILE_PANEL: '.profile',
        STATS_USERDATA_SUMMARY: '.user-data-summary',
        STATS_USERDATA_WORKCOUNT: '.user-data-item.work',
        PROFILE_WORKVIEW_PANEL: '.photo-preview',
        PLAYER_CONTAINER: '.player-container',

        VIDEO_PLAYER: '.kwai-player',
        SLIDE_PLAYER: '.long-mode',

        LIKE_BUTTON: '.like-icon',
        PLAY_BUTTON: '.play-icon',
        NEXTWORK_BUTTONS: ['.arrow-right', '.photo-preview-btn-next', '.end-info-reco-next'],
        PREVWORK_BUTTONS: ['.arrow-left', '.photo-preview-btn-prev', '.end-info-reco-replay'],
        CLOSE_BUTTON: '.close',

        WORK_LIST: '.feed-list',
        WORK_CARD: '.work-card',
        WORK_CONTENT: '.work-card-thumbnail',
        WORK_LIKE: '.work-card-info-data-like',
    },
};
