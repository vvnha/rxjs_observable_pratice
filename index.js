function Observable(subscribe) {
  this._subscribe = subscribe;
}

function Subscription(unsubscribe) {
  this.unsubscribe = unsubscribe;
}

Observable.prototype.subscribe = function (nextOrObserver, complete, error) {
  const observer = {
    next: nextOrObserver,
    complete: complete || (() => {}),
    error: error || (() => {}),
  };

  return this._subscribe(observer);
};

Observable.interval = function (miliseconds = 0) {
  //   console.log('interval', miliseconds);

  function subscribe(observer) {
    const intervalId = setInterval(() => {
      observer.next();
    }, miliseconds);

    return new Subscription(() => {
      clearInterval(intervalId);
    });
  }

  return new Observable(subscribe);
};

const observer = Observable.interval(1000);

const subs = observer.subscribe(
  () => {
    console.log('ok');
  },
  null,
  null
);
