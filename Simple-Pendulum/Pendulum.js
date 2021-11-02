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
function Pendulum(x,y,radius,color,angle){
    this.radius = radius;
    this.color = color;
    this.angle = angle;
    this.length = y;
    this.originX = x;
    this.originY = -8;
    this.ballX = this.length * Math.sin(this.angle)+this.originX;
    this.ballY = this.length* Math.cos(this.angle)+this.originY;
    this.acceleration = 0.001;
    this.velocity = 0;
    this.gravity = 0.98;

    this.update = function(){
        
        this.draw();
        this.acceleration = (-1*this.gravity* Math.sin(this.angle))/this.length
        this.velocity += this.acceleration;
        this.angle += this.velocity;
        this.ballX = this.length * Math.sin(this.angle)+this.originX;
        this.ballY = this.length* Math.cos(this.angle)+this.originY;

        
    };

    this.draw = function(){
        c.beginPath()
        c.moveTo(this.originX,this.originY)
        c.lineTo(this.ballX,this.ballY)
        c.lineWidth = 10;
        c.stroke();
        c.closePath();
        c.beginPath();
        c.arc(this.ballX,this.ballY,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };

};


let pendulum;
function init(){
    H = innerHeight/2
    W = innerWidth/2
    pendulum = new Pendulum(W,H,30,"rgb(150,70,50)",Math.PI/4);
 
};

//Animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    pendulum.update();
}

init();
animate();
