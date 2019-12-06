


var CurrentScroll=0;
$(window).scroll(function(event){
    var top = document.getElementById("topimage").style.top.split("p");
    top= top[0];
    var NextScroll = $(this).scrollTop();
    var count = top-((NextScroll-CurrentScroll)/1.26);
    if(NextScroll>CurrentScroll){
        $("#topimage").css("top",count+"px");
        console.log(count);
    }
    else{
        console.log(count);
        $("#topimage").css("top",count+"px");
        console.log(document.getElementById("topimage").style.top);
    }
    CurrentScroll=NextScroll;
});



$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });