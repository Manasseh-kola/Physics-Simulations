const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})


//Pendulum constructor
function Circle(x,y,radius,color){
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.velocity = 0.05;
    this.pathRadius = 300

    this.update = function(){
        this.angle += this.velocity
        this.x = x + Math.cos(this.angle) *this.pathRadius
        this.y = y + Math.sin(this.angle) * this.pathRadius
        this.draw();
       
    };

    this.draw = function(){

        c.beginPath()
        c.moveTo(x,y)
        c.lineTo(this.x,this.y)
        c.lineWidth = 2;
        c.stroke();
        c.closePath();
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };

};


let circle;
function init(){
    H = innerHeight/2
    W = innerWidth/2
    circle = new Circle(W,H,20,"rgb(150,70,50)");
 
};

//Animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    circle.update();
}

init();
animate();
