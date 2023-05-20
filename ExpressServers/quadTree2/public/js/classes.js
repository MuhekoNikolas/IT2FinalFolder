

class quadTree {
    constructor(boundary, cap=4){
        this.boundary = boundary
        this.cap = cap

        this.points = []

        this.divided = false

        this.color = color(random(255), random(255), random(255)) || random(["red", "blue", "green", "orange", "white", color(random(255), random(255), random(255))])

    }

    insert(p){
        if(this.points.length < this.cap){
            this.points.push(p)
        } else {
            if(this.divided == false){
                this.subDidvide()
            }

            if(this.northW.intersects(p)){
                this.northW.insert(p)
            } else if(this.northE.intersects(p)){
                this.northE.insert(p)
            } else if(this.southE.intersects(p)){
                this.southE.insert(p)
            } else{
                this.southW.insert(p)
            } 
        }
    }

    
    intersects(p, method=1){
        if(method==1){
            if(
                p.pos.x >= this.boundary.pos.x && 
                p.pos.x <= this.boundary.pos.x + this.boundary.w &&
                p.pos.y >= this.boundary.pos.y && 
                p.pos.y <= this.boundary.pos.y + this.boundary.h
            ){
                return true
            } else {
                return false
            }
        } else {
            return !(
                p.pos.x - p.w > this.boundary.pos.x + this.boundary.w ||
                p.pos.x + p.w < this.boundary.pos.x - this.boundary.w  ||
                p.pos.y - p.h > this.boundary.pos.y + this.boundary.h ||
                p.pos.y + p.h < this.boundary.pos.y - this.boundary.h
            )
        }
    }


    subDidvide(){
        this.northW = new quadTree(new Rectangle(this.boundary.pos.x, this.boundary.pos.y, this.boundary.w/2, this.boundary.h/2), 4)

        this.northE = new quadTree(new Rectangle((this.boundary.pos.x + this.boundary.w/2), this.boundary.pos.y, this.boundary.w/2, this.boundary.h/2), 4)
        this.southE = new quadTree(new Rectangle((this.boundary.pos.x + this.boundary.w/2), (this.boundary.pos.y + this.boundary.h/2), this.boundary.w/2, this.boundary.h/2), 4)
        this.southW = new quadTree(new Rectangle(this.boundary.pos.x, (this.boundary.pos.y + this.boundary.h/2), this.boundary.w/2, this.boundary.h/2), 4)

        this.divided = true
    }

    draw(){
        strokeWeight(1)
        stroke(this.color)
        noFill()
        rect(this.boundary.pos.x, this.boundary.pos.y, this.boundary.w, this.boundary.h)
        if(this.divided == true){
            this.northW.draw()
            this.northE.draw()
            this.southE.draw()
            this.southW.draw()
        }
    }

    highlight(border, nearPoints){
        if(this.intersects(border, 2)){

            for(p of this.points){
                if(dist(p.pos.x, p.pos.y, border.pos.x, border.pos.y) <= border.w/2){
                    nearPoints.push(p)
                }
            }

            if(this.divided == true) {
                this.northW.highlight(border, nearPoints)
                this.southW.highlight(border, nearPoints)
                this.northE.highlight(border, nearPoints)
                this.southE.highlight(border, nearPoints)
            }
            return nearPoints
        } else {
            return
        }
    }
}

class Rectangle {
    constructor(x,y,w,h){
        this.pos = createVector(x,y)
        this.w = w 
        this.h = h
    }
}

class Point{
    constructor(x, y){
        this.pos = createVector(x,y)
        let r = random(255)
        let g = random(255)
        let b = random(255)
        this.color = color(r, g, b, 0.5)
        this.originalColor = color(r, g, b, 0.5)
        this.color.alpha = this.originalColor.alpha = 0.5

        this.shape = random(1)
        this.w = (noise(random(10)) * 5) + (10 * this.shape)
        this.h = (noise(random(10)) * 5) + (10 * this.shape)
    }


    draw(){
        if(config.choice == 1){
            this.color.setAlpha(255)
            fill(this.color)
            this.shape > 0.5 ? (()=>{
                rect(this.pos.x, this.pos.y, this.w, this.h)
            })() : (()=>{
                circle(this.pos.x, this.pos.y, this.w, this.h)
            })()
    
            if(this.color.alpha != this.originalColor.alpha){
                this.color.setAlpha(this.originalColor.alpha)
            }
    
            if(this.color != this.originalColor){
                this.color = this.originalColor
            }
        } else {
            fill(this.color)
            this.shape > 0.5 ? (()=>{
                rect(this.pos.x, this.pos.y, this.w, this.h)
            })() : (()=>{
                circle(this.pos.x, this.pos.y, this.w, this.h)
            })()
    
            if(this.color.alpha != this.originalColor.alpha){
                this.color.setAlpha(this.originalColor.alpha)
            }
        }
    }
}