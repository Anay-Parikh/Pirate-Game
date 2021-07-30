class Ground {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, this.w, this.h, {isStatic: true});
        World.add(world, this.body);
    }

    display() {
        rectMode(CENTER);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        fill("brown");
        rect(0, 0, this.w, this.h);
        pop();
    }
}