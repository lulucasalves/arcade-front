document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')

  for (let i = 0; i < 200; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
  }

  for (let i = 0; i < 10; i++) {
    const square = document.createElement('div')
    square.classList.add('taken')
    grid.appendChild(square)
  }

  let squares = Array.from(document.querySelectorAll('.grid div'))

  for (let i = 0; i < 15; i++) {
    const square = document.createElement('div')
    document.querySelector('.mini-grid').appendChild(square)
  }

  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = ['#F28705', '#F23041', '#17138A', '#868FC6', '#049DD9']

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino
  ]

  let currentPosition = 4
  let currentRotation = 0

  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  function undraw() {
    current.forEach((i) => {
      squares[currentPosition + i].classList.remove('tetromino')
      squares[currentPosition + i].style.backgroundColor = ''
    })
  }

  function control(e) {
    if (timerId) {
      if (e.keyCode === 37) {
        moveLeft()
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        moveRight()
      } else if (e.keyCode === 40) {
        moveDown()
      }
    }
  }

  document.addEventListener('keyup', control)

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function freeze() {
    if (
      current.some((i) =>
        squares[currentPosition + i + width].classList.contains('taken')
      )
    ) {
      current.forEach((i) =>
        squares[currentPosition + i].classList.add('taken')
      )
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeft = current.some((i) => (currentPosition + i) % width === 0)
    if (!isAtLeft) {
      currentPosition--
    }

    if (
      current.some((i) =>
        squares[currentPosition + i].classList.contains('taken')
      )
    ) {
      currentPosition++
    }

    draw()
  }

  function moveRight() {
    undraw()

    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    )

    if (!isAtRightEdge) {
      currentPosition++
    }

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition--
    }

    draw()
  }

  function isAtRight() {
    return current.some((i) => (currentPosition + i + 1) % width === 0)
  }

  function isAtLeft() {
    return current.some((i) => (currentPosition + i) % width === 0)
  }

  function checkRotatedPosition(P) {
    P = P || currentPosition
    if ((P + 1) % width < 4) {
      if (isAtRight()) {
        currentPosition++
        checkRotatedPosition(P)
      }
    } else if (P % width > 5) {
      if (isAtLeft()) {
        currentPosition--
        checkRotatedPosition(P)
      }
    }
  }

  function rotate() {
    if (
      !current.some((i) =>
        squares[currentPosition + i + width * 2].classList.contains('taken')
      )
    ) {
      undraw()
      currentRotation++
      if (currentRotation === current.length) {
        currentRotation = 0
      }

      current = theTetrominoes[random][currentRotation]
      checkRotatedPosition()
      draw()
    }
  }

  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0

  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
  ]

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })

    upNextTetrominoes[nextRandom].forEach((i) => {
      displaySquares[displayIndex + i].classList.add('tetromino')
      displaySquares[displayIndex + i].style.backgroundColor =
        colors[nextRandom]
    })
  }

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 700)
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
  })

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9
      ]

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach((index) => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })

        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach((cell) => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
    if (
      current.some((i) =>
        squares[currentPosition + i].classList.contains('taken')
      )
    ) {
      alert('Game Over!')
      clearInterval(timerId)
    }

    if (score > 999) {
      alert('You Win!')
      clearInterval(timerId)
    }
  }
})
