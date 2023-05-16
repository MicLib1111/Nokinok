let frameCounter = 0;
let img;
let img2;
let img3;
let flowers = [];
let music;
let stopButton;

function preload() {
  img = loadImage('image.png'); // Replace 'image.png' with the path to your first image file
  img2 = loadImage('image2.png'); // Replace 'image2.png' with the path to your second image file
  img3 = loadImage('image3.png'); // Replace 'image3.png' with the path to your third image file
  music = loadSound('music.mp3'); // Replace 'music.mp3' with the path to your music file
}

function setup() {
  createCanvas(600, 600);
  music.loop(); // Start playing the music
  
  // Create the stop button
  stopButton = createButton('Stop');
  stopButton.position(10, 10);
  stopButton.mousePressed(stopFlowers);
}

function draw() {
  background(220);
  textSize(64);
  textAlign(CENTER, CENTER);
  text('When?', width / 2, height / 2);

  for (let i = flowers.length - 1; i >= 0; i--) {
    flowers[i].update();
    flowers[i].display();
  }

  if (frameCount % 60 === 0) {
    let randomIndex = floor(random(3));
    let randomImage;

    if (randomIndex === 0) {
      randomImage = img;
    } else if (randomIndex === 1) {
      randomImage = img2;
    } else if (randomIndex === 2) {
      randomImage = img3;
    }

    flowers.push(new Flower(width / 2, height / 2, random(TWO_PI), randomImage));
  }

  frameCounter++;
}

function stopFlowers() {
  flowers = []; // Clear the array to stop displaying flowers
}

class Flower {
  constructor(x, y, angle, image) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.image = image;
    this.radius = 0;
    this.maxRadius = sqrt(pow(width / 2, 2) + pow(height / 2, 2));
  }

  update() {
    this.radius += 1;

    this.x = width / 2 + cos(this.angle) * this.radius;
    this.y = height / 2 + sin(this.angle) * this.radius;

    if (this.radius > this.maxRadius) {
      this.radius = 0;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    scale(0.5);
    image(this.image, 0, 0);
    pop();
  }
}