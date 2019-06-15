var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
var sections = document.querySelectorAll('section');

function RandomColors(){
    for(var i = 0; i < sections.length; i++){
        sections[i].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
}

RandomColors();

setInterval(RandomColors,2000);

var button = [];

for(var i = 1; i < document.querySelectorAll('button').length + 1; i++){
    button[i] = document.getElementById(i);
}

button[1].addEventListener('click', () => {
    window.location = 'gra.html';
});

button[2].addEventListener('click', () => {
    window.location = 'Portfolio/index.html';
});

button[3].addEventListener('click', () => {
    window.location = 'http://kevandzior.atthost24.pl';
});

button[4].addEventListener('click', () => {
    window.location = 'http://nlgtools.kevandzior.atthost24.pl';
});

button[5].addEventListener('click', () => {
    window.location = 'http://trojkat.kevandzior.atthost24.pl';
});

