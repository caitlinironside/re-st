// JavaScript Document
// ***************************************************************************************

// 'RESTORE' SKETCH
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Daniel Shiffman's 'Draggable' p5.js example
// http://alpha.editor.p5js.org/projects/B13wH5T3
// Version 1, Viewed 1 Oct 2017.

// Programmed with assistance from Thomas Ricciardello and Timothy Busuttil.

// ***************************************************************************************

var canvas, width, height;
var containerWidth;
var containerHeight;
var containerLeft;
var containerHeight;
var paragraphWidth;
var paragraphHeight;

// mouse icons
var img10;
var iconVisibility1 = 0;
var iconVisibility2 = 255;
var hoverIcon;
var dragIcon;

// piece of paper
var rectX, rectY, rectW, rectH;
var poly = [];
var poly2 = [];

// images
var branches = [];

// collision library to drag paper
var hit = false;
var dragging = false;
var a = 0;
var offset = 0;
var paper = true;
var col;
var col2;

// text
var text;
var textOpacity = 1;
var elementOpacity;
var elementRotation;
var checkA;

// positions of branches
var plantPositions = [15]
var plantYPositions = [15]

var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;

function preload() {      
    // load image array     
    img1 = loadImage("../images/restore/gradientplant2.png");
    img2 = loadImage("../images/restore/gradientplant1.png");
    img3 = loadImage("../images/restore/gradientplant8.png");
    img4 = loadImage("../images/restore/gradientplant2.png");
    img5 = loadImage("../images/restore/gradientplant5.png");
    img6 = loadImage("../images/restore/gradientplant4.png");
    img7 = loadImage("../images/restore/gradientplant7.png");
    
    // mouse icon
    img10 = loadImage("../images/icons/mouseWhite.png");    
}


function setup() {
    
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');  
    angleMode(DEGREES);
    
// container dimensions & position
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
    paragraphWidth = document.getElementById('fade_box').offsetWidth;
    paragraphHeight = document.getElementById('fade_box').offsetHeight;    
    
// put into get plant pos function & call 
getPlantPositions(); 
getPlantYPositions();     
   
  branches.push(new Branch(plantPositions[0], plantYPositions[0], 174, 500, 0.75, img1));
  branches.push(new Branch(plantPositions[1], plantYPositions[1], 190, 467, 1.1, img2));    
  branches.push(new Branch(plantPositions[2], plantYPositions[2], 190, 467, 1.1, img3));
  branches.push(new Branch(plantPositions[3], plantYPositions[3], 174, 500, 0.75, img4));
  branches.push(new Branch(plantPositions[4], plantYPositions[4], 298, 502, 1.1, img5));
  branches.push(new Branch(plantPositions[5], plantYPositions[5], 195, 400, 1.5, img6));
  branches.push(new Branch(plantPositions[6], plantYPositions[6], 225, 350, 2, img7));
  branches.push(new Branch(plantPositions[7], plantYPositions[7], 225, 350, 2, img7));
    
  branches.push(new Branch(plantPositions[8], plantYPositions[8], 174, 500, 0.75, img1));
  branches.push(new Branch(plantPositions[9], plantYPositions[9], 190, 467, 1.1, img2));
  branches.push(new Branch(plantPositions[10], plantYPositions[10], 190, 467, 1.1, img3));
  branches.push(new Branch(plantPositions[11], plantYPositions[11], 174, 500, 0.75, img4));
  branches.push(new Branch(plantPositions[12], plantYPositions[12], 298, 502, 1.1, img5));
  branches.push(new Branch(plantPositions[13], plantYPositions[13], 195, 400, 1.5, img6));
  branches.push(new Branch(plantPositions[14], plantYPositions[14], 225, 350, 2, img7));
  branches.push(new Branch(plantPositions[15], plantYPositions[15], 225, 350, 2, img7));     
    
        
    // mouse icons
    if (windowWidth < 1260) {
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
        dragIcon = new dragMouse(0,0,0,0,30,75,0.08,0.08);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
        dragIcon = new dragMouse(0,0,0,0,30,100,0.08,0.08);
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        hoverIcon = new hoverMouse(0,0,0,0,50,5);
        dragIcon = new dragMouse(0,0,0,0,50,100,0.5,0.5);
    } else if (windowWidth >= 2014) {
        hoverIcon = new hoverMouse(0,0,0,0,50,5);
        dragIcon = new dragMouse(0,0,0,0,50,150,0.7,0.7);
    }   

    
   
    // rectangle position 
    setRectanglePosition();
    setTextPosition();
	
  
}

