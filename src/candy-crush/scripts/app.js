document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const playDisplay = document.querySelector('#play')
  const width = 8
  const squares = []
  let score = 0
  let play = 15

  const colors = [
    'url(./public/red-candy.png)',
    'url(./public/yellow-candy.png)',
    'url(./public/orange-candy.png)',
    'url(./public/purple-candy.png)',
    'url(./public/green-candy.png)',
    'url(./public/blue-candy.png)'
  ]

  function createBoard() {
    for (let i = 0; i < width ** 2; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true)
      square.setAttribute('id', i)
      let randomColor = Math.floor(Math.random() * colors.length)
      square.style.background = colors[randomColor]
      grid.appendChild(square)
      squares.push(square)
    }
  }
  score
  createBoard()

  let colorDragged
  let colorReplaced
  let squareDragged
  let squareReplaced

  squares.forEach((val) => val.addEventListener('dragstart', dragStart))
  squares.forEach((val) => val.addEventListener('dragend', dragEnd))
  squares.forEach((val) => val.addEventListener('dragover', dragOver))
  squares.forEach((val) => val.addEventListener('dragenter', dragEnter))
  squares.forEach((val) => val.addEventListener('drageleave', dragLeave))
  squares.forEach((val) => val.addEventListener('drop', dragDrop))

  function dragStart() {
    colorDragged = this.style.background
    squareDragged = parseInt(this.id)
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
  }

  function dragLeave() {
    this.style.background = ''
  }

  function dragDrop() {
    colorReplaced = this.style.background
    squareReplaced = parseInt(this.id)
    this.style.background = colorDragged
    squares[squareDragged].style.background = colorReplaced
  }

  function dragEnd() {
    let validMoves = [
      squareDragged - 1,
      squareDragged - width,
      squareDragged + 1,
      squareDragged + width
    ]

    let validMove = validMoves.includes(squareReplaced)

    if (squareReplaced && validMove) {
      squareReplaced = null
    } else if (squareReplaced && !validMove) {
      squares[squareReplaced].style.background = colorReplaced
      squares[squareDragged].style.background = colorDragged
    } else {
      squares[squareDragged].style.background = colorDragged
    }

    play--
    playDisplay.innerHTML = play
  }

  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.background === '') {
        squares[i + width].style.background = squares[i].style.background
        squares[i].style.background = ''
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && squares[i].style.background === '') {
          let randomColor = Math.floor(Math.random() * colors.length)
          squares[i].style.background = colors[randomColor]
        }
      }
    }
  }

  moveDown()

  function checkRow4() {
    for (i = 0; i < 60; i++) {
      let listOfSequences = [i, i + 1, i + 2, i + 3]
      let decidedColor = squares[i].style.background
      const isBlank = squares[i].style.background === ''

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55
      ]
      if (notValid.includes(i)) {
        continue
      }

      if (
        listOfSequences.every(
          (val) => squares[val].style.background === decidedColor && !isBlank
        )
      ) {
        score += 4
        scoreDisplay.innerHTML = score
        listOfSequences.forEach((val) => {
          squares[val].style.background = ''
        })
      }
    }
  }

  checkRow4()

  function checkColumn4() {
    for (i = 0; i < 39; i++) {
      let listOfSequences = [i, i + width, i + width * 2, i + width * 3]
      let decidedColor = squares[i].style.background
      const isBlank = squares[i].style.background === ''

      if (
        listOfSequences.every(
          (val) => squares[val].style.background === decidedColor && !isBlank
        )
      ) {
        score += 4
        scoreDisplay.innerHTML = score
        listOfSequences.forEach((val) => {
          squares[val].style.background = ''
        })
      }
    }
  }

  checkColumn4()

  function checkRow() {
    for (i = 0; i < 61; i++) {
      let listOfSequences = [i, i + 1, i + 2]
      let decidedColor = squares[i].style.background
      const isBlank = squares[i].style.background === ''

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

      if (notValid.includes(i)) {
        continue
      }

      if (
        listOfSequences.every(
          (val) => squares[val].style.background === decidedColor && !isBlank
        )
      ) {
        score += 3
        scoreDisplay.innerHTML = score
        listOfSequences.forEach((val) => {
          squares[val].style.background = ''
        })
      }
    }
  }

  checkRow()

  function checkColumn() {
    for (i = 0; i < 47; i++) {
      let listOfSequences = [i, i + width, i + width * 2]
      let decidedColor = squares[i].style.background
      const isBlank = squares[i].style.background === ''

      if (
        listOfSequences.every(
          (val) => squares[val].style.background === decidedColor && !isBlank
        )
      ) {
        score += 3
        scoreDisplay.innerHTML = score
        listOfSequences.forEach((val) => {
          squares[val].style.background = ''
        })
      }
    }
  }

  checkColumn()

  function checkVictory() {
    if (score >= 100) {
      alert('You Win!')
      location.reload()
    } else if (play < 1) {
      alert('You Lost!')
      location.reload()
    }
  }

  checkVictory()

  window.setInterval(() => {
    checkRow4()
    checkColumn4()
    checkRow()
    checkColumn()
    moveDown()
    checkVictory()
  }, 100)
})
