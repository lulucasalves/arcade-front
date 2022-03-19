const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 110
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 780
const boardHeight = 500
let timerId
let xDirection = 2
let yDirection = 2
let score = 0

const randomPosition = Math.floor(Math.random() * (boardWidth - 30))

const userStart = [340, 10]
let currentPosition = userStart

const ballStart = [randomPosition, 90]
let ballCurrentPosition = ballStart

const playButton = document.querySelector('#play')

playButton.addEventListener('click', () => {
  playButton.style.display = 'none'

  class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis]
      this.bottomRight = [xAxis + blockWidth, yAxis]
      this.topLeft = [xAxis, yAxis + blockHeight]
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
  }

  const blocks = [
    new Block(10, 470),
    new Block(120, 470),
    new Block(230, 470),
    new Block(340, 470),
    new Block(450, 470),
    new Block(560, 470),
    new Block(670, 470),
    new Block(10, 440),
    new Block(120, 440),
    new Block(230, 440),
    new Block(340, 440),
    new Block(450, 440),
    new Block(560, 440),
    new Block(560, 470),
    new Block(670, 440),
    new Block(10, 410),
    new Block(120, 410),
    new Block(230, 410),
    new Block(340, 410),
    new Block(450, 410),
    new Block(560, 410),
    new Block(670, 410)
  ]

  function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
      const block = document.createElement('div')
      block.classList.add('block')
      block.style.left = blocks[i].bottomLeft[0] + 'px'
      block.style.bottom = blocks[i].bottomLeft[1] + 'px'
      grid.appendChild(block)
    }
  }

  addBlock()

  const user = document.createElement('div')
  user.classList.add('user')
  grid.appendChild(user)
  drawUser()

  const ball = document.createElement('div')
  ball.classList.add('ball')
  grid.appendChild(ball)
  drawBall()

  function moveUser(e) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentPosition[0] > 0) {
          currentPosition[0] -= 20
          drawUser()
        }
        break
      case 'ArrowRight':
        if (currentPosition[0] < boardWidth - blockWidth) {
          currentPosition[0] += 20
          drawUser()
        }
        break
    }
  }

  document.addEventListener('keydown', moveUser)

  function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
  }

  function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
  }

  function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
  }

  timerId = setInterval(moveBall, 10)

  function checkForCollisions() {
    for (let i = 0; i < blocks.length; i++) {
      if (
        ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
        ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
        ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
        ballCurrentPosition[1] < blocks[i].topLeft[1]
      ) {
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        allBlocks[i].classList.remove('block')
        blocks.splice(i, 1)

        const heightBlock = allBlocks[i].style.bottom
        const [value] = heightBlock.split('p')

        changeDirection()
        if (ballCurrentPosition[1] < parseInt(value)) {
          yDirection = -2
        }

        score++
        scoreDisplay.innerHTML = score

        if (blocks.length === 0) {
          scoreDisplay.innerHTML = 'You Win'
          clearInterval(timerId)
          document.removeEventListener('keydown', moveUser)
          alert('You win!')
          document.location.reload()
        }
      }
    }

    if (
      ballCurrentPosition[0] >= boardWidth - ballDiameter ||
      ballCurrentPosition[0] <= 0 ||
      ballCurrentPosition[1] >= boardHeight - ballDiameter
    ) {
      changeDirection()
    }

    if (
      ballCurrentPosition[0] > currentPosition[0] &&
      ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
      ballCurrentPosition[1] > currentPosition[1] &&
      ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
      changeDirection()
    }

    if (ballCurrentPosition[1] <= 0) {
      clearInterval(timerId)
      scoreDisplay.innerHTML = 'Game over!'
      document.removeEventListener('keydown', moveUser)
      alert('Game over!')
      document.location.reload()
    }
  }

  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }
})
