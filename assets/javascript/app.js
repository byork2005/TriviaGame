$(document).ready(function() {

    var totalRight = 0;
    var totalWrong = 0;
    var unanswered = 0;
    var correct;
    var totalTime;
    var questionNum = 1;

    var textAnswers = ["empty", "T-Rex", "Dinosaur", "Paleozoic"]


    // Hiding questions and bumper on start up. Set question number to 1.
    function startpage() 
    {
        $(".question, .bumper, .timer").hide();
        $("#startbutton").show();
        questionNum = 1;
    }

    // On click for start button. Shows Q1 and hides the button.
    $("#startbutton").click(function()
    {
        $("#q" + questionNum).show();
        $("#startbutton").hide();
        questionTimer();
    });

    // On click event to determine if choice is correct. Run Bumper function.
    $(".answer").click(function() 
    {
        $("#q" + questionNum).hide();
        if (this.classList[1] == "true") 
        {
            correct = true;
        } else if (this.classList[1] !== "true") 
        {
            correct = false;
        } else 
        {
            correct = undefined;
        }
        bumper();
        console.log(event);   
    });
  
    // Shows correct messages, adds to score, shows bumper, starts countdown to next question.
    function bumper() 
    {
        $("#correct").text("The answer is " + textAnswers[questionNum]);
        $("#bumperImage").attr("src", "assets/images/" + "ruby.png")  // need to make array of image names. make placment match questionNum.
        if (correct == true) 
        {
            $("#message").text("You Are Correct!");
            totalRight++;
        } else if (correct == false) {
            $("#message").text("Sorry, Wrong!");
            totalWrong++;
        } else {
            $("#message").text("Sorry, Wrong!"); 
        }
    
        // {  
        //     $("#message").text("Sorry, Wrong!");
        //     totalWrong++;
        // }
        questionNum++;
        $(".bumper").show();
        console.log("Right: " + totalRight, "Wrong: " + totalWrong, "Unanswered: " + unanswered, "Question#: " + questionNum);
        bumperCountdown();
    }

    // 7 second timer to show bumper. Check round; then hide bumper and show next question or move to scorecard page.
    function bumperCountdown() 
    {
        setTimeout(function() 
            {
                $(".bumper").hide();
                if (questionNum < 11) 
                {
                    questionTimer();
                    $("#q" + questionNum).show();
                } else {
                    $(".scorecard").show();
                    $("#startbutton").show();
                }
            }, 1000 * 7);
    }

    // Question timer
    function questionTimer() 
    {
        setTimeout(function() 
        {
            bumper();
            unanswered++;
        }, 1000 * 10);
    }

    startpage();

});