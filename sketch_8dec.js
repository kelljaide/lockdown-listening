let title;
let plays;
let lockdown, ldCheck;
let week, weekCheck;
let totalRows;
let moveUp = 0;
let angle = 0;
let spread, grows;
let flowers = [];
var topSong;
var Rval = [240, 174, 230, 165, 143, 205];
var Gval = [100, 132, 124, 95, 123, 117];
var Bval = [240, 220, 209, 222, 216, 217];
let c = 0;
let img;


function preload() {
  img = loadImage('data/logo.png');
  soundFormats('ogg', 'mp3');
  topSong = loadSound('data/topsong.mp3', 'mp3');
  table = loadTable("data/PARSED.csv", "csv", "header");
  topSong.play();
}

function setup() {
  createCanvas (windowWidth, 3300);
  angleMode(DEGREES);

  totalRows = table.getRowCount();
  weekCheck = table.getString(1, "TOTALWEEKS");
  ldCheck = table.getString(0, "LOCKDOWN");

  for (let i=0; i < totalRows; i++) {
    week = table.getString(i, "TOTALWEEKS");
    spread = map(week, 1, 38, 20, width-20);
    if (weekCheck!=week) {
      moveUp = 0;
    }

    weekCheck = week;
    moveUp += 15*2;

    lockdown = table.getString(i, "LOCKDOWN");
    if (c >= 6) {
      c=0;
    }
    if (ldCheck!=lockdown) {
      c = c+1;
    }
    ldCheck = lockdown;

    var flower = {
    x:
    spread,
    y:
    45+moveUp,
    colour:
    color(Rval[c], Gval[c], Bval[c])
  }
  flowers.push(flower);
}
}

function draw() {
  //background('#BED37F');
  background('#c2d982');
  push();
  fill(204, 255, 153);
  textSize(100);
  text('lockdown listening', 20, 70);
  textSize(95);
  text('those were the days...', 20, 2581, 514, 550);
  pop();

  for (let i=0; i < totalRows; i++) {
    plays = table.getString(i, "PLAYS");
    title = table.getString(i, "TITLE");
    artist = table.getString(i, "ARTIST");

    //top flowers
    noStroke();
    fill(flowers[i].colour);
    weekFlower(flowers[i].x, 35);

    //chain
    playFlower(flowers[i].x, flowers[i].y, flowers[i].colour);
    textSize(10);
    text('click to play', 680, 2583);
    image(img, 950, 2900, 100, 100);
    text('a data garden project project by kelly lim',950,3010,135,500);

    if (mouseX >= flowers[i].x -10 && mouseX <= flowers[i].x +10 && mouseY >= flowers[i].y -10 && mouseY <= flowers[i].y +10) {
      textSize(100);
      text(title, 20, mouseY, 800, 500);
    }
  }
}

function playFlower (x, y, col) {

  push();

  translate(x, y);
  if (artist == 'King Krule') {
    rotate(angle);
  }
  if (title == 'Those Were the Days by Angel Olsen') {
    rotate(angle);
  }

  let petals = [plays];

  //petals
  for (let i = 0; i < petals; i ++) {
    rotate(360/petals);
    stroke(col);
    noFill(0, 0, 0, 30);
    let petPlays = map(plays, 3, 41, 2, 40);
    ellipse(8, 0, petPlays, petPlays/2);
  }

  //centre circle
  fill(204, 255, 153);
  grows = map(plays, 3, 41, 5, 30);
  ellipse(0, 0, grows, grows);
  angle = angle+100;
  pop();
}


function weekFlower (x, y) {

  push();
  translate(x, y);

  let petals = 9;

  //petals
  for (let i = 0; i < petals; i ++) {
    rotate(360/petals);
    ellipse(5, 0, 5, 3);
  }
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, 3300);
}

function mousePressed() {
  if (topSong.isPlaying()) {
    // .isPlaying() returns a boolean
    topSong.pause(); // .play() will resume from .pause() position
  } else {
    topSong.play();
  }
}
