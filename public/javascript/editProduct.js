//var inputs = document.getElementsByClassName('editButton');
//var inputs = document.getElementsByClassName('hidden');
$(document).ready(function(){
  $(".editButton").click(function(){
    console.log("hola");
    $(this).parent().siblings().toggleClass("d-none");
    $(this).parent().toggleClass("d-none");
  });
});
