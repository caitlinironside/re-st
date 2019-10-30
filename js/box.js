// ***************************************************************************************

// BOX CONSTRUCTOR CLASS
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Daniel Shiffman's 'Introduction to Matter.js' tutorial 
// https://www.youtube.com/watch?v=urR596FsU68
// Version 1, Viewed 1 Oct 2017.

// ***************************************************************************************

function Box(x,y,w,h) {
    var options = {
        friction: 0.5,
        restitution: 0.3
    }

    this.body = Bodies.rectangle(x,y,w,h,options);
    this.w = w;
    this.h = h;    
    World.add(world, this.body);    

    this.show = function() { 
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle); 
        rectMode(CENTER);
        noStroke();
        fill(91,55,70);    
        rect(0,0,this.w,this.h);       
        pop();
    }

    this.isOffscreen = function() {
        var pos = this.body.position;
        return(pos.y > height + 200);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }
}