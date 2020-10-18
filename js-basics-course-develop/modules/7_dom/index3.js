// add image 1) https://i.pinimg.com/originals/c0/b7/7f/c0b77faeb2cb3e67fd1b423c4535f6c3.jpg
//           2)  file:///C:/Users/Dmitrii_Zolotukhin/Desktop/модуль5/0.jpg
const slider = {
    slides:[],
    frame: 0,
    set: function(image) {
        const src = document.getElementById("scr");
        src.style.backgroundImage = `url(${image})`
        src.name = image;
    },
    init: function() {
        this.set(this.slides[this.frame]);
    },
    left: function() {
        this.frame--;
        if(this.frame < 0) this.frame = this.slides.length - 1;
        this.set(this.slides[this.frame]);
    },
    right: function() {
        this.frame++;
        if(this.frame >= this.slides.length) this.frame = 0;
        this.set(this.slides[this.frame]);
    }
};
let timeout = 3000;
let interval;
window.onload = function() {
    slider.init();
    timeout = document.getElementById('timer').value * 1000;
    interval = setInterval(function() {
        slider.right();
    },timeout);
};
function add() {
    slider.slides.push(document.getElementById('url').value);
    slider.set(slider.slides[slider.slides.length - 1]);
    document.getElementById('url').value = ''
}
function del(el) {
    if(confirm("Are sure you want to remove the image?")) {
        const pos = slider.slides.indexOf(el.name);
        slider.slides.splice(pos, 1);
    }
    slider.right();
}
function changeInterval() {
    clearInterval(interval);
    timeout = document.getElementById('timer').value * 1000;
    interval = setInterval(function() {
        slider.right();
    },timeout);
}
