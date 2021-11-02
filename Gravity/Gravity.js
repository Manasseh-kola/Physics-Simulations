const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

//Ball constructor
function Ball(x,y,radius,color){
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.acceleration = 0.001;
    this.velocity = 1;
    this.gravity = 0.98;
    this.damping = 0.98;

    this.update = function(){
        if(this.y+this.radius >= canvas.height){
            this.velocity = -this.velocity*this.damping
        }else{
            this.velocity += this.gravity
        }
        this.draw();
        this.y += this.velocity 
    };

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };

};


let ball;
function init(){
    H = innerHeight/2
    W = innerWidth/2
    ball = new Ball(W,H,30,"rgb(150,70,50)");
 
};

//Animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    ball.update();
}

init();
animate();
