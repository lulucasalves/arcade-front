const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')
const bigScoreEl = document.querySelector('#bigScoreEl')
const whiteModalEl = document.querySelector('#whiteModalEl')

const scene = {
  active: false
}

let player
let projectiles = []
let enemies = []
let powerUps = []
let particles = []

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = { x: 0, y: 0 }
    this.friction = 0.99
    this.powerUp = ''
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    this.draw()
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction

    if (
      this.x - this.radius + this.velocity.x > 0 &&
      this.x - this.radius + this.velocity.x > canvas.width
    ) {
      this.x += this.velocity.x
    } else {
      this.velocity.x = 0
    }

    if (
      this.y - this.radius + this.velocity.y > 0 &&
      this.y - this.radius + this.velocity.y < canvas.height
    ) {
      this.y = this.y + this.velocity.y
    } else {
      this.velocity.y = 0
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  shoot(mouse, color = 'white', radius = 5, plusVelocity = 1) {
    const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x)
    const velocity = {
      x: Math.cos(angle) * 5 * plusVelocity,
      y: Math.sin(angle) * 5 * plusVelocity
    }

    projectiles.push(new Projectile(this.x, this.y, radius, color, velocity))
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

const powerUpImg = new Image()
powerUpImg.src = './public/lightning.png'

class PowerUp {
  constructor(x, y, velocity) {
    this.x = x
    this.y = y
    this.velocity = velocity
    this.width = 14
    this.height = 18
    this.radians = 0
  }

  draw() {
    c.save()
    c.translate(this.x + this.width / 2, this.y + this.height / 2)
    c.rotate(this.radians)
    c.translate(-this.x - this.width / 2, -this.y - this.height / 2)
    c.drawImage(powerUpImg, this.x, this.y, 14, 18)
    c.restore()
  }

  update() {
    this.radians += 0.002
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}

function spawnPowerUps() {
  let x
  let y

  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - 7 : canvas.width + 7
    y = Math.random() * canvas.height
  } else {
    x = Math.random() * canvas.width
    y = Math.random() < 0.5 ? 0 - 9 : canvas.height + 9
  }

  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  powerUps.push(new PowerUp(x, y, velocity))
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.type = 'linear'
    this.center = {
      x,
      y
    }

    this.radians = 0

    if (Math.random() < 0.25) {
      this.type = 'homing'

      if (Math.random() < 0.5) {
        this.type = 'spinning'

        if (Math.random() < 0.75) {
          this.type = 'homingSpinning'
        }
      }
    }
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    this.draw()

    if (this.type === 'linear') {
      this.x = this.x + this.velocity.x
      this.y = this.y + this.velocity.y
    } else if (this.type === 'homing') {
      const angle = Math.atan2(player.y - this.y, player.x - this.x)

      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }

      this.x = this.x + this.velocity.x
      this.y = this.y + this.velocity.y
    } else if (this.type === 'spinning') {
      this.radians += 0.05
      this.center.x += this.velocity.x
      this.center.y += this.velocity.y

      this.x = this.center.x + Math.cos(this.radians) * 100
      this.y = this.center.y + Math.sin(this.radians) * 100
    } else if (this.type === 'homingSpinning') {
      const angle = Math.atan2(player.y - this.y, player.x - this.x)

      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }

      this.radians += 0.05
      this.center.x += this.velocity.x
      this.center.y += this.velocity.y

      this.x = this.center.x + Math.cos(this.radians) * 100
      this.y = this.center.y + Math.sin(this.radians) * 100
    }
  }
}

const friction = 0.99

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.alpha = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}

function init() {
  const x = canvas.width / 2
  const y = canvas.height / 2

  player = new Player(x, y, 10, 'white')
  projectiles = []
  enemies = []
  powerUps = []
  particles = []
}

function spawnEnemies() {
  const radius = Math.random() * (30 - 4) + 4

  let x
  let y

  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
    y = Math.random() * canvas.height
  } else {
    x = Math.random() * canvas.width
    y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
  }

  const color = `hsl(${Math.random() * 360}, 50%, 50%)`
  const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2)

  const velocity = { x: Math.cos(angle), y: Math.sin(angle) }

  enemies.push(new Enemy(x, y, radius, color, velocity))
}

function createScoreLabel(projectile, score) {
  const scoreLabel = document.createElement('label')

  scoreLabel.innerHTML = score
  scoreLabel.style.position = 'absolute'
  scoreLabel.style.color = 'white'
  scoreLabel.style.userSelect = 'none'
  scoreLabel.style.left = projectile.x + 'px'
  scoreLabel.style.top = projectile.y + 'px'
  document.body.appendChild(scoreLabel)

  setInterval(() => {
    scoreLabel.parentNode.removeChild(scoreLabel)
  }, 1000)
}

let animationFrames
let score = 0
let frame = 0

function animate() {
  animationFrames = requestAnimationFrame(animate)
  frame++
  c.fillStyle = 'rgba(0, 0, 0, 0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (frame % 35 === 0) {
    spawnEnemies()
  }

  if (frame % 1500 === 0) {
    spawnPowerUps()
  }

  player.update()
  particles.forEach((val, i) => {
    if (val.alpha <= 0) {
      particles.splice(i, 1)
    } else {
      val.update()
    }
  })

  if (player.powerUp === 'Automatic' && mouse.down && frame % 1 === 0) {
    player.color = '#FFF500'
    player.shoot(mouse, '#fff500', 5, 1)
  } else if (player.powerUp === 'Bigger' && mouse.down && frame % 5 === 0) {
    player.color = '#275AF2'
    player.shoot(mouse, '#275AF2', 25, 0.5)
  } else if (player.powerUp === 'Fast' && mouse.down && frame % 5 === 0) {
    player.color = '#04D924'
    player.shoot(mouse, '#04D924', 8, 4)
  } else if (player.powerUp === 'Super') {
    player.color = '#D9042B'
    player.shoot(mouse, '#D9042B', 8, 2)
  }

  powerUps.forEach((val, i) => {
    const dist = Math.hypot(player.x - val.x, player.y - val.y)

    if (dist - player.radius - val.width / 2 < 1) {
      const powerUpsList = ['Automatic', 'Bigger', 'Fast', 'Super']
      player.powerUp =
        powerUpsList[Math.floor(Math.random() * powerUpsList.length)]
      powerUps.splice(i, 1)

      setTimeout(() => {
        player.powerUp = null
        player.color = '#FFFFFF'
      }, 5000)
    } else {
      val.update()
    }
  })

  projectiles.forEach((projectile, i) => {
    projectile.update()

    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(i, 1)
      }, 0)
    }
  })

  enemies.forEach((enemy, index) => {
    enemy.update()

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationFrames)
      modalEl.style.display = 'flex'
      bigScoreEl.innerHTML = score
      screen.active = false
      whiteModalEl.style.opacity = 1
      whiteModalEl.style.scale = 1
      whiteModalEl.style.duration = 0.5
    }

    projectiles.forEach((projectile, projectileI) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      if (dist - enemy.radius - projectile.radius < 0.03) {
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6)
              }
            )
          )
        }

        if (enemy.radius - 10 > 5) {
          score += 100
          scoreEl.innerHTML = score

          createScoreLabel(projectile, 100)

          enemy.radius -= 10

          setTimeout(() => {
            projectile.splice(projectileI, 1)
          }, 0)
        } else {
          score += 250
          scoreEl.innerHTML = score
          createScoreLabel(projectile, 250)

          setTimeout(() => {
            const enemyFound = enemies.find((enemyValue) => {
              return enemyValue === enemy
            })

            if (enemyFound) {
              enemies.splice(index, 1)
              projectiles.splice(projectileIndex, 1)
            }
          }, 0)
        }
      }
    })
  })
}

const mouse = {
  down: false,
  x: undefined,
  y: undefined
}

addEventListener('mousedown', ({ clientX, clientY }) => {
  mouse.x = clientX
  mouse.y = clientY

  mouse.down = true
})

addEventListener('mousemove', ({ clientX, clientY }) => {
  mouse.x = clientX
  mouse.y = clientY
})

addEventListener('mouseup', () => {
  mouse.down = false
})

addEventListener('touchstart', (e) => {
  mouse.x = e.touches[0].clientX
  mouse.y = e.touches[0].clientY

  mouse.down = true
})

addEventListener('touchmove', (e) => {
  mouse.x = e.touches[0].clientX
  mouse.y = e.touches[0].clientY
})

addEventListener('touchend', () => {
  mouse.down = false
})

addEventListener('click', ({ clientX, clientY }) => {
  if (scene.active && !player.powerUp) {
    mouse.x = clientX
    mouse.y = clientY
    player.shoot(mouse)
  }
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

startGameBtn.addEventListener('click', () => {
  init()
  animate()

  scene.active = true
  score = 0
  scoreEl.innerHTML = score
  bigScoreEl.innerHTML = score
  whiteModalEl.style.opacity = 1
  whiteModalEl.style.scale = 0.75
  whiteModalEl.style.duration = 0.25
  modalEl.style.display = 'none'
})
