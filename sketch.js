var bgImg;
var gameState = "play";
var boy,boyAni,boyEnd;
var invisibleGround;
var ground;
var obstaclesGroup,fruitGroup;
var gorrilla,gorrillaAnim,brick,brickImg;
var appleImg,mangoImg;
var score = 3,scoreAni0,scoreAni1,scoreAni2,scoreAni3;
var life;
var jump,crash;
var GameOver,brickHit;
var brick;




function preload() {
  bgImg = loadImage("./Images/Background.png");
  boyAni = loadAnimation("./Images/Boy1.png","./Images/Boy2.png","./Images/Boy3.png","./Images/Boy4.png");
  gorrillaAnim = loadAnimation("./Images/Gorrilla1.png","./Images/Gorrilla2.png","./Images/Gorrilla3.png","./Images/Gorrilla4.png","./Images/Gorrilla5.png");
  brickImg = loadImage("./Images/Brick.png");
  appleImg = loadImage("./Images/Apple.png");
  mangoImg = loadImage("./Images/Mango.png");
  scoreAni0 = loadAnimation("./Images/0.png");
  scoreAni1 = loadAnimation("./Images/1.png");
  scoreAni2 = loadAnimation("./Images/2.png");
  scoreAni3 = loadAnimation("./Images/3.png");
  boyEnd = loadImage("./Images/Boy3.png");
  jump = loadSound("./sounds/Jump.mp3");
  crash = loadSound("./sounds/crash.mp3");
  GameOver = loadSound("./sounds/Over.mp3");
  brickHit = loadSound("./sounds/brickDash.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  

  ground = createSprite(1600 ,height/2,width,height);
  ground.addImage(bgImg);
  ground.scale = 2.5

  boy = createSprite(width/3 - 500,height - 250);
  boy.addAnimation("Boy",boyAni);
  boy.addImage('end',boyEnd);
  boy.scale = 1.7;

  invisibleGround = createSprite(width/2,height - 100,width,50);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  obstacle2Group = new Group();
  fruitGroup = new Group();

  fruitGroup.visible = false;

  life = createSprite(width / 3 - 650,40,50,25);
  life.addAnimation('empty',scoreAni0);
  life.addAnimation('one',scoreAni1);
  life.addAnimation('two',scoreAni2);
  life.addAnimation('three',scoreAni3);
  life.changeAnimation('three');
  
}

function draw() {
  background(bgImg); 

  //image(bgImg,0,0,width,height)

  boy.collide(invisibleGround);

  if(gameState === "play"){
    //ground.velocityX = -10;
    spawnObstacles();
    spawnObstacle2();
    spawnFruits();
    boy.velocityY = boy.velocityY + 2;
    
    if(ground.x<700){
      ground.x=ground.width/2 + 900
    }
    ground.velocityX = -4
    if(keyDown("space") && boy.y >= 550){
      boy.velocityY = -40;
      jump.play();
    }
    for(var i=0;i<obstacle2Group.length;i++){
      if(obstacle2Group.get(i).isTouching(boy)){
        obstacle2Group.get(i).remove();
        //gameState = "end";
        //brick.changeImage('mango',mangoImg);
        //change(obstacle2Group.get(i),brick);
        score += 1;
        brickHit.play();
        }
      }

      if(fruitGroup.isTouching(boy)){
        fruitGroup[0].destroy();
      }

    for(var i=0;i<obstaclesGroup.length;i++){
      if(obstaclesGroup.get(i).isTouching(boy)){
        obstaclesGroup.get(i).remove();
        life.changeAnimation('three');
        score -= 1;

        crash.play();

        if(score == 2){
          life.changeAnimation('two');
        }
        else if(score == 1){
          life.changeAnimation('one');
        }
        else{
          life.changeAnimation('empty');
        }

        if(score <= 0){
          GameOver.play();
          gameState = "end";
          gameOver();

        }
        //gameState = "end";
        //brick.changeImage('mango',mangoImg);
        }
        }

    /*if(){
      obstacle2Group.get(i).changeImage('mango',mangoImg);
    }*/
    
     }
     else if(gameState === "end"){
      
      ground.velocityX=0
      boy.changeImage('end');
      boy.x=width/3 - 300;
      boy.y=height - 250
      obstaclesGroup.setVelocityEach(0);
      obstacle2Group.setVelocityEach(0);
      obstaclesGroup.destroyEach();
      obstacle2Group.destroyEach();
      
      
     }
  console.log(boy.y);


  

  drawSprites();
  fill("black")
  textSize(30)
  text("Score :  " + score,width - 200,40); 
} 

function spawnObstacles(){
  if(frameCount%90 === 0){
    gorrilla = createSprite(width - 100,height-100);
    gorrilla.addAnimation('gorrilla',gorrillaAnim);
    gorrilla.scale = 2;
    gorrilla.velocityX = -12;
    gorrilla.y = Math.round(random(height - 100,height - 500));
    
    obstaclesGroup.add(gorrilla);

  }
}

function spawnObstacle2(){
  if(frameCount%125 === 0){
    brick = createSprite(width-100,height/2-50);
    brick.addImage('brick',brickImg);
    brick.addImage('apple',appleImg);
    brick.addImage('mango',mangoImg);
    brick.scale = 0.4;
    brick.velocityX = -10;
    brick.y = Math.round(random(height/2,height/2 - 100));
    obstacle2Group.add(brick);

  }
}

function change(spriteA,spriteB){
  spriteA.remove();
  spriteB.changeAnimation('mango');
}

function  gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      /*imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",*/
      /*imageSize: "150x150",*/
      confirmButtonText: "Play Again"
    },
function(){ 
    location.reload();
}
);
}

function spawnFruits() {



  if(frameCount%125 === 0){
 
  var Mango = createSprite(width-100,height/2-50);
  Mango.velocityX = -10;
  Mango.scale = 0.3;
  var ran = Math.round(random(1,2));
  switch(ran){
    case 1:Mango.addImage(appleImg);
    break;
    case 2:Mango.addImage(mangoImg);
    break;
    default:break;
  }
  fruitGroup.add(Mango);
}


}
