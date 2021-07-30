class Tower {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, this.w, this.h, {isStatic: true});
        this.image = loadImage("tower.png");
        World.add(world, this.body);
    }

    display() {
        // rectMode(CENTER);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        fill("gray");
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        
        // rect(this.body.position.x, this.body.position.y, this.w, this.h);
        pop();
    }
}