[![npm](https://img.shields.io/badge/npm-1.0.0-blue.svg)](https://www.npmjs.com/package/kp-priority-queue)
[![Bower](https://img.shields.io/badge/bower-1.0.0-red.svg)](https://github.com/kittencup/kp-priority-queue)
[![build](https://api.travis-ci.org/kittencup/kp-priority-queue.svg)](https://github.com/kittencup/kp-priority-queue)
# How To Use


#### PriorityQueue

```
var p = new PriorityQueue();

let item = {
    priority:number,
    data:any;
}

p.enqueue(item);
p.dequeue();
p.top();
p.remove(data);
p.count();
p.isEmpty();
p.clear();
p.getQueue();

```



# How To Test And Dev

`npm install`


```
// test
karma start

// dev
webpack --watch
```
