export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.position = {
            origin: 0,
            clickStartX: 0,
            clickEndX: 0,
            movement: 0 
        }
    }
    get minMove() {
        return 100;
    }

    
    onStart(event) {
        if (event.type === 'mousedown') {
            event.preventDefault();
            this.position.startX = event.clientX;
            this.wrapper.addEventListener('mousemove', this.onMove);
        } else {
            this.position.startX = event.changedTouches[0].clientX;
            this.wrapper.addEventListener('touchmove', this.onMove);
        }
    }
    onMove(event) {
        const pointerPosition = (event.type == 'mousemove') ? 
            event.clientX : event.changedTouches[0].clientX;
        this.position.movement = pointerPosition - this.position.startX;
        
        const tx = (this.position.origin + this.position.movement) * 1.5;
        this.moveSlide(tx);
    }
    onEnd(event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);

        const origin = (event.type == 'mouseup') ? 
            event.clientX : event.changedTouches[0].clientX;
        this.position.origin += origin - this.position.startX;
        
        if(Math.abs(this.position.movement) > this.minMove) {
            //this.changeSlideImage();
        } else {
            console.log("mesma imagem");
        }
    }
    moveSlide(tx) {
        this.slide.style.transform = `translate3d(${tx}px, 0px, 0px)`;
    }
    /*changeSlideImage() {
        if (this.position.movement > 0) {
            console.log("move left");
        } else {
            console.log("move right");
        }
    }*/
    slideIndexNav(index) {
        this.index = {
            prev: (6 + index - 1)%6,
            active: index,
            next: (index + 1)%6
        }
        console.log(this.index);
    }
    changeSlide(index) {
        const activeSlide = this.slideArray[index];
        this.moveSlide(activeSlide.position);
        this.slideIndexNav(index);
        this.position.origin = 100 + activeSlide.position;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }

    // 'this' referencia o objeto slide inves do elemento HTML
    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    slidePosition(slide) {
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    slideConfig() {
        this.slideArray = [...this.slide.children].map(element => {
            
            const position = this.slidePosition(element);
            return {
                element,
                position
            }
        });
        console.log(this.slideArray);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this; // Permite encadeamento de metodos
    }
}