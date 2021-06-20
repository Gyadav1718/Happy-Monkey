
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score =0;
var background,backgroundImage,ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart ,restartImage;


function preload(){
  backgroundImage = loadImage("jungle background.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.png");
  
 
}



function setup() {
   createCanvas(600, 400);
  
  ground = createSprite(10,340,600,5);
  
  background = createSprite(200,180,400,20);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  background.x = background.width /2;
  

  monkey = createSprite(80,315,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  restart.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}  


function draw() {
  
  if (gameState===PLAY){
  
  if(keyDown("space")){
    monkey.velocityY = -12;
}
  background.velocityX = -4;
   if (background.x < 0){ 
      background.x = background.width/2;
}
monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
   
  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 5;
}
  spawnObstacles();
  spawnBananas();
    
  if(obstacleGroup.isTouching(monkey)){
    restart.visible = true;
   gameState = END;
}  
}
  
else if (gameState === END) {
         
    background.velocityX = 0;
    monkey.velocityY = 0
      
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);  
    score = score = 0;
}
  
if(mousePressedOver(restart)) {
      reset();
}
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  //survivalTime = Math.ceil(frameCount/frameRate());
  text("SCORE:"+ score,100,50);

}
function reset(){
  gameState = PLAY;
  restart.visible = false;
  score = 0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach(); 
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,310,10,40);
   obstacle.scale = 0.1;
   obstacle.velocityX = -6;

  var rand = Math.round(random(1));
  switch(rand) {
  case 1: obstacle.addImage(obstacleImage);
      break;
  default: break; 
}
   obstacleGroup.add(obstacle);
}
}

function spawnBananas() {
  
  if (frameCount % 180 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,170));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    banana.lifetime = 200; 
    
   bananaGroup.add(banana);
}
}