document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const score = document.querySelector('#score')
  const width = 28
  let currentScore = 0

  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1
  ]

  const squares = []

  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      if (layout[i] == 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] == 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] == 2) {
        squares[i].classList.add('ghost-lair')
      } else if (layout[i] == 3) {
        squares[i].classList.add('power-pellet')
      }
    }
  }

  createBoard()

  let pacmanCurrentState = 490

  function addPosition(number) {
    squares[pacmanCurrentState].classList.add(`pac-man${number}`)
  }

  squares[pacmanCurrentState].classList.add('pac-man3')

  function removeAllImage() {
    squares[pacmanCurrentState].classList.remove('pac-man0')
    squares[pacmanCurrentState].classList.remove('pac-man1')
    squares[pacmanCurrentState].classList.remove('pac-man2')
  }
  function changeAllAngle(val) {
    squares[pacmanCurrentState].classList.add(`pac-man-angle-original`)

    if (val == 'right') {
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-left`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-right`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-up`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-down`)

      squares[pacmanCurrentState].classList.add(`pac-man-angle-original`)
    } else if (val == 'left') {
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-original`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-right`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-up`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-down`)

      squares[pacmanCurrentState].classList.add(`pac-man-angle-${val}`)
    } else if (val == 'down') {
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-left`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-right`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-up`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-original`)

      squares[pacmanCurrentState].classList.add(`pac-man-angle-${val}`)
    } else if (val == 'up') {
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-left`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-right`)
      squares[pacmanCurrentState].classList.add(`pac-man-angle-down`)
      squares[pacmanCurrentState].classList.remove(`pac-man-angle-original`)

      squares[pacmanCurrentState].classList.add(`pac-man-angle-${val}`)
    }
  }

  function animatePacman() {
    setInterval(() => {
      if (squares[pacmanCurrentState].classList.contains('pac-man0')) {
        removeAllImage()
        addPosition(1)
      } else if (squares[pacmanCurrentState].classList.contains('pac-man1')) {
        removeAllImage()
        addPosition(2)
      } else if (squares[pacmanCurrentState].classList.contains('pac-man2')) {
        removeAllImage()
        addPosition(0)
      }
    }, 100)
  }

  animatePacman()

  function movePacman(e) {
    switch (e.keyCode) {
      case 37:
        removeAllImage()
        squares[pacmanCurrentState].classList.remove('pac-man3')
        if (
          pacmanCurrentState % width != 0 &&
          !squares[pacmanCurrentState - 1].classList.contains('wall') &&
          !squares[pacmanCurrentState - 1].classList.contains('ghost-lair')
        ) {
          changeAllAngle('right')
          pacmanCurrentState -= 1
        }

        if (pacmanCurrentState - 1 == squares[363]) {
          pacmanCurrentState = 391
        }
        addPosition(1)
        break

      case 38:
        removeAllImage()
        squares[pacmanCurrentState].classList.remove('pac-man3')
        if (
          pacmanCurrentState - width >= 0 &&
          !squares[pacmanCurrentState - width].classList.contains('wall') &&
          !squares[pacmanCurrentState - width].classList.contains('ghost-lair')
        ) {
          changeAllAngle('down')
          pacmanCurrentState -= width
        }

        addPosition(1)
        break

      case 39:
        removeAllImage()
        squares[pacmanCurrentState].classList.remove('pac-man3')
        if (
          pacmanCurrentState % width >= 0 &&
          !squares[pacmanCurrentState + 1].classList.contains('wall') &&
          !squares[pacmanCurrentState + 1].classList.contains('ghost-lair')
        ) {
          changeAllAngle('left')
          pacmanCurrentState += 1
        }
        if (pacmanCurrentState + 1 == squares[392]) {
          pacmanCurrentState = 364
        }
        addPosition(1)
        break

      case 40:
        removeAllImage()
        squares[pacmanCurrentState].classList.remove('pac-man3')
        if (
          pacmanCurrentState + width < width * width &&
          !squares[pacmanCurrentState + width].classList.contains('wall') &&
          !squares[pacmanCurrentState + width].classList.contains('ghost-lair')
        ) {
          changeAllAngle('up')
          pacmanCurrentState += width
        }
        addPosition(1)
        break
    }

    pacEat()
    powerPelletEat()
    checkForGameOver()
    checkForWin()
  }

  document.addEventListener('keyup', movePacman)

  function pacEat() {
    if (squares[pacmanCurrentState].classList.contains('pac-dot')) {
      currentScore++
      score.innerHTML = currentScore
      squares[pacmanCurrentState].classList.remove('pac-dot')
    }
  }

  function powerPelletEat() {
    if (squares[pacmanCurrentState].classList.contains('power-pellet')) {
      currentScore += 10
      ghosts.forEach((ghost) => {
        ghost.isScared = true
      })
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentState].classList.remove('power-pellet')
    }
  }

  function unScareGhosts() {
    ghosts.forEach((ghost) => {
      ghost.isScared = false
      squares[ghost.currentIndex].classList.remove('scared-ghost')
    })
  }

  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
    }
  }

  const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
  ]

  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  })

  ghosts.forEach((ghost) => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(() => {
      if (
        !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall')
      ) {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
      }

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      if (
        ghost.isScared &&
        (squares[ghost.currentIndex].classList.contains('pac-man0') ||
          squares[ghost.currentIndex].classList.contains('pac-man1') ||
          squares[ghost.currentIndex].classList.contains('pac-man2') ||
          squares[ghost.currentIndex].classList.contains('pac-man3'))
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          'ghost',
          'scared-ghost'
        )
        ghost.currentIndex = 348
        currentScore += 100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }

      //formato de n se esconder

      if (
        squares[ghost.currentIndex + direction].classList.contains('pac-dot')
      ) {
        squares[ghost.currentIndex + direction].classList.remove('pac-dot')

        if (ghost.isScared) {
          squares[ghost.currentIndex + direction].classList.add('scared-ghost')
        } else {
          squares[ghost.currentIndex + direction].classList.add(ghost.className)
        }

        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.add('pac-dot')
      }

      if (
        squares[ghost.currentIndex + direction].classList.contains(
          'power-pellet'
        )
      ) {
        squares[ghost.currentIndex + direction].classList.remove('power-pellet')

        if (ghost.isScared) {
          squares[ghost.currentIndex + direction].classList.add('scared-ghost')
        } else {
          squares[ghost.currentIndex + direction].classList.add(ghost.className)
        }

        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.add('power-pellet')
      }

      checkForGameOver(ghost.isScared)
    }, 100)
  }

  function checkForGameOver(scared) {
    if (squares[pacmanCurrentState].classList.contains('ghost') && !scared) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function () {
        alert('Game Over')
      }, 100)
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (currentScore === 274) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function () {
        alert('You have WON!')
      }, 500)
    }
  }
})
