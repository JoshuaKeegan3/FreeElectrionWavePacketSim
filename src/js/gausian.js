let time = 0;
let wave = [];
let path = [];

let slider;

let L = 500
let x = linspace(0, L, 2000)
let x0 = 200
let k0 = 0.4
let sig = 20.0
let curr = []

function setup() {
  createCanvas(600, 400);
  slider = createSlider(5, 100, 5);
  stroke(0)
  strokeWeight(1)
  background(255)
  noFill()
}

function draw() {
  curr = []
  background(255)
  stroke(0)
  line(width/2, 0, width/2, height)
  line(0,height/2, width, height/2)
  translate(0,height/2)
  
  text("0", width/2, 0)
  text("1", width/2, -height/3)
  text("-1", width/2, height/3)

  stroke(255,0,0)

  Psi = Gauss_Packet(x, x0, sig, k0)
  beginShape();
  for (let i = 0; i < Psi.length; i++){
    curr[i]=Psi[i].r
    vertex(x[i],-map(Psi[i].r,-0.05,0.05,-height/2,height/2))
  }
  endShape();
  
}

class ComplexNumber{
  constructor(r, i) {
    this.r = r;
    this.i = i;
  }
  multiply(cn){
    return new ComplexNumber(this.r * cn.r - this.i * cn.i,
                             this.i * cn.r + this.r * cn.i)
  }
  Epow(){
    return new ComplexNumber(Math.exp(this.r) * cos(this.i), sin(this.i))
  }
}

function Gauss_Packet(x, x0, sig, k0){
  ci = new ComplexNumber(0,1)
  pre = 1/(sig*sqrt(2*Math.PI))
  psi_x = []
  for (let i = 0; i < x.length; i++){
    ang = ci.multiply(new ComplexNumber(k0*x[i],0)) 
    a = new ComplexNumber(pre*Math.exp(-0.5*((x[i]-x0)/sig)**2),0) 
    psi_x[i] = ang.Epow() 
    psi_x[i] = psi_x[i].multiply(a)
  }
  return psi_x
}

function linspace(start, stop, num){
  const line = []
  for (let i = 0, j=0; j <= stop; i++, j+=(stop-start)/num){
    line[i] = j
  }
  return line
}
