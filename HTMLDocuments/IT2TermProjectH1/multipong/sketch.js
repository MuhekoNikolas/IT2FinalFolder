

//Initiating the UserBlock and ball vaiables.
var UserBlock;
var ComputerBlock;
var ball;

//Array containg all the balls, we will iterate through this array and manage each ball seperately.
var balls = []

//Counters.
var PointCounter;
var LivesCounter;

//This dict contains settings about the instance.
var config = {
    gamePaused: true
}


function setup() {
    //This function is also called automatically, but its called once. Its like the constructor function in classes. You enter initial settings for your animation here, and its also here where you initiate the p5 canvas.
    createCanvas(windowWidth, windowHeight)
    background("#051e4d")

    //Initiating the userBlock that the user uses.
    UserBlock = new userBlock()
    ComputerBlock = new computerBlock()
    ball = new Ball()

    //Adding a new ball to the balls array/list.
    balls.push(ball)

    //Defining the initiated PointCounter variable.
    PointCounter = document.querySelector(".pointsCounter")
    PointCounter.style.color = "blue"
    PointCounter.style["font-family"] = "Roboto, Helvetica, sans-serif "

    //Defining the initiated LivesCounter variable.
    LivesCounter = document.querySelector(".livesCounter")
    LivesCounter.style.color = "blue"
    LivesCounter.style["font-family"] = "Roboto, Helvetica, sans-serif "
}

function draw() {
    //Draw is the main function in p5js, its called automatically and holds what your animation does.
    background("#051e4d")
    if (config.gamePaused == false) {
        //Checking if the game is not paused.
        alive = checkGameState().alive
        if (alive == true) {
            //If the user is alive and the game isnt paused.
            stroke(0)

            for (ball of balls) {
                ball.draw()
                ball.update()
            }

            UserBlock.draw()
            ComputerBlock.draw()

            UserBlock.update()
            ComputerBlock.update()

            UserBlock.limitSpeed()
        } else {
            //If the user is dead.
            textSize(20)
            t = text("You died, press \"r\" to restart!", (width / 2) - (20 * 17), height / 2)
        }
    } else {
        //When the game is paused, show the animation in the drawPausedSceen function.
        drawPausedScreen()
    }

    //Drawing the text in the top right corner, this text shows controls for the game.
    textSize(20)
    fill("white")
    stroke("white")
    text("Press ' r ' to restart the game.", width - 300, 20)
    text("Press ' space ' to pause the game.", width - 300, 50)
    text("Press ' q ' to quit the game.", width - 300, 80)

}


function drawPausedScreen() {
    //Function for showing a different screen when the game is paused.
    stroke("white")
    fill("white")
    textSize(100)
    text("Game Paused", (width / 3) - 100, height / 2)
}

function checkGameState() {
    //Checks if the user's lives are greater than or equal to 0, if not then that means the game is over and the user is dead..
    if (Number(LivesCounter.innerText) >= 0) {
        return { alive: true }
    } else {
        return { alive: false }
    }
}


function resetGame() {
    //This function resets the game by resetting the values of the points, lives... Generating a new ball and also a new userBlock.
    UserBlock = new userBlock()
    balls = []
    ball = new Ball()
    balls.push(ball)

    PointCounter.innerText = "0"
    LivesCounter.innerText = "3"
}



function manageKeyInputs(evt) {
    //This function manages user inputs for movement, puasing the game and reseting the game.
    if(evt.keyCode == quitKey){
        //Quit multipong game
        location.href = "../index.html"
        return
    }
    if (evt.keyCode == rightKeyCode) {
        //Move right.
        if (UserBlock.pos.x < width - UserBlock.width) {
            toAdd = UserBlock.speed
            if (UserBlock.pos.x + UserBlock.speed > width) {
                toAdd = width - UserBlock.pos.x
            } 
            UserBlock.pos.x += toAdd
            
            return
        }
    }
    if (evt.keyCode == leftKeyCode) {
        //Move left.
        if (UserBlock.pos.x > 0) {
            toRemove = UserBlock.speed
            if (UserBlock.pos.x - UserBlock.speed < 0) {
                toRemove = UserBlock.pos.x
            } 
            UserBlock.pos.x -= toRemove
            
            return
        }
    }
    if (evt.keyCode == resetKeyCode) {
        //Reset game.
        resetGame()
    }

    if (evt.keyCode == spaceBarKeyCode) {
        //Pause game.
        config.gamePaused == true ? config.gamePaused = false : config.gamePaused = true
    }

}
window.addEventListener("keydown", manageKeyInputs) //Adding the event listener to the window in order to enable input logging.
