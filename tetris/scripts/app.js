document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const miniGrid = document.querySelector('.mini-grid')
  const squares = []
  const miniSquares = []

  for (let i = 0; i < 200; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)
  }

  for (let i = 0; i < 10; i++) {
    const square = document.createElement('div')
    square.classList.add('taken')
    grid.appendChild(square)
    squares.push(square)
  }

  for (let i = 0; i < 15; i++) {
    const square = document.createElement('div')
    miniGrid.appendChild(square)
    miniSquares.push(square)
  }

  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 22

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

  let currentPosition = 10
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
    })
  }

  timerId = setInterval(moveDown, 1000)

  function control(e) {
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
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
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
})
