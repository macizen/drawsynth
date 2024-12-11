class drawMode {
    constructor(){
        // this.opacity = "FF";
        this.drawColor = "#FF0000";
        this.weight = 5;
    }
    active(){
        stroke(this.drawColor); //+ this.opacity
        strokeWeight(this.weight);

        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    //i tried simplifying this into a "changeColor" variable but that did not work out
    colorRed() {
        this.drawColor = "#FF0000";
    }
    colorOrange(){
        this.drawColor = "#FF9900";
    }
    colorYellow() {
        this.drawColor = "#FFEE00";
    }
    colorGreen() {
        this.drawColor = "#10F000";
    }
    colorBlue() {
        this.drawColor = "#0F3BFF";
    }
    colorPurple() {
        this.drawColor = "#8800FF";
    }
    erase() {
        this.drawColor = "#FFFFFF";
    }
    // changeOpacity() {
    //     const opacityIn = document.getElementById("opacity").value;
    //     values corresponding to opacity of 100, 70, 50, 30, 10
    //     const opacityValues = ["FF", "B3", "80", "4D", "1A"];

    //     this.opacity = opacityValues[opacityIn - 1];
    // }

    changeWeight() {
      const weightIn = document.getElementById("weight").value;
      this.weight = weightIn;
    }
}

//these are called when pushing the draw and synth html buttons
function drawTrue() {
    drawState = true;
    document.getElementById("drawButton").style.backgroundColor = "#ffa1d6";
    document.getElementById("synthButton").style.backgroundColor = "#00fbff";
}
function synthTrue() {
    drawState = false;
    document.getElementById("synthButton").style.backgroundColor = "#96fdff";
    document.getElementById("drawButton").style.backgroundColor = "#ff57b6";
}
function resetCanvas() {
    background(255);
}