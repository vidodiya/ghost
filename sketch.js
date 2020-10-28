var ghost,door,doorImage,climber,climberImage;
var ghost_jump_image,ghost_stand_image,climbGroup;
var tower,towerImage,spooky,back,doorGroup;
var invisibleBlock,invisibleGroup;
var gameState = "play";

function preload()
{
  ghost_jump_image = loadImage("ghost-jumping.png");
  ghost_stand_image = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  spooky = loadSound("spooky.wav");

}

function setup()
{
  createCanvas(600,600);
  
  back = createSprite(300,300);
  back.addImage("tower",towerImage);
  back.height = height/2;
  back.velocityY = 2;
    
  ghost = createSprite(400,400,20,30);
  ghost.addImage("ghost",ghost_stand_image);
  ghost.scale = 0.3;
  
  
  doorGroup = new Group();
  climbGroup = new Group();
  invisibleGroup = new Group();
}

function draw()
{
  background(0);
  if(gameState === "play")
    {
      if(keyDown("left"))
        {
          ghost.x = ghost.x-3;
        }
      if(keyDown("right"))
        {
          ghost.x = ghost.x+3;
        }
      if(keyDown("space"))
        {
          ghost.velocityY = -10;
        }
      ghost.velocityY = ghost.velocityY + 0.8;
      if(back.y>600)
        {
          back.y = back.height/2;
        }
      spawnDoors();
      if(climbGroup.isTouching(ghost))
        {
          ghost.velocityY = 0;
        }
      
      if(invisibleGroup.isTouching(ghost)|| ghost.y>600)
        {
          ghost.destroy();
          gameState = "end";
          
        }
      drawSprites();
    }
    if(gameState === "end")
      {
        stroke("red");
        fill("red");
        textSize(30);
        text("Game Over ",250,300)
      } 
}


function spawnDoors()
{
  if(frameCount % 200 === 0)
    {
      //var ran = Math.round(random(10,200));
      door = createSprite(200,0);
      climber = createSprite(200,50);
      invisibleBlock = createSprite(200,55);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      invisibleBlock.debug = true;
      
      door.x = Math.round(random(100,400));
      climber.x = door.x;
      invisibleBlock.x = door.x;
      
      door.addImage("door",doorImage);
      climber.addImage("climb",climberImage);
      
      door.velocityY = 1;
      climber.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      door.scale = 0.8;
      
      
      door.lifetime=600;
      climber.lifetime=600;
      invisibleBlock.lifetime=600;
       
      ghost.depth = door.depth+1;
      
      invisibleGroup.add(invisibleBlock);
      doorGroup.add(door);
      climbGroup.add(climber);
    }
}

