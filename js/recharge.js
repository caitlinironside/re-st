// JavaScript Document
// ***************************************************************************************

// 'RECHARGE' SKETCH
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Monica Monin's 'Bounce' Processing sketch
// Version 1, Viewed 1 Oct 2017.
// Programmed with assistance from Thomas Ricciardello and Timothy Busuttil.

// ***************************************************************************************

// mouse icon
var img10;
var clickIcon;
var visibility = 255;

// size & position of container
var containerWidth;
var containerHeight;
var containerLeft;
var containerTop;
var textLeft;

// bouncing ball
var xpos, ypos; 
var xvel, yvel;
var gravity; 
var bounceHigher;
var size;

//appearance of ball
var thickness = 1;
var maxThickness;
var minThickness;

// photo frames
var mouseOverDoorOne = false;
var mouseOverDoorTwo = false;
var mouseOverDoorThree = false;

// location and size of frames
var doorX;
var doorY;
var doorTwoX;
var doorTwoY;
var doorThreeX;
var doorThreeY;
var doorSizeX;
var doorSizeY;

// colour arrays
var doorOneCols = [];
var doorTwoCols = [];
var doorThreeCols = [];

// parent array
var vacationCols = [];
var i;
                                                   
function preload () {
    img1 = loadImage("../images/recharge/vacation1.png");
    img2 = loadImage("../images/recharge/vacation2.png");
    img3 = loadImage("../images/recharge/vacation3.png");
    img6 = loadImage("../images/recharge/emptyframe.png");
    
    // mouse icon
    img10 = loadImage("../images/icons/mouseWhite.png");
}

function setup() { 
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    
    // container dimensions & position
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
    textLeft = document.getElementById('body-text').offsetLeft;
    
    background(237,228,223); 
    
    // mouse icon
    if (windowWidth < 1260) {
            clickIcon = new clickMouse(0,0,0,0,30);
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            clickIcon = new clickMouse(0,0,0,0,30); 
        } else if (windowWidth >= 1500 && windowWidth < 2014) {
            clickIcon = new clickMouse(0,0,0,0,50);
        } else if (windowWidth >= 2014) {
            clickIcon = new clickMouse(0,0,0,0,50);    
        }
    
    // bouncing ball
	xpos = 100;
	ypos = 100;
	xvel = 1.5;
	yvel = 0;
	gravity = 0.5;
	bounceHigher = false;
     
    // frame sizes & positions, ball size
    if (windowWidth < 1260) {
    doorSizeX = 128;
    doorSizeY = 151; 
    doorX = containerLeft + ((textLeft + 200 - containerLeft - doorSizeX)/2);
    doorTwoX = containerLeft + ((textLeft + 300 - containerLeft - doorSizeX)/2); 
    doorThreeX = containerLeft + ((textLeft + 120 - containerLeft - doorSizeX)/2);
        size = 30;
        maxThickness = 4;
        minThickness = 1;
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            doorSizeX = 170;
            doorSizeY = 201; 
            doorX = containerLeft + ((textLeft + 240 - containerLeft - doorSizeX)/2);
            doorTwoX = containerLeft + ((textLeft + 385 - containerLeft - doorSizeX)/2); 
            doorThreeX = containerLeft + ((textLeft + 130 - containerLeft - doorSizeX)/2);
            size = 30;
            maxThickness = 4;
            minThickness = 1;
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
                doorSizeX = 213;
                doorSizeY = 251;
                doorX = containerLeft + ((textLeft + 280 - containerLeft - doorSizeX)/2);
                doorTwoX = containerLeft + ((textLeft + 440 - containerLeft - doorSizeX)/2); 
                doorThreeX = containerLeft + ((textLeft + 110 - containerLeft - doorSizeX)/2);
                size = 50;
                maxThickness = 6;
                minThickness = 2;
                } else if (windowWidth >= 2014) {
                doorSizeX = 235;
                doorSizeY = 276;
                    doorX = containerLeft + ((textLeft + 200 - containerLeft - doorSizeX)/2); 
                    doorTwoX = containerLeft + ((textLeft + 440 - containerLeft - doorSizeX)/2); 
                    doorThreeX = containerLeft + ((textLeft + 75 - containerLeft - doorSizeX)/2);
                    size = 50;
                maxThickness = 6;
                minThickness = 2;
                }   
    
    // frame positions
    //doorX = 5/20 * width+10;
    doorY = height/4 -20;
    //doorTwoX = 6/20 * width+10;
    doorTwoY = height/2;
    //doorThreeX = 4/20 * width +25;
    doorThreeY = 3/4 * height +18;
     
    // fill arrays
    doorOneCols[0] = color(144,177,160);
    doorOneCols[1] = color(146,192,242); 
    doorOneCols[2] = color(247,208,91);  
    
    doorTwoCols[0] = color(220,156,170);
    doorTwoCols[1] = color(194,86,99); 
    doorTwoCols[2] = color(139,170,216);       

    doorThreeCols[0] = color(251,239,151);
    doorThreeCols[1] = color(146,192,242); 
    doorThreeCols[2] = color(250,187,172);   

}

