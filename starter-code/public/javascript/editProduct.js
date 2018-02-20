//var inputs = document.getElementsByClassName('editButton');
//var inputs = document.getElementsByClassName('hidden');
$(document).ready(function(){
  $(".editButton").click(function(){
    $(this).parent().siblings().toggleClass("hide");
    $(this).parent().toggleClass("hide");
  });
});
