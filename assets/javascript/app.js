$(document).ready(function() {

    var totalRight = 0;
    var totalWrong = 0;
    var unanswered = 0;
    var correct;
    var questionNum = 1;
    var interval;
    var time;
    var questionOn;

    var textAnswers = ["empty", "Terrible Lizzard", "Paleontologist", "Brachiosaurus", "Dino", "Titanosaur", "Ankylosaurus","Micheal Crichton","Brontosaurus","Cambrian","65 million years"]
    var pictures = ["","terriblelizard.jpg","fossils.gif","brachiosaurus.gif","dino.jpg","titanosaur.gif","ankylosaurus.gif","michaelcrichton.jpg","apatosaurus.gif","mesotimeline.gif","meteor.gif"]

    // Hiding questions, bumper, timer and scorecard on start up.
    function startpage() 
    {
        $(".question, .bumper, .timer, .scorecard").hide();
        $("#startbutton").show();
        questionOn = false;
    }

    // On click for start button. Shows Q1 and hides the button.
    $("#startbutton").click(function() 
    {
        questionNum = 1;
        $(".bumper, .scorecard").hide();
        showquestion();
        timer();
    });

    function showquestion() 
    {
        $("#q" + questionNum).show();
        $(".timer").show();
        $("#startbutton").hide();
        time = 8;
        questionOn = true;
        correct = undefined;
    };

    function showScorecard()
    {
        $(".bumper, .timer").hide();
        $("#q" + questionNum).hide();
        $(".scorecard").show();
        $("#totalRight").text("Correct: " + totalRight);
        $("#totalWrong").text("Incorrect: " + totalWrong);
        $("#unanswered").text("Unanswered: " + unanswered);
    }

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
        questionOn = false;
        time = 5;
        $("#correct").text("The answer is " + textAnswers[questionNum]);
        $("#bumperImage").attr("src", "assets/images/" + pictures[questionNum])
        if (correct == true) 
        {
            $("#message").text("You Are Correct!");
            totalRight++;
        } else if (correct == false) {
            $("#message").text("Better Luck Next Time!");
            totalWrong++;
        } else {
            $("#message").text("Out of Time!"); 
        }
        questionNum++;
        $(".bumper").show();
        $(".timer").hide();
        console.log("Right: " + totalRight, "Wrong: " + totalWrong, "Unanswered: " + unanswered, "Question#: " + questionNum);
    }

    // Runs the decreasing countdown. Based on questionOn and when clock = 0 it knows what to run.
    function timer() 
    {
        interval = setInterval(count, 1000);
    }

    function count() 
    {
        time--;
        var convert = timeConverter(time);
        $("#timer").text(convert);
        console.log(time, questionNum, questionOn);
        if(time === 0 && questionOn === true) 
        {
            unanswered++;
            $("#q" + questionNum).hide();
            bumper();
        } else if (time === 0 && questionOn === false) 
        {
            if (questionNum < 11) 
                {
                    $(".bumper").hide();
                    showquestion();
                } else 
                {
                    showScorecard();
                    $("#startbutton").show();
                    clearInterval(interval);
                }
        }
    }

    // Displays time in normal format
    function timeConverter(t) 
    { 
        var seconds = t;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return ":" + seconds;
    }
        
    startpage();

});