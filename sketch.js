var blob;
var bl;
var food = [];
var zoom = 1;
var hor,ver,orig;
const MIN_AREA_BLOB = Math.PI * 64 * 64;
const BULLET_AREA = Math.PI * 24 * 24;

function setup() {
  createCanvas(1536, 730);
  blob = new Blob(0, 0, 64);
  for (var i = 0; i < 350; i++) {
    var x = random(-width,width);
    var y = random(-height,height);
    food[i] = new Blob(x, y, 16);
  }

}

function draw() {
  background(0);

  translate(width/2, height/2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (var i = food.length-1; i >=0; i--) {
    food[i].show();
    if (blob.eats(food[i])) {
      food.splice(i, 1);
      var x = random(-width,width);
      var y = random(-height,height);
      var f = new Blob(x, y, 16);
      food.push(f);
    }
  }
   // console.log("bx= ",blob.pos.x);
   // console.log("by= ",blob.pos.y);
   // console.log("mx= ",mouseX+blob.pos.x);
   // console.log("my= ",mouseY+blob.pos.y);

  blob.show();
  blob.update();
  if(typeof bl !== "undefined")
    if(bl.move==1)
        bl.shoot(orig);
}

 function keyPressed() {
  if (keyCode == 87){
    //var bl = new Blob(mouseX+blob.r, blob.pos.y+blob.r, 24);
    var ar = Math.PI * blob.r * blob.r - BULLET_AREA;

    if(ar > MIN_AREA_BLOB){
        blob.r = sqrt(ar / Math.PI);
        hor = mouseX - width/2;
        ver = mouseY - height/2;
        var angle = atan2(ver,hor);
        var x = (blob.r+50) * cos(angle) + blob.pos.x;
        var y = (blob.r+50) * sin(angle) + blob.pos.y;
        bl = new Blob(x, y, 24);
        bl.move=1;
        food.push(bl);
        orig = createVector(x, y);
    }
  }
}
