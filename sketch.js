var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas (400,400)
  
  monkey = createSprite (60,320, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.15;
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,500,600);
  
  ground = createSprite(100,370,600,10);
  ground.x = ground.width /2;
  ground.shapeColor = "gray";
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
}

function draw() {
background ("black")
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnBanana();
  
   if(keyDown("space") && monkey.y >200) {
      monkey.velocityY = -15;
    }
  
   monkey.velocityY = monkey.velocityY + 0.8

   monkey.collide(ground); 
  
   drawSprites();
   
   fill("white")
   text("Score: "+ score, 500,50);
  
   fill("black")
   textSize(15)
   survivalTime = Math.round(frameCount/frameRate())
   text("Survival Time: "+ survivalTime, 30,30)
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(400,329,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -5;
   obstacle.debug = false;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.20;
    obstacle.lifetime = 400;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    banana = createSprite(400,50,40,10);
    banana.y = Math.round(random(50,200));
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -4;
    banana.debug = false;
    banana.setCollider("rectangle",0,0,550,300)
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
    bananaGroup.add(banana);
    }
}