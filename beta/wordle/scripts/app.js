const tileDisplay = document.querySelector('.tile-container')
const keyBoard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = ['HEROI', 'FAZER', 'NOBRE', 'IDEIA', 'SONHO', 'SAMBA']

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '«'
]

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((row, rowIndex) => {
  const rowElem = document.createElement('div')

  rowElem.setAttribute('id', 'guessRow-' + rowIndex)

  row.forEach((_guess, guessIndex) => {
    const tileElem = document.createElement('div')
    tileElem.setAttribute('id', 'guessRow-' + rowIndex + '-tile-' + guessIndex)
    tileElem.classList.add('tile')
    rowElem.append(tileElem)
  })

  tileDisplay.append(rowElem)
})

keys.forEach((key) => {
  const createdKeys = document.createElement('button')
  createdKeys.textContent = key
  createdKeys.setAttribute('id', key)
  createdKeys.addEventListener('click', () => handleClick(key))
  keyBoard.append(createdKeys)
})

function handleClick(key) {
  if (key === '«') {
    deleteLetter(key)
    return
  }

  if (key === 'ENTER') {
    checkRow()
    return
  }
  addLetter(key)
}

function addLetter(letter) {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    )
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
  }
}

function deleteLetter(letter) {
  if (currentTile > 0) {
    currentTile--
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    )
    tile.textContent = ''
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', '')
  }
}

function checkRow() {
  const guess = guessRows[currentRow].join('')
  flipTile()

  if (currentTile > 4) {
    if (wordle[currentRow] == guess && currentRow == 5) {
      alert('You Win!')
    }

    if (wordle[currentRow] == guess) {
      showMessage('Magnificent!')

      currentRow++
      currentTile = 0
      return
    }
  } else if (currentTile >= 5) {
    isGameOver = false
    showMessage('Game Over!')
    return
  }
}

function showMessage(message) {
  const messageElem = document.createElement('p')

  messageElem.textContent = message
  messageDisplay.append(messageElem)

  setTimeout(() => messageDisplay.removeChild(messageElem), 3000)
}

function removeColorToKey() {
  for (let i = 0; i < keys.length; i++) {
    const new_key = document.getElementById(keys[i])
    new_key.classList.remove('green-overlay', 'yellow-overlay', 'grey-overlay')
  }
}

function addColorToKey(key, color, guess) {
  const new_key = document.getElementById(key)
  new_key.classList.add(color)

  if (wordle[currentRow - 1] == guess) {
    removeColorToKey()
  }
}

function flipTile() {
  const tiles = document.querySelector('#guessRow-' + currentRow).childNodes
  let checkWordle = wordle[currentRow]
  const guess = []

  tiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
  })

  guess.forEach((guess, index) => {
    if (guess.letter == wordle[currentRow][index]) {
      guess.color = 'green-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  tiles.forEach((tile, index) => {
    tile.classList.remove('green-overlay')
    tile.classList.remove('yellow-overlay')
    tile.classList.remove('flip')

    const guessList = guessRows[currentRow].join('')
    setTimeout(() => {
      tile.classList.add('flip')
      tile.classList.add(guess[index].color)
      addColorToKey(guess[index].letter, guess[index].color, guessList)
    }, 500 * index)
  })
}
