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
var ball;
var blower;
var blowerMouth;
var button;
var button2;
var button3;

var blowerSound;
var blowAir = false;

var text;

function preload(){
  blowerSound = loadSound("./assets/blowerSound.mp3");
}

function setup() {
  var canvas = createCanvas(500, 500);

  engine = Engine.create();
  world = engine.world;

  ball = new Ball(width / 2 + 80, height / 2 - 80, 80, 80);
  blower = new Blower(width / 2 - 50, height / 2 + 50, 150, 20);
  blowerMouth = new BlowerMouth(width / 2 + 70, height / 2 + 20, 100, 90);
  button = createButton("Turn on Blower");
  button.position(width / 2 - 120, height - 150);
  button.class("blowButton");

  button3 = createButton("Turn off Blower");
  button3.position(width / 2 + 30, height - 150);
  button3.class("blowButton");

  button2 = createButton("Reset Ball");
  button2.position(width/2, height - 50);
  button2.class("blowButton");

  button.mousePressed(startBlow);
  button3.mousePressed(stopBlow);
  button2.mousePressed(newBall);
}

function draw() {
  background(59);
  Engine.update(engine);

  if(blowAir === true){
    blow();
  }else if(blowAir === false){
    stoppingBlow();
  }
  

  blower.show();
  ball.show();
  blowerMouth.show();
}

function blow() {
  blowerSound.play();
  blowerSound.setVolume = 0.5;
  Matter.Body.applyForce(ball.body, {x:0, y:0}, {x:0, y:-0.01});
}

function stoppingBlow(){
  blowerSound.stop();
  Matter.Body.applyForce(ball.body, {x:0, y:0}, {x:0, y:0});
  console.log("hello")
}

function newBall(){
  Matter.World.remove(world,ball.body);
  ball = new Ball(width / 2 + 80, height / 2 - 80, 80, 80);
}

function startBlow(){
  blowAir = true;
} 

function stopBlow(){
  blowAir = false;
}

