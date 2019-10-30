// JavaScript Document
// ***************************************************************************************

// 'REFLECT' SKETCH
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Daniel Shiffman's 'Draggable' p5.js example
// http://alpha.editor.p5js.org/projects/B13wH5T3
// Version 1, Viewed 1 Oct 2017.

// Programmed with assistance from Thomas Ricciardello and Timothy Busuttil.

// ***************************************************************************************

var canvas;

// container size & position
var containerWidth;
var containerHeight;
var containerLeft;
var containerHeight;
var textLeft;
var textTop;
var textHeight;
var textBottom;

// mouse icons
var img10;
var iconVisibility1 = 0;
var iconVisibility2 = 255;
var hoverIcon;
var dragIcon;

// shutter handle
var handleY;
var handleX;
var handleSizeX;
var handleSizeY;
var img1;

// shutter location and size
var shutterX, shutterY, shutterW, shutterH;
var offsetX, offsetY;
var dragging = false;
var rollover = false;

// changing word states
var fonts = ["Latienne-Pro", "Neuzeit-Grotesk"];
var weight = ["300", "400", "500"];
var stress = ["italic", "normal"];
var cols = [];

// dancing words
var r;
$(".split-text").lettering('words');
var dancingWords = [];
var words = [];
var zed = 0;
var wordTravel = 400;

function preload() {
    img1 = loadImage("../images/reflect/chain.png");
    // mouse icon
    img10 = loadImage("../images/icons/mouseWhite.png");    
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    
    // container dimensions & position
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
    textLeft = document.getElementById('paragraph-one').offsetLeft;
    textHeight = document.getElementById('reflect-text').offsetHeight;
    textTop = document.getElementById('reflect-text').offsetTop;
    textBottom = textTop + textHeight;
    
    // mouse icons  
    if (windowWidth < 1260) {
        dragIcon = new dragMouse(0,0,0,0,30);
        hoverIcon = new hoverMouse(0,0,0,0,30,5);
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
        dragIcon = new dragMouse(0,0,0,0,30);
        hoverIcon = new hoverMouse(0,0,0,0,30,5);    
        } else if (windowWidth >= 1500 && windowWidth < 2014) {
        dragIcon = new dragMouse(0,0,0,0,50);
        hoverIcon = new hoverMouse(0,0,0,0,50,5);    
        } else if (windowWidth >= 2014) {
        dragIcon = new dragMouse(0,0,0,0,50);
        hoverIcon = new hoverMouse(0,0,0,0,50,5);    
        } 
    
    
    
    // duplicate paragraphs and split into words
    $(".split-text").children().each(function() {
		var bold = false;
		if ($(this).parent().hasClass("subHead")) bold = true;
        var wordText = $(this).text();
        var wordX = $(this).position().left;
        var wordY = $(this).position().top;
        words.push(new Word(wordText, wordX, wordY, random(500), false, bold));
    });

    // hide original text
    $(".split-text").hide();

    // shutter starting location
    shutterX = 0;
    //shutterY = -28/15 *height;
    setShutterPosition();

    // shutter size
    shutterW = width;
    shutterH = 2 * height;

    // colour arrays    
    cols[0] = color(91, 55, 70);
    cols[1] = color(247, 192, 74);
    cols[2] = color(247, 157, 74);
    cols[3] = color(89, 99, 35);
    cols[4] = color(35, 99, 99);
    cols[5] = color(193, 38, 27);
    cols[6] = color(216,182,198);
}

function draw() {
    
    background(237,228,223);    

    // is mouse over shutter?
    if (mouseX > 0 && mouseX < shutterW && mouseY > shutterY && mouseY < shutterY + shutterH) {
    rollover = true;
    } else {
    rollover = false;
    }

    // adjust location of shutter upon drag
    if (dragging) {  
    shutterY = mouseY + offsetY;
    shutterY = constrain(mouseY + offsetY,(-2*height + (2/15 * height)), (-19/15*height)); 
    }
   
    // adjust location of handle upon drag 
    handleY = map(shutterY,(-28/15*height),(-19/15*height),(2/15 * height),(11/15 * height - 120)); 

    // here
    setHandlePosition();
    
    // handleX = (9/40 * width) +23;
    handleSizeX = 44;
    handleSizeY = 257;    

    // draw handle  
    image(img1,handleX-8,handleY,handleSizeX+16,handleSizeY); 
    ellipseMode(CORNER);    
   
    // draw shutter
    noStroke();
    fill(222,213,208);
    rect(0, shutterY, shutterW, shutterH);

    // move words
    for (var i = 0; i < words.length; i++) {
        words[i].move();
    }

    // mouse icon 1
    push();    
    translate(handleX + 22, (handleY + 385));   
    tint(255,iconVisibility2);
    dragIcon.display();
    dragIcon.move();
    pop();      
    setTimeout(turnOff1,4000);    

    // mouse icon 2
    push();    
    translate(0.60 * width, 0.4 * height);   
    if(frameCount > 300 && frameCount < 480) {
        iconVisibility1 = lerp(iconVisibility1,255,0.2);
        } else {
            iconVisibility1 = lerp(iconVisibility1,-10,0.2);
            }
    tint(255,iconVisibility1);
    hoverIcon.display();
    hoverIcon.move();
    pop();          
}

