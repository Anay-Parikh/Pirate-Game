class Cannon {
    constructor(x, y, w, h, angle) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.angle = angle
    }

    display() {
        // rectMode(CENTER);
        if (keyIsDown(RIGHT_ARROW) && this.angle < 0.05) {
            this.angle += 0.02;
        }

        if (keyIsDown(LEFT_ARROW) && this.angle > -1.45) {
            this.angle -= 0.02;
        }

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill("gray");
        rect(20, 20, this.w, this.h);
        pop();
        arc(this.x - 50, this.y + 140, 275, 325, PI, TWO_PI);

    }
}