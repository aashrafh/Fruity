let playing = false;  //indicates the state of the page
let score;            //score of the player
let numOfTrials;      //Number of left trials
let step;             //Step of the image
let move;             //setInterval function
//List all the fruits name that we have
let fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

//jQuery Code
$(function(){
   $("#startreset").click(function(){
       if(playing){
           //If we are playing then you need to reset the game
           location.reload();
       }else{
           //If we are not playing then start the game
           playing = true;
           
           //Hide Game Over box
           $("#gameOver").hide();
           
           //Initialize the score with zero and change it in the score box
           score = 0;
           $("#scorevalue").html(score);
           
           //Show the trials box
           $("#trialsLeft").show();
           numOfTrials = 3;
           addTrials();
           
           //Change text in the start button to "Reset"
           $("#startreset").text("Reset");
           
           //Now, You are ready to play ^_^
           play();
       }
   });
    
    $("#fruit1").mouseover(function(){
        score++;                         //Increase the score
        
        $("#scorevalue").html(score);    //Update HTML content
        
        $("#slicesound")[0].play();      //Play the sound of slicing
        
        //stop the fruit and hide it
        clearInterval(action);
        $("#fruit1").hide("explode", 500); //slice the fruit
        
        //play again
        setTimeout(play, 500);
    });
    //Helper Functions

    //show the left trials
    function addTrials(){
        $("#trialsLeft").empty(); //empty any html element applied to it
        for(let i = 0; i<numOfTrials; ++i){
            $("#trialsLeft").append('<img src="img/heart.jpg" class="trial">')
        }
    }

    //the controller of the game
    function play(){
        $("#fruit1").show(); //show the fruit div
        chooseFruit();       //choose a random fruit image
        //Random position for the fruit image
        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

        step = Math.round(5*Math.random()) + 1; //generate a moving time
        action = setInterval(function(){        //move the image
            $("#fruit1").css('top', $("#fruit1").position().top+step);

            //check if he missed the fruit
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                if(numOfTrials > 1){
                    $("#fruit1").show(); //show the fruit div
                    chooseFruit();       //choose a random fruit image
                    //Random position for the fruit image
                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

                    step = Math.round(5*Math.random()) + 1; //generate a moving time
                    numOfTrials--;       //decrease the number of left trials
                    addTrials();         //display trials
                }else{
                    playing  = false;    //game over
                    $("#startreset").text("Start Game");
                    $("#gameOver").css('display', 'block');
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is '+score+'</p>')
                    stop();             //stop the game
                    $("#trialsLeft").hide();
                }
            }
        }, 10);
    }

    //choose a random fruit image
    function chooseFruit(){
        $("#fruit1").attr('src', 'img/'+fruits[Math.round(8*Math.random())]+'.png');
    }

    function stop(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});