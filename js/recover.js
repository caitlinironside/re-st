// JavaScript Document
// ***************************************************************************************

// 'RECOVER' SKETCH
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Ira Greenberg's 'Soft Body' p5.js example
// https://p5js.org/examples/simulate-soft-body.html
// Version 1, Viewed 1 Oct 2017.

// Programmed with assistance from Thomas Ricciardello and Timothy Busuttil.

// ***************************************************************************************

// mouse icon
var img10;
var iconVisibility = 255;

// shape movement
var xoff = 0.0;
var xIncrement = 0.01;
var yoff = 60.0;
var yIncrement = 0.01;

// trigger
var mouseOverDial;
var dialX;
var dialY;
var dialSize = 50;

// size
var minRadius;
var maxRadius;

// colour
var minRed = 85;
var maxRed = 240;
var minGreen = 78;
var maxGreen = 217;
var minBlue = 81;
var maxBlue = 227;
var r = 240;
var g = 217;
var b = 227;

// jittering
var maxShakeA = 20;
var minShakeA = -20;
var maxShakeB = 20;
var minShakeB = -20;
var shakeA;
var shakeB;

// softness
var soft = 1;
var minSoft = 0;
var maxSoft = 0.5;

// curve tightness
var minDeltaX = 0;
var maxDeltaX = 125;
var minDeltaY = 0;
var maxDeltaY = 125;

// center point, physics
var centerX = 0.0, centerY = 0.0;
var anchorX = 0.0, anchorY = 0.0;
var radius = 200, rotAngle = -90;
var accelX = 0.0, accelY = 0.0;
var deltaX = 125, deltaY = 125;
var springing = 0.0009, damping = 0.98;

// corner nodes
var nodes = 6;

// arrays
var nodeStartX = [];
var nodeStartY = [];
var nodeX = [];
var nodeY = [];
var angle = [];
var frequency = [];

// soft-body dynamics
var organicConstant = 1.0;

// image array
var img;
var visibility = 255;
var pics = [];
var envelopes = [];

function preload() {
    img = loadImage("../images/recover/envelope.png");
    pics.push(img);
    
    // mouse icon
    img10 = loadImage("../images/icons/mouseWhite.png");
}

function setup() {
    background(237,228,223); 
    
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    
    // shape home position
    anchorX = width/5;
    anchorY = height/2;

    //initialize arrays to 0
    for (var i=0; i<nodes; i++){
        nodeStartX[i] = 0;
        nodeStartY[i] = 0;
        nodeY[i] = 0;
        nodeX[i] = 0;
        angle[i] = 0;
    }

    // initalize frequencies for corner nodes
    for (var i=0; i<nodes; i++){
        frequency[i] = random(5, 12);
    }

	moveShape();

    // styling
    noStroke();
    frameRate(30);
    
    for (var i = 0; i < 40; i++) {
	  envelopes.push(new Envelope(pics[0]));
   }
    
    
    // media query: if statement
     if (windowWidth < 1260) {
        minRadius = 30;
        maxRadius = 200;      
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            minRadius = 30;
            maxRadius = 200;     
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
            minRadius = 45;
            maxRadius = 270;            
                } else if (windowWidth >= 2014) {
                minRadius = 45;
                maxRadius = 270;  
                } 
    

}

function draw() {

    background(237,228,223,150);
     
    // defining trigger point
    var distance = dist(centerX, centerY, mouseX, mouseY);

    if (distance < (6/5 * radius)) {
        mouseOverDial = true;
            } else {
                mouseOverDial = false;
            }

    // transformations based on trigger
    if(mouseOverDial) {
        
        // increase softness
        soft = lerp(soft,maxSoft,0.03);
        
        // decrease range of random shaking
        maxShakeA = lerp(maxShakeA,0, 0.03);
        minShakeA = lerp(minShakeA,0, 0.03);
        maxShakeB = lerp(maxShakeB,0, 0.03);
        minShakeB = lerp(minShakeB,0, 0.03);
        
        // increase size
        radius = lerp(radius,maxRadius,0.03);
        
        // change colour
        r = lerp(r,maxRed,0.03);
        g = lerp(g,maxGreen,0.03);
        b = lerp(b,maxBlue,0.03);
        
        // hide images
        visibility = lerp(visibility,-10,0.1);
        
        } else if (!mouseOverDial) {
            
            // decrease softness
            soft = lerp(soft,minSoft,0.03);
            
            // increase range of random shaking
            maxShakeA = lerp(maxShakeA,20, 0.03);
            minShakeA = lerp(minShakeA,-20, 0.03);
            maxShakeB = lerp(maxShakeB,20, 0.03);
            minShakeB = lerp(minShakeB,-20, 0.03);
            
            // decrease size
            radius = lerp(radius,minRadius,0.03);
           
            // change colour
            r = lerp(r,minRed,0.01);
            g = lerp(g,minGreen,0.01);
            b = lerp(b,minBlue,0.01);
            
            // add noise to anchor point
            anchorX = noise(xoff)*(2/3*width);
            anchorY = noise(yoff)*height;
            
            // move incrementally 
            xoff += xIncrement;
            yoff += yIncrement;
            
            // show images
            setTimeout(showImages,1000);        
        }
    
    // draw images
    tint(255,visibility);
    
    // draw shape
    shakeA = random(maxShakeA,minShakeA);
    shakeB = random(maxShakeB,minShakeB);
    drawShape();
    moveShape(soft,shakeA,shakeB);
    } 