function Word(word, homeX, homeY, offset, runAway, bold) {
  // construct word class
  this.word = createP(word);
  if (bold) this.word.addClass('subHead');
  this.x = homeX;
  this.y = homeY;
  this.word.position(this.x, this.y);

  this.r = 0;
  this.noiseX = 0;
  this.noiseY = 0;
  this.noiseR = 0;

  // class functions
  this.move = function() {
    // trigger run away 
    if (shutterY - 24 + 2 * height > homeY) {
      runAway = true;
        } else {
            runAway = false;
            }

    if (runAway == true) {
      this.noiseX = map(noise(offset + zed), 0, 1, homeX - wordTravel, homeX + wordTravel);
      this.noiseY = map(noise(offset + zed + 100), 0, 1, homeY - wordTravel, homeY + wordTravel);
      this.noiseR = map(noise(offset + zed + 50), 0, 1, -PI, PI);
      // speed of running away
      this.x = lerp(this.x, this.noiseX, 0.1);
      this.y = lerp(this.y, this.noiseY, 0.1);
      this.r = lerp(this.r, this.noiseR, 0.1);
        } else {
          // speed of returning
          this.x = lerp(this.x, homeX, 0.2);
          this.y = lerp(this.y, homeY, 0.2);
          this.r = lerp(this.r, 0, 0.2);
    }

    // draw and rotate words
    this.word.position(this.x, this.y);
    this.word.style("rotate", degrees(this.r));

    // distance between mouse and words  
    this.d = dist(this.x, this.y, mouseX, mouseY);
    var r = map(this.d, 0, 10, 0, 4);

    // alter words when mouse is near
    // either change the distance requirement here, OR wrap the defined distance above in an if statement, adding an offset to the sizes necessary, and then remove the screen size conditions from the statement below. 
    if ((runAway == true && this.d < 50 && windowWidth < 1260)||(runAway == true && this.d < 50 && windowWidth >= 1260 && windowWidth < 1500)||(runAway == true && this.d < 75 && windowWidth >= 1500 && windowWidth < 2014)||(runAway == true && this.d < 75 && windowWidth >= 2014)) {
        if (frameCount % 5 == 0) {
            var randFont = int(random(2));
            this.word.style("font-family", fonts[randFont]);
                if (randFont == 0) {
                  this.word.style("font-style", random(stress));
                    } else {
                        this.word.style("font-style", stress[1]);
                    }
                this.word.style("font-weight", random(weight));
                this.word.style("color", random(cols));
              }
            } 
      
    // media query: if statement
     if (windowWidth < 1260) {
            
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
        
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
            
                } else if (windowWidth >= 2014) {
  
                }       
      
  };
}


function mousePressed() {
    // grabbing the handle
    var handleDist = dist(mouseX,mouseY,(handleX +22),(handleY + 213 + 22));         
    if(handleDist < 22) {
        dragging = true;
        offsetX = -mouseX;
        offsetY = shutterY - mouseY;
  }
}

function mouseReleased() {
  // stop dragging
  dragging = false;
  if (shutterY < 50 - 2 * height) {
      shutterY = 50 - 2 * height;
  }
}

function turnOff1() {
    iconVisibility2 = lerp(iconVisibility2,-10,0.1); 
    dragIcon.circleOpacity = lerp(dragIcon.circleOpacity, 0, 0.1);
    dragIcon.strokeWeight = 0;
}


function setHandlePosition() {

    if (windowWidth < 1260) {
        handleX = containerLeft + ((textLeft - containerLeft - (handleSizeX/2))/2); 
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            handleX = containerLeft + ((textLeft - containerLeft - (handleSizeX/2))/2); 
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
                handleX = containerLeft + ((textLeft - containerLeft - (handleSizeX/2))/2);
                } else if (windowWidth >= 2014) {
                handleX = containerLeft + ((textLeft - containerLeft - (handleSizeX/2))/2);
                } 
    
}

function setShutterPosition() {
    
     if (windowWidth < 1260) {
        shutterY = -2*height + (2/15*height);
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            shutterY = -2*height + (2/15*height);
            } else if (windowWidth >= 1500 && windowWidth < 2014) {
                shutterY = -2*height + (2/15*height);
                } else if (windowWidth >= 2014) {
                shutterY = -2*height + (2/15*height);
                } 

}

function windowResized() {   
    resizeCanvas(windowWidth,windowHeight);
    containerWidth = document.getElementById('sketch-container').offsetWidth;
    containerHeight = document.getElementById('sketch-container').offsetWidth;
    containerLeft = document.getElementById('sketch-container').offsetLeft;
    containerTop = document.getElementById('sketch-container').offsetTop;
    textLeft = document.getElementById('body-text').offsetLeft;
    textHeight = document.getElementById('reflect-text').offsetHeight;
    textTop = document.getElementById('reflect-text').offsetTop;
                }