function draw() {
    
    stroke(237,228,223);    
    background(237,228,223);
    
    clear();
    
    // stop paper from incurring negative rotation
    checkA = a-(360*(ceil(a/360)-1));
    
    if (checkA > 90 && checkA < 300) {
        paper = false;
    } else {
        paper = true;
    } 
    
  
    // draw images, and move if paper is turned
    for (var i = 0; i < branches.length; i++) {
        if (paper == false) {    
            //branches[i].update();
            branches[0].update();
            branches[1].update();
            branches[2].update();
            branches[3].update();
            branches[4].update();
            branches[5].update();
            branches[6].update();
            branches[7].update();
            
            branches[8].update();
            branches[9].update();
            branches[10].update();
            branches[11].update();
            branches[12].update();
            branches[13].update();
            branches[14].update();
            branches[15].update();
            }
        //branches[i].display();
        branches[0].display();
        branches[1].display();
        branches[2].display();
        branches[3].display();
        branches[4].display();
        branches[5].display();
        branches[6].display();
        branches[7].display();
        
        branches[8].display();
        branches[9].display();
        branches[10].display();
        branches[11].display();
        branches[12].display();
        branches[13].display();
        branches[14].display();
        branches[15].display();
    }    

    // rotate paper on drag
	if (dragging && hit) {
		a = atan2(mouseY - rectY, mouseX - rectX) + offset;
	}

    hit = collidePointPoly(mouseX - rectX, mouseY - rectY, poly);

    push();
    translate(rectX, rectY);
    
    // create paper polygon vectors
    poly[0] = createVector(0,0); // set X/Y position
    poly[1] = createVector(rectW-50, 0);
    poly[2] = createVector(rectW, 30);
    poly[3] = createVector(rectW, rectH);
    poly[4] = createVector(0, rectH);    

    // create folded corner polygon vectors
    poly2[0] = createVector(rectW-50, 0); // set X/Y position
    poly2[1] = createVector(rectW, 30);
    poly2[2] = createVector(rectW-20, 50);    
   
    fill(255);
    //noFill();
    stroke(237,228,223);
    beginShape();
    // draw polygon from vectors above
    for (i = 0; i < poly.length; i++) {
        poly[i].rotate(a);
        vertex(poly[i].x, poly[i].y);
    }
    endShape(CLOSE);

    beginShape();
    // draw polygon from vectors above
    for (i = 0; i < poly2.length; i++) {
        poly2[i].rotate(a);
        vertex(poly2[i].x, poly2[i].y);
    }
    endShape(CLOSE);    

    pop();

    // fade text on timer
    if (paper) {
        setTimeout(fadeOut,3000);
    } 
    
    // rotate and fade DOM element
    elementOpacity = document.getElementById("fade_text");
    elementRotation = document.getElementById("fade_box");    
    elementRotation.style.opacity = textOpacity;    
    elementRotation.style.transform = "rotate(" + a + "deg)";     
     
    // mouse icon 1
    if (frameCount > 460 && frameCount < 640) {
        iconVisibility1 = lerp(iconVisibility1,255,0.2);
        } else {
            iconVisibility1 = lerp(iconVisibility1,-10,0.2);
    }    
    push();    
    translate(containerLeft + 200, plantYPositions[1] + 100);   
    tint(255,iconVisibility1);
    hoverIcon.display();
    hoverIcon.move();
    pop(); 
        
    // mouse icon 2
    push();  
    if (windowWidth < 1260) {
        translate(containerLeft + rectX + rectW - 150,rectY);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        translate(containerLeft + rectX + rectW - 150,rectY); 
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        translate(containerLeft + rectX + rectW - 190,rectY);
    } else if (windowWidth >= 2014) {
        translate(containerLeft + rectX + rectW - 375,rectY);
    } 
   
    tint(255,iconVisibility2);
    dragIcon.display();
    dragIcon.move();
    pop(); 
    if (windowWidth < 1260) {
        setTimeout(turnOff1,7000); 
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        setTimeout(turnOff1,7000);  
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        setTimeout(turnOff1,4500); 
    } else if (windowWidth >= 2014) {
        setTimeout(turnOff1,4500); 
    }
        
}


