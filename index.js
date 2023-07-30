var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern=[]
var started=false;
var level=0;
$(document).keypress(function(){
        if(!started)
        {
                $("#level-title").text("level"+level)
                nextSequence();
                started=true;
        }
});


$(".btn").click(function(){
        //finding the id using jquery.  
        
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
          playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
      });
function checkAnswer(len)
{
        if(userClickedPattern[len]===gamePattern[len])
        {
                if(userClickedPattern.length=== gamePattern.length)
                {
                        setTimeout(function(){
                        nextSequence();
                        },1000);
                }
        }
        else{
                playSound("wrong");
                $("body").addClass("game-over");
                setTimeout(function () {
                $("body").removeClass("game-over");
                 }, 200);
                 $("#level-title").text("Game Over, Press Any Key to Restart");
                 gamePattern=[];
                 level=0;
                 started=false;
        }
}

function nextSequence()
{
        userClickedPattern=[];
        level++;
        $("#level-title").text("Level " + level);

        var random = Math.floor(Math.random()*4);
        var randomChosenColour = buttonColours[random];
        gamePattern.push(randomChosenColour);

        //Using jQuery to select the button with the same id as the randomChosenColour

        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
        playSound(randomChosenColour);
}

function playSound(userChosenColour)
{
        var audio = new Audio("./sounds/"+userChosenColour+".mp3");
        audio.play();
}
function animatePress(userChosenColour)
{
        $("#"+userChosenColour).addClass('pressed');
        setTimeout(function () {
                $("#" + userChosenColour).removeClass("pressed");
              }, 100);
}