


let tree;
let treeRepresentation;

let points = []

let config = {
    choice: 1,

    blocks: 10000,
    highlighterSize:160
}

function setup(){
    createCanvas(window.innerWidth,window.innerHeight)

    treeRepresentation = new Rectangle(0,0, width, height)
    tree = new quadTree(treeRepresentation, 4)

    if(config.blocks < 0 ){
        for(x=0; x<width/10; x++){
            for(y=0; y<height/10; y++){
                p = new Point(x*10,y*10)
                points.push(p)
                tree.insert(p)
            }
        }
    } else {
        for(x=0; x<config.blocks; x++){
            p = new Point(random(width), random(height))
            points.push(p)
            tree.insert(p)
            
        }
    }


}

function draw(){
    background(100,100,100)
    for(p of points){
        noStroke()
        p.draw()
    }

    if(mouseIsPressed){
        mouseIsPressedFunction()
    }
    //tree.draw()

    highLightInCircle()
}

function mouseIsPressedFunction(){
    // return
    p = new Point(mouseX, mouseY)
    points.push(p)
    tree.insert(p)
}

function highLightInCircle(){
    stroke("cyan")
    highlighterSize = config.highlighterSize
    fill(color(125, 178, 200, 100))
    circle(mouseX, mouseY, highlighterSize)
    noStroke()
    fill("cyan")
    circle(mouseX, mouseY, 10)

    pos = createVector(mouseX, mouseY)

    nearPoints = []
    tree.highlight({pos, w:highlighterSize, h:highlighterSize}, nearPoints)

    for(p of nearPoints){
        if(config.choice == 1){
            p.color = color(255, 0, 0)
            p.color.setAlpha(255)
            p.color.alpha = 255
        } else {
            p.color.setAlpha(255)
            p.color.alpha = 255
        }
    }

}