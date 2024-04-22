
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];//oyunun hafızası
var userClickedPattern=[];//kullanıcının tıkladığı renklerin hafızası
var started=false;
var level=0;
 
$(document).keydown(function(){

    if(!started){
    
       $("#level-title").text("Level " + level);
       nextSequence();
       started=true;
    }


});


$(".btn").click(function(){

    var ChosenColour=$(this).attr("id"); //seçilen renk id değişkenine atılır
   
    userClickedPattern.push(ChosenColour);// seçilen renk hafızaya atılır 

    playSound(ChosenColour);
    animatePress(ChosenColour);
    //son eklenen rengi uzunluktun bir çıkararak buluruz çünkü 4 renk varsa sonuncu 3.indeks olur
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel] ){
        console.log("başarılı");
    
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
      
        }
    }
    else {
    
        console.log("wrong");
        
       playSound("wrong")
        $( "body" ).addClass("game-over");//başta id olmalı ikincide sınıfı
        $("h1").text("YANDIN! Tekrar başlamak için bir tuşa bas.");
       
        var delayInMilliseconds = 200; //1 second
    
           setTimeout(function() {
            $("body").removeClass("game-over");
        } , delayInMilliseconds);
        startOver(); 
    }
      }

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
   
   var randomChosenColour= buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // bu bir flash efekti,id #a şeklinde bulunur, efekt id ile yapılır
 
       playSound(randomChosenColour);
}


function playSound(name){
  
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
   
  }

  function animatePress(currentColour){
    $( "#"+currentColour ).addClass("pressed");//başta id olmalı ikincide sınıfı
    var delayInMilliseconds = 100; //1 second

       setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    } , delayInMilliseconds);
  }

  function startOver(){
    level=0 ;
    gamePattern=[];
    started=false;
  }
  