// shape constructor functions
function drawShape() {
    
	//  calculate node starting locations
	for (var i=0; i<nodes; i++){
		nodeStartX[i] = centerX+cos(radians(rotAngle))*radius;
		nodeStartY[i] = centerY+sin(radians(rotAngle))*radius;
		rotAngle += 360.0/nodes;
	}

	// draw polygon
	curveTightness(organicConstant);
	fill(r,g,b);

	beginShape();
	for (var i=0; i<nodes; i++){
		curveVertex(nodeX[i], nodeY[i]);
	}
	for (var i=0; i<nodes; i++){
		curveVertex(nodeX[i], nodeY[i]);
	}
	endShape(CLOSE);
    
    for (var i = 0; i < envelopes.length; i++) {
       envelopes[i].move(); 
       envelopes[i].bounce();    
       envelopes[i].display();
   }
    
}

function moveShape(softness,shakeX,shakeY) {

    fill(255,0,0);

    centerX = anchorX + shakeX;
    centerY = anchorY + shakeY;
    
    deltaX = 25;
    deltaY = 25;

    // create springing effect
    deltaX *= springing;
    deltaY *= springing;
    accelX += deltaX;
    accelY += deltaY;

    // slow down springing
    accelX *= damping;
    accelY *= damping;

    // change curve tightness
    organicConstant = 1-((abs(accelX)+abs(accelY))*softness);

    //move nodes
    for (var i=0; i<nodes; i++){
        nodeX[i] = nodeStartX[i]+sin(radians(angle[i]))*(accelX*2);
        nodeY[i] = nodeStartY[i]+sin(radians(angle[i]))*(accelY*2);
        angle[i] += frequency[i];
        }

    // mouse icon 2
    push();
    tint(255,iconVisibility);
    followMouse();
    pop();
    setTimeout(turnOff,2000);
    }

// mouse icon
function followMouse() {
    imageMode(CENTER);
    
    // media query: if statement
     if (windowWidth < 1260) {
        image(img10,anchorX,anchorY,30,30);    
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
        image(img10,anchorX,anchorY,30,30);     
        } else if (windowWidth >= 1500 && windowWidth < 2014) {
        image(img10,anchorX,anchorY,50,50);              
        } else if (windowWidth >= 2014) {
        image(img10,anchorX,anchorY,50,50);             
        } 
    
}    

function turnOff() {
    iconVisibility = lerp(iconVisibility,-10,0.1); 
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

// Envelope class constructor
function Envelope(img) {

   this.img = img;
   this.x = random(200, width-200);
   this.y = random(200, height-200);
   this.xSpeed = random(-4, 4);
   this.ySpeed = random(-4, 4);
   this.angle = random(-1,1);

   this.move = function() {
	  this.x = this.x + this.xSpeed;
	  this.y = this.y + this.ySpeed;
   }

   this.bounce = function() {
	  if (this.x > width/2 || this.x < 50) {
		 this.xSpeed = this.xSpeed * -1;
	  }
	  if (this.y > height-200 || this.y < 50) {
		 this.ySpeed = this.ySpeed * -1;
	  }
   }

   this.display = function() {
        noFill();
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        image(this.img, this.x, this.y,67,47); 
        pop();  
   }
   
}

function showImages() {
    visibility = lerp(visibility,255,0.03);
}