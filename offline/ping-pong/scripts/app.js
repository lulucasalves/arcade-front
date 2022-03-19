import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.querySelector('#ball'))
const player = new Paddle(document.querySelector('#player-paddle'))
const bot = new Paddle(document.querySelector('#computer-paddle'))
const playerScore = document.querySelector('#player-score')
const botScore = document.querySelector('#computer-score')
const playButton = document.querySelector('#play')

let lastTime

playButton.addEventListener('click', () => {
  playButton.style.display = 'none'

  function update(time) {
    if (lastTime != null) {
      const delta = time - lastTime
      ball.update(delta, [player.rect(), bot.rect()])
      bot.update(delta, ball.y)

      const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--hue')
      )
      document.documentElement.style.setProperty('--hue', hue + delta * 0.01)

      if (isLose()) {
        handleLose()
      }
    }

    lastTime = time
    window.requestAnimationFrame(update)
  }

  function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
  }

  function handleLose() {
    const rect = ball.rect()

    if (rect.right >= window.innerWidth) {
      playerScore.textContent = parseInt(playerScore.textContent) + 1
    } else {
      botScore.textContent = parseInt(botScore.textContent) + 1
    }

    ball.reset()
    bot.reset()
  }

  document.addEventListener('mousemove', (e) => {
    player.position = (e.y / window.innerHeight) * 100
  })

  window.requestAnimationFrame(update)
})
