var bananaImage
var obstacleImage
var obstacleGroup
var background1
var score
var player,player_running
var invisibleGround
var foodGroup, obstaceGroup

function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png");
  backImage = loadImage("junglereal.jpg");
  bananaImage = loadImage("banana.png")
  obstacle_img = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(200,200,20,20);
  background1.addImage("jungle", backImage);
  background1.velocityX= -4
 
  
 player = createSprite(50,180,20,50);
  player.addAnimation("Monkey",player_running);
  player.scale = 0.1;
  
   
  invisibleGround = createSprite(200,380,400,10);
  invisibleGround.x = invisibleGround.width /2;
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score=0
}

function draw() {
  background(220);
  
     
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
  
    
     //jump when the space key is pressed
    if(keyDown("space") && player.y >= 250){
      player.velocityY = -12 ;
    }
    
    //add gravity
  player.velocityY = player.velocityY + 0.8;
  player.collide(invisibleGround);
    //spawn the clouds
    spawnFruits();
  
  if(player.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score= score+4
    player.scale= player.scale +0.02

  }
  if(player.isTouching(obstacleGroup)){
    player.scale=player.scale -0.02
    score=score-2
  }
  if (player.scale <0.01){
    player.scale=0.01
  }
  
  
  
    //spawn obstacles
    spawnObstacles();
  
  drawSprites();
  text("Score: "+ score,50,20)
}



function spawnObstacles() {
  if(World.frameCount % 50 === 0) {
    var obstacle = createSprite(400,370,800,10);
    obstacle.velocityX = - (6 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    var banana= createSprite(400,random(120,200),40,10);
  banana.y = random(144,256);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
   banana.lifetime = 134;
    
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  

}