//i commented out a lot of stuff that i decided not to use but might implement in the future
let paint;
let synth;
let drawState = true;

function setup() {
    createCanvas(displayWidth, displayHeight);
    background(255);
    //my class for the drawing functionality
    paint = new drawMode();

    synth = new Tone.PolySynth({maxPolyphony: 120}).toDestination();

    // document.getElementById("opacity").value = 1;
    // paint.changeOpacity();
    // document.getElementById("opacity").addEventListener("input", () => {
    //     paint.changeOpacity();
    // });

    //resets sliders to beginning when page refreshed
    document.getElementById("weight").value = 5; 
    document.getElementById("speed").value = 100;
    //event listeners to make the sliders do 
    document.getElementById("weight").addEventListener("input", () => {
        paint.changeWeight();
    });
    document.getElementById("speed").addEventListener("input", () => {
        changeSpeed();
    });
}

function draw() {
    if (mouseIsPressed && drawState) {
        paint.active();
    }
}