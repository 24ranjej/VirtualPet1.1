//Create variables here
var dog, dogImage, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250,250,20,20);
  dog.addImage("dogImage",dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy); 
  }

  drawSprites();
  //add styles here
  
  foodStock.text("Food:"+foodStock,100,100);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