// constructing the branch class
function Branch (x,y,w,h,p,im) {
    this.xPosOriginal = x;
    this.yPosOriginal = y;
    this.xPos = x;
    this.yPos = y;
    this.imgWidth = w;
    this.imgHeight = h;
    this.parallax = p;
    //this.imgFile = loadImage("../images/restore/" + imgFileName);
    this.imgFile = im;
    
    this.setNewPosition = function(x) {
        this.xPosOriginal = x;
        this.xPos = x;
  }
    
    this.setNewYPosition = function(y) {
        this.yPosOriginal = y;
        this.yPos = y;
  }    

    this.update = function() {
        this.xPos = lerp(this.xPos, this.xPosOriginal + map(mouseX, 0, windowWidth, 50, -25) * this.parallax, 0.2);
        this.yPos = lerp(this.yPos, this.yPosOriginal + map(mouseY, 0, windowHeight, -10, -25) * this.parallax, 0.2);
    }
    
    this.display = function() {
        image(this.imgFile,this.xPos,this.yPos,this.imgWidth,this.imgHeight);
    }
       
}

function mousePressed() {
	if (hit) dragging = true;
	offset = a - atan2(mouseY - rectY, mouseX - rectX);
}

function mouseReleased() {
	dragging = false;
}

function setTextPosition() {
    $("#fade_box").offset({ top: rectY, left: rectX});      
}

function setRectanglePosition() {
    if (windowWidth < 1260) {
        rectX = containerLeft + 250;
        rectW = paragraphWidth +40;
        rectH = paragraphHeight +40;
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            rectX = containerLeft + 413;
            rectW = paragraphWidth +40;
            rectH = paragraphHeight +40;
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
                rectX = containerLeft + 484;
                rectW = paragraphWidth +50;
                rectH = paragraphHeight +50;
                } else if (windowWidth >= 2014) {
                rectX = containerLeft + 600;
                rectW = paragraphWidth +50;
                rectH = paragraphHeight +50;    
                }   
    
    rectY = (windowHeight - rectH)/2;
}

function mouseMoved() {
    if (paper == false) {
        if (windowWidth < 1260) {
        textOpacity = constrain(textOpacity+0.007,0,1);
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            textOpacity = constrain(textOpacity+0.007,0,1);
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
               textOpacity = constrain(textOpacity+0.007,0,1);
                } else if (windowWidth >= 2014) {
                textOpacity = constrain(textOpacity+0.007,0,1);  
                } 
    }  
}

function turnOff1() {
    iconVisibility2 = lerp(iconVisibility2,-10,0.1); 
    dragIcon.circleOpacity = lerp(dragIcon.circleOpacity, 0, 0.1);
    dragIcon.strokeWeight = 0;
}

function fadeOut() {
       if (windowWidth < 1260) {
        textOpacity = lerp(textOpacity,0,0.006);
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            textOpacity = lerp(textOpacity,0,0.006);
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
               textOpacity = lerp(textOpacity,0,0.013);
                } else if (windowWidth >= 2014) {
                textOpacity = lerp(textOpacity,0,0.013);
                } 
      
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    paragraphWidth = document.getElementById('fade_box').offsetWidth;
    paragraphHeight = document.getElementById('fade_box').offsetHeight;  
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
      
} 

