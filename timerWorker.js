// timerWorker.js
let timerId;
let startTime;
let duration;

self.onmessage = function(e) {
    if (e.data.command === 'start') {
        duration = e.data.duration * 1000; // 转换为毫秒
        startTime = Date.now();
        console.log('Worker started with duration:', duration);
        timerId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = duration - elapsed;
            console.log('Worker tick:', Math.ceil(remaining / 1000));
            if (remaining <= 0) {
                self.postMessage({type: 'complete'});
                clearInterval(timerId);
            } else {
                self.postMessage({type: 'tick', remaining: Math.ceil(remaining / 1000)});
            }
        }, 1000);
    } else if (e.data.command === 'stop') {
        clearInterval(timerId);
        console.log('Worker stopped');
    }
};