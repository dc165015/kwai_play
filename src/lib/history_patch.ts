import log from "./logger";
import { App } from "src/app";

/**
 * Keeps play history: 
 * This is to resolve the problem that you cannot find out the previous played video
 * on the fly when the next video started play.
 * The solution is to push the current playing url into history before it's changed.
 * Thus we can replay the previous work through history record.
 */
export function keepPlayHistory(){
    const originReplaceState = history.replaceState.bind(history);
    history.replaceState = function (data: any, title: string, url: string) {
        if (url.match(/\/u\//)) {
            history.pushState(Date.now(), document.title, document.location.href);
        }
        return originReplaceState(data, title, url);
    };
}

export function fixPageLostOnRefresh(){
    $(window).on('beforeunload', ()=>{
        if (!App.isProfilePage){
            history.pushState(null, document.title, App.url);
            log(`Before leave this page, push the profile page url into history`);
            return 'Are you sure to leave?';
        }
    });
}