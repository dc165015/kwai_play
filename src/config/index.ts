export const CONFIG = {
    SLIDE_INTERVAL: 5000,

    MATCHS: {
        PROFILE_URL: /kuaishou\.com\/profile\/(.*)?(\/|\?)?.*/,
    },

    SELECTORS: {
        PROFILE_PANEL: '.profile',
        
        STATS_USERDATA: '.user-data',
        STATS_USERDATA_WORKCOUNT: '.user-data-item.work', 
        
        PLAYER_PANEL: '.photo-preview',
        PLAYER_CONTAINER: '.player-container',

        VIDEO_PLAYER: '.kwai-player-container-video',
        SLIDE_PLAYER: '.long-mode',

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

        CLOSE_BUTTON: '.close',

        WORK_LIST: '.feed-list',
        WORK_CARD: '.work-card',
        WORK_CONTENT: '.work-card-thumbnail',
        WORK_LIKE: '.work-card-info-data-like',
    }
}