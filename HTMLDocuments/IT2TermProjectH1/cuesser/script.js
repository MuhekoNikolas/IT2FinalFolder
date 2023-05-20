
let count;
let gameState = "on";
let winEl;
let loosing;
let playAgainButton;
let winOrLooseResultInfo;
let quantity = 3;

function setup(){
  noCanvas()
  restartRound()
  playAgainButton = document.getElementById("playAgainButton")
  winOrLooseResultInfo = document.getElementById("WinOrLooseText")
  
}


function restartRound(){
   //Restart the round
    count= 0;
    gameState = "on";
    winEl = []
    loosing= []

    qt = quantity-1
    
    winning = Math.round(Math.random(0)*qt)
    
    if (winning== -1){
      winning = Math.round(Math.random(0)*qt)
      //alert(winning)
    }
    choiceDivsContainer = document.getElementById("divsContainer")

    amount = Math.round(100/29)
    choiceDivsContainer.style.gridTemplateColumns = `repeat(${amount},27vw)`
    choiceDivsContainer.style.gridGap = `40px`
  
    for(let num=0; num<quantity; num++){
      if(num==winning){
        choiceBox = createDiv("")
        value= "🏆"
        winEl[winEl.length] = `${num}choice`
        
        
      } else{
        choiceBox = createDiv("")
        value = ("🐐")
        loosing[loosing.length] = `${num}choice`
        
        
      }
      
      
      choiceBox.parent(choiceDivsContainer)
      choiceBox.class("choiceDivs")
      choiceBox.id(`${num}choice`)

      choiceBoxElement = document.getElementById(`${num}choice`) 
      idForChoice = choiceBox.id()
      choiceBoxElement.setAttribute("onclick", `showValue(ids="${idForChoice}", val="${value}")`)
    }
  
}



function showValue(ids="None", val="None"){
  if(gameState=="on"){
  
    el = document.getElementById(ids)
    
  
    el.innerHTML = `<h1 class="choiceText">${val}</h1>`

    if(val=="🏆"){
    
      winOrLooseResultInfo.innerText = "YOU WON"
      winOrLooseResultInfo.style.color = "green"
      
      el.style.background = "linear-gradient(var(--c6),green)" //"linear-gradient(blue,green)"
      gameState = "off"
      for(let ind=0; ind<loosing.length; ind++){
        id = loosing[ind]
        wrong = document.getElementById(id)
        wrong.innerHTML = `<h1 class="choiceText">🐐</h1>`
        wrong.style.background = "linear-gradient(var(--c6),red)" //"linear-gradient(blue,red)"
        playAgainButton.style.display = "unset"
      }
     
      


    } else {
      count++
      el.style.background = "linear-gradient(var(--c6),red)" //"linear-gradient(blue,red)"
      if(count>=loosing.length){
        //alert(loosing)
        winOrLooseResultInfo.innerText = "YOU LOST"
        winOrLooseResultInfo.style.color = "red"
        
        winner = winEl[0]
        winner = document.getElementById(winner)
        //alert(winner.getAttribute("id"))
        winner.innerHTML = `<h1 class="choiceText">🏆</h1>`
        winner.style.background = "linear-gradient(var(--c6),green)" //"linear-gradient(blue,green)"
        
        gameState = "off"
        playAgainButton.style.display = "unset"
        
      } 
    }
  

    el.setAttribute("onclick", null)

  }
  
}
  


function redo(){
  //kinda like the 
  winOrLooseResultInfo.innerText = ""
  choiceDivsContainer.innerHTML = ""
  restartRound()
}


function next(){
    //Add another guessing block to the game || Go to next round.
    quantity++
    winOrLooseResultInfo.innerText = ""
    choiceDivsContainer.innerHTML = ""
    restartRound()
}

function back(){
    //Remove a block from the guessing game and go back to the previous round.
  if(quantity<=2){
    quantity=3
  }
    quantity--
    winOrLooseResultInfo.innerText = ""
    choiceDivsContainer.innerHTML = ""
    restartRound()
}