/**
 * Created by yinchensan on 2017/7/4.
 *
 * @file queue for request
 */

'use strict';

const Queue = require('./EffectQueue');

class PromiseQueue {

    constructor() {
        this.queue = new Queue();
        this.concurrency = 1;
        this.runCount = 0;
    }

    add(request) {
        this.runCount++;
        this.queue.enqueue(() =>
            new Promise((resolve, reject) => {
                request && request(resolve, reject);
            })
        );
        this._next();
        return this;
    }

    // addLazy(request) {
    //     this.queue.enqueue(() =>
    //         this._wait
    //             .then(request)
    //     );
    //     return this;
    // }
    //
    // exec() {
    //     this._next();
    // }

    _next() {

        if (this.runCount === this.queue.getLength() && !this.queue.isEmpty()) {
            let final = () => {
                this.runCount--;
                this._next();
            };
            let error = () => {
                this.runCount--;
                this._next();
            };
            this.queue.dequeue()().then(final, error);
        }

    }
}

module.exports = PromiseQueue;
