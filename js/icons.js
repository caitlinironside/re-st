// ***************************************************************************************

// CLICK, DRAG AND MOUSE-OVER ICONS
// Caitlin Ironside
// 30 October 2017

// ****************************************************************************************

var canvas;
var canvasWidth;
var canvasHeight;

// mouse icon
var img10;
var hoverIcon;
var clickIcon;
var dragIcon;
var iconVisibility1 = 255;
var iconVisibility2 = 255;
var iconVisibility2 = 255;

function preload() {  
    img10 = loadImage("../images/icons/mouseWhite.png"); 
}

function setup () {
    canvasWidth = document.getElementById('icons').offsetWidth;
    canvasHeight = document.getElementById('icons').offsetHeight;
    canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('icons');
    
    // mouse icons  
    if (windowWidth < 1260) {
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
        clickIcon = new clickMouse(0,0,0,0,30);
        dragIcon = new dragMouse(0,0,0,0,30);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
        clickIcon = new clickMouse(0,0,0,0,30);
        dragIcon = new dragMouse(0,0,0,0,30);
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        hoverIcon = new hoverMouse(0,0,0,0,50,5);
        clickIcon = new clickMouse(0,0,0,0,50);
        dragIcon = new dragMouse(0,0,0,0,50);  
    } else if (windowWidth >= 2014) {
        hoverIcon = new hoverMouse(0,0,0,0,50,5);
        clickIcon = new clickMouse(0,0,0,0,50);
        dragIcon = new dragMouse(0,0,0,0,50);
    } 
    

}

function draw () {
    
    clear(); 

    // mouse icon 1
    push();
    if (windowWidth < 1260) {
        translate((width/40)+5,height/2 +25);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        translate((width/40) + 3,height/2 +20);
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        translate((width/40)+7,height/2 +20);
    } else if (windowWidth >= 2014) {
        translate((width/40)+2,height/2 +20);
    } 
    tint(255,iconVisibility1);
    hoverIcon.display();
    hoverIcon.move();
    pop(); 

    // mouse icon 2
    push();
    if (windowWidth < 1260) {
        translate((13/40 * width) +9,height/2 +25);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        translate((13/40 * width) +9,height/2 +22);
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        translate((13/40 * width) +15,height/2 +21);
    } else if (windowWidth >= 2014) {
        translate((13/40 * width) +30,height/2 +21);
    }    
    tint(255,iconVisibility2);
    clickIcon.display();
    clickIcon.move();
    pop();  

    // mouse icon 3
    push();
    if (windowWidth < 1260) {
        translate((23/40 * width)-10,(height/2)+55);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        translate((23/40 * width)+2,(height/2)+55);
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        translate((23/40 * width)+15,(height/2)+55);
    } else if (windowWidth >= 2014) {
        translate((23/40 * width) + 65,(height/2)+55);
    }    
    tint(255,iconVisibility2);
    dragIcon.display();
    dragIcon.move();
    pop();  
}

function windowResized() {
    canvasWidth = document.getElementById('icons').offsetWidth;
    canvasHeight = document.getElementById('icons').offsetHeight;
    resizeCanvas(canvasWidth,canvasHeight);    
}



