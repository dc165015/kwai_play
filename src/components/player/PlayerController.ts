import { SlidePlayer } from "./SlidePlayer";
import { VideoPlayer } from "./VideoPlayer";
import { WorkList } from '../user/WorkList';
import { CONFIG } from '../../config/index';

export class PlayerController {
    static player: SlidePlayer | VideoPlayer | undefined;
    static configuration: Record<string, ()=>void>;

    static commands = new Map<string, (e: JQuery.KeyDownEvent) => void>();

    static on(key: string, actionCallback: () => void, filter: () => boolean) {
        const action = filter ? () => filter() && actionCallback() : actionCallback;
        this.commands.set(key, action);
        this.listen();
    }
    
    static amount(player: SlidePlayer | VideoPlayer | undefined, playList?: WorkList | undefined, newConfig: Record<string, () => void> = {}) {
        this.unamount();
        this.config(newConfig);
        this.player = player;
        this.player?.receivePlayList(playList);
        this.player?.startAutoPlay();
        return this;
    }
    
    static config(newConfig: Record<string, () => void> = {}){
        this.configuration = Object.assign(this.defaultConfig, newConfig);
        for (let key in this.configuration) {
            this.commands.set(key, this.configuration[key]);
        }
    }
    
    static unamount(){
        this.player = undefined;
        this.commands.clear();
    }

    protected static listener(e: JQuery.KeyDownEvent){
        const action = PlayerController.commands.get(e.key);
        if (action) {
            e.preventDefault();
            e.stopPropagation();
            action(e);
        }
    }
    
    static listen() {

        const doc = $(document);
        doc.off('keydown');
        $(document).on('keydown', this.listener);
    }

    static defaultConfig = {

        ArrowRight() { PlayerController.player?.showNextWork(); },

        ArrowLeft() { PlayerController.player?.showPrevWork(); },

        ArrowUp() {
                PlayerController.player instanceof SlidePlayer
                    ? PlayerController.player?.showPrevImg()
                    : PlayerController.player?.volumeUp();
        },

        ArrowDown() {
                PlayerController.player instanceof SlidePlayer
                    ? PlayerController.player?.showNextImg()
                    : PlayerController.player?.volumeDown();
        },

        Enter() { PlayerController.player?.toggleFullScreen(); },

        
        l() { PlayerController.player?.toggleLike(); },
        
        ' '() { PlayerController.player?.togglePlay(); },
        
        Escape(e: JQuery.KeyDownEvent) { 
            PlayerController.player?.reset(); 
            if (e.shiftKey) {
                $(CONFIG.SELECTORS.CLOSE_BUTTON).trigger('click');
            }
        },
    };

};
