class Boat {
    constructor(x, y, width, height, boatPos, animation) {
        this.width = width;
        this.height = height;
        this.boatPos = boatPos;
        this.image = loadImage("mainBoat.png");
        this.animation = animation;

        var options = {
            friction: 1.0,
            restitution: 0.8,
            density: 1.0
        }

        this.body = Bodies.rectangle(x, y, width, height, options);

        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);
        console.log(index);
        console.log(this.animation);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.boatPos, this.width, this.height);
        pop();
    }

    remove(index) {
        Matter.World.remove(world, boats[index].body);
        boats.splice(index, 1);
    }

    animate() {
        this.speed += 0.05 % 1.1;
    }
}