function getPlantPositions() {
    if (windowWidth < 1260) {      
    plantPositions[0] = 3000;
    plantPositions[1] = containerLeft + (4 / 9 * containerWidth + 92);  
    plantPositions[2] = containerLeft + (1 / 9 * containerWidth - 130);
    plantPositions[3] = containerLeft + (3 / 9 * containerWidth + 55); 
    plantPositions[4] = containerLeft + (8 / 9 * containerWidth - 30);
    plantPositions[5] = containerLeft + (2/9 * containerWidth -80);
    plantPositions[6] = containerLeft + (6 / 9 * containerWidth -15); 
    plantPositions[7] = containerLeft + (2 / 9 * containerWidth + 55);   
  } else if (windowWidth >= 1260 && windowWidth < 1500) { 
    plantPositions[0] = containerLeft + (5 / 9 * containerWidth); 
    plantPositions[1] = containerLeft + (4 / 9 * containerWidth + 62);  
    plantPositions[2] = containerLeft + (1 / 9 * containerWidth - 110);
    plantPositions[3] = containerLeft + (3 / 9 * containerWidth + 10); 
    plantPositions[4] = containerLeft + (8 / 9 * containerWidth - 55);
    plantPositions[5] = containerLeft + (2 / 9 * containerWidth - 105);
    plantPositions[6] = containerLeft + (6 / 9 * containerWidth); 
    plantPositions[7] = containerLeft + (2 / 9 * containerWidth + 35);      
  } else if (windowWidth >= 1500 && windowWidth < 2014) {
    plantPositions[0] = containerLeft + (5 / 9 * containerWidth + 80); 
    plantPositions[1] = containerLeft + (4 / 9 * containerWidth + 20);  
    plantPositions[2] = containerLeft + (1 / 9 * containerWidth - 100);
    plantPositions[3] = containerLeft + (3 / 9 * containerWidth - 10); 
    plantPositions[4] = containerLeft + (8 / 9 * containerWidth - 75);
    plantPositions[5] = containerLeft + (2 / 9 * containerWidth - 125);
    plantPositions[6] = containerLeft + (6 / 9 * containerWidth + 50); 
    plantPositions[7] = containerLeft + (2 / 9 * containerWidth + 15);
    plantPositions[13] = containerLeft + (6 / 9 * containerWidth - 180);   
  } else if (windowWidth >= 2014) {
    plantPositions[0] = containerLeft + (5 / 9 * containerWidth - 250); 
    plantPositions[1] = containerLeft + (4 / 9 * containerWidth - 260);  
    plantPositions[2] = containerLeft + (1 / 9 * containerWidth - 170);
    plantPositions[3] = containerLeft + (3 / 9 * containerWidth  - 220); 
    plantPositions[4] = containerLeft + (8 / 9 * containerWidth);
    plantPositions[5] = containerLeft + (2 / 9 * containerWidth - 255);
    plantPositions[6] = containerLeft + (6 / 9 * containerWidth - 570); 
    plantPositions[7] = containerLeft + (2 / 9 * containerWidth - 115);    
    plantPositions[8] = containerLeft + (5 / 9 * containerWidth + 485); 
    plantPositions[9] = containerLeft + (4 / 9 * containerWidth + 630);  
    plantPositions[10] = containerLeft + (1 / 9 * containerWidth + 750);
    plantPositions[13] = containerLeft + (6 / 9 * containerWidth - 140); 
   plantPositions[14] = containerLeft + (2 / 9 * containerWidth + 840); 
    
  }
}

function setPlantPositions() {
  for (var i = 0; i < branches.length; i++) {
    branches[i].setNewPosition(plantPositions[i+1]);
  }
}

