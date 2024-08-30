//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject, badObject;
let score = 0;
let climberX = 500;
let climberY = 360;
let gap = 200;
let backgroundImg,flynn,lamp,bomb,catchers;





/* PRELOAD LOADS FILES */
function preload()
{
  bkImg = loadImage("assets/bkImg.jpeg");
  flynn = loadImage("assets/flynn.png");
  lamp = loadImage("assets/lamp.png");
  bomb = loadImage("assets/bomb.png");
  catchers = loadImage("assets/catchers.png");
  
  

  
}

/* SETUP RUNS ONCE */
function setup()
  {
  createCanvas(600,400);

    // bg image size
    bkImg.resize(680,0);
    flynn.resize(90,0);
    lamp.resize(70,0);
    bomb.resize(40,0);
    catchers.resize(80,0);

  //Create climber
  climber = new Sprite(flynn,climberX,climberY,70,20,"k");
   
  
  //Create catcher 
  catcher = new Sprite(catchers,300,380,80,25,"k");
  catcher.color = color(95,158,160);
    
  
  //Create falling object
  fallingObject = new Sprite(lamp,10,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;

  //Create bad Object
  badObject = new Sprite(bomb,100,0,10);
  badObject.color = color("black");
  badObject.vel.y = 2;

 

}

/* DRAW LOOP REPEATS */
function draw() 
{
  background("lightBlue");
  image(bkImg, 0,0);
 // draw background image
  
  
  // Draw directions to screen
 /*fill(0);
 textSize(12);
 text("Help Flynn gain hope points\n to reach the top of the castle \n you loose hope ", width-100, 20);*/

  // if fallingObject reaches bottom, move back to random position at top
  
  if(fallingObject.y >= height)
  {
   
    fallingObject.y = 0;
    
    fallingObject.x = random(width-300);
    fallingObject.vel.y = random(1,5);
    score = score-1;
    //score = score - 1;
    
  }

  if(badObject.y >= height)
  {
     
     badObject.y=0;
     badObject.x=random(width - 300);
     badObject.x = fallingObject.x + 80;
     badObject.vel.y = random(1,5);    
  }
  
  // move catcher
  if(kb.pressing("left"))
  {
    catcher.vel.x = -3;
  }
  else if (kb.pressing("right"))
  {
    catcher.vel.x = 3;
  }
  else
  {
    catcher.vel.x = 0;
  }

  // stop catcher at edges of screen 
  if (catcher.x < 50)
  {
    catcher.x = 50;
  }
  else if (catcher.x > 350)
  {
    catcher.x = 350;
  }
  /*if(score >0)
  {
    climber.pos = {x: climberX, y: climberY-200};
  }
  if(score <1)
  {
    climber.pos = {x: climberX, y: climberY};
  }*/

  if (fallingObject.collides(catcher))
  {
    
    climber.pos = {x: climberX, y: climberY-20};
     climberY = climberY-20;
   
  }
  if(fallingObject.y == 0)
 {
     climber.pos = {x: climberX, y: climberY+20};
    climberY = climberY+20;
    
 }

      
  if (badObject.collides(catcher))
  {
    climber.pos = {x: climberX, y: climberY+20};
    climberY = climberY+20;
  }
  

  

   

  // if fallingObject collides with catcher

  if (fallingObject.collides(catcher))
  {
    fallingObject.y = 0;
    fallingObject.x = random(width-300);
    fallingObject.vel.y = random(2,8);
    fallingObject.direction = "down";
    score = score +1;
  }
   if (badObject.collides(catcher))
  {
    badObject.y = 0;
    badObject.vel.y = random(2,8);
    badObject.direction = "down";
    score = score -1;
  }
  

  //score text
  fill("white");
  textSize(30);
  
  text("HOPE POINTS : " + score ,35,50);
  
  
  //Check if player won
  if (score == 10) 
  {
    youWin();

    // Restarting if player presses the mouse
    if (mouseIsPressed) 
    {
      restart();
    }
  }
}





/* FUNCTIONS */

//Spicy
function youWin() {
  background(255, 255, 153);
  
  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };
  badObject.pos = {x:-100, y:0};
   climber.pos = {x:-100, y:0};

  //Draw end of game text
  textSize(30);
  fill("black");
  text("Great job sustaining HOPE! \n ALWAYS STAY HOPEFUL!", width/2 - 200, height/2 - 30); 
  fill(0);
  textSize(15);
  text("Click the mouse anywhere to play again.", width/2 - 160, height/3);
}


function restart() {
  //Reseting score
  score = 0;

  //Reseting the sprites
  catcher.pos = { x: 200, y: 380 };
  fallingObject.y = 0;
  fallingObject.x = random(width-300);
  fallingObject.velocity.y = random(1,5);
  fallingObject.direction = "down";
}
