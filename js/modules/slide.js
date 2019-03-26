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
        event.preventDefault();
        this.wrapper.addEventListener('mousemove', this.onMove);
        this.position.startX = event.clientX;
    }
    onMove(event) {
        this.position.movement = event.clientX - this.position.startX;
        const tx = (this.position.origin + this.position.movement) * 1.5;
        this.slide.style.transform = `translate3d(${tx}px, 0px, 0px)`;
    }
    onEnd(event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.position.origin += event.clientX - this.position.startX;
        
        if(Math.abs(this.position.movement) > this.minMove) {
            this.changeSlideImage();
        } else {
            console.log("mesma imagem");
        }
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