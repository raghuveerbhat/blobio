function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);
  this.move=0;

  this.update = function() {
    var newvel = createVector(mouseX-width/2, mouseY-height/2);
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
  }

  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = Math.PI * this.r * this.r + Math.PI * other.r * other.r;
      this.r = sqrt(sum / Math.PI);
      //this.r += other.r;
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  this.shoot = function(orig) {
    var newvel = createVector(hor, ver);
    newvel.setMag(15);
    this.vel.lerp(newvel, 0.5);
    this.pos.add(this.vel);
    var d1 = p5.Vector.dist(this.pos, orig);
    // 250 - distance for the bullet to travel
    if(d1 > 350)
        this.move=0;
  }
}
