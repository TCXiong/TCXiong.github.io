//$(document).ready(function(){

//Init ScrollMagic
var controller = new ScrollMagic.Controller();

$('.timeline-entry').each(function(){
    //build a scene
    var resumeScene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.6
    })
    resumeScene.setClassToggle(this, 'scroll-in')
    resumeScene.addTo(controller);
});

//remove double arrow
var doubleArrowScene = new ScrollMagic.Scene({
    triggerElement: '#resume-arrow',
    triggerHook: 0.48,
    reverse: false
})
.setClassToggle('#resume-arrow', 'fade-out')
.addTo(controller);

//fix download button
var downloadButtonScene = new ScrollMagic.Scene({
    triggerElement: '#download-btn',
    triggerHook: 1
})
.setClassToggle('#download-btn', 'scroll-in')
.addTo(controller);