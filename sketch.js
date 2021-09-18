var balloon,balloonImage1,balloonImage2;
var database;
var height;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   
   balloonImage=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon03.png" );
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1300,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.4;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw(){

  background(bg);

      if(keyDown(LEFT_ARROW)){
          balloon.x = balloon.x - 10;
      }
      else if(keyDown(RIGHT_ARROW)){
          balloon.x = balloon.x + 10;
      }
      else if(keyDown(UP_ARROW)){
          balloon.y = balloon.y - 10;
      }
      else if(keyDown(DOWN_ARROW)){
           balloon.y = balloon.y + 10;
      }
  
 drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  
  
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }

//CHOOSE THE CORRECT READHEIGHT FUNCTION
 
function readHeight(){
  height = val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in code");
}