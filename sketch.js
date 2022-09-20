const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var bg
var engine
var world
var towerImg
var ground
var tower
var cannonBall
var angle
var balls = []
var boats = []


function preload() {
  bg = loadImage("assets/background.gif")
  towerImg = loadImage("assets/tower.png")
}

function setup() {
  canvas = createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world

  angleMode(DEGREES)
  angle = 15

  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(600, 590, 1600, 20, options);
  World.add(world, ground)

  tower = Bodies.rectangle(130, 350, 160, 310, options);
  World.add(world, tower)

  rectMode(CENTER)

  cannon = new Cannon(180, 110, 130, 100, angle)
}

function draw() {
  image(bg, 0, 0, width, height)

  Engine.update(engine)

  rect(ground.position.x, ground.position.y, 1600, 20)

  push()
  imageMode(CENTER)
  image(towerImg, tower.position.x, tower.position.y, 160, 310)
  pop()

  showBoats()

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i)
    collision_with_boat(i)
  }

  cannon.display()
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new Cannonball(cannon.x, cannon.y)
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index)
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20]
      var position = random(positions)
      var boat = new Boat(width, height - 100, 170, 170, position)

      boats.push(boat)
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        })

        boats[i].display()
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60)
    boats.push(boat)
  }
}

function collision_with_boat(index){
  for (var i = 0; i < boats.length; i++){
    if (balls[index] != undefined && boats [i] != undefined) {
      var c = Matter.SAT.collides(balls[index].body,boats[i].body)
      if (c.collided){
        boats[i].remove(i)
        Matter.World.remove(world, balls[index])
        delete balls[index]
      }
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}