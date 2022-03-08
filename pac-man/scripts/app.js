document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const score = document.querySelector('#score')
  const width = 28
  let currentScore = 0
  let ghostScared = false
  let getGhost = false
  let timerPacMove
  let timePilled
  const timePacMan = 180

  const controlButtonUp = document.querySelector('.upPosition')
  const controlButtonDown = document.querySelector('.downPosition')
  const controlButtonLeft = document.querySelector('.leftPosition')
  const controlButtonRight = document.querySelector('.rightPosition')

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
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 4, 4, 2, 2, 4, 4,
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
      const square = document.createElement('canvas')
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

  function removeAllButtons() {
    controlButtonDown.classList.remove('statusButton')
    controlButtonUp.classList.remove('statusButton')
    controlButtonLeft.classList.remove('statusButton')
    controlButtonRight.classList.remove('statusButton')
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

  document.addEventListener('keyup', movePacman)

  function arrowLeft() {
    removeAllImage()
    removeAllButtons()

    controlButtonLeft.classList.add('statusButton')
    squares[pacmanCurrentState].classList.remove('pac-man3')
    if (
      pacmanCurrentState % width != 0 &&
      !squares[pacmanCurrentState - 1].classList.contains('wall') &&
      !squares[pacmanCurrentState - 1].classList.contains('ghost-lair')
    ) {
      pacmanCurrentState -= 1
    }
    if (pacmanCurrentState - 1 == squares[363]) {
      pacmanCurrentState = 391
    }

    addPosition(1)

    pacEat()
    powerPelletEat()
    checkForGameOver(ghostScared)
    checkGhostDeath()
  }

  function arrowUp() {
    removeAllImage()
    removeAllButtons()
    controlButtonUp.classList.add('statusButton')
    squares[pacmanCurrentState].classList.remove('pac-man3')
    if (
      pacmanCurrentState - width >= 0 &&
      !squares[pacmanCurrentState - width].classList.contains('wall') &&
      !squares[pacmanCurrentState - width].classList.contains('ghost-lair')
    ) {
      pacmanCurrentState -= width
    }

    addPosition(1)

    pacEat()
    powerPelletEat()
    checkForGameOver(ghostScared)
    checkGhostDeath()
  }

  function arrowRight() {
    removeAllImage()
    removeAllButtons()
    controlButtonRight.classList.add('statusButton')
    squares[pacmanCurrentState].classList.remove('pac-man3')
    if (
      pacmanCurrentState % width >= 0 &&
      !squares[pacmanCurrentState + 1].classList.contains('wall') &&
      !squares[pacmanCurrentState + 1].classList.contains('ghost-lair')
    ) {
      pacmanCurrentState += 1
    }
    if (pacmanCurrentState + 1 == squares[392]) {
      pacmanCurrentState = 364
    }
    addPosition(1)

    pacEat()
    powerPelletEat()
    checkForGameOver(ghostScared)
    checkGhostDeath()
  }

  function arrowDown() {
    removeAllImage()
    removeAllButtons()
    controlButtonDown.classList.add('statusButton')
    squares[pacmanCurrentState].classList.remove('pac-man3')
    if (
      pacmanCurrentState + width < width * width &&
      !squares[pacmanCurrentState + width].classList.contains('wall') &&
      !squares[pacmanCurrentState + width].classList.contains('ghost-lair')
    ) {
      pacmanCurrentState += width
    }
    addPosition(1)

    pacEat()
    powerPelletEat()
    checkForGameOver(ghostScared)
    checkGhostDeath()
  }

  function movePacman(e) {
    switch (e.keyCode) {
      case 37:
        if (
          pacmanCurrentState % width != 0 &&
          !squares[pacmanCurrentState - 1].classList.contains('wall') &&
          !squares[pacmanCurrentState - 1].classList.contains('ghost-lair')
        ) {
          clearInterval(timerPacMove)
          timerPacMove = setInterval(arrowLeft, timePacMan)
        }
        break

      case 38:
        if (
          pacmanCurrentState - width >= 0 &&
          !squares[pacmanCurrentState - width].classList.contains('wall') &&
          !squares[pacmanCurrentState - width].classList.contains('ghost-lair')
        ) {
          clearInterval(timerPacMove)
          timerPacMove = setInterval(arrowUp, timePacMan)
        }
        break

      case 39:
        if (
          pacmanCurrentState % width >= 0 &&
          !squares[pacmanCurrentState + 1].classList.contains('wall') &&
          !squares[pacmanCurrentState + 1].classList.contains('ghost-lair')
        ) {
          clearInterval(timerPacMove)
          timerPacMove = setInterval(arrowRight, timePacMan)
        }
        break

      case 40:
        if (
          pacmanCurrentState + width < width * width &&
          !squares[pacmanCurrentState + width].classList.contains('wall') &&
          !squares[pacmanCurrentState + width].classList.contains('ghost-lair')
        ) {
          clearInterval(timerPacMove)
          timerPacMove = setInterval(arrowDown, timePacMan)
        }
        break
    }
  }

  function pacEat() {
    if (squares[pacmanCurrentState].classList.contains('pac-dot')) {
      currentScore++
      score.innerHTML = currentScore
      squares[pacmanCurrentState].classList.remove('pac-dot')
    }
  }

  function powerPelletEat() {
    if (squares[pacmanCurrentState].classList.contains('power-pellet')) {
      clearInterval(timePilled)
      currentScore += 10
      ghosts.forEach((ghost) => {
        ghost.isScared = true
      })
      ghostScared = true
      squares[pacmanCurrentState].classList.remove('power-pellet')
      timePilled = setInterval(unScareGhosts, 10000)
    }
  }

  function unScareGhosts() {
    ghosts.forEach((ghost) => {
      squares[ghost.currentIndex].classList.remove('scared-ghost')
      squares[ghost.currentIndex].classList.add(ghost.className)
      ghost.isScared = false
    })
    ghostScared = false
    clearInterval(timePilled)
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
    new Ghost('blinky', 348, 180),
    new Ghost('pinky', 376, 200),
    new Ghost('inky', 351, 190),
    new Ghost('clyde', 379, 210)
  ]

  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  })

  ghosts.forEach((ghost) => moveGhost(ghost))

  function moveGhost(ghost) {
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

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
        ghostScared = true
      } else {
        ghostScared = false
      }

      if (getGhost) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          'ghost',
          'scared-ghost'
        )

        ghost.currentIndex = 348

        currentScore += 100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        getGhost = false
      }

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

      checkForGameOver(ghostScared)
      checkGhostDeath()
    }, ghost.speed)
  }

  function checkGhostDeath() {
    if (
      ghostScared &&
      squares[pacmanCurrentState].classList.contains('ghost')
    ) {
      getGhost = true
    }
  }

  function checkForGameOver(second) {
    if (squares[pacmanCurrentState].classList.contains('ghost') && !second) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)

      if (maxScore) {
        if (parseInt(maxScore) < currentScore) {
          localStorage.setItem('max_score', currentScore)
        }
      } else {
        localStorage.setItem('max_score', currentScore)
      }

      alert('GAME OVER')
    }
  }

  const maxScore = localStorage.getItem('max_score')

  if (maxScore) {
    document.querySelector('#maxScore').innerHTML = `<p>${maxScore}</p>`
  }
})

function restart() {
  location.reload()
}
