'use strict';

class TDCarousel {
    constructor(selector, option = {}) {
        const  {
            items = 4,
            nav = false,
            dots = false,
            loop = false,
            rewind = false,
            responsive = {},
            smartSpeed = 250,
            dotsSpeed = false,
        } = option;

        this.options = {
            items: items,
            nav: nav,
            dots: dots,
            loop: loop,
            rewind: rewind,
            responsive: responsive,
            smartSpeed: smartSpeed,
            dotsSpeed: dotsSpeed,
        };

        this.settings = {
            items: this.options.items,
            nav: this.options.nav,
            dots: this.options.dots,
            loop: this.options.loop,
            rewind: this.options.rewind,
            smartSpeed: this.options.smartSpeed,
            dotsSpeed: this.options.dotsSpeed,
        };

        this._items = [];
        this._clones = [];
        this._breakpoint = null;
        this._width = null;
        this._current = 0;
        this.navigation = {};
        this._dots = {
            items: [],
            positions: []
        };

        this.selector = document.querySelector(selector);
        let  __tmpElement = this.selector.querySelector('.td-carousel');
        this.cloneCarousel = __tmpElement.cloneNode(true);
        __tmpElement.remove();

        this.itemsCount = this.cloneCarousel.childElementCount;

        this.breakpoint();
        this.checkingConfig();

        this.init();
        window.addEventListener('resize', this.responsive.bind(this));
    }

    breakpoint() {
        const viewport = document.documentElement.clientWidth;
        let overwrites = this.options.responsive;
        let match = -1;

        if (overwrites) {
            for (let breakpoint in overwrites) {
                if (breakpoint <= viewport && breakpoint > match) {
                    match = Number(breakpoint);
                }
            }

            if (match !== -1) {
                if (match !== this._breakpoint) {
                    for (let key in this.settings) {
                        if (key in overwrites[match]) {
                            this.settings[key] = overwrites[match][key];
                        } else {
                            this.settings[key] = this.options[key];
                        }
                    }
                }
            } else {
                for (let key in this.settings) {
                    this.settings[key] = this.options[key];
                }
            }
        }

        this._breakpoint = match;
        this._width = this.selector.clientWidth /  this.settings.items;
    }

    init() {
        this.createCarousel();
        this.responsive();
    }

    checkingConfig() {
        let settings = this.settings;
        if (settings.rewind === true && settings.loop === true) {
            console.warn('The "rewind" parameter is a priority, so for loop to work, you must set the "rewind" parameter to "false"');
        }
    }

    isNumeric(number) {
        return !isNaN(parseFloat(number));
    }

    normalize(position, relative) {
        let n = this._items.length;
        let m = relative ? 0 : this._clones.length;

        if (!this.isNumeric(position) || n < 1) {
            position = undefined;
        } else if (position < 0 || position >= n + m) {
            position = ((position - m / 2) % n + n) % n + m / 2;
        }

        return position;
    }

    relative(position) {
        position -= this._clones.length / 2;
        return this.normalize(position, true);
    }

    current(position) {
        if (position === undefined) { return this._current; }

        if (this._items.length === 0) { return undefined; }

        position = this.normalize(position);

        if (this._current !== position) { this._current = position; }

        return this._current;
    }

    initItems() {
        let clones = [];
        let view = Math.max(this.settings.items * 2, 4);
        let size = Math.ceil(this._items.length / 2) * 2;
        let repeat = this.settings.loop && this._items.length ? this.settings.rewind ? view : Math.max(view, size) : 0;
        let append = [];
        let prepend = [];

        repeat /= 2;
        while (repeat > 0) {
            clones.push(this.normalize(clones.length / 2, true));
            let item = this._items[clones[clones.length - 1]].cloneNode(true);
            item.classList.add('cloned');
            append.push(item)

            clones.push(this.normalize(this._items.length - 1 - (clones.length - 1) / 2, true));
            item = this._items[clones[clones.length - 1]].cloneNode(true);
            item.classList.add('cloned');
            prepend.push(item);
            repeat -= 1;
        }

        this._clones = clones;
        prepend = prepend.reverse();
        this._stage.prepend(...prepend);
        this._stage.append(...append);
        this._current = this.minimum();
    }

