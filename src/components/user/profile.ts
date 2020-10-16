import { getNumberInElement } from "src/lib/util";
import { waitForOnInsert, waitForTime, waitForOnTxtChange } from "src/lib/waits";
import { WorkList } from './WorkList';
import { CONFIG } from '../../config';
import { SlidePlayer } from '../player/SlidePlayer';
import { VideoPlayer } from '../player/VideoPlayer';
import { PlayerController } from "../player/PlayerController";

type PlayerListener = (player: SlidePlayer | VideoPlayer | undefined, playList?: WorkList) => any;

export class UserProfile {
    url = '';
    userId = '';
    workList: WorkList | undefined;
    worksTotal = 0;
    player: SlidePlayer | VideoPlayer | undefined;

    protected statsEl: JQuery<HTMLElement> | undefined;
    protected profileEl: JQuery<HTMLElement> | undefined;

    protected playerLoadListeners: Set<PlayerListener> = new Set();
    protected playerUnLoadListeners: Set<PlayerListener> = new Set();

    constructor() {
        if (this.getUserIdAndProfileUrl()){
            this.pushProfilePageInHistory();
            this.getProfilePanel();
            this.init();
        }
    }

    protected async init() {
        this.amountController();
        await this.getWorksTotal();
        this.workList = new WorkList(this.worksTotal, this);
        this.watchForPlayer();
    }

    protected getProfilePanel() {
        this.profileEl = $(CONFIG.SELECTORS.PROFILE_PANEL, document.body);
    }

    protected getUserIdAndProfileUrl() {
        const match = location.href.match(CONFIG.MATCHS.PROFILE_URL);
        if (match) {
            const [url, userId] = match;
            this.userId = userId;
            this.url = location.href;
            return {url, userId};
        }
    }

    protected async getStatsEl() {
        return this.statsEl ||= await waitForOnInsert(CONFIG.SELECTORS.STATS_USERDATA_WORKCOUNT, CONFIG.SELECTORS.STATS_USERDATA);
    }

    protected async getStatistics() {
        await this.getStatsEl();
        await waitForTime(2000);
        await this.getWorksTotal();
    }

    protected async getWorksTotal() {
        await this.getStatsEl();
        if (!this.worksTotal && this.statsEl) {
            this.worksTotal = getNumberInElement(this.statsEl);
            if (!this.worksTotal) {
                await waitForOnTxtChange(this.statsEl.get(0));
                this.worksTotal = getNumberInElement(this.statsEl);
            }
        }
        return this.worksTotal;
    }

    protected pushProfilePageInHistory() {
        window.history.pushState({ userId: this.userId }, document.title, this.url);
    }

    protected watchForPlayer() {
        const _profileEl = this.profileEl?.get(0);
        if (_profileEl) {
            const playerPanelClass = CONFIG.SELECTORS.PLAYER_PANEL.substring(1);
            const playerWatcher = new MutationObserver(mutations => mutations.forEach(mutation => {
                mutation.addedNodes?.forEach(node => {
                    if (isPlayerPanel(node)) {
                        this.getPlayer(<HTMLElement>node);
                        this.playerLoadListeners.forEach(listener => listener(this.player, this.workList));
                    }
                });

                mutation.removedNodes?.forEach(node => {
                    if (isPlayerPanel(node)) {
                        this.playerUnLoadListeners.forEach(listener => listener(this.player));
                    }
                });
            }));

            playerWatcher.observe(_profileEl, { childList: true });

            function isPlayerPanel(node: Node) {
                return $(node).hasClass(playerPanelClass);
            }
        }
    }

    protected getPlayer(playerPanel: HTMLElement) {
        this.player = VideoPlayer.from(playerPanel) || SlidePlayer.from(playerPanel);
    }

    onPlayerLoad(listener: PlayerListener) {
        this.playerLoadListeners.add(listener);
    }

    onPlayerUnLoad(listener: PlayerListener) {
        this.playerUnLoadListeners.add(listener);
        this.player?.destroy();
    }

    onWorkListUpdated() {
        if (this.workList) this.player?.receivePlayList(this.workList);
    }

    protected amountController() {
        this.onPlayerLoad((player, playList) => {
            PlayerController.amount(player, playList);
        });

        this.onPlayerUnLoad(player => {
            PlayerController.unamount();
        });

        PlayerController.listen();
    }
}