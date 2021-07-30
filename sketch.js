const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var tower, bg, cannonBall
var balls = [];
var boats = [];
var boat;
var ground;
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet, boatFrames;

function preload() {
    bg = loadImage("background.gif");
    boatSpriteData = loadJSON("./ship-sailing/ship-sailing.json");
    boatSpriteSheet = loadImage("./ship-sailing/ship-sailing.png");
    boatFrames = boatSpriteData.frames;

    for (var i = 0; i < boatFrames.length; i++) {
        var pos = boatFrames[i].position;
        var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        boatAnimation.push(img);
    }
}


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;

    tower = new Tower(200, 650, 160, 310);
    cannon = new Cannon(240, 190, 140, 70, -PI/4);

    ground = new Ground(width/2, height, width, 1);
    
}

function draw(){
    background(0);
    Engine.update(engine);
    
    image(bg, 0, 0, width, height)
    tower.display();
    cannon.display();
    ground.display();

    showBoats();
    
    for (var i = 0; i < balls.length; i++) {
        showCannonBalls(balls[i], i);
        for (var j = 0; j < boats.length; j++) {
            if (balls[i] != undefined && boats[j] != undefined) {
                var collision = Matter.SAT.collides(balls[i].body, boats[j].body)
                if (collision.collided) {
                    boats[j].remove(j);
                    Matter.World.remove(world, balls[i].body);
                    balls.splice(i, 1);
                    i--;
                }
            }
        }
    }

}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        balls[balls.length-1].shoot();
    }
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        var cannonBall = new CannonBall(cannon.x + 110, cannon.y - 40);
        balls.push(cannonBall);
    }
}

function showCannonBalls(ball, i) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height) {
        Matter.World.remove(world, ball.body)
        balls.splice(i, 1);
    }
}

function showBoats() {
    if (boats.length > 0) {
        if (boats.length < 4 && boats[boats.length-1].body.position.x < width-400) {
            var positions = [-70, -130, -160, -190];
            var position = random(positions);
            boat = new Boat(width, height-50, 200, 200, position, boatAnimation);
            boats.push(boat);
        }

        for (var i = 0; i < boats.length; i++) {
            Matter.Body.setVelocity(boats[i].body, {x: -1, y: 0})
            boats[i].display();
            boats[i].animate();
        }

    } else {
        boat = new Boat(width-200, height-50, 200, 200, -100, boatAnimation);
        boats.push(boat);
    }
}

