var website_color = 0;
var logo = $(".logo_image");
var about = $("#about_me");
var music = $("#music");
var contact = $("#contact");
var back1 = $("#back-1");
var back2 = $("#back-2");
var back3 = $("#back-3");

$(function(){
    logo.click(function(){
        if(website_color == 0){
            $("body").css("filter", "invert(100%)");
            website_color = 1;
            $(".cover_art").css("filter", "invert(100%)");
            $(".yt").css("filter", "invert(100%)");
            $(".sc").css("filter", "invert(100%)");
            $(".sp").css("filter", "invert(100%)");
            $(".bc").css("filter", "invert(100%)");
        }else{
            $("body").css("filter", "invert(0%)");
            website_color = 0;
            $(".cover_art").css("filter", "invert(0%)");
            $(".yt").css("filter", "invert(0%)");
            $(".sc").css("filter", "invert(0%)");
            $(".sp").css("filter", "invert(0%)");
            $(".bc").css("filter", "invert(0%)");
        }

    });
    $(document).ready(function(){
        $("body").show();
    });
    about.click(function(){
        $(".container-1").animate({left: "-100vw"}, 1000);
        $(".container-2").animate({left: "0"}, 1000);
    });
    music.click(function(){
        $(".container-1").animate({top: "-100vh"}, 1000);
        $(".container-3").animate({top: "0"}, 1000);
    });
    contact.click(function(){
        $(".container-1").animate({left: "100vw"}, 1000);
        $(".container-4").animate({left: "0"}, 1000);
    });
    back1.click(function(){
        $(".container-1").animate({left: "0"}, 1000);
        $(".container-2").animate({left: "100vw"}, 1000);
    });
    back2.click(function(){
        $(".container-1").animate({top: "0"}, 1000);
        $(".container-3").animate({top: "100vh"}, 1000);
    });
    back3.click(function(){
        $(".container-1").animate({left: "0"}, 1000);
        $(".container-4").animate({left: "-100vw"}, 1000);
    });
    responsive();
});

$(window).resize(function(){
    responsive();
});

function responsive(){
    if($(window).width() < 1450){
        about.html('<i class="fas fa-info"></i>');
        music.html('<i class="fas fa-music"></i>');
        contact.html('<i class="fas fa-envelope"></i>');
    }else{
        about.html('about me');
        music.html('music');
        contact.html('contact');
    }
}

$(".parallax_bg").mousemove(function(e) {
    parallaxIt(e, ".background", -50);
  });
  
  function parallaxIt(e, target, movement) {
    var $this = $(".parallax_bg");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;
  
    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }
  