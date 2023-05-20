


class QuadTree {
    constructor(x, y,  w, h, cap){
        this.pos = createVector(x,y)
        this.w = w
        this.h = h 

        this.cap = cap
        this.divided = false

        this.points = []
    }

    subDivide(){
        this.northW = new QuadTree(this.pos.x, this.pos.y, this.w/2, this.h/2, this.cap)
        this.northE = new QuadTree(this.pos.x + (this.w/2) , this.pos.y, this.w/2, this.h/2, this.cap)
        this.southW = new QuadTree(this.pos.x, this.pos.y+(this.h/2), this.w/2, this.h/2, this.cap)
        this.southE = new QuadTree(this.pos.x + (this.w/2) , this.pos.y+(this.h/2), this.w/2, this.h/2, this.cap)

        this.divided = true
    }

    insert(p){
        if( this.points.length >= this.cap ){
            if(this.divided == false){
                this.subDivide()
            }

            this.northW.insert(p)
            this.northE.insert(p)
            this.southW.insert(p)
            this.southE.insert(p)
        } else {
            if(this.containsPoint(p)){
                this.points.push(p)
            }
        }
    }

    containsPoint(p){
        if(
            p.pos.x >= this.pos.x &&
            p.pos.x <= this.pos.x + this.w && 
            p.pos.y >= this.pos.y && 
            p.pos.y <= this.pos.y + this.h
        ){
            return true
        } 
        return false
    }

    intersects(p){
        return !(
            p.pos.x - p.w > this.pos.x + this.w ||
            p.pos.x + p.w < this.pos.x - this.w  ||
            p.pos.y - p.h > this.pos.y + this.h ||
            p.pos.y + p.h < this.pos.y - this.h
        )
    }

    draw(){
        stroke(155)
        strokeWeight(0.5)
        noFill()
        rect(this.pos.x, this.pos.y, this.w, this.h)

        if(this.divided){
            this.northW.draw()
            this.southW.draw()
            this.northE.draw()
            this.southE.draw()
        }
    }

    search(p, foundNearPoints){
        if(this.intersects(p)){
            for(let p of this.points){
                if(dist(p.pos.x, p.pos.y, this.pos.x, this.pos.y) <= config.nearRange/2){
                    foundNearPoints.push(p)
                }
            }

            if(this.divided == true){
                this.northW.search(p, foundNearPoints)
                this.southW.search(p, foundNearPoints)
                this.northE.search(p, foundNearPoints)
                this.southE.search(p, foundNearPoints)
            }

            //console.log(foundNearPoints)
            return foundNearPoints
        } else {
            return []
        }
    }
}



class Point{
    constructor(x= random(width), y=random(height), w=null, h=null){
        this.pos = createVector(x, y)
        this.w = w || 10
        this.h = h || 10

        this.color = color(random(255), random(255), random(255))
        this.colorChanged = false

        this.acceleration = createVector(0,0)
        this.velocity = p5.Vector.random2D()

        this.averageDesiredLocation = createVector(0,0)
    }

    draw(){
        this.getAverageColor()
        stroke(this.color)
        //circle(this.pos.x, this.pos.y, config.nearRange)
        rect(this.pos.x, this.pos.y, this.w, this.h)
        //point(this.pos.x, this.pos.y)
    }

    getNearest(){
        let foundNearPoints = []
        tree.search(p=this, foundNearPoints)
        return foundNearPoints
    }


    getAverageColor(){
        let nearest = this.getNearest()
        if(nearest.length <= 0 ){
            this.averageDesiredLocation = createVector(random(width), random(height))
            return this.color
        } else {
            let averageColor = {r:0,g:0,b:0};
            let totalChanged = 0
            for(let nPoint of nearest){
                if(nPoint.colorChanged==true){
                    continue
                }
                averageColor.r += red(nPoint.color)
                averageColor.g += green(nPoint.color)
                averageColor.b += blue(nPoint.color)

                this.averageDesiredLocation.add(nPoint.pos)
                totalChanged ++
            }

            for(let nPoint of nearest){
                if(nPoint.colorChanged==true){
                    continue
                }

                nPoint.averageDesiredLocation = createVector(this.averageDesiredLocation.x/totalChanged, this.averageDesiredLocation.y/totalChanged)

                nPoint.color = color(averageColor.r/totalChanged, averageColor.g/totalChanged, averageColor.b/totalChanged)
                nPoint.colorChanged = true
            }
            this.color = color(averageColor.r/totalChanged, averageColor.g/totalChanged, averageColor.b/totalChanged)
            this.colorChanged = true
            this.averageDesiredLocation.div(totalChanged)
        }
    }

    update(){
        let desiredLocation = this.averageDesiredLocation
        // if(desiredLocation.x < 1 && desiredLocation.y< 1){
        //     desiredLocation = createVector(random(width), random(height))
        //     this.averageDesiredLocation = createVector(desiredLocation.x, desiredLocation.y)
        // }
        
        let steerForce = p5.Vector.sub(desiredLocation, this.pos)
        steerForce.setMag(PI)

        steerForce.sub(this.velocity)
        steerForce.limit(0.4)

        this.acceleration.add(steerForce)
        this.pos.add(this.velocity)

        this.velocity.add(this.acceleration);

        console.log(this.velocity)
        this.acceleration.mult(0)
        this.checkBorders()
    }

    flee(target){
        let desiredLocation = createVector(target.pos.x, target.pos.y)
        if(dist(desiredLocation.x, desiredLocation.y, this.pos.x, this.pos.y) < config.nearRange){
            let steerForce = p5.Vector.sub(desiredLocation, this.pos)
            steerForce.setMag(PI)

            steerForce.mult(-1)
            steerForce.sub(this.velocity)
            steerForce.limit(0.4)

            this.acceleration.add(steerForce)
            this.pos.add(this.velocity)

            this.velocity.add(this.acceleration);

            console.log(this.velocity)
            //this.acceleration.mult(0)
            this.checkBorders()
        }    
    }

    checkBorders(){
        if(this.pos.x >= width){
            this.pos.x = 0
    
            this.averageDesiredLocation = createVector(width,random(height))
        } else if(this.pos.x < 0){
            this.pos.x = width
    
            this.averageDesiredLocation = createVector(0,random(height))
        }else if(this.pos.y >= height){
            this.pos.y = 0
    
            this.averageDesiredLocation = createVector(random(width),height)
        } else if(this.pos.y < 0){
            this.pos.y = height
    
            this.averageDesiredLocation = createVector(random(width),0)
        }
    }
}