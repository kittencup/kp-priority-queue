import PriorityQueue from '../src/PriorityQueue.js';

describe('PriorityQueue Test', () => {

    let priorityQueue = new PriorityQueue();
    let queue = [];
    for(let i = 10 ;i >= -10 ; i--){
        queue.push({
            priority:i,
            data:'priority_queue_data_' + Math.floor(Math.random() * 1000)
        })
    }

    it('enqueue(),moveUp()', ()=> {

        try {
            priorityQueue.enqueue();
            expect(false).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }

        try {
            priorityQueue.enqueue({
                priority: '1',
                data: queue[0]
            });
            expect(false).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }

        try {
            priorityQueue.enqueue({
                priority: 1
            });
            expect(false).toBe(true);
        } catch (e) {
            expect(true).toBe(true);
        }


        try{
            for(let i = 0 , l = queue.length ; i < l ;i++){
                priorityQueue.enqueue(queue[i]);
            }
            expect(true).toBe(true);
        }catch(e){
            expect(false).toBe(true);
        }
    });

    it('top()', ()=> {
        expect(priorityQueue.top().data).toEqual(queue[0].data);
    });

    it('dequeue(),moveDown()', ()=> {
       expect(priorityQueue.dequeue().data).toEqual(queue.shift().data);

    });

    it('remove()',()=>{

        let firstData = queue.shift().data;

        expect(priorityQueue.remove(firstData)).toEqual(priorityQueue);
        expect(priorityQueue.top().data).toEqual(queue[0].data);
    });

    it('compare',()=>{

        let item1 = {
            priority:1000,
            serial:1000
        };

        let item2 = {
            priority:1000,
            serial:100
        };

        expect(priorityQueue.compare(item1,item2)).toBeLessThan(0);
        expect(priorityQueue.compare(item2,item1)).toBeGreaterThan(0);

        item2.priority = 1001;

        expect(priorityQueue.compare(item1,item2)).toBeGreaterThan(0);
        expect(priorityQueue.compare(item2,item1)).toBeLessThan(0);

    });

    it("count()",()=>{
        expect(priorityQueue.count()).toBe(queue.length);
    });

    it("isEmpty()",()=>{
        expect(priorityQueue.isEmpty()).toBe(false);
    });

    it("clear()",()=>{
        expect(priorityQueue.clear()).toEqual(priorityQueue);
        expect(priorityQueue.getQueue()).toEqual([]);
    });

});