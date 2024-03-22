const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const images = {}
images.player = new Image()
images.player.src = 'images/cuphead.png'
// const characterActions = ['up', 'top right', 'right', 'down right', 'down', 'jump']
const characterActions = ['up', 'right', 'jump', 'down right']
const numberOfCharacters = 10

const characters = []
// characters.push(new Character())

class Character {
  constructor() {
    this.width = 103.0625
    this.height = 113.125
    this.frameX = 3
    // this.frameY = 3
    // this.x = 0
    // this.y = 0
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.speed = (Math.random() * 3.5) + 1.5
    this.action = characterActions[Math.floor(Math.random() * characterActions.length)]
    if (this.action === 'up') {
      this.frameY = 0
      this.minFrame = 4
      this.maxFrame = 15
    } else if (this.action === 'right') {
      this.frameY = 3
      this.minFrame = 3
      this.maxFrame = 13
    } else if (this.action === 'jump') {
      this.frameY = 7
      this.minFrame = 0
      this.maxFrame = 9
    } else if (this.action === 'down right') {
      this.frameY = 4
      this.minFrame = 4
      this.maxFrame = 15
    }
  }
  draw() {
    drawSprite(
      images.player,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )

    if (this.frameX < this.maxFrame) this.frameX++
    else this.frameX = this.minFrame
  }
  update(){
    if (this.action === 'right'){
      if (this.x > canvas.width + this.width){
        this.x = 0 - this.width;
        this.y = Math.random() * (canvas.height - this.height)

      } else {
        this.x += this.speed

      }
    } else if (this.action === 'up') {
      if (this.y < (0 - this.height)){
        this.y = canvas.height + this.height
        this.x = Math.random() * canvas.width
      } else {
        this.y -= this.speed
      }
    } else if (this.action === 'down right') {
      if (this.y > canvas.height + this.height && this.x > this.width + canvas.width){
        this.y = 0 - this.height
        this.x = Math.random() * canvas.width / 2
      } else {
        this.y += this.speed
        this.x += this.speed

      }
    }
    
  }
}

// const playerWidth = 103.0625
// const playerHeight = 113.125

// let playerFrameX = 3
// let playerFrameY = 3

// let playerX = 0
// let playerY = 0

// const playerSpeed = 6

for (i=0; i < numberOfCharacters; i++){
  characters.push(new Character())
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  // drawSprite(
  //     images.player, 
  //     playerWidth * playerFrameX,
  //     playerHeight * playerFrameY,
  //     playerWidth,
  //     playerHeight,
  //     playerX,
  //     playerY,
  //     playerWidth,
  //     playerHeight
  //     )

  // if (playerFrameX < 13) playerFrameX++
  // else playerFrameX = 3

  // if (playerX < canvas.width + playerWidth) playerX += playerSpeed
  // else playerX = 0 - playerWidth;

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (i=0; i<characters.length; i++){
    characters[i].draw()
    characters[i].update()
  
  }
  
}

window.onload = setInterval(animate, 1000 / 25) // 좀 더 자세한 이해가 필요...

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
})

