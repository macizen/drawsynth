//pentatonic scales to hook up to the colors
const cPent = ["C3", "D3", "E3", "G3", "A3"];
const ePent = ["E3", "F#3", "G#3", "B3", "C#4"];
const dPent = ["D4", "E4", "F#4", "A4", "B4"];
const gPent = ["G4", "A4", "B4", "D5", "E5"];
const fSharpPent = ["F#5", "G#5", "A#5", "C#5", "D#5"];
const bPent = ["B5", "C#5", "D#5", "F#5", "G#5"];

//was using these for the loop but didnt work
// const scales = [cPent, ePent, dPent, gPent, fSharpPent, bPent];
// const scaleColors = ["#FF0000", "#FF9900", "#FFEE00", "#10F000", "#0F3BFF", "#8800FF"];

let polyIn = "poly1";
let chord = [];  
let triad = [];

let lastSynthTime = 0;
let synthDelay = 50;

let noteLengthArray = ["+0.1", "+1", "+600"];
let noteLength = "+1";
let lengthIn;

//since p5 get() returns rgb, im using this to turn it into hex
function RGBtoHex(r, g, b) {
    return "#" + [r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("");
}

//change the color of the buttons to show when active
function changePoly(button) {
    polyIn = button.id;
    //FIRE TERNARY OPERATORS
    document.getElementById("poly1").style.backgroundColor = polyIn === "poly1" ? "#96fdff" : "#999999";
    document.getElementById("poly2").style.backgroundColor = polyIn === "poly2" ? "#96fdff" : "#999999";
    document.getElementById("poly3").style.backgroundColor = polyIn === "poly3" ? "#96fdff" : "#999999";
}
function changeLength(button) {
    lengthIn = button.id;
    document.getElementById("pluck").style.backgroundColor = lengthIn === "pluck" ? "#96fdff" : "#999999";
    document.getElementById("mid").style.backgroundColor = lengthIn === "mid" ? "#96fdff" : "#999999";
    document.getElementById("hold").style.backgroundColor = lengthIn === "hold" ? "#96fdff" : "#999999";
}

//i had to add a delay to the synth to save my cpu but i realized this could also be used to change the speed of the notes
function changeSpeed() {
    const speedIn = document.getElementById("speed").value;
    synthDelay = speedIn;
}

//stop sound
function killSwitch() {
    synth.releaseAll();
}

function colorsToSynth(hexColor) {
    //do nothing unless we in synth mode
    if (drawState) {  
        return null;
    }

    //clear previous notes
    let generatedChord = []; 

    //hooking up colors to scales
    //i could turn all the math stuff into its own function to make this less messy but thats for later
    if (hexColor === "#ff0000") {        // red
        generatedChord = [cPent[Math.floor(random(cPent.length))], cPent[Math.floor(random(cPent.length))], cPent[Math.floor(random(cPent.length))]];
    } else if (hexColor === "#ff9900") {        // orange
        generatedChord = [ePent[Math.floor(random(ePent.length))], ePent[Math.floor(random(ePent.length))], ePent[Math.floor(random(ePent.length))]];
    } else if (hexColor === "#ffee00") {        // yellow
        generatedChord = [dPent[Math.floor(random(dPent.length))], dPent[Math.floor(random(dPent.length))], dPent[Math.floor(random(dPent.length))]];
    } else if (hexColor === "#10f000") {        // green
        generatedChord = [gPent[Math.floor(random(gPent.length))], gPent[Math.floor(random(gPent.length))], gPent[Math.floor(random(gPent.length))]];
    } else if (hexColor === "#0f3bff") {        // blue
        generatedChord = [fSharpPent[Math.floor(random(fSharpPent.length))], fSharpPent[Math.floor(random(fSharpPent.length))], fSharpPent[Math.floor(random(fSharpPent.length))]];
    } else if (hexColor === "#8800ff") {        // purple
        generatedChord = [bPent[Math.floor(random(bPent.length))], bPent[Math.floor(random(bPent.length))], bPent[Math.floor(random(bPent.length))]];
    }

    //narrow down the notes into what the user has selected
    if (polyIn === "poly1") {
        chord = [generatedChord[0]];
    } else if (polyIn === "poly2") {
        chord = [generatedChord[0], generatedChord[1]];
    } else if (polyIn === "poly3") {
        chord = generatedChord;
    }

    //output generated chord
    return chord;
}

function synthActive(chord) {
    //changing the length of note using a variable in the second triggerRelease param
    if (lengthIn === "pluck") {
        noteLength = noteLengthArray[0];
    } else if (lengthIn === "mid") {
        noteLength = noteLengthArray[1];
    } else if (lengthIn === "hold") {
        noteLength = noteLengthArray[2];
    }

    //tonejs stuff that makes sound go
    synth.triggerAttack(chord);
    synth.triggerRelease(chord, noteLength);
}

//same stuff in here and mouse dragged because I want both actions to be used 

function mousePressed() {
    //get the color from under mouse
    let getColor = get(mouseX, mouseY);
    let hexColor = RGBtoHex(getColor[0], getColor[1], getColor[2]);

    //pass the hex color we got into our function that turns it into chord data
    let generatedChord = colorsToSynth(hexColor);

    //if statement so that it only creates sound when clicking on valid color (so not the white canvas)
    if (generatedChord) {
        //using time delay to fix performance issues and change speed of notes
        const timeNow = millis();
        if (timeNow - lastSynthTime >= synthDelay) {
            //pass the chord we made into a function with our important tonejs stuff
            synthActive(generatedChord);
            //reset the time delay
            lastSynthTime = timeNow;
        }
    }
}
//same as the previous function
function mouseDragged() {
    let getColor = get(mouseX, mouseY);
    let hexColor = RGBtoHex(getColor[0], getColor[1], getColor[2]);

    let generatedChord = colorsToSynth(hexColor);

    if (generatedChord) {
        const timeNow = millis();
        if (timeNow - lastSynthTime >= synthDelay) {
            synthActive(generatedChord);
            lastSynthTime = timeNow;
        }
    }
}
