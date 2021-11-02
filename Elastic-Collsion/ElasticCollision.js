const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth/2,
  y: innerHeight/2
}


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})


//Generate random 
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

// Function to claculate Euclidean distance between particles
function getDistance(x1,y1,x2,y2){
    const X = x2-x1;
    const Y = y2-y1;
    return Math.sqrt(Math.pow(X,2)+ Math.pow(Y,2));

};

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

function elasticCollision(p1, p2) {
    const xVelocityDiff = p1.velocity.x - p2.velocity.x;
    const yVelocityDiff = p1.velocity.y - p2.velocity.y;

    const xDist = p2.x -p1.x;
    const yDist = p2.y - p1.y;

    // Implementing formula for elastic collision
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        const m1 = p1.mass;
        const m2 = p2.mass;      
        const angle = -Math.atan2(p2.y - p1.y, p2.x - p1.x);

        //Initial Velociy
        const u1 = rotate(p1.velocity, angle);
        const u2 = rotate(p2.velocity, angle);

        // Final Velocity
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Conservation of velocity assuming no energy lost.(closed system)
        p1.velocity.x = vFinal1.x;
        p1.velocity.y = vFinal1.y;
        p2.velocity.x = vFinal2.x;
        p2.velocity.y = vFinal2.y;
    }
}


//Particle constructor
function Particle(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.mass = 1;
    this.showFill = false;
    this.velocity ={
        x: (Math.random()-0.5)*10,
        y: (Math.random()-0.5)*10
    }
    this.radius = radius;
    this.color = color;

    this.update = (particles)=>{
        this.draw();

        for (let i = 0; i < particles.length; i++) {
           if( this=== particles[i]){
               continue;
           };
           if((getDistance(this.x,this.y,particles[i].x,particles[i].y)-(2*this.radius)) <=0 ){
               elasticCollision(this,particles[i]);
           };
            
        };

        if (this.x -this.radius <=0 || this.x+this.radius>=innerWidth){
            this.velocity.x = -this.velocity.x;
        };

        if (this.y -this.radius <=0 || this.y+this.radius>=innerHeight){
            this.velocity.y = -this.velocity.y;
        };

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.stroke();
        c.fill();
        // c.closePath();
    };

};

//Render function
let particles;

function init(){
    particles = [];
    for (let i = 0; i < 100; i++) {
        const radius = 20;
        let x = randomInt(radius,canvas.width-radius);
        let y = randomInt(radius,canvas.height-radius);
        const color = "rgb(50,50,50)";

        if (i !==0){
            for (let j=0; j< particles.length;j++){
                if ((getDistance(x,y,particles[j].x,particles[j].y)<=(2*radius))){
                    x = randomInt(radius,canvas.width-radius);
                    y = randomInt(radius,canvas.height-radius);
                    j= -1
                }
            }
        }
    
      
        particles.push(new Particle(x,y,radius,color))
    }
};

//Animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });

}

init();
animate();
