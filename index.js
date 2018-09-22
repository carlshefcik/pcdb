window.$ = window.jQuery = require('jquery')

const colorArray = [
    '#2cb2c9',
    '#93dae3',
    '#c6e9ed'
]

$(document).ready(()=>{
    const canvas = document.querySelector("canvas")
    canvas.width = window.innerWidth-2
    canvas.height = window.innerHeight-5
    const c = canvas.getContext('2d')

    let mouse ={ x: undefined, y: undefined}

    window.addEventListener('mousemove', (e)=>{
        mouse.x = e.x
        mouse.y = e.y
    })

    function Circle(x,y,dx,dy,radius){
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)]

        this.draw = function() {
            c.beginPath()
            c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
            c.fillStyle = this.color
            c.fill();
        }

        this.update = function() {
            if(this.x + radius > innerWidth-2 || this.x - radius < 0){
                this.dx = -this.dx
            }
            if(this.y + radius > innerHeight-5 || this.y - radius < 0){
                this.dy = -this.dy
            }
            this.x += this.dx
            this.y += this.dy

            if(mouse.x-this.x < 50 && this.x-mouse.x < 50 && mouse.y-this.y < 50 && this.y-mouse.y < 50 ){ 
                if(this.radius < 37){
                    this.radius += 4
                }
            }
            else if(this.radius > 3){
                this.radius -= 1
            }

            this.draw();
        }

    }

    let circleArray = []

    for(let i=0; i < 300; i++){
        let radius = 3
        let x = (Math.random()*(innerWidth-radius*2))+radius
        let y = (Math.random()*(innerHeight-radius*2))+radius
        let dx = (Math.random() - 0.5) * 2
        let dy = (Math.random() - 0.5) * 2

        circleArray.push(new Circle(x,y,dx,dy,radius))
    }
    console.log(circleArray)
    circleArray.forEach((e)=>{
        console.log(e);
    })

    function animate(){
        c.clearRect(0,0,innerWidth,innerHeight)
        requestAnimationFrame(animate)

        circleArray.forEach((e)=>{
            e.update();
        })
    }
    
    animate();

    window.addEventListener("resize", ()=>{
        canvas.width = window.innerWidth -2
        canvas.height = window.innerHeight-5
        //document.querySelector('body').style('margin-top: 20%;')
    })
})