    createCarousel() {
        let carousel = document.createElement('div');
        let carouselOuter = document.createElement('div');
        let carouselStage = document.createElement('div');

        carousel.classList.add('td-carousel');
        carouselOuter.classList.add('td-carousel-outer');
        carouselStage.classList.add('td-clearfix');

        this._stage = carouselStage;
        carouselOuter.append(carouselStage);
        carousel.append(carouselOuter);

        for (var i = 0; i < this.cloneCarousel.children.length; i++) {
            let g = this.cloneCarousel.children[i].cloneNode(true);
            g.style.width = `${this._width}px`;
            g.style.float = 'left';
            this._stage.append(g);
            this._items.push(g);
        }

        if (this.settings.loop === true) {
            this.initItems();
        }

        this._current = this.minimum();

        carouselStage.style.width = Math.ceil(this._stage.childNodes.length * this._width) + 'px';
        carouselStage.style.transition = 'all 0s ease 0s';
        carouselStage.style.transform = `translate3d(-${this._width * this._current}px, 0px , 0px)`;

        carousel.append(this.createNav());
        carousel.append(this.createDots());

        this.selector.append(carousel);
        this._stage.addEventListener('transitionend', (e) => {
            carouselStage.style.transition = 'all 0s ease 0s';
            this._stage.style.transform = `translate3d(-${this._width * this._current}px, 0px , 0px)`;
        });
    }

    createNav() {
        let nav = document.createElement('div');
        let navPrev = document.createElement('button');
        let navNext = document.createElement('button');

        nav.classList.add('td-carousel-nav');
        nav.classList.add('disabled');
        navPrev.classList.add('td-carousel-prev');
        navNext.classList.add('td-carousel-next');

        navPrev.innerText = '<';
        navNext.innerText = '>';

        navPrev.addEventListener('click', (e) => { this.prev(this.smartSpeed) });
        navNext.addEventListener('click', (e) => { this.next(this.smartSpeed) });

        nav.append(navPrev);
        this.navigation.previous = navPrev;
        nav.append(navNext);
        this.navigation.next = navNext;

        this.navigation.nav = nav;

        this.responsiveNav();

        return nav;
    }

    responsiveNav() {
        if (this.settings.nav === true) {
            if (this._items.length > this.settings.items) {
                this.navigation.nav.classList.remove('disabled');
                if (this.settings.rewind === false && this.settings.loop === false) {
                    this.navToggler();
                } else {
                    this.navigation.previous.classList.remove('disabled');
                    this.navigation.next.classList.remove('disabled');
                }
            } else {
                this.navigation.nav.classList.add('disabled');
            }
        } else {
            this.navigation.nav.classList.add('disabled');
        }
    }

    navToggler() {
        let min = this.minimum();
        let max = this.maximum();
        let prev = this.navigation.previous;
        let next = this.navigation.next;

        if (this._current > min && this._current < max) {
            prev.classList.remove('disabled');
            next.classList.remove('disabled');
        } else if (this._current === min) {
            prev.classList.add('disabled');
            next.classList.remove('disabled');
        } else if (this._current === max) {
            prev.classList.remove('disabled');
            next.classList.add('disabled');
        }
        else {
            prev.classList.add('disabled');
            next.classList.add('disabled');
        }
    }

    createDots() {
        let dots = document.createElement('div');
        dots.classList.add('td-carousel-dots');
        dots.classList.add('disabled');

        let count = Math.ceil(this._items.length / this.settings.items);
        for (let i = 0; i < count; i++) {
            let dot = document.createElement('button');
            dot.classList.add('td-carousel-dot');
            this._dots.items.push(dot);
            dots.append(dot);
        }

        this._dots.items[0].classList.add('active');
        this.positionsDots();

        dots.addEventListener('click', (e) => {
            if (e.target.classList.contains('td-carousel-dot')) {
                let to = 0;

                for (let i = 0; i < this._dots.items.length; i++) {
                    if (e.target === this._dots.items[i]) {
                        to = this._dots.positions[i];
                    }
                }

                this.to(to, this.settings.dotsSpeed);
            }
        });

        this.navigation.dots = dots;
        this.responsiveDots();

        return dots;
    }

