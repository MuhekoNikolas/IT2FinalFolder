




var ROADS = [] //This array holds all the roads that are displayed in the animation.
let count=0; //This is just a varaible that helps me manage the distancing between road borders.
var amount = 10; //The number of roads that are drawn.

var carTypes = [] //This array holds all the different colors of cars.

//Am not referencing the images in the ./images/ folder due to CORs interfering with the app, so i had to host them online.
var ImagesForCarsDict = {
  blueCar:"https://i.ibb.co/0QTPCcH/blue.png",
  blueCar2:"https://i.ibb.co/ysscnhz/blue2.png",
  redCar:"https://i.ibb.co/KskK0J1/red.png",
  yellowCar:"https://i.ibb.co/kgHqGTG/yellow.png"
} //Dictionary holding the urls for the car types.

var carImages = Object.values(ImagesForCarsDict) //The car images changed into an array.

first =  "https://i.ibb.co/0QTPCcH/blue.png" //The default image for cars incase the following for loop doesnt run, and first doesnt get defined.



for(_=0; _<amount; _++){
    //Giving each road a car type. Each road runs a only the same type of car.
    indexForImage = Math.floor(Math.random(0)*carImages.length)
    first = carImages[indexForImage]
    carTypes[carTypes.length] = first
}



function setup(){
  //The setup function thats called automaticaly when the page loads.

  animationCanvas = createCanvas(windowWidth, windowHeight) //Creating the canvas for the animation.

  canv = animationCanvas.elt //Getting the htmlObject version of the canvas
  canv.style.position = "fixed"
  canv.style.top = `0px`
  canv.style.left = "0px"
  


  for(let i=0; i<amount; i++){
    //Generating the Cars into the roads.
    this_type = carTypes[i] //Choose the image of the car.

    road = new ROAD(carImage=this_type, x=1)

    ROADS[ROADS.length] = road
    count+=1 //This variable helps me manage the spacing between roads, basically the index of roads.
  }

}



function draw(){
    background(color("#1c1c1c"))  //Clear the animation from the last frame.

    for (let roadInd in ROADS){
      //Iterate through all the cars and run the following methods.
      road = ROADS[roadInd]
      road.manageRoad()
      road.update()    
    }

    drawTheTextInTopRight()

}

function drawTheTextInTopRight(){
  stroke("red")
  text("Press q to go back to home", width-170, 60, 150, 100)
}

function windowResized() {
  //Resize the canvas when the window is resized, same as window.addEventListener('resize',...)
  resizeCanvas(windowWidth, windowHeight)
}


function mousePressed(){
  //Increase the speed of keys when the user clicks the mouse.
  for (carInd in ROADS){
    car = ROADS[carInd]
    car.mouseP()
  }
}






window.addEventListener("keyup", function (evt){
    //This function manages user inputs for movement, puasing the game and reseting the game.
    if(evt.keyCode == quitKey){
        //Quit multipong game
        location.href = "../index.html"
        return
    }
  }
)




