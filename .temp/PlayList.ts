import { WorkList } from "../src/components/user/WorkList";
import { Work } from '../src/components/user/Work';

export class PlayList extends Array {
    userWorkList: WorkList | undefined;
    currentPlayIndex = 0;

    get prev(){
        if (this.currentPlayIndex >=0) this.currentPlayIndex--;
        return this.current;
    }

    get next(){
        if (this.currentPlayIndex == this.length - 1) {
            const nextWork = this.userWorkList?.next();
            if (nextWork) {
                this.push(nextWork);
                this.currentPlayIndex++;
            }
        }
        return this.current;
    }

    get current(){
        return this[this.currentPlayIndex];
    }

    addPlayedWork(item: Work){

    }
}