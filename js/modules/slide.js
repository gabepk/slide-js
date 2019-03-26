export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.position = {
            startX: 0,
            endX: 0,
            movement: 0 
        }
    }
    get minMove() {
        return 100;
    }

    
    onStart(event) {
        event.preventDefault();
        this.wrapper.addEventListener('mousemove', this.onMove);
        this.position.startX = event.clientX;
    }
    onMove(event) {
        this.position.movement = event.clientX - this.position.startX;
        this.slide.style.transform = `translate3d(${this.position.movement}px, 0px, 0px)`;
        console.log(this.position.movement);

        
        this.position.movement = this.position.endX - this.position.movement;
    }
    onEnd(event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.position.endX = event.clientX;
        
        /*this.position.movement = this.position.endX - this.position.startX;
        if(Math.abs(this.position.movement) > this.minMove) {
            this.changeSlideImage();
        }*/
    }
    changeSlideImage() {
        if (this.position.movement > 0) {
            console.log("move left");
        } else {
            console.log("move right");
        }
    }

    /**
     * Adiciona cada evento no Slide
     */
    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
    }

    /**
     * Faz o 'this' dentro dos eventos referenciar o objeto slide
     * inves do elemento HTML
     */
    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this; // Permite encadeamento de metodos
    }
}