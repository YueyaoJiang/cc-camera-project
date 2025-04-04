let my_capture, handPose;
let hands = [];
let isPainting = false;
let isPaused = false;

function preload(){
  handPose = ml5.handPose();
}

function setup(){
  createCanvas(640, 480);
  my_capture = createCapture(VIDEO);
  my_capture.size(640, 480);
  my_capture.hide();
  handPose.detectStart(my_capture, gotHands);

  background(255); 
  frameRate(30);
}

function draw(){
  const handCount = hands.length;

  if (handCount === 0) {
  
    isPainting = false;
    isPaused = false;
    background(255);
    push();
    translate(width, 0);
    scale(-1, 1);
    image(my_capture, 0, 0, width, height);
    pop();
    return;
  } else if (handCount === 1) {
    isPainting = true;
    isPaused = false;
  } else if (handCount >= 2) {
    isPainting = false;
    isPaused = true;
  }

  
  if (isPainting) {
    drawOilPainting(); 
  }
 
}

function drawOilPainting() {
  let step = 15;
  for (let y = 0; y < my_capture.height; y += step) {
    for (let x = 0; x < my_capture.width; x += step) {
      let c = my_capture.get(my_capture.width - x, y); 

      let r = int(c[0] / 32) * 32;
      let g = int(c[1] / 32) * 32;
      let b = int(c[2] / 32) * 32;

      let offsetX = random(-5, 5);
      let offsetY = random(-5, 5);

      fill(r, g, b, 80);
      noStroke();
      ellipse(x + offsetX, y + offsetY, random(10, 20), random(10, 20));
    }
  }
}

function gotHands(results){
  hands = results;
}
