export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
    }

    
    onStart(event) {
        event.preventDefault();
        this.wrapper.addEventListener('mousemove', this.onMove);
    }
    onMove(event) {
        console.log("moveu");
    }
    onEnd(event) {
        this.wrapper.removeEventListener('mousemove', this.onMove);
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



/* Logica do slide com evento de mouse
1) clica e segura na image () e depois move (move)
    1) move pra direita (antigo < novo): 
        1) x = decrementa translate3d[0]
        2) x > y (valor minimo) ? decrementa o tamanho da img
    2) move pra esquerda (antigo > novo): incrmenta
        1) x = incrmenta translate3d[0]
        2) x > y (valor minimo) ? incrmenta o tamanho da img
*/