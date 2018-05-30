/*
 * PullToLoadMore - https://github.com/yhb241/pull-to-load-more
 * A simple JavaScript plugin to load more data as you pull up the page.
 * By Harbor Young
 * Email: yhb241@gmail.com
 */

const supportTouch = 'ontouchstart' in document;

const getBodyScrollTop = () => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};

const generateEventHandlers = function () {
  let lastTime = 0;
  let lastPageY = 0;

  const touchStartHandler = (e) => {
    lastPageY = supportTouch ? e.changedTouches[0].pageY : e.pageY;
    lastTime = new Date().getTime();
  };
  const touchMoveHandler = (e) => {
    if (getBodyScrollTop() + window.innerHeight <= this.loadMore.offsetTop) {
      lastPageY = supportTouch ? e.changedTouches[0].pageY : e.pageY;
      lastTime = new Date().getTime();
    }
  };
  const touchEndHandler = (e) => {
    const time = new Date().getTime();
    const pageY = supportTouch ? e.changedTouches[0].pageY : e.pageY;

    if (pageY >= lastPageY) {
      return;
    }
    if (time - lastTime < 80) {
      return;
    }
    if (this.paused || this.locked || this.loadMore.offsetTop < window.innerHeight) {
      return;
    }
    if (getBodyScrollTop() + window.innerHeight > this.loadMore.offsetTop) {
      this.load();
    }
  };
  const clickHandler = () => {
    this.load();
  };

  return {
    addEvents: function () {
      if (supportTouch) {
        document.addEventListener('touchstart', touchStartHandler, false);
        document.addEventListener('touchmove', touchMoveHandler, false);
        document.addEventListener('touchend', touchEndHandler, false);
      } else {
        document.addEventListener('mousedown', touchStartHandler, false);
        document.addEventListener('mousemove', touchMoveHandler, false);
        document.addEventListener('mouseup', touchEndHandler, false);
      }
      if (this.loadMore && this.loadMore.addEventListener) {
        this.loadMore.addEventListener('click', clickHandler, false);
      }
    },
    removeEvents: function () {
      if (supportTouch) {
        document.removeEventListener('touchstart', touchStartHandler, false);
        document.removeEventListener('touchmove', touchMoveHandler, false);
        document.removeEventListener('touchend', touchEndHandler, false);
      } else {
        document.removeEventListener('mousedown', touchStartHandler, false);
        document.removeEventListener('mousemove', touchMoveHandler, false);
        document.removeEventListener('mouseup', touchEndHandler, false);
      }
      if (this.loadMore && this.loadMore.removeEventListener) {
        this.loadMore.removeEventListener('click', clickHandler, false);
      }
    }
  };
};

export default function PullToLoadMore (opts) {
  if (!(this instanceof PullToLoadMore)) {
    return;
  }
  this.onLoadMore = null;
  this.initialized = false;
  return this;
}
PullToLoadMore.prototype = {
  init (opts) {
    this.locked = false;
    this.paused = false;
    this.configure(opts);
    this.loadMore = this.loadMore || document.querySelector('#loadMore');
    this.eventHandlers = generateEventHandlers.call(this);
    this.addEvents = this.eventHandlers.addEvents;
    this.removeEvents = this.eventHandlers.removeEvents;
    if (this.initialized === false) {
      this.initialized = true;
      this.addEvents();
    }
    return this;
  },
  configure (opts) {
    if (opts instanceof Object) {
      for (const pro in opts) {
        this[pro] = opts[pro];
      }
    }
  },
  load () {
    if (this.locked) {
      return;
    }
    if (typeof this.onLoadMore === 'function') {
      this.locked = true;
      const res = this.onLoadMore();
      if (res instanceof Promise) {
        res.then(() => {
          this.locked = false;
        }).catch(() => {
          this.locked = false;
        });
      } else {
        setTimeout(() => {
          this.locked = false;
        }, 500);
      }
    }
  },
  pause () {
    this.paused = true;
  },
  resume () {
    this.paused = false;
  }
};
PullToLoadMore.prototype.constructor = PullToLoadMore;
