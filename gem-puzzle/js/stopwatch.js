export class Stopwatch {
    timer;
    pausedTimeMin;
    pausedTimeSec;
    startStopwatch(min = 0, sec = 1) {
        const stopwatchHTML = document.querySelector("time");
        const interval = 1000;
        const secondsInMinute = 60;
        
        let minutes = min, seconds = sec;
    
        this.timer = setInterval(() => {
            stopwatchHTML.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
            seconds++;
            if (seconds === secondsInMinute) {
                seconds = 0;
                minutes++;
            }
            this.pausedTimeMin = minutes;
            this.pausedTimeSec = seconds;
        }, interval);
    }

    pauseStopwatch() {
        clearInterval(this.timer);
    }
}

// if minutes or seconds value less than 10 it needs additional zero to correct output
function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}