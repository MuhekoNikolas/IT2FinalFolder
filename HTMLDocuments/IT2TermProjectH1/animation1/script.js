

let box={
    x:100,
    y:100,
    width:150,
    height: 100,
    color:0
}
  
  
let speedX= 10
let speedY = Math.random(9)*12;
  
let turn = 0;  
  
let colorArray= [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];


  
function setup(){
    //The startup function that gets called when the page loads 
    animationCanvas = createCanvas(windowWidth-50, windowHeight-120)
    
    canv = animationCanvas.elt // Getting the htmlObject representation of the canvas
    canv.style.position= "relative"
    canv.style.margin= "0px 0px"

    document.querySelector(".pageContent").appendChild(canv)
  
    graph1 = createGraphics(width,height) //This is the first graphics element of the app hence the name "graph1"
}
  
  
function draw(){

    //P5js's draw function thats randomly called x Times/Sec
    image(graph1,0,0) //Adding the p5js graphics Object "graph1" to this frame.
    graph1.rectMode("CENTER") 
    graph1.background(color("#072D73")) //Clearing the animation from the last frame.

    if(turn==0){
        //If it's the first frame of the animation.
        initialColor = colorArray[Math.round(Math.random()* colorArray.length)] //Giving the moving block a random color at start of the animation.
        graph1.fill(color(initialColor))
    }

    manageMovingBoxHittingTheBorders()

    drawMovingBox()

    updateMovingBox()

    turn++
}

function manageMovingBoxHittingTheBorders(){
    //Checks if any of the box's sides is touching the borders of the canvas and determines on wether the speed is positive(forward) or negative(reverse).
    if(box.x > width-box.width){
        cols = box.color
        box.color += 1
        graph1.fill(color(colorArray[cols]))
        
        speedX *= -1
        
    }
    
    if(box.y > height-box.height){
        cols = box.color
        box.color += 1
        graph1.fill(color(colorArray[cols]))
        
        speedY *= -1
    }
    
    if(box.x<0){
        cols = box.color
        box.color += 1
        graph1.fill(color(colorArray[cols]))
        
        speedX *= -1
    }
    
    if(box.y<0){
        cols = box.color
        box.color += 1
        graph1.fill(color(colorArray[cols]))
        
        speedY*= -1
    }
}

window.addEventListener("resize",()=>{
    resizeCanvas(windowWidth-50, windowHeight-120, true)
    graph1.width=  width
    graph1.height = height

})

function drawMovingBox(){
    graph1.rect(box.x, box.y, box.width, box.height, 20, 20, 20, 20) //Creating the moving rectangle width the box's x,y, width and height values.s
}

function updateMovingBox(){
    box.x += speedX
    box.y += speedY
  
    if(box.color>=colorArray.length){
      box.color=0 //Reseting the box's color to the first value of the colorsArray in case it reaches the last color.
    }
}