function draw() {
    background(237,228,223,100); 
    
    // fill parent array
    vacationCols[0] = random(doorOneCols);
    vacationCols[1] = random(doorTwoCols);
    vacationCols[2] = random(doorThreeCols);    

    // define when mouse is over frame
    if(mouseX > doorX - (doorSizeX / 2) && mouseX < doorX + (doorSizeX / 2) && mouseY > doorY - (doorSizeY / 2) && mouseY < doorY + (doorSizeY / 2)) {
        mouseOverDoorOne = true;
        }  else {
            mouseOverDoorOne = false;
            } 

    if(mouseX > doorTwoX - (doorSizeX / 2) && mouseX < doorTwoX + (doorSizeX / 2) && mouseY > doorTwoY - (doorSizeY / 2) && mouseY < doorTwoY + (doorSizeY / 2)) {
        mouseOverDoorTwo = true;
        }  else {
            mouseOverDoorTwo = false;
            }  

    if(mouseX > doorThreeX - (doorSizeX / 2) && mouseX < doorThreeX + (doorSizeX / 2) && mouseY > doorThreeY - (doorSizeY / 2) && mouseY < doorThreeY + (doorSizeY / 2)) {
        mouseOverDoorThree = true;
        }  else {
            mouseOverDoorThree = false;
        } 

    // draw images
    imageMode(CENTER);
    console.log(mouseX,mouseY);
     
    // add velocity to ball location
    xpos += xvel;
    ypos += yvel;

    // add gravity to ball velocity
    yvel += gravity;

    // bounce off edges
    if ((xpos > width-size/2) || (xpos < size/2)) {
        xvel = xvel * -1;
    }
    
    // colour of ball
    var boringCol = color(200,200,200);

	// check to increase bounce
    if (mouseIsPressed && mouseOverDoorOne) {
        i = 0; 
        image(img1,doorX,doorY,(0.65*doorSizeX),(0.65*doorSizeY));
        } 
    
    if (mouseIsPressed && mouseOverDoorTwo) {
        i = 1;
        image(img2,doorTwoX,doorTwoY,(0.65*doorSizeX),(0.65*doorSizeY));
        } 
    
    if (mouseIsPressed && mouseOverDoorThree) {
        i = 2;
        image(img3,doorThreeX,doorThreeY,(0.65*doorSizeX),(0.65*doorSizeY));
        } 
        
    // check to change ball appearance
	if ((mouseIsPressed && mouseOverDoorOne) || (mouseIsPressed && mouseOverDoorTwo) || (mouseIsPressed && mouseOverDoorThree)) {
		stroke(vacationCols[i]);
        bounceHigher = true;
        thickness = lerp(thickness,maxThickness,0.005);
        } else {
            stroke(boringCol);
            bounceHigher = false;
            thickness = lerp(thickness,minThickness,0.005);
        }
    
    // amount of bounce (constrained to stay within this screen size, never < -28)
    if (ypos > height-size/2) {
		if (bounceHigher && windowWidth < 1260) {
			yvel = constrain(yvel * -1.2, -26, 100);
            } else if (bounceHigher && windowWidth >= 1260 && windowWidth < 1500) {
                yvel = constrain(yvel * -1.2, -27.5, 100);
                    } else if (bounceHigher && windowWidth >= 1500 && windowWidth < 2014) {
                        yvel = constrain(yvel * -1.2, -35, 100);
                            } else if (bounceHigher && windowWidth >= 2014) {
                                yvel = constrain(yvel * -1.2, -36, 100);          
            } else {
                yvel = yvel * -0.8;
		}
        ypos = height-size/2;
    }

    //draw frames
    image(img6,doorX,doorY,doorSizeX,doorSizeY);
    image(img6,doorTwoX,doorTwoY,doorSizeX,doorSizeY);
    image(img6,doorThreeX,doorThreeY,doorSizeX,doorSizeY);
    
    // draw circle
    strokeWeight(thickness);
    noFill();
    ellipse(xpos, ypos, size, size);
    
    // mouse icon
    push();
    translate(doorX,doorY);
    tint(255,visibility);
    clickIcon.display();
    clickIcon.move();
    pop();
    setTimeout(turnOff,4000); 
}

// mouse icon
function turnOff() {
    visibility = lerp(visibility,-10,0.1); 
    clickIcon.strokeWeight = 0;
}

function windowResized() {   
    resizeCanvas(windowWidth,windowHeight);
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
    textLeft = document.getElementById('body-text').offsetLeft;
    //setEyePosition();
                }