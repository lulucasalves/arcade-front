function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(color) {
  return color[Math.floor(Math.random() * color.length)]
}

const platform = './public/platform.png'
const hills = './public/hills.png'
const background = './public/background.png'
const platformSmallTall = '../public/platformSmallTall.png'
const block = '../public/block.png'
const blockTri = '../public/blockTri.png'
const mdPlatform = '../public/mdPlatform.png'
const lgPlatform = '../public/lgPlatform.png'
const tPlatform = '../public/tPlatform.png'
const xtPlatform = '../public/xtPlatform.png'
const flagPoleSprite = '../public/flagPole.png'
const spriteRunLeft = '../public/spriteRunLeft.png'
const spriteRunRight = '../public/spriteRunRight.png'
const spriteStandLeft = '../public/spriteStandLeft.png'
const spriteStandRight = '../public/spriteStandRight.png'
const spriteMarioRunLeft = '../public/spriteMarioRunLeft.png'
const spriteMarioRunRight = '../public/spriteMarioRunRight.png'
const spriteMarioStandLeft = '../public/spriteMarioStandLeft.png'
const spriteMarioStandRight = '../public/spriteMarioStandRight.png'
const spriteMarioJumpRight = '../public/spriteMarioJumpRight.png'
const spriteMarioJumpLeft = '../public/spriteMarioJumpLeft.png'
const spriteFireFlowerRunRight = '../public/spriteFireFlowerRunRight.png'
const spriteFireFlowerRunLeft = '../public/spriteFireFlowerRunLeft.png'
const spriteFireFlowerStandRight = '../public/spriteFireFlowerStandRight.png'
const spriteFireFlowerStandLeft = '../public/spriteFireFlowerStandLeft.png'
const spriteFireFlowerJumpRight = '../public/spriteFireFlowerJumpRight.png'
const spriteFireFlowerJumpLeft = '../public/spriteFireFlowerJumpLeft.png'
const spriteFireFlower = '../public/spriteFireFlower.png'
const spriteGoomba = '../public/spriteGoomba.png'

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

class GenericObject {
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

const imageBackground = new Image()
imageBackground.src = background

const imageHills = new Image()
imageHills.src = hills

let platforms = []

let genericObjects = []

platforms = [new Platform({ x: 0, y: 860, image })]
genericObjects = [
  new GenericObject({ x: -1, y: -1, image: imageBackground }),

  new GenericObject({ x: -1, y: 240, image: imageBackground }),

  new GenericObject({ x: -1, y: 280, image: imageHills })
]

let goombas = []
let particles = []
let fireFlowers = []

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  genericObjects.forEach((genericObject) => {
    genericObject.draw()
  })

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

  if (scrollOffset > 2000) {
    alert('You Win!')
  }

  if (player.position.y > canvas.height) {
    alert('Game Over')
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
