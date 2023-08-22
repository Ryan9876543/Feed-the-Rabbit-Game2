const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground
var rope
var rope2
var rope3
var fruit

var link
var link2
var link3

var bunny
var button
var button2
var button3

var backgroundImg
var bunnyImg
var fruitImg
var buttonImg

var blink
var eat
var sad

var backgroundMusic
var cutSound
var sadSound
var eatingSound
//var airSound
//var airBalloonButton
var muteButton

var canW
var canH


function preload () 
{

  backgroundMusic = loadSound("sound1.mp3")
  cutSound = loadSound("rope_cut.mp3")
  sadSound = loadSound("sad.wav")
  eatingSound = loadSound("eating_sound.mp3")
  //airSound = loadSound("air.wav")

  backgroundImg = loadImage("background.png")
  bunnyImg = loadImage("Rabbit-01.png")
  fruitImg = loadImage ("melon.png")
  //buttonImg = loadImage ("cut_button.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")

  blink.playing = true
  eat.playing = true
  eat.looping = false
  sad.playing = true
  sad.looping = false
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
 
  backgroundMusic.play()
  backgroundMusic.setVolume(0.5)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = new Ground (200,canH,600,20)
  rope = new Rope (8,{x:40, y:30})
  rope2 = new Rope (7,{x:370, y:40})
  rope3 = new Rope (4,{x:400, y:225})

  var options = {
    density: 0.001
  }

  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20

  bunny = createSprite(170,canH - 80,100,100)
  bunny.scale = 0.2
  //bunny.addImage (bunnyImg)
  bunny.addAnimation ("blinking", blink)
  bunny.addAnimation ("eating", eat)
  bunny.addAnimation ("sad", sad)
  bunny.changeAnimation ("blinking")

  button = createImg ("cut_button.png")
  button.position(20,30)
  button.size(50,50)
  button.mouseClicked(drop)

  button2 = createImg ("cut_button.png")
  button2.position(330,35)
  button2.size(50,50)
  button2.mouseClicked(drop2)
  
  button3 = createImg ("cut_button.png")
  button3.position(360,200)
  button3.size(50,50)
  button3.mouseClicked(drop3)

  fruit = Bodies.circle(300,50,15,options)
  Matter.Composite.add(rope.body,fruit)

  link = new Link (rope,fruit)
  link2 = new Link (rope2,fruit)
  link3 = new Link (rope3, fruit)

  rectMode(CENTER)
  ellipseMode(RADIUS)
  textSize = 50



  //airBalloonButton = createImg ("balloon.png")
  //airBalloonButton.position(10,210)
  //airBalloonButton.size(150,100)
  //airBalloonButton.mouseClicked(airBlow)

  muteButton = createImg ("mute.png")
  muteButton.position(425,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)


}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,displayWidth+80,displayHeight);
  
  push()
  imageMode(CENTER)
  if (fruit!=null) {
    image(fruitImg,fruit.position.x,fruit.position.y,60,60)
  }
  pop()

  rope.show()
  rope2.show()
  rope3.show()

  ground.show()
  Engine.update(engine);

  //image(fruitImg, fruit.position.x, fruit.position.y, 60,60)
  //ellipse (fruit.position.x,fruit.position.y,15,15)


  if (collide(fruit,bunny) == true) {
    eatingSound.play()
    bunny.changeAnimation("eating")
  }

  /*if (collide(fruit,ground.body) == true) {
    sadSound.play()
    bunny.changeAnimation("sad")
  }*/

  if (fruit!=null && fruit.position.y >= 650) {
    sadSound.play()
    bunny.changeAnimation("sad")
    fruit = null
  }


  drawSprites() 
}

function drop () {
  cutSound.play()
  rope.break()
  link.detach()
  link = null
}

function drop2 () {
  cutSound.play()
  rope2.break()
  link2.detach()
  link2 = null
}

function drop3 () {
  cutSound.play()
  rope3.break()
  link3.detach()
  link3 = null
}

function collide (body, sprite) {
  if (body!=null) {
    var d = dist (body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d < 50) {
      World.remove(engine.world,fruit)
      fruit = null
      return true
    }
    else {
      return false
    }
  }
}

//function airBlow () {
  //Matter.Body.applyForce (fruit, {x:0, y:0}, {x:0.01, y:0})
  //airSound.play()

//}

function mute () {
  if(backgroundMusic.isPlaying()) {
    backgroundMusic.stop()
  }

  else {
    backgroundMusic.play()
  }
}

