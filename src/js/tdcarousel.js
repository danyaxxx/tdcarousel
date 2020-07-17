'use strict';

class TDCarousel {
    constructor(selector, option = {}) {
        const  {
            items = 4,
            nav = false,
            dots = false,
            loop = false,
            responsive = {},
            smartSpeed = 250
        } = option;

        this.options = {
            items: items,
            nav: nav,
            dots: dots,
            loop: loop,
            responsiveBaseElement: window,
            responsive: responsive,
            smartSpeed: smartSpeed,
        };

        this.settings = {
            items: this.options.items,
            nav: this.options.nav,
            dots: this.options.dots,
            loop: this.options.loop,
            smartSpeed: this.options.smartSpeed,
        };

        this._items = [];
        // Current breakpoint
        this._breakpoint = null;
        // Items width
        this._width = null;

        this._current = 0;

        this.navigation = {};
        this._dots = [];

        this.selector = document.querySelector(selector);
        let  __tmpElement = this.selector.querySelector('.td-carousel');
        this.cloneCarousel = __tmpElement.cloneNode(true);
        __tmpElement.remove();

        this.itemsCount = this.cloneCarousel.childElementCount;

        this.breakpoint();

        this.init();
    }

    init() {
        this.createCarousel();
        this.responsive();
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

    /*
    * Calculates the speed for a translation.
    * @param {Number} from - The position of the start item.
    * @param {Number} to - The position of the target item.
    * @param {Number} [factor=undefined] - The time factor in milliseconds.
    * @returns {Number} - The time in milliseconds for the translation.
    */
    duration(from, to, factor) {
        if (factor === 0) {
            return 0;
        }

        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
    }

    createCarousel() {
        let carousel = document.createElement('div');
        let carouselOuter = document.createElement('div');
        let carouselStage = document.createElement('div');

        carousel.classList.add('td-carousel');
        carouselOuter.classList.add('td-carousel-outer');
        carouselStage.classList.add('td-clearfix');

        carouselStage.style.width = this.itemsCount * this._width + 'px';
        carouselStage.style.transition = 'all 0s ease 0s';
        carouselStage.style.transform = 'translate3d(-' + (this._width * 0) + 'px, 0px , 0px)';

        this._stage = carouselStage;
        carouselOuter.append(carouselStage);
        carousel.append(carouselOuter);

        for (var i = 0; i < this.cloneCarousel.children.length; i++) {
            let g = this.cloneCarousel.children[i].cloneNode(true);
            g.style.width = `${this._width}px`;
            g.style.float = 'left';
            carouselStage.append(g);
            this._items.push(g);
        }

        carousel.append(this.createNav());
        carousel.append(this.createDots());

        this.selector.append(carousel);
    }

    createNav () {
        let nav = document.createElement('div');
        let navPrev = document.createElement('button');
        let navNext = document.createElement('button');

        nav.classList.add('td-carousel-nav');
        navPrev.classList.add('td-carousel-prev');
        navNext.classList.add('td-carousel-next');

        navPrev.innerText = '<';
        navNext.innerText = '>';

        navPrev.addEventListener('click', (e) => { this.prev(0.25, 1) });
        navNext.addEventListener('click', (e) => { this.next(0.25, 1) });

        nav.append(navPrev);
        this.navigation.previous = navPrev;
        nav.append(navNext);
        this.navigation.next = navNext;

        this.navigation.nav = nav;

        this.responsiveNav();
        if (this.settings.loop === false) {
            this.navToggler();
        }

        return nav;
    }

    createDots() {
        let dots = document.createElement('div');
        dots.classList.add('td-carousel-dots');

        let count = Math.ceil(this._items.length / this.settings.items);

        for (let i = 0; i < count; i++) {
            let dot = document.createElement('button');
            dot.classList.add('td-carousel-dot');
            this._dots.push(dot);
            dots.append(dot);
        }

        this._dots[0].classList.add('active');

        dots.addEventListener('click', (e) => {
            if (e.target.classList.contains('td-carousel-dot')) {
                let to = 0;
                for (var i = 0; i < this._dots.length; i++) {
                    this._dots[i].classList.remove("active");
                    if (e.target === this._dots[i]) {
                        this._dots[i].classList.add("active");
                        to = i * this.settings.items;
                        let maxpos = this._items.length - this.settings.items;
                        if (to > maxpos) {
                            to = maxpos;
                        }
                    }
                }
                this._stage.style.transition = 'all ' + (this.duration(this._current, to) / 1000) + 's ease 0s';
                this._stage.style.transform = 'translate3d(-' + (this._width * to) + 'px, 0px , 0px)';
                this._current = to;

                if (this.settings.loop === false) {
                    this.navToggler();
                }

            }
        });

        this.navigation.dots = dots;

        this.responsiveDots();

        return dots;
    }

    navToggler() {
        if (this._current > 0 && this._current < (this._items.length - this.settings.items)) {
            this.navigation.previous.classList.remove('disabled');
            this.navigation.next.classList.remove('disabled');
        } else if (this._current === 0) {
            this.navigation.previous.classList.add('disabled');
            this.navigation.next.classList.remove('disabled');
        } else if (this._current === this._items.length - this.settings.items) {
            this.navigation.previous.classList.remove('disabled');
            this.navigation.next.classList.add('disabled');
        } else {
            this.navigation.previous.classList.add('disabled');
            this.navigation.next.classList.add('disabled');
        }
    }

    responsiveNav() {
        if (this.settings.nav === true) {
            if (this._items.length > this.settings.items) {
                this.navigation.nav.classList.remove("disabled");
            } else if (this.settings.loop === true) {
                this.navigation.nav.classList.remove("disabled");
            } else {
                this.navigation.nav.classList.add("disabled");
            }
            this.navToggler();
        } else {
            this.navigation.nav.classList.add("disabled");
        }
    }
    responsiveDots() {
        if (this.settings.dots === true) {
            let count = Math.ceil(this._items.length / this.settings.items);

            if (count > 1) {
                this.navigation.dots.classList.remove('disabled');
                if (this._dots.length === count) {
                    return;
                } else if (this._dots.length > count) {
                    while (this._dots.length > count) {
                        this._dots.pop();
                        this.navigation.dots.childNodes[this.navigation.dots.childNodes.length - 1].remove();
                    }
                } else if (this._dots.length < count) {
                    let dot = document.createElement('button');
                    dot.classList.add('td-carousel-dot');
                    this._dots.push(dot);
                    this.navigation.dots.append(dot);
                }
            } else {
                this.navigation.dots.classList.add('disabled');
            }
        } else {
            this.navigation.dots.classList.add('disabled');
        }
    }

    prev(speed = 0, step = 1) {
        this._stage.style.transition = 'all ' + speed + 's ease 0s';
        if (this._current > 0) {
            this._current -= step;
            if (this.settings.loop === false) {
                this.navToggler();
            }
        } else {
            if (this.settings.loop === true) {
                this._current = this._stage.children.length - this.settings.items;
            }
        }
        this._stage.style.transform = 'translate3d(-' + (this._width * this._current) + 'px, 0px , 0px)';
    }

    next(speed = 0, step = 1) {
        if (this._current < this._stage.children.length - this.settings.items) {
            this._stage.style.transition = 'all ' + speed + 's ease 0s';
            this._current += step;
            if (this.settings.loop === false) {
                this.navToggler();
            }
        } else {
            if (this.settings.loop === true) {
                this._current = 0;
            }
        }
        this._stage.style.transform = 'translate3d(-' + (this._width * this._current) + 'px, 0px , 0px)';
    }

    responsive() {
        let breakpoint = this._breakpoint;
        this.breakpoint();

        this._current = 0;
        this._stage.style.transform = 'translate3d(-' + (this._width * this._current) + 'px, 0px , 0px)';

        this._stage.style.width = this.itemsCount * this._width + 'px';
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].style.width = `${this._width}px`;
        }

        if (this._breakpoint !== -1 && this._breakpoint !== breakpoint) {
            this.responsiveNav();
            this.responsiveDots();
        }
    }
}


export default function TDC(selector, option = {}) {
    return new TDCarousel(selector, option);
}
