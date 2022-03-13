const platform = './public/platform.png'
const hills = './public/hills.png'
const background = './public/background.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

class Player {
  constructor() {
    this.position = { x: 100, y: 100 }
    this.velocity = { x: 0, y: 1 }
    this.width = 30
    this.height = 30
    this.sprites = 0
  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.fillStyle = 'rgba(255, 0, 0, 1)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.restore()
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (
      this.position.y + this.height + 108 + this.velocity.y <=
      canvas.height
    ) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = { x, y }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

let player = new Player()
let platformImage
let platformSmallTallImage
let blockTriImage
let lgPlatformImage
let tPlatformImage
let xtPlatformImage
let blockImage
let lastKey
let keys
let scrollOffset
let flagPole
let flagPoleImage
let game
let currentLevel = 1

keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
scrollOffset = 0

game = {
  disableUserInput: false
}

const image = new Image()
image.src = platform

let platforms = [new Platform({ x: 0, y: 860, image })]
let genericObjects = []
let goombas = []
let particles = []
let fireFlowers = []

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  platforms.forEach((platform) => {
    platform.draw()
  })

  player.update()

  if (
    lastKey === 'right' &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.currentSprite = player.sprites.run.right
  } else if (
    keys.left.pressed &&
    lastKey === 'left' &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left
  } else if (
    !keys.left.pressed &&
    lastKey === 'left' &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left
  } else if (
    !keys.right.pressed &&
    lastKey === 'right' &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right
  }
}

animate()

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      keys.left.pressed = true
      lastKey = 'left'
      break

    case 'ArrowRight':
      keys.right.pressed = true
      lastKey = 'right'
      break

    case 'ArrowUp':
      break

    case ' ':
      break
  }
})

addEventListener('keyup', ({ key }) => {
  switch (keyCode) {
    case 'ArrowLeft':
      keys.left.pressed = false
      break

    case 'ArrowRight':
      keys.right.pressed = false
      break
  }
})
