// ***************************************************************************************

// 'REMOVE' SKETCH
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Daniel Shiffman's 'Introduction to Matter.js' tutorial 
// https://www.youtube.com/watch?v=urR596FsU68
// Version 1, Viewed 1 Oct 2017.

// Programmed with assistance from Thomas Ricciardello and Timothy Busuttil.

// ***************************************************************************************

// module aliases for matter.js
var canvas;
var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;

// physics engine
var engine;
var world;
var boxes = [];
var boxWidth;
var boxHeight;

// floor 
var bottomGround;
var groundLocation;
var somewhereElse;

// eye icon
var img;
var img2;
var img10;

// eye location and trigger
var mouseOverEye = false;
var eyeX;
var eyeY;
var eyeW;
var eyeH;

// container size & position
var containerWidth;
var containerHeight;
var containerLeft;
var containerHeight;
var textLeft;

// background colour change
var maxR = 237;
var minR = 104;
var maxG = 228;
var minG = 100;
var maxB = 223;
var minB = 102;
var r = 237;
var g = 228;
var b = 223;

// colour change 2
var maxR2 = 255;
var maxG2 = 255;
var maxB2 = 255;
var r2 = 255;
var g2 = 255;
var b2 = 255;

// mouse icons
var visibility = 255;
var hoverIcon;

// changes to text color
var bodyCopy;
var textColorR;
var textColorB;  
var textColorG; 

function preload() {
    img2 = loadImage("../images/remove/eyeclosed.png");
    img = loadImage("../images/remove/eyeopen.png");
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
    
    // mouse icon
    if (windowWidth < 1260) {
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
    } else if (windowWidth >= 1260 && windowWidth < 1500) {
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
    } else if (windowWidth >= 1500 && windowWidth < 2014) {
        hoverIcon = new hoverMouse(0,0,0,0,50,5);
    } else if (windowWidth >= 2014) {
        hoverIcon = new hoverMouse(0,0,0,0,50,5);
    }     
    
    
    
    // physics engine
    engine = Engine.create();
    world = engine.world;    
    Engine.run(engine);    
    var options = {
        isStatic: true
    }    

    // create ground
    groundLocation = Matter.Vector.create(width/2, height+10);
    somewhereElse = Matter.Vector.create(width/2, height+10000);
    bottomGround = Bodies.rectangle(width/2,height+10,width*1.25,20,options); 
    World.add(world, bottomGround); 
    
} 
   
function draw() { 
     
    // target text to change color
    bodyCopy = document.getElementsByClassName("remove_text");   
    
    // define eye location & size
    setEyePosition();
    
    // define trigger location
    if(mouseX < (eyeX + eyeW) && mouseX > eyeX && mouseY > eyeY && mouseY < (eyeY + eyeH)) {
    mouseOverEye = true;
    } else {
    mouseOverEye = false;
    }
    
    // color changes
    if(mouseOverEye) {    
        r = lerp(r,minR,0.01);
        g = lerp(g,minG,0.01);
        b = lerp(b,minB,0.01);
        r2 = lerp(r2,minR,0.01);
        g2 = lerp(g2,minG,0.01);
        b2 = lerp(b2,minB,0.01);
        textColorR = 255;
        textColorG = 255; 
        textColorB = 255; 
        } else {
            r = lerp(r,maxR,0.015);
            g = lerp(g,maxG,0.015);
            b = lerp(b,maxB,0.015);
            r2 = lerp(r2,maxR2,0.015);
            g2 = lerp(g2,maxG2,0.015);
            b2 = lerp(b2,maxB2,0.015);
            textColorR = 91;
            textColorG = 55;
            textColorB = 70;    
            }
    
    for (i = 0; i < bodyCopy.length; i++) {
        bodyCopy[i].style.color = "rgb(" + textColorR + "," + textColorG + "," + textColorB + ")";
    }
    
    background(r,g,b);

    // call boxes, remove from world if offscreen       
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
        if(boxes[i].isOffscreen()) {
            boxes[i].removeFromWorld();
            boxes.splice(i, 1);
            i--;
        }  
    }  
    
    // draw eye
    tint(255,255);
    angleMode(DEGREES);
    //imageMode(CENTER);
    //push();
    if(mouseOverEye) {
        //rotate(-2.5);
        image(img2,eyeX,eyeY,eyeW,eyeH);
            } else {
            //rotate(-2.5);    
                image(img,eyeX,eyeY,eyeW,eyeH);
            } 
    
    //pop();

    // move ground when mouse over eye 
    function moveGround() {
        Matter.Body.setPosition(bottomGround, somewhereElse);
    }    
    
    if(mouseOverEye) { 
        setTimeout(moveGround, 1000);    
            } else {
                Matter.Body.setPosition(bottomGround, groundLocation); 
            }

    // mouse icons
    tint(255,visibility);
    push();
    translate(eyeX + eyeW/2 - hoverIcon.increment*3,eyeY + eyeH/2);    
    hoverIcon.display();
    hoverIcon.move();
    pop();    
    setTimeout(turnOff,4000);  

    // size of boxes
    if (windowWidth < 1260) {
           boxWidth = random(50,75);
           boxHeight = random(50,75);
            } else if (windowWidth >= 1260 && windowWidth < 1500) {
                boxWidth = random(50,75);
                boxHeight = random(50,75);
                } else if (windowWidth >= 1500 && windowWidth < 2014) {
                    boxWidth = random(65,97);
                    boxHeight = random(65,97);
                    } else if (windowWidth >= 2014) {
                        boxWidth = random(65,97);
                        boxHeight = random(65,97);
                    }     
    

    
}

function mouseMoved() {

    function dropBoxes() {
        boxes.push(new Box(mouseX,mouseY,boxWidth,boxHeight));
    } 
    
    if(mouseOverEye) {  
        } else {
            dropBoxes();
            }
}

function mouseDragged() {
    boxes.push(new Box(mouseX,mouseY,boxWidth,boxHeight));
}

function turnOff() {
    visibility = lerp(visibility,-10,0.02); 
}

function setEyePosition() {

    if (windowWidth < 1260) {
        eyeW = 150;
        eyeH = 94;
        eyeX = containerLeft + ((textLeft +100 - containerLeft - eyeW)/2);
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            eyeW = 188;
            eyeH = 117;
            eyeX = containerLeft + ((textLeft +100 - containerLeft - eyeW)/2);
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
                eyeW = 188;
                eyeH = 117;
                eyeX = containerLeft + ((textLeft +100 - containerLeft - eyeW)/2);
                } else if (windowWidth >= 2014) {
                    eyeW = 235;
                    eyeH = 146;
                    eyeX = containerLeft + ((textLeft +100 - containerLeft - eyeW)/2) -10;
                } 
        eyeY = 1/2 * (windowHeight - eyeH);
    
}

function windowResized() {   
    resizeCanvas(windowWidth,windowHeight);
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
    textLeft = document.getElementById('body-text').offsetLeft;
                }