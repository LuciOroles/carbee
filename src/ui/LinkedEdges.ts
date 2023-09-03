import { PageInfo } from "@/types";

type LinkedPage = {
    pageInfo: PageInfo,
    next: LinkedPage | null,
    prev: LinkedPage | null
}

export class LinkedPages {
    head: LinkedPage | null;
    current: LinkedPage | null;
    tail: LinkedPage | null;
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    addItem(page: PageInfo) {
        if (this.tail === null) {
            this.tail = {
                next: null,
                prev: null,
                pageInfo: page,
            }
            this.head = this.tail;
        } else {
            let _current = this.tail;
            this.tail = {
                prev: _current,
                next: null,
                pageInfo: page,
            }
            _current.next = this.tail;
        }
    }

    setCurrent(pageInfo: Pick<PageInfo, 'nextCursor' | 'previousCursor'>) {
        let traverse = this.head;
        while (traverse !== null) {
            if (traverse.pageInfo.nextCursor == pageInfo.nextCursor &&
                traverse.pageInfo.previousCursor === pageInfo.previousCursor
            ) {
                this.current = traverse;
                break;
            } else {
                traverse = traverse.next;
            }
        }
    }


    moveCurrentLeft() {
        if (this.current && this.current?.prev !== null) {
            this.current = this.current.prev;
        }

        return this.current;
    }

    moveCurrentRight() {
        if (this.current && this.current.next !== null) {
            this.current = this.current.next;
        }
        return this.current;
    }

    toArray(): PageInfo[] {
        let result: PageInfo[] = [];
        let traverse = this.head;
        while (traverse !== null) {
            if (traverse) {
                result.push(traverse?.pageInfo)

            }
            traverse = traverse.next;

        }
        return result;
    }

}