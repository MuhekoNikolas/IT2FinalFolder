

var config = {
    framesPerMove: 4,

    game: {
        state: {
            paused: false
        }
    },

    canvas: {
        width: 550,
        height: 550,
        color: "lime"
    },

    snake: {
        dead: false,
        moveInterval: "",

        headColor: "gold",
        partsColor: "blue",
        numberOfStartingParts: 5,
        parts: {

        },
        partSize: 25
    },

    foods: {
        spawned: {}
    },

    bombs: {
        spawned: {}
    },

    controls:{
        moveDirection: (()=>{return ["right","left","up","down"][Math.floor(Math.random(0)*4)]})(),
        keyInputs: {
            right:[39,68],
            left: [37, 65],
            down: [38, 87],
            up: [40, 83],
            pause: [32]
        }
    },

    sounds: {
        eat: {},
        die:{},
        bomb:{},
        theme:{},
    },

    images: {
        bomb: {},
        food: {
            banana:"",
            apple: ""
        }
    }
}

var snake;
var currentFrame = 0;


function preload(){
    eatSound = loadSound("./resources/sounds/eat.mp3")
    bombSound = loadSound("./resources/sounds/bomb.mp3")
    dieSound = loadSound("./resources/sounds/die.mp3")
    themeSound = loadSound("./resources/sounds/theme.mp3")

    bombImage = loadImage("./resources/images/bomb.png")
    bananaImage = loadImage("./resources/images/banana.png")
    appleImage = loadImage("./resources/images/apple.png")
    grassImage = loadImage("./resources/images/grass.png")
    snakePartTextureImage = loadImage("./resources/images/snakePartTexture.png")
    snakeEyesImage = loadImage("./resources/images/snakeEyes.svg")

    config.sounds.eat = eatSound
    config.sounds.bomb = bombSound
    config.sounds.die = dieSound
    config.sounds.theme = themeSound

    config.images.bomb = bombImage
    config.images.banana = bananaImage
    config.images.apple = appleImage
    config.images.grass = grassImage
    config.images.snakePartTexture = snakePartTextureImage
    config.images.snakeEyes = snakeEyesImage

}

function getRandomFoodType(){
    Math.random()*1 > 0.5 ? foodType = "banana" : foodType = "apple"
    return foodType
}


function setup(){
    setupCanvas()
    snake = new Snake()

    config.foods.spawned = {
        0: new SnakeFood(getRandomFoodType()),
        1: new SnakeFood(getRandomFoodType()),
        2: new SnakeFood(getRandomFoodType()),
        3: new SnakeFood(getRandomFoodType()),
        4: new SnakeFood(getRandomFoodType()),
        5: new SnakeFood(getRandomFoodType()),
        6: new SnakeFood(getRandomFoodType())
    }

    config.bombs.spawned = {
        0: new snakeBomb(),
        1: new snakeBomb(),
        2: new snakeBomb(),
        3: new snakeBomb(),
        4: new snakeBomb(),
        5: new snakeBomb()
    }
}

function draw(){
    background(config.canvas.color)

    if(config.game.state.paused == false && config.snake.dead == false){
        playBackgroundMusic()
        image(config.images.grass, 0,0, width,height)
        currentFrame += 1
        if(currentFrame%config.framesPerMove == 0){
            snake.move()
        }
    
        for(_snakePart of Object.keys(config.snake.parts).reverse()){
            config.snake.parts[_snakePart].draw()
        }
    
        for(_foodPart of Object.keys(config.foods.spawned)){
            _foodPart = config.foods.spawned[_foodPart]
    
            if(_foodPart.type == "banana"){
                foodImage = config.images.banana
            } else if(_foodPart.type == "apple"){
                foodImage = config.images.apple
            } else {
                foodImage = config.images.apple
            }
    
            image(foodImage, _foodPart.pos.x, _foodPart.pos.y, _foodPart.size, _foodPart.size)
        }
    
        for(_bombPart of Object.keys(config.bombs.spawned)){
            _bombPart = config.bombs.spawned[_bombPart]
    
            image(config.images.bomb, _bombPart.pos.x, _bombPart.pos.y, _bombPart.size, _bombPart.size)
            
        }
    } else {
        if(config.snake.dead == true){
            drawSnakeDiedScreen()
            return
        } else {
            drawGamePausedScreen()
            return
        }
    }
}


function setupCanvas(){
    createCanvas(config.canvas.width,config.canvas.height);

    canvasElement = document.querySelector("#defaultCanvas0")
    mainWrapper = document.querySelector("#mainWrapper")

    oldCanvasParent = canvasElement.parentNode

    mainWrapper.append(canvasElement)
    oldCanvasParent.remove()
    
}



function drawSnakeDiedScreen(){
    background("gray")
}

function drawGamePausedScreen(){
    background("orange")
}

function playBackgroundMusic(){
    if(config.sounds.theme.isPlaying() == false){
        config.sounds.theme.play()
    }
}

function pauseGame(pause=true){
    if(pause==true){
        config.game.state.paused = true
        if(config.sounds.theme.isPlaying() == false){
            config.sounds.theme.play()
        }
    } else {
        config.game.state.paused = false 
        if(config.sounds.theme.isPlaying() == true){
            config.sounds.theme.pause()
        }
    }
}

window.addEventListener("keyup", (event)=>{
    keyCode = event.keyCode
    controls = config.controls.keyInputs

    if(controls.right.includes(keyCode)){
        config.controls.moveDirection = "right"
    } else if(controls.left.includes(keyCode)){
        config.controls.moveDirection = "left"
    } else if(controls.down.includes(keyCode)){
        config.controls.moveDirection = "down"
    } else if(controls.up.includes(keyCode)){
        config.controls.moveDirection = "up"
    }

    else if(controls.pause.includes(keyCode)){
        config.game.state.paused == true ? pauseGame(false) : pauseGame(true)
    }
})


