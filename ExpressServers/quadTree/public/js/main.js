

//PLAN: Get a point and change its color to the average color of all the surrounding points
let tree;
let points = []

config= {
    pointsCount:300,
    nearRange: 250,
    capacity:2
}

function setup(){
    // pixelDensity(1)
    createCanvas(window.innerWidth,window.innerHeight)

    tree = new QuadTree(0, 0, width, height, cap=config.capacity)
    generatePoints()
}

function draw(){
    background(0)

    newPoints = []
    tree = new QuadTree(0, 0, width, height, cap=config.capacity)
    for(p of points){
        tree.insert(p)
        //tree.draw()
        newPoints.push(p)
        p.draw()
        p.update()
        p.flee({pos:{x:mouseX, y:mouseY}, w:config.nearRange, h:config.nearRange})
    }

    fill(color(100, 140, 240, 140))
    circle(mouseX, mouseY, config.nearRange)
    points = newPoints
}


function generatePoints(){
    for(x=0; x<config.pointsCount;x++){
        p = new Point(random(width), random(height), 5+random(noise(PI)*3), 5)
        tree.insert(p)
        points.push(p)
    }
}