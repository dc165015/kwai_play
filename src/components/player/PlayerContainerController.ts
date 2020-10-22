import { delay, filter, tap } from 'rxjs/operators';
import log from 'lib/logger';
import { App } from '../../app';
import { CONFIG } from '../../config/index';
import { selectChildEl } from 'lib/util';
import { SlidePlayer } from './SlidePlayer';
import { VideoPlayer } from './VideoPlayer';
import { WorkList } from '../user/WorkList';
import {
    onKindeOfNodesRemove,
    onKindOfNodesInsert,
} from 'lib/mutaion_observers';
import { MutationObservable } from 'lib/MutationObservable';
import { Subscription } from 'rxjs';

const SELECTORS = CONFIG.SELECTORS;

export class PlayerContainerController {
    protected _profilePanelEl: HTMLElement | undefined | null;
    protected _workViewPanelEl: HTMLElement | undefined | null;
    protected _containerEl: HTMLElement | undefined | null;
    protected _player: SlidePlayer | VideoPlayer | undefined;
    protected _watchPlayerChangeObserver: MutationObserver | undefined;
    protected _watchPlayerChangeSubscription: Subscription | undefined;

    constructor(public playList?: WorkList) {
        if (App.isProfilePage) {
            this.watchingWorkViewPanelInsert();
            this.watchingWorkViewPanelRemove();
        }
    }

    get player(): SlidePlayer | VideoPlayer | undefined {
        return (this._player ||= this.setupProperPlayer());
    }

    protected setupProperPlayer() {
        let player: SlidePlayer | VideoPlayer | undefined;
        if (!this._player && this.containerEl?.isConnected) {
            player = VideoPlayer.from(this._containerEl!);
            if (!player) {
                player = SlidePlayer.from(this._containerEl!);
            }
            player?.setPlayList(this.playList);
            log(`Got ${player?.name}!`);
        }
        return (this._player ||= player);
    }

    play(playList?: WorkList | undefined) {
        this.playList = playList || this.playList;
        return this;
    }

    close() {
        this.closeBtn.trigger('click');
    }

    protected get closeBtn() {
        return $(SELECTORS.CLOSE_BUTTON);
    }

    get profilePanelEl() {
        return (this._profilePanelEl ||= selectChildEl(
            App.appEl,
            SELECTORS.PROFILE_PANEL,
        ));
    }

    get workViewPanelEl() {
        if (!this._workViewPanelEl) {
            if (this.profilePanelEl) {
                this._workViewPanelEl = selectChildEl(
                    this._profilePanelEl!,
                    SELECTORS.PROFILE_WORKVIEW_PANEL,
                );
            } else {
                this._workViewPanelEl = selectChildEl(
                    document.body,
                    SELECTORS.PROFILE_PANEL +
                        ' > ' +
                        SELECTORS.PROFILE_WORKVIEW_PANEL,
                );
            }
        }
        return this._workViewPanelEl;
    }

    get containerEl() {
        if (!this._containerEl) {
            let select;
            if (this.workViewPanelEl) {
                select = this._workViewPanelEl!.querySelector.bind(
                    this._workViewPanelEl,
                );
            } else {
                select = document.querySelector.bind(document);
            }
            this._containerEl = select<HTMLElement>(SELECTORS.PLAYER_CONTAINER);
            this._containerEl && log('Got the player container.');
        }
        return this._containerEl;
    }

    protected watchingWorkViewPanelRemove() {
        if (this.profilePanelEl) {
            onKindeOfNodesRemove(
                SELECTORS.PROFILE_WORKVIEW_PANEL,
                this.profilePanelEl,
                true,
                true,
            ).subscribe(() => {
                this.cleanupAfterWorkViewPanelRemoved();
            });
        }
    }

    protected cleanupAfterWorkViewPanelRemoved() {
        log('Work view panel is unloaded.');
        this._player?.reset();
        this._workViewPanelEl = undefined;
        this._player = undefined;
        this._containerEl = undefined;
        this._watchPlayerChangeObserver?.disconnect();
        this._watchPlayerChangeSubscription?.unsubscribe();
    }

    protected watchingWorkViewPanelInsert() {
        if (this.profilePanelEl) {
            return onKindOfNodesInsert(
                SELECTORS.PROFILE_WORKVIEW_PANEL,
                this.profilePanelEl,
                true,
                true,
            )
                .pipe(
                    tap(({ element }) => {
                        log('Work view panel is loaded.');
                        this._workViewPanelEl = element as HTMLElement;
                    }),
                    delay(100),
                    tap(() => {
                        this.setupProperPlayer();
                    }),
                )
                .subscribe(() => this.watchOnPlayerChange());
        }
    }

    protected watchOnPlayerChange() {
        if (this.containerEl && this.player) {
            const mo = new MutationObservable(this._containerEl!, {
                childList: true,
                subtree: true,
            });

            this._watchPlayerChangeObserver = mo.mutationObserver;
            this._watchPlayerChangeSubscription = mo
                .pipe(
                    filter(({ mutations }) =>
                        mutations.some((mutation) => {
                            return !this.player?.isConnected;
                        }),
                    ),
                    tap(()=>{
                        log('Current player was removed.');
                        this._player?.reset();
                        this._player = undefined;
                    }),
                    delay(20),
                )
                .subscribe(() => {
                    this.setupProperPlayer();
                });
        }
    }
}