    responsiveDots() {
        if (this.settings.dots === true) {
            let count = Math.ceil(this._items.length / this.settings.items);

            if (count > 1) {
                this.navigation.dots.classList.remove('disabled');
                if (this._dots.items.length === count) {
                    return;
                } else if (this._dots.items.length > count) {
                    while (this._dots.items.length > count) {
                        this._dots.items.pop();
                        this.navigation.dots.childNodes[this.navigation.dots.childNodes.length - 1].remove();
                    }
                } else if (this._dots.items.length < count) {
                    let dotTemplate = document.createElement('button');
                    dotTemplate.classList.add('td-carousel-dot');
                    while (this._dots.items.length < count) {
                        let dot = dotTemplate.cloneNode(true);
                        this._dots.items.push(dot);
                        this.navigation.dots.append(dot);
                    }
                }
                this.positionsDots();
                this.currentDots();
            } else {
                this.navigation.dots.classList.add('disabled');
            }
        } else {
            this.navigation.dots.classList.add('disabled');
        }
    }

    positionsDots() {
        let maxpos = this.maximum();
        let count = Math.ceil(this._items.length / this.settings.items);

        if (this.settings.rewind === true) {
            maxpos -= this.settings.items - 1;
        }

        this._dots.positions = [];
        for (let i = 0; i < count; i++) {
            let pos = i * this.settings.items + this.minimum();
            if (pos > maxpos) {
                pos = maxpos;
            }
            this._dots.positions.push(pos);
        }
    }

    currentDots() {
        let curr = 0;
        let current = this._current;
        for (var i = 0; i < this._dots.positions.length; i++) {
            if (current === this._dots.positions[i]) {
                curr = i;
            }
        }
        if (current === this._dots.positions[curr]) {
            for (var i = 0; i < this._dots.items.length; i++) {
                this._dots.items[i].classList.remove("active");
            }
            this._dots.items[curr].classList.add("active");
        }
    }

    maximum(relative) {
        let maximum = this._stage.childNodes.length;

        if (this.settings.loop === true) {
            maximum = this._clones.length / 2 + this._items.length - 1;
        } else {
            maximum = this._items.length - this.settings.items;
        }

        if (relative) {
            maximum -= this._clones.length / 2;
        }

        return Math.max(maximum, 0);
    }

    minimum (relative) {
        return relative ? 0 : this._clones.length / 2;
    }

    duration(from, to, factor) {
        if (factor === 0) {
            return 0;
        }

        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
    }

    to(pos, speed) {
        let position = this.relative(pos);
        let current = this.current();
        let revert = null;
        let distance = position - this.relative(current);
        let direction = (distance > 0) - (distance < 0);
        let items = this._items.length;
        let minimum = this.minimum();
        let maximum = this.maximum();

        if (this.settings.rewind === true) {
            if (pos < minimum) {
                pos = maximum - this.settings.items + 1;
            } else if (pos > maximum - this.settings.items + 1) {
                pos = minimum;
            } else {
                pos = pos;
            }
            position = pos;
        } else if (this.settings.loop === true) {
            if (Math.abs(distance) > items / 2) {
                distance += direction * -1 * items;
            }

            position = current + distance;
            revert = ((position - minimum) % items + items) % items + minimum;

            if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
                current = revert - distance;
                position = revert;
            }
        } else {
            if (pos < 0) { pos = 0; }
            if (pos > maximum) { pos = maximum; }
            position = pos;
        }

        this.current(position);
        this._stage.style.transform = `translate3d(-${this._width * pos}px, 0px , 0px)`;
        this._stage.style.transition = `all ${this.duration(current, position, speed) / 1000}s ease 0s`;
        this.currentDots();

        if (this.settings.rewind === false && this.settings.loop === false) {
            this.navToggler();
        }
    }

    prev(speed = false) {
        this.to(this._current - 1, speed);
    }

    next(speed = false) {
        this.to(this._current + 1, speed);
    }

    responsiveItems() {
        if (this._tmpItemsCount < this.settings.items) {
            let clones = this._stage.querySelectorAll('.cloned');
            for (var i = 0; i < clones.length; i++) {
                clones[i].remove();
            }
            this.initItems();
        }
        let items = this._stage.childNodes;
        for (var i = 0; i < items.length; i++) {
            items[i].style.width = `${this._width}px`;
        }
    }

    responsive() {
        let breakpoint = this._breakpoint;
        this._tmpItemsCount = this.settings.items;
        this.breakpoint();

        this.responsiveItems();

        this._stage.style.transform = 'translate3d(-' + (this._width * this._current) + 'px, 0px , 0px)';
        this._stage.style.width = Math.ceil(this._stage.childNodes.length * this._width) + 'px';

        if (this._breakpoint !== -1 && this._breakpoint !== breakpoint) {
            this.responsiveNav();
            this.responsiveDots();
        }
    }
}

export default function TDC(selector, option = {}) {
    return new TDCarousel(selector, option);
}
