/*

 * ARTG 2260
 * Nia Naval
 * niamnaval@gmail.com
 * Assignment 7.0 Web Visualization
 * Snowstorm V3

*/

var gameState = 0; 
var score = 0;
var numBalls = 20;
var balls = [];
var numPowerups = 1;
var powerups = [];
var num = 1;




function setup() {


  var canvas = createCanvas(600, 600);  
  m1 = new Mountain(0, 600, 250);
  m2 = new Mountain(340, 600, 300);
  for (var i = 0; i < numBalls; i++) {            /*spots.length becomes numBalls*/
     balls[i] = new Snowball();
  }

  for (var i = 0; i < numPowerups; i++) {
     powerups[i] = new powerup();
  }

  canvas.parent('sketch-holder');
}


function draw() {
  if (gameState == 0) {
    startScreen();
  } else if (gameState == 1) {
    background(0, 128, 128);
    noStroke();
    fill(255);
    text("Avoid the snow with your cursor!", 10, 30);
    text("Score = " + score, width - 100, 30);
    m1.mountain();
    m2.mountain();


    for (var i = 0; i < numBalls; i++) {
      balls[i].update();
    }

    for (var i = 0; i < numPowerups; i++) {
      powerups[i].updatepowerup();
    }

    score ++;
  } else if (gameState == 2) {
    gameOver();
  }
}

 function startScreen() {
  background(0, 128, 128);
  fill(255);
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(600, 0);
  vertex(600, 300);
  curveVertex(500, 400);
  curveVertex(450, 350);
  curveVertex(400, 350);
  curveVertex(300, 500);
  curveVertex(200, 550);
  curveVertex(75, 400);
  curveVertex(50, 300);
  curveVertex(0, 275);
  curveVertex(0, 275);
  endShape(CLOSE);
  fill(0, 128, 128);
  textSize(50);
  text("Snowstorm", 150, 200);
  textSize(30);
  text("Avoid the Snow!", 150, 250);
  textSize(12);
  text("Click to Start", 155, 300);
  fill(0);
  score = 0;
}

class Snowball {

 constructor() { /*call it constructor*/
     this.xPos = random(width);
     this.yPos = random(height);
     this.xDi = random(15, 30);                   
     this.yDi = this.xDi;
     this.xSpeed = 0;
     this.ySpeed = 1;
   }


    update() {                                                                            /*get rid of */
 
    noStroke();
    if (score%50 == 0) {
      num ++;
    }
    if (score %200 == 0) {
      this.ySpeed ++;
    }


    this.yPos += this.ySpeed;
    if (this.yPos > height+this.yDi)
        this.yPos = -this.yDi;


    ellipse(this.xPos, this.yPos, this.xDi, this.yDi);
      /*     beginShape();                // attempt at making snowflakes, saved for future reference
       vertex(xPos[i], yPos[i]);
       vertex(xPos[i]+4, yPos[i]+10);
       vertex(xPos[i]+15, yPos[i]+8);
       vertex(xPos[i]+8, yPos[i]+16);
       vertex(xPos[i]+15, yPos[i]+24);
       vertex(xPos[i]+4, yPos[i]+20);
       vertex(xPos[i], yPos[i]+32);
       vertex(xPos[i]-4, yPos[i]+20);
       vertex(xPos[i]-15, yPos[i]+24);
       vertex(xPos[i]-8, yPos[i]+16);
       vertex(xPos[i]-15, yPos[i]+8);
       vertex(xPos[i]-4, yPos[i]+10);
       vertex(xPos[i], yPos[i]);
       endShape(CLOSE);*/
    //}


      if ((abs(mouseX - this.xPos) < this.xDi/2) && (abs(mouseY - this.yPos) < this.yDi/2)) {
        gameState = 2;
      }


    if (gameState == 2) {
      this.ySpeed = 1;
      num = 0;
      this.yPos = 50*random(2);
    }
  }
  
}

class powerup {

  constructor() {
    this.xPos = random(width);
    this.yPos = random(height);
    this.xDi = 15;                   
    this.yDi = this.xDi;
    this.xSpeed = 0;
    this.ySpeed = 1;
  }

  updatepowerup() {                                                                        /*get rid of */
 
    noStroke();
    fill(0,255,0);


    if (score %20 == 0) {
      this.ySpeed ++;
    }

    this.yPos += this.ySpeed;
    if (this.yPos > height+this.yDi)
        this.yPos = -this.yDi;


    rect(this.xPos, this.yPos, this.xDi, this.yDi);

    if ((abs(mouseX - this.xPos) < this.xDi) && (abs(mouseY - this.yPos) < this.yDi)) {
        numPowerups--;  
        numBalls--;
    }
  }
}



class Mountain {


  constructor(_xMountain, _yMountain, _xMountDi) {
    this.xMountain = _xMountain;
    this.yMountain = _yMountain;
    this.xMountDi = _xMountDi;
  }


  mountain() {
    beginShape();
    vertex(this.xMountain, this.yMountain);
    vertex(this.xMountain+this.xMountDi, this.yMountain+20);
    vertex(this.xMountain+this.xMountDi-25, this.yMountain-30);
    vertex(this.xMountain+(this.xMountDi-50), this.yMountain-70);
    vertex(this.xMountain+(this.xMountDi-100), this.yMountain-30);
    vertex(this.xMountain+(this.xMountDi-125), this.yMountain-95);
    vertex(this.xMountain, this.yMountain); 
    endShape(CLOSE);
  }
}


function gameOver() {
  background(0, 128, 128);
  fill(255);
  textSize(50);
  text("Game Over", 150, 200);
  textSize(12);
  text("Refresh to Restart", 155, 230);
  textSize(30);
  text("Score = " + score, 150, 300);
  textSize(20);
}


function mouseClicked() {
  if (gameState == 0) {
    gameState = 1;
    // } else if (gameState == 1){
    //   gameState = 2;
  } else if (gameState == 2) {
    gameState = 0;
  }
}