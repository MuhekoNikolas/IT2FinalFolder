

function divideFloor(number, divisions){
    _normalModuli = number%divisions
    _number = number - _normalModuli
    return _number/divisions

}

function imageWithRotation(src, _x, _y, _width, _height, angle=0){
    imageMode(CENTER);
    translate(_x+_width/2, _y+_width/2);
    rotate(PI/180*angle);
    image(src, 0, 0, _width, _height);
    rotate(-PI / 180 * angle);
    translate(-(_x+_width/2), -(_y+_width/2));
    imageMode(CORNER);
  }

class SnakePart{
    constructor(color=config.snake.partsColor, position=createVector(0,0), head=false){
        if(color==null){
            color=config.snake.partsColor
        }

        this.color = color
        this.pos = position

        this.head = head

        this.draw()
    }

    draw(){
        fill(this.color)
        this.part = rect(this.pos.x, this.pos.y, config.snake.partSize, config.snake.partSize)
        if(this.head==true){
            if(["right", "left"].includes(config.controls.moveDirection.toLowerCase())){
                imageWithRotation(config.images.snakeEyes, this.pos.x, this.pos.y, config.snake.partSize, config.snake.partSize, 90)
            } else {
                imageWithRotation(config.images.snakeEyes, this.pos.x, this.pos.y, config.snake.partSize, config.snake.partSize)
            }
        } else {
            image(config.images.snakePartTexture, this.pos.x, this.pos.y, config.snake.partSize, config.snake.partSize)
        }
    }
}


class Snake{
    constructor(){
        this.snakeHead = new SnakePart(config.snake.headColor, createVector(0,0), true)
        config.snake.parts[Object.keys(config.snake.parts).length] = this.snakeHead

        this.speed = createVector(config.snake.partSize,config.snake.partSize)

        for(let _count=0; _count<config.snake.numberOfStartingParts; _count++){
            this.eat()
        }

        config.snake.moveInterval = setInterval(1000, this.move())
    }

    move(){
        this.checkIfAteFood() //Loop through all the foods and check if the new Head position meets with them
        this.checkIfAteBomb()
        this.moveOtherSnakeParts()
        if(config.controls.moveDirection == "right"){
            this.snakeHead.pos.x += this.speed.x
        } else if(config.controls.moveDirection == "left"){
            this.snakeHead.pos.x -= this.speed.x
        } else if(config.controls.moveDirection == "down"){
            this.snakeHead.pos.y -= this.speed.y
        } else if(config.controls.moveDirection == "up"){
            this.snakeHead.pos.y += this.speed.y
        }

        if(this.snakeHead.pos.x > width-config.snake.partSize){
            this.snakeHead.pos.x = 0
        } else if(this.snakeHead.pos.x < 0){
            
            this.snakeHead.pos.x = width-config.snake.partSize

        }

        if(this.snakeHead.pos.y > height-config.snake.partSize){
            this.snakeHead.pos.y = 0
            
        } else if(this.snakeHead.pos.y < 0){

            this.snakeHead.pos.y = height-config.snake.partSize
            
        }
    }

    moveOtherSnakeParts(){
        for(let _snakePartIndex_ of Object.keys(config.snake.parts).reverse()){
 
            if(Object.keys(config.snake.parts).indexOf(_snakePartIndex_) == 0){
                break
            }

            let _snakePart_ = config.snake.parts[_snakePartIndex_]
            let _nextSnakePart = config.snake.parts[_snakePartIndex_-1] 

            _snakePart_.pos = createVector(_nextSnakePart.pos.x, _nextSnakePart.pos.y)
        }
    }


    eat(){
        let _lastPartPosition = createVector( config.snake.parts[Object.keys(config.snake.parts).length-1].pos.x, config.snake.parts[Object.keys(config.snake.parts).length-1].pos.y)
        let _newPart = new SnakePart(null, _lastPartPosition)

        config.snake.parts[Object.keys(config.snake.parts).length] = _newPart

    }

    eatBomb(){
        let oldSnakeParts = Object.keys(config.snake.parts)
        let newSnakeParts = oldSnakeParts.slice(0, oldSnakeParts.length-2)

        if(newSnakeParts.length < 1){
            this.die()
            return
        } 

        let newPartsDict = {}

        for(let _snakePart of newSnakeParts){
            newPartsDict[_snakePart] = config.snake.parts[_snakePart]
        }

        config.snake.parts = newPartsDict
    }

    checkIfAteFood(){
        let _newSpawnedFoods = {}

        for(let _foodKey of Object.keys(config.foods.spawned)){
            let _food = config.foods.spawned[_foodKey]
            if(this.snakeHead.pos.x >= _food.pos.x && this.snakeHead.pos.x < _food.pos.x+_food.size){
                if(this.snakeHead.pos.y >= _food.pos.y && this.snakeHead.pos.y < _food.pos.y+_food.size){
                    this.eat()
                    _newSpawnedFoods[_foodKey] = new SnakeFood(getRandomFoodType())
                    config.sounds.eat.play()
                    continue
                }
            }

            _newSpawnedFoods[_foodKey] = _food
        }

        config.foods.spawned = _newSpawnedFoods
    }

    checkIfAteBomb(){
        let _newSpawnedBombs = {}

        for(let _bombKey of Object.keys(config.bombs.spawned)){
            let _bomb = config.bombs.spawned[_bombKey]
            if(this.snakeHead.pos.x >= _bomb.pos.x && this.snakeHead.pos.x < _bomb.pos.x+_bomb.size){
                if(this.snakeHead.pos.y >= _bomb.pos.y && this.snakeHead.pos.y < _bomb.pos.y+_bomb.size){
                    this.eatBomb()
                    _newSpawnedBombs[_bombKey] = new snakeBomb()
                    config.sounds.bomb.play()
                    continue
                }
            }

            _newSpawnedBombs[_bombKey] = _bomb
        }

        config.bombs.spawned = _newSpawnedBombs
    }

    die(){
        config.game.state.paused = true
        config.snake.dead = true
    }

}


class SnakeFood{
    constructor(type="banana", size=config.snake.partSize){
        this.type = type 
        this.size = size
        this.pos = createVector(random(width),  random(height) )

        this.pos.x = this.pos.x -  (this.pos.x%config.snake.partSize) 
        this.pos.y = this.pos.y - (this.pos.y%config.snake.partSize)
    }


}


class snakeBomb extends SnakeFood{
    constructor(size=config.snake.partSize){
        super("bomb", size)
    }
}