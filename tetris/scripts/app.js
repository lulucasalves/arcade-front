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
  const width = 10

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

  function undraw() {}
})
