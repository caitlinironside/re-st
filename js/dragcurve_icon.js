// JavaScript Document
// ***************************************************************************************

// CURVED DRAG MOUSE CONSTRUCTOR CLASS #01
// Caitlin Ironside
// 30 October 2017

// ***************************************************************************************

function dragMouse (initialX,initialY,x,y,size,increment,lerpX,lerpY) {
    this.x = x;
    this.y = y;    
    this.upward = true;
    this.forward = true;
    this.lerpSpeedX = lerpX;
    this.lerpSpeedY = lerpY;
    this.targetX; 
    this.targetY; 
    this.initialX = initialX;
    this.initialY = initialY; 
    this.size = size; 
    this.circleOpacity = 0;
    this.strokeWeight = 1;
    this.increment = increment;
    
    this.display = function () {
        noStroke();
        imageMode(CENTER);
        image(img10,this.x,this.y,this.size,this.size);
        noFill();
        strokeWeight(this.strokeWeight);
        ellipseMode(CENTER);
        stroke(0,this.circleOpacity);
        ellipse(this.x,this.y,1.3*this.size,1.3*this.size);
    };
    
    this.move = function () {
        
         if (this.x < this.initialX - (this.increment*11)) {
            this.upward = true; 
            this.lerpSpeedY = 0.08;
                    } else if (this.x > this.initialX - (this.increment*0.05)) {
                        this.upward = false;
                        this.lerpSpeedY = 0.1;
            }
        
         if (this.x < this.initialX - (this.increment*11)) {
            this.forward = true; 
            this.lerpSpeedX = 0.15;
            }	 else if (this.x > this.initialX - (this.increment*0.05)) {
                    this.forward = false;
                    this.lerpSpeedX = 0.015;
            }
        
        if (this.upward) {
            this.targetY = this.initialY;
            this.circleOpacity = 0;
            }	else {
                    this.targetY = this.initialY + (this.increment*5);
                    this.circleOpacity = 255;  
            }
        
         if (this.forward) {
            this.targetX = this.initialX;
            this.circleOpacity = 0;
            }	else {
                    this.targetX = this.initialX - (this.increment*11.5);
                    this.circleOpacity = 255;    
            }
        
        this.y = lerp(this.y,this.targetY,this.lerpSpeedY);
        this.x = lerp(this.x,this.targetX,this.lerpSpeedX);	
    };  
}



    
    
  