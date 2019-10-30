// ***************************************************************************************

// HOVER MOUSE CONSTRUCTOR CLASS #01
// Caitlin Ironside
// 30 October 2017

// ***************************************************************************************

function hoverMouse (initialX,initialY,x,y,size,increment) {
    this.x = x;
    this.y = y;    
    this.forward = true;
    this.downward = true;
    this.lerpSpeedX = 0.03;
    //this.lerpSpeedY = 0.005;
    this.targetX;
    this.targetY; 
    this.initialX = initialX;
    this.initialY = initialY; 
    this.size = size;  
    this.increment = increment;
    
    this.display = function () {
        noStroke();
        imageMode(CENTER);
        image(img10,this.x,this.y,this.size,this.size);
    };
    
    this.move = function () {
        if (this.x < this.initialX + this.increment) {
            this.forward = true; 
        }	else if (this.x > this.initialX + (5*this.increment)) {
                this.forward = false;		   
            }
        if (this.forward) {
            this.targetX = this.initialX +(6*this.increment);  
        }	else {
                this.targetX = this.initialX;   
            }
        this.x = lerp(this.x,this.targetX,this.lerpSpeedX);	 
    };  
}

    
    
  