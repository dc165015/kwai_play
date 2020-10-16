import "./stylesheets/main";
import "./lib/hackFeedsFetch";
import { saveHistory } from "./components/history";
import { UserProfile } from './components/user/profile';
import { SlidePlayer } from './components/player/SlidePlayer';
import { VideoPlayer } from "./components/player/VideoPlayer";
import { PlayerController } from './components/player/PlayerController';

$(() => {
    saveHistory();
    if (window.location.href.match(/\/profile\//)) {
        const user = new UserProfile();
        Object.assign(unsafeWindow, { user, $ });
    }
    else if (window.location.href.match(/\/u\//)) {
        const player = VideoPlayer.from() || SlidePlayer.from();
        PlayerController.amount(player);
        Object.assign(unsafeWindow, { player, $ });
    }
});