function getPlantYPositions() {
    if (windowWidth < 1260) {      
    plantYPositions[0] = (height - 490);
    plantYPositions[1] = (height - 450);
    plantYPositions[2] = (height - 450);
    plantYPositions[3] = (height - 490);
    plantYPositions[4] = (height - 490);
    plantYPositions[5] = (height - 370);
    plantYPositions[6] = (height - 320);
    plantYPositions[7] = (height - 320);
    plantYPositions[8] = (height - 490);
    plantYPositions[9] = (height - 450);
    plantYPositions[10] = (height - 450);
    plantYPositions[11] = (height - 490);
    plantYPositions[12] = (height - 490);
    plantYPositions[13] = (height - 370);
    plantYPositions[14] = (height - 320);
    plantYPositions[15] = (height - 320);          
  } else if (windowWidth >= 1260 && windowWidth < 1500) { 
    plantYPositions[0] = (height - 490);
    plantYPositions[1] = (height - 450);
    plantYPositions[2] = (height - 450);
    plantYPositions[3] = (height - 490);
    plantYPositions[4] = (height - 490);
    plantYPositions[5] = (height - 370);
    plantYPositions[6] = (height - 320);
    plantYPositions[7] = (height - 320);
    plantYPositions[8] = (height - 490);
    plantYPositions[9] = (height - 450);
    plantYPositions[10] = (height - 450);
    plantYPositions[11] = (height - 490);
    plantYPositions[12] = (height - 490);
    plantYPositions[13] = (height - 370);
    plantYPositions[14] = (height - 320);
    plantYPositions[15] = (height - 320);     
  } else if (windowWidth >= 1500 && windowWidth < 2014) {
    plantYPositions[0] = (height/2 - 490 + 220);
    plantYPositions[1] = (height/2 - 450 + 220);
    plantYPositions[2] = (height/2 - 450 + 220);
    plantYPositions[3] = (height/2 - 490 + 220);
    plantYPositions[4] = (height/2 - 490 + 220);
    plantYPositions[5] = (height/2 - 370 + 220);
    plantYPositions[6] = (height/2 - 320 + 220);
    plantYPositions[7] = (height/2 - 320 + 220);
    plantYPositions[8] = (height/2 - 490 + 220);
    plantYPositions[9] = (height/2 - 450 + 220);
    plantYPositions[10] = (height/2 - 450 + 220);
    plantYPositions[11] = (height/2 - 490 + 220);
    plantYPositions[12] = (height/2 - 490 + 220);
    plantYPositions[13] = (height/2 - 370 + 220);
    plantYPositions[14] = (height/2 - 320 + 220);
    plantYPositions[15] = (height/2 - 320 + 220);
  } else if (windowWidth >= 2014) {
    plantYPositions[0] = (height/2 - 490 + 220);
    plantYPositions[1] = (height/2 - 450 + 220);
    plantYPositions[2] = (height/2 - 450 + 220);
    plantYPositions[3] = (height/2 - 490 + 220);
    plantYPositions[4] = (height/2 - 490 + 220);
    plantYPositions[5] = (height/2 - 370 + 220);
    plantYPositions[6] = (height/2 - 320 + 220);
    plantYPositions[7] = (height/2 - 320 + 220);
    plantYPositions[8] = (height/2 - 490 + 220);
    plantYPositions[9] = (height/2 - 450 + 220);
    plantYPositions[10] = (height/2 - 450 + 220);
    plantYPositions[11] = (height/2 - 490 + 220);
    plantYPositions[12] = (height/2 - 490 + 220);
    plantYPositions[13] = (height/2 - 370 + 220);
    plantYPositions[14] = (height/2 - 320 + 220);
    plantYPositions[15] = (height/2 - 320 + 220);   
  }
}

function setPlantYPositions() {
  for (var i = 0; i < branches.length; i++) {
    branches[i].setNewYPosition(plantYPositions[i+1]);
  }
}
