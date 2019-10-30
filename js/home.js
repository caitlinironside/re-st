// ***************************************************************************************

// SCROLLING INTRODUCTORY PAGE
// Caitlin Ironside
// 30 October 2017

// Source code adapted from Untitled JSFiddle, Author Unknown
// http://jsfiddle.net/tb2ume6v/1/
// Version 1, Viewed 1 Oct 2017.

// ****************************************************************************************

function setBlockTriggers(number, stopPoint, startPoint) {
    var block = $('#block' + number)
    var offset = block.offset();
    var scrollDistance = $(window).scrollTop();
    var windowHeight = $(window).height();
    if ($(this).scrollTop() <= stopPoint * $(window).height()){
        block.removeClass('go' + number).addClass('float' + number)
    } else if ($(this).scrollTop() >= stopPoint * $(window).height() && $(this).scrollTop() <= startPoint * $(window).height()) {
        block.removeClass('float' + number).addClass('top' + number)      
    } else if ( $(this).scrollTop() >= startPoint * $(window).height() ) {
        block.removeClass('top' + number).addClass('go' + number)
    }
}

	
// how to place an if statement in here to control the locations from which they scroll based on window width? 
$(document).scroll(function() {
    
    if ($(window).width() < 1260) {
        setBlockTriggers(2, 23/22, 65/22);
        setBlockTriggers(3, 43/22, 65/22);
        setBlockTriggers(4, 89/22, 131/22);
        setBlockTriggers(5, 109/22, 131/22);
        setBlockTriggers(6, 155/22, 228/22);
        setBlockTriggers(7, 175/22, 228/22);
        setBlockTriggers(8, 195/22, 228/22);
    } else if ($(window).width() >= 1260 && $(window).width() < 1500) {
        setBlockTriggers(2, 23/22, 65/22);
        setBlockTriggers(3, 43/22, 65/22);
        setBlockTriggers(4, 89/22, 131/22);
        setBlockTriggers(5, 109/22, 131/22);
        setBlockTriggers(6, 155/22, 228/22);
        setBlockTriggers(7, 175/22, 228/22);
        setBlockTriggers(8, 195/22, 228/22);
    } else if ($(window).width() >= 1500 && $(window).width() < 2014) {
    setBlockTriggers(2, 23/22, 65/22);
        setBlockTriggers(3, 43/22, 65/22);
        setBlockTriggers(4, 89/22, 131/22);
        setBlockTriggers(5, 109/22, 131/22);
        setBlockTriggers(6, 155/22, 228/22);
        setBlockTriggers(7, 175/22, 228/22);
        setBlockTriggers(8, 195/22, 228/22);
    } else if ($(window).width() > 2014) {
    setBlockTriggers(2, 23/22, 65/22);
        setBlockTriggers(3, 43/22, 65/22);
        setBlockTriggers(4, 89/22, 131/22);
        setBlockTriggers(5, 109/22, 131/22);
        setBlockTriggers(6, 155/22, 228/22);
        setBlockTriggers(7, 175/22, 228/22);
        setBlockTriggers(8, 195/22, 228/22);
    }
    
 
})


// ---------------------- Element 9 ---------------------

// ************ Programmed with assistance from Dylan Leggio ************ 

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var boxDistanceFromTop = windowHeight;
var blockHeight = $('#block9').height();

// setting intro box position

        // XS
        if (windowWidth < 1260 || windowHeight < 700) {
            $('#intro').css("margin-top", (windowHeight/2) - ($('#intro').height()/2) - 20 + "px");
        // SM    
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            $('#intro').css("margin-top", (windowHeight/2) - ($('#intro').height()/2) - 20 + "px");
            
        // MD    
        } else if (windowWidth >= 1500 && windowWidth < 2014) {
            $('#intro').css("margin-top", (windowHeight/2) - ($('#intro').height()/2) - 20 + "px"); 
            
        // LG    
        } else {
            $('#intro').css("margin-top", (windowHeight/2) - ($('#intro').height()/2) - 35 + "px");   
        }



//console.log($(window).height());

setBoxDistance();
        // XS
        if (windowWidth < 1260 || windowHeight < 700) {
            var triggerPoint = 10.5 * windowHeight;
        // SM    
        } else if (windowWidth >= 1260 && windowWidth < 1500) {
            var triggerPoint = 10.5 * windowHeight;
            
        // MD    
        } else if (windowWidth >= 1500 && windowWidth < 2014) {
            var triggerPoint = 10.5 * windowHeight; 
            
        // LG    
        } else {
            var triggerPoint = 10.5 * windowHeight;   
        }


$(document).scroll(function() {
    var scrollDistance = $(window).scrollTop();

    if (scrollDistance > triggerPoint) {
        boxDistanceFromTop = windowHeight - (scrollDistance - triggerPoint);
    if (boxDistanceFromTop <= 0) boxDistanceFromTop = 0;
    } else {
            boxDistanceFromTop = windowHeight;
        }
    setBoxDistance();
});

function setBoxDistance() {
	$('#block9').css("top", boxDistanceFromTop + "px");
}

// *****************************************************************************

//---------------------- 'scroll' & arrow opacity ---------------------

var hide = function(){
	var arrow = $('#arrow')
    var scrolldiv = $('#scrolldiv')
    var scrolltext = $('#scrolltext')
    
	$(document).scroll(function(){
		if ( $(this).scrollTop() >= 50 ){
          arrow.removeClass('visible').addClass('invisible')
          scrolldiv.removeClass('visible').addClass('invisible')
          scrolltext.removeClass('opaque').addClass('transparent')
          
		  } else if ( $(this).scrollTop() < 50 ) {
          arrow.removeClass('invisible').addClass('visible')
          scrolldiv.removeClass('invisible').addClass('visible')
          scrolltext.removeClass('transparent').addClass('opaque')
		  }
        console.log($(this).scrollTop());
	})
}

//---------------------- center final div ---------------------

var center1 = function() { 
    var wY = $(window).height();
    var tY = $("#intro").height();
    $("#intro").css("margin-top", (wY/2) - (tY/2) - 40 + "px");
}
        
// ---------------------- call functions ---------------------

$(document).ready(hide);// JavaScript Document