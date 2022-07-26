let curr = []

f = 10

function setup() {
  createCanvas(600, 400);
  noFill()
  input = createInput();
  input.position(20, 65);
}

function draw() {
  background(255)
  update()
  stroke(0)
  line(width/2, 0, width/2, height)
  line(0,height/2, width, height/2)
  translate(0,height/2)
  
  text("0", width/2, 0)
  text("1", width/2, -height/3)
  text("-1", width/2, height/3)

  stroke(255,0,0)

  beginShape();
  for (let i = 0; i < width; i++){
    vertex(i, curr[i])
  }
  endShape();
}

function update(){

  try{
    temp = input.value().split(" ")
    for (let j=-width/2,ji=0; j < width/2; j++,ji++){
      curr[ji] = 0
      for (let i=0; i < temp.length; i++){
        curr[ji] += cos(float(temp[i])*j/f)
      }
      curr[ji] = curr[ji] / temp.length * height/3
    }
  }catch{
  }
}
