

class userBlock {
    //This is the class that manages the red block that the use uses.
    constructor() {
        //Constrcutor for the class, setting and initiating class variables.
        this.width = 200
        this.height = 30

        this.pos = p5.Vector.random2D() //2d Vector for positions.
        this.pos.x = 100
        this.pos.y = height
        this.speed = noise(20) * 30

        this.color = "green"
    }

    draw() {
        //This is the function that graphically represents this object.
        //fill("#0C52D3")
        fill(this.color)
        rect(this.pos.x, this.pos.y - this.height, this.width, this.height, 20)
    }

    limitSpeed(){
        //Limit the speed of the userblock to avoid the block from getting off screen.
        if(this.speed > this.width){this.speed = this.width/2}
    }

    update(){
        if(this.pos.x > width-this.width){
            this.pos.x = width-this.width
        } else if(this.pos.x < 0){
            this.pos.x = this.width
        }
    }
}



class computerBlock extends userBlock{
    constructor(){
        super()
        this.pos.y = 0 + this.height


        this.color = "red"

        this.velocity = p5.Vector.random2D()
        this.acceleration = p5.Vector.random2D()
    }

    update(){
        //Adding the steering effect on the computer's block.
        let nearestBall = balls[0]
        for(let _ball of balls){
            if(_ball.lastPos.y > _ball.pos.y){
                if(_ball.pos.y < nearestBall.pos.y){
                    nearestBall = _ball
                }
            }
        }

        this.nearestBallPos = createVector(nearestBall.pos.x-(this.width/2), nearestBall.pos.y)
        this.acceleration = p5.Vector.sub(this.nearestBallPos, this.pos)
    
        this.acceleration.setMag(5)
    
        this.velocity.add(this.acceleration)
        this.velocity.limit(20)
    
        
        this.pos.add(this.velocity)
        this.pos.y = 0+this.height

        // console.log(nearestBall)
        // this.pos.x = nearestBall.pos.x
    }


}



class Ball {
    constructor() {
        //The constructor for the Ball class,
        this.pos = new p5.Vector(random(width), 0)
        this.lastPos = new p5.Vector(0,0)

        this.width = 30
        this.speedY = noise(5) * 5 //Math.random(6) * 9
        Math.round(Math.random(0) * 1) == 1 ? this.speedX = noise(2) * -4 : this.speedX = noise(2) * 4

        this.speedRewards = noise(Math.round(Math.random(1) * 5))*10
        this.giveRewards = false
        console.log(this.speedY)
        this.speedY < noise(10) * 40 ? (()=>{console.log(this.speedY); this.speedY = 4})() : this.speedY = this.speedY
        this.speedX < 0 ? (()=>{this.speedX * -1 < 2 ? this.speedX = noise(2)*7 : -1 })() : (()=>{this.speedX < 2 ? this.speedX = noise(2)*7 : -1 })() //Making sure that the ball's speed on the x-Axis is never < -2,2 >
    }
    draw() {
        noStroke()
        fill(color(200, 250, 200, 15))
        rect(this.lastPos.x, this.lastPos.y-5, this.width, this.width, 10) //The balls contrail
        this.speedRewards > 8 ? fill("#B2B5F5") : fill("#4021F2")
        rect(this.pos.x, this.pos.y, this.width, this.width, 20)
    }

    update() {
        this.pos.y += this.speedY
        this.pos.x += this.speedX

        if (this.pos.y > height) {
            this.pos = new p5.Vector(random(width), 0)
            //Math.round(Math.random(0) * 1) == 1 ? this.speedX = -5 : this.speedX = 5
            this.speedRewards = noise(Math.round(Math.random(1) * 5))*10
        }
        if (this.pos.x > width - this.width || this.pos.x < 0 + this.width - this.width) {
            this.speedX *= -1
        }

        this.lastPos = new p5.Vector(this.pos.x-this.speedX, this.pos.y-this.speedY)

        this.checkIntersection()

    }

    checkIntersection() {
        if (this.pos.x > UserBlock.pos.x && this.pos.x < (UserBlock.pos.x + UserBlock.width)) {
            if (this.pos.y > height - UserBlock.height) {
                if(this.giveRewards == true){
                    let pointsToGive;
                    this.speedRewards <= 8 ? pointsToGive = 1 : pointsToGive = 1.5
                    PointCounter.innerText = Number(PointCounter.innerText) + pointsToGive
                    pointsToGive > 1 ? LivesCounter.innerText = Number(LivesCounter.innerText) + 0.5 : -1
                    UserBlock.speed += noise(this.speedRewards)*30
    
                    if (Number(PointCounter.innerText) % 5 == 0) {
                        let anotherBall = new Ball()
                        anotherBall.speedY = noise(this.speedY * (2/3))*7
                        balls.push(anotherBall)
                        UserBlock.speed += noise(5)*30
                        LivesCounter.innerText = Number(LivesCounter.innerText) + 3
                    }
                    //this.pos = new p5.Vector(random(width), 0)
                    Math.round(Math.random(0) * 1) == 1 ? this.speedX = noise(5) * -5 : this.speedX = noise(5)*5
                    this.speedRewards = noise(Math.round(Math.random(1) * 5))*10
                    this.giveRewards = false
                }
            }
        } else {
            if (this.pos.y >= height - (UserBlock.height / 2)) {

                    LivesCounter.innerText = Number(LivesCounter.innerText) - 1
                    //this.pos = new p5.Vector(random(width), 0)
                    //Math.round(Math.random(0) * 1) == 1 ? this.speedX = -5 : this.speedX = 5
                    this.speedRewards = noise(Math.round(Math.random(1) * 5))*10
                    console.log("Dead")
                    this.giveRewards = false
                
            }
            
        }

        if(this.pos.y >=  height - (UserBlock.height / 2) || this.pos.y < 0){
            this.speedY *= -1
            this.giveRewards = true
        } else {
            this.giveRewards = false
        }
    }

}
