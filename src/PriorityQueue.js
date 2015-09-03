class PriorityQueue {

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
    constructor() {
        this._serial = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
        this._queue = [];
    }

    getQueue(){
        return this._queue;
    }
    enqueue(item) {

        if(!item){
            throw new Error('item not found');
        }

        if(!item.data){
                throw new Error('data not found');
        }

        if(typeof item.priority !== 'number'){
            throw new TypeError('priority not a number');
        }

        item.serial = this._serial--;
        this._queue.push(item);
        this.moveUp(this._queue.length - 1);
        return this;
    }

    dequeue() {
        let firstItem = this._queue[0];
        let lastItem = this._queue.pop();
        if (this._queue.length > 0) {
            this._queue[0] = lastItem;
            this.moveDown(0);
        }
        return firstItem;
    }

    top() {
        return this._queue[0];
    }
    
    remove(data){

        let removeIndexMap = {};

        for (let i = 0, l = this._queue.length; i < l; i++) {

            if (this._queue[i].data === data) {
                removeIndexMap[i] = true;
            }
        }

        let copyQueue = this._queue.slice();

        this.clear();

        for (let i = 0, l = copyQueue.length; i < l; i++) {
            if (!removeIndexMap[i]) {
                this.enqueue(copyQueue[i]);
            }
        }

        return this;
    }

    moveUp(pos) {

        let parent;
        let swap;

        while (pos > 0) {

            // 父节点位置为Math.floor(pos/2);
            parent = (pos - 1) >>> 1;

            // pos < parent pos => 交换位置
            if (this.compare(this._queue[pos], this._queue[parent]) < 0) {
                swap = this._queue[parent];
                this._queue[parent] = this._queue[pos];
                this._queue[pos] = swap;
                pos = parent;
            } else {
                break;
            }

        }

        return this;
    }

    moveDown(pos) {

        let last = this._queue.length - 1;
        let left;
        let right;
        let minIndex;
        let swap;

        while (true) {

            left = (pos << 1) + 1;
            right = left + 1;
            minIndex = pos;

            if (left <= last && this.compare(this._queue[left], this._queue[minIndex])) {
                minIndex = left;
            }

            if (right <= last && this.compare(this._queue[right], this._queue[minIndex])) {
                minIndex = right;
            }

            if (minIndex !== pos) {
                swap = this._queue[minIndex];
                this._queue[minIndex] = this._queue[pos];
                this._queue[pos] = swap;
                pos = minIndex;
            } else {
                break;
            }
        }


        return this;
    }

    compare(item1, item2) {
        let priority1 = item1.priority;
        let priority2 = item2.priority;

        if (priority1 === priority2) {
            priority1 = item1.serial;
            priority2 = item2.serial;
        }

        return priority2 - priority1;
    }

    count() {
        return this._queue.length;
    }

    isEmpty() {
        return !this.count();
    }

    clear() {
        this._queue = [];
        return this;
    }

}

export default PriorityQueue;