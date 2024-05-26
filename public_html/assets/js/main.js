/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

document.querySelector('.arrow').addEventListener('click', function(event) {
    event.preventDefault();
    const nextSection = document.getElementById('moi');
    window.scrollTo({
      top: nextSection.offsetTop,
      behavior: 'smooth'
    });
  });
  

// Globals
var prefixes         = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var $container       = $('.container');
var $timeline        = $('.timeline');
var $timelineItem    = $('.timeline-item');
var $timelineContent = $('.timeline-content');
var $dropDown        = $('.dropdown');
var $hasHovered      = true;
var hideOnExit       = false;

// mouseenter event handler
$timelineItem.on('mouseenter', function(e) {
  
  var isSelected = $(this).hasClass('selected');
  hideOnExit = true;
  if ( isSelected === false ) {
  
    var leftPos = $(this).position().left,
        left    = leftPos - 88,
        $that   = $(this);

    $timelineItem.removeClass('selected');
    $(this).addClass('selected');

    if ( $hasHovered === false ) {
      // Show Bounce

        // Set Flag
        $hasHovered = true;

        // Show DD Bounce
        showBounce(left);

        // Show DD content Bounce
        showContentBounce($that);

    } else {
      // Follow

        // Change pos of DD to follow
        dropDownFollow(left);

        // Hide previous dd content
        $timelineContent.removeClass('animated fadeIn bounceIn');

        // Show hovered dd content
        $that.find($timelineContent).addClass('animated fadeIn');
    }
  }
  
});

// mouseleave event handler
$timeline.on('mouseleave', function(e) {
  
  if (hideOnExit) {
   
    //   Set Flag
    $hasHovered = false;

    // Hide DD
    hideDropDown();

    // Hide DD content
    $timelineContent.removeClass('animated fadeIn');
    
  }
  
});

// Animation end event listener
$dropDown.on(prefixes, function(e) {
  
  if ( e.originalEvent.animationName === 'fadeOut' ) {
    $dropDown.removeAttr('style');
  }
  
});

/**
* Private functions that do showing/hiding/animating
*/
function showContentBounce(that) {
  $hasBounced = true;
  that.find('.timeline-content').addClass('animated bounceIn');
}

function showBounce(pos) {
  $dropDown.css('left', pos + 'px').removeClass('fadeOut').addClass('animated bounceIn');
}

function dropDownFollow(pos) {
  $dropDown.css('left', pos + 'px').addClass('animated bounceIn');
}

function hideDropDown() {
  $timelineItem.removeClass('selected');
  $dropDown.removeClass('animated bounceIn').addClass('fadeOut');
}