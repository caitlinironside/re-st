// ***************************************************************************************

// CLICK MOUSE CONSTRUCTOR CLASS #01
// Caitlin Ironside
// 30 October 2017

// ***************************************************************************************

function clickMouse (initialX,initialY,x,y,size) {
    this.x = x;
    this.y = y;
    this.valueY = 0;
    this.increase = true;
    this.lerpSpeedY = 0.08;
    this.targetY; 
    this.initialX = initialX;
    this.initialY = initialY; 
    this.size = size; 
    this.circleOpacity = 0;
    this.strokeWeight = 1;
    
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
        if (this.valueY < this.initialY + 1) {
            this.increase = true; 
            this.lerpSpeedY = 0.05;
        }	else if (this.valueY > this.initialY + 9) {
                this.increase = false;
                this.lerpSpeedY = 0.2;
            }
        if (this.increase) {
            this.targetY = this.initialY +12 ;
            this.circleOpacity = 0;
        }	else {
                this.targetY = this.initialY;
            this.circleOpacity = 255;    
            }
        this.valueY = lerp(this.valueY,this.targetY,this.lerpSpeedY);		  
    };  
}



    
    
  