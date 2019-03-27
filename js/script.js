import Slide from './modules/slide.js';

const slide = new Slide('.slide', '.slide-wrapper');

console.log(slide);

slide.init();

slide.slideConfig();
slide.changeSlide(1);
