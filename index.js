function Observable(waitForInterval) {
  this.subscribe = waitForInterval;
}

function Subscription(unsubscribeFn) {
  this.unsubscribe = unsubscribeFn;
}

Observable.interval = function (miliseconds = 0) {
  //   console.log('interval', miliseconds);

  function waitForInterval() {
    const intervalId = setInterval(() => {
      console.log('interval', miliseconds);
    }, miliseconds);

    return new Subscription(() => {
      clearInterval(intervalId);
    });
  }

  return new Observable(waitForInterval);
};

const observer = Observable.interval(1000);

const subs = observer.subscribe();
