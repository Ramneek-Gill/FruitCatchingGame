var isPlaying = false;
var score = 0;
var livesLeft;
var item = ['apple.png', 'spider.png'];
var step = 0;
var action;
var num;
$(function(){
    //when start/reset is clicked
    $("#startreset").click(function(){
        //if we are already playing then reload page
        if(isPlaying == true){
            location.reload();
        }
        //if not playing yet, start up the game
        else{
            isPlaying = true;
            
            //set score to 0
            $("#scorevalue").html(score);
            $("#livesleft").show();
            
            //add lives onto screen
            livesLeft = 3;
            addHeart();
            
            //hide gameover
            $("#gameover").hide();
            
            $("#startreset").html("Reset Game");
            startAction();
        }
    });
    $("#fruit1").mouseover(function(){
        if(num == 1){
            hitSpider();
            clear();
            startAction();
        }
        else{
            //update score
            score++;
            $("#scorevalue").html(score);
            
            //clear fruit
            clear();
            
            //restart
            startAction();
            
            
            
        }
    });
function addHeart(){
    $("#livesleft").empty();
    for(i = 0; i < livesLeft; i++){
        $("#livesleft").append('<img src="images/heart.jpg" class="life">');
    }
}
function startAction(){
    $("#fruit1").show();
    num = chooseFruit(); // chose random 

    //random position on screen
    $("#fruit1").css({
        left: Math.round(Math.random()*550),
        top: -50
    });

    //random step going downward
    step = 1+ Math.round(Math.random()*5);

    
    //move fruit downward
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        if($("#fruit1").position().top > $("#gamescreen").height()){
            //check if any lives left
            if(livesLeft > 1 || num == 1){
                if(num != 1){
                    livesLeft--;
                    addHeart();
                }
                $("#fruit1").show();
                num = chooseFruit(); // chose random 

                //random position on screen
                $("#fruit1").css({
                    left: Math.round(Math.random()*550),
                    top: -50
                });

                //random step going downward
                step = 1+ Math.round(Math.random()*5);
                
                //take life off by one

                
            }else{
                //game over
                isPlaying = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html("<p>Game Over!</p><p>Your Score is " + score + "</p>");
                $("#livesleft").hide();
                //stop interval and stop dropping items
                clearInterval(action);
                $("#fruit1").hide();
                
            }
        }
    }, 10);

    
}


//Generate an apple or spider

function chooseFruit(){
    var itemNum = Math.round(Math.random());
    $("#fruit1").attr('src', 'images/' + item[itemNum]);
    return itemNum;
}
function hitSpider(){
            if(livesLeft > 1){
                    livesLeft--;
                    addHeart();           
            }else{
                //game over
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html("<p>Game Over!</p><p>Your Score is " + score + "</p>");
                $("#livesleft").hide();
                //stop interval and stop dropping items
                clearInterval(action);
                $("#fruit1").hide();
                
            } 
}
function clear(){
    clearInterval(action);
    $("#fruit1").hide();
}
});
