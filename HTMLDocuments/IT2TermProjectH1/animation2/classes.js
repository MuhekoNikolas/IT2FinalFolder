

class Tree{
    //Class that manages the drawing of trees on roads.
    constructor(road, x,y){
      this.road = road
  
      this.treeImage = loadImage("https://th.bing.com/th/id/R.c47206b6d21f52d91bbaa0876ccd013f?rik=9DCKgUCupbVKlQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftree-png-top-view-pics-for-tree-top-view-png-800.png&ehk=dWsLB07llLivhplYhmqwJrDBlGuN4LwzjLSO4nMlC9Y%3d&risl=&pid=ImgRaw&r=0")
  
      this.width = 40
      this.height = 40
  
      this.x = x
      this.y = (0 - this.height) * Math.floor(Math.random(60)*80)
    }
  
    draw(){
      //The draw function for displaying trees on given x,y,z positions.
      fill("red")
      image(this.treeImage, this.x, this.y, this.width, this.height)
    }
  
    update(){
      //Update the y position of the tree each frame.
      this.y += 10
      if(this.y > height){
        console.log(this)
        this.y = (0 - this.height) * Math.floor(Math.random(60)*80)
      }
    }
  
  }
  
  
  class ROAD {
    //The ROAD class is a class that manages what types of cars drive on what region.
    constructor(carImage, x){
      this.imageUrl = carImage
      this.img = loadImage(this.imageUrl) 
  
      this.x = (width/amount)*count //X position of the road, "width" is a p5js variable that represnts the canvas width.
  
      this.y =( Math.floor(Math.random(0)*200) )* -1 //Y position of the road, where the cars begin generation from. This needs to be off the screen so thats why its negative.
  
      this.div= Math.floor(Math.random(4)*6) 
  
      this.speed= Math.floor(Math.random(7)*10) || 7 //The speed of the cars on this road.
      this.quantity = Math.floor(Math.random(1)*50) //How many cars to show on this road
  
      this.distanceToExitSCreen; //This variable helps control on whether all the cars on the road have moved off the screen. 
      
      this.Trees = []
      for(_=0; _<2; _++){
        let _2 = _ + 20
        this.Trees.push(new Tree(this, this.x-15, (this.y+100) *_2 ))
      }
    }
  
    manageRoad(){
      //Drawing the road borders and managing where the cars are drawn.
      fill(color(	28, 40, 28))
  
      if(this.speed>=3){
        fill(color("#1c1c1c")) //Changing the color of the road if the speed of the current Cars is slow. Basically if there is traffic jam on this road.
      }
  
      rect(this.x, 0, this.img.width, height)
      stroke("orange")
  
      line(this.x+1, 0, this.x+1, height) //Drawing the road border.
  
      for(let carInd=1; carInd<=this.quantity; carInd++){
        //Drawing the cars and managing the space between them.
        let carSpace = (carInd+2) //Managing the space between cars on this road.
  
        if(this.imageUrl !=  ImagesForCarsDict.blueCar2){
          image(this.img, this.x+30, this.y - (((this.img.height/amount)* this.div )*carSpace), this.img.width/amount+20, this.img.height/amount+20) //Displaying the image of the car on the canvas. Refer to the p5js Image() reference
          this.distanceToExitSCreen = this.y - (((this.img.height/amount)* this.div )*carSpace) //This variable helps control on whether all the cars on the road have moved off the screen.         
        } else {
          image(this.img, this.x+20, (this.y - (((this.img.height/amount)* this.div )*carSpace))+(300*carSpace), (this.img.width/amount)+50, (this.img.height/amount)+50) //Displaying the image of the car on the canvas. Refer to the p5js Image() reference
          this.distanceToExitSCreen = (this.y - (((this.img.height/amount)* this.quantity))) //This variable helps control on whether all the cars on the road have moved off the screen. 
        }
  
      }
  
      for(let tree of this.Trees){
        tree.draw()
        tree.update()
      }
      
      
      
    }
  
    update(){ 
      //Updating the values of this road when all the cars on it have went off the screen. Doing this makes the animation seem more natural.
      if(this.distanceToExitSCreen>height){
        this.y = 0-(this.img.height*this.quantity) //Changing the y position of the road so that all the cars are generated outside of view.
        this.div = Math.floor(Math.random(4)*6)
        this.speed= Math.floor(Math.random(7)*10) || 7
        this.quantity = Math.floor(Math.random(1)*6)
        
      }
      this.y+=this.speed
  
    }
  
    mouseP(){
      //Increase the speed of cars on this road.
      this.speed+=1
    }
  
}  