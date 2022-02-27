const game = {
  board: ['', '', '', '', '', '', '', '', ''],
  symbols: {
    options: ['O', 'X'],
    turn: 0
  },
  container: null,
  gameOver: false,
  winningSequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  whoInit: 'bot',
  level: 'easy',
  lastPlay: 'O',

  initGame(container) {
    this.container = container
  },

  play(position) {
    if (this.gameOver) return false

    if (this.board[position] === '') {
      this.board[position] = 'O'

      this.lastPlay = 'O'

      const winningSequencesDefault = this.checkWinning('O')

      if (winningSequencesDefault.position >= 0) {
        this.draw()
        this.gameOverFunc()
      } else {
        this.botCommands()
        this.draw()
      }

      return true
    } else {
      return false
    }
  },

  changeGamer() {
    this.whoInit = this.whoInit == 'player' ? 'bot' : 'player'

    this.symbols.options =
      this.symbols.options[0] == 'O' ? ['X', 'O'] : ['O', 'X']
  },

  start() {
    this.board.fill('')
    this.gameOver = false
    this.changeGamer()

    this.draw()
  },

  gameOverFunc() {
    this.gameOver = true

    const playerPoints = parseInt(localStorage.getItem('player_points'))
    const botPoints = parseInt(localStorage.getItem('bot_points'))
    if (playerPoints) {
      document.querySelector('.player-points').innerHTML = `${playerPoints}`
    } else {
      document.querySelector('.player-points').innerHTML = `0`
    }

    if (botPoints) {
      document.querySelector('.pc-points').innerHTML = `${botPoints}`
    } else {
      document.querySelector('.pc-points').innerHTML = `0`
    }
  },

  checkWinning(symbol) {
    for (i in this.winningSequences) {
      if (
        this.board[this.winningSequences[i][0]] == symbol &&
        this.board[this.winningSequences[i][1]] == symbol &&
        this.board[this.winningSequences[i][2]] == symbol
      ) {
        const winnerInfo = {
          symbol: symbol,
          position: i
        }

        return winnerInfo
      }
    }

    return -1
  },

  changeLevel(type) {
    localStorage.setItem('level', type)
    this.board.fill('')
    this.gameOver = false
    this.draw()
  },

  botCommands() {
    if (this.level == 'hard') {
      let paramsList = []
      for (i in this.board) {
        if (this.board[i] == '') {
          paramsList.push(i)
        }
      }

      let normalParams = ''
      let hardParams = ''
      let seq = this.winningSequences

      random = paramsList[Math.floor(Math.random() * paramsList.length)]

      for (i in seq) {
        const first =
          this.board[seq[i][0]] == 'X' && this.board[seq[i][1]] == 'X'
        const second =
          this.board[seq[i][0]] == 'X' && this.board[seq[i][2]] == 'X'
        const third =
          this.board[seq[i][1]] == 'X' && this.board[seq[i][2]] == 'X'

        if (
          first &&
          this.board[seq[i][2]] === '' &&
          paramsList.includes(String(seq[i][2]))
        ) {
          normalParams += seq[i][2]
        }

        if (
          second &&
          this.board[seq[i][1]] === '' &&
          paramsList.includes(String(seq[i][1]))
        ) {
          normalParams += seq[i][1]
        }

        if (
          third &&
          this.board[seq[i][0]] === '' &&
          paramsList.includes(String(seq[i][0]))
        ) {
          normalParams += seq[i][0]
        }
      }

      for (i in seq) {
        const first =
          this.board[seq[i][0]] == 'O' && this.board[seq[i][1]] == 'O'
        const second =
          this.board[seq[i][0]] == 'O' && this.board[seq[i][2]] == 'O'
        const third =
          this.board[seq[i][1]] == 'O' && this.board[seq[i][2]] == 'O'

        if (
          first &&
          this.board[seq[i][2]] === '' &&
          paramsList.includes(String(seq[i][2]))
        ) {
          hardParams += seq[i][2]
        }

        if (
          second &&
          this.board[seq[i][1]] === '' &&
          paramsList.includes(String(seq[i][1]))
        ) {
          hardParams += seq[i][1]
        }

        if (
          third &&
          this.board[seq[i][0]] === '' &&
          paramsList.includes(String(seq[i][0]))
        ) {
          hardParams += seq[i][0]
        }
      }

      if (!isNaN(random)) {
        if (
          this.whoInit == 'bot' &&
          !this.board.includes('O') &&
          !this.board.includes('X')
        ) {
          this.board[4] = 'X'
        } else if (normalParams) {
          this.board[normalParams[0]] = 'X'
        } else if (hardParams) {
          this.board[hardParams[0]] = 'X'
        } else {
          this.board[random] = 'X'
        }

        paramsList = []
        normalParams = ''
        hardParams = ''

        const winningSequencesBot = this.checkWinning('X')
        const winningSequencesPlayer = this.checkWinning('O')

        if (
          winningSequencesBot.position >= 0 ||
          winningSequencesPlayer.position >= 0
        ) {
          this.lastPlay = 'X'
          this.draw()
          this.gameOverFunc()
          return true
        } else {
          this.lastPlay = 'X'
          this.draw()
          return true
        }
      }
    } else if (this.level == 'normal') {
      let paramsList = []
      for (i in this.board) {
        if (this.board[i] == '') {
          paramsList.push(i)
        }
      }

      let normalParams = ''
      let seq = this.winningSequences

      random = paramsList[Math.floor(Math.random() * paramsList.length)]

      for (i in seq) {
        const first =
          this.board[seq[i][0]] == 'X' && this.board[seq[i][1]] == 'X'
        const second =
          this.board[seq[i][0]] == 'X' && this.board[seq[i][2]] == 'X'
        const third =
          this.board[seq[i][1]] == 'X' && this.board[seq[i][2]] == 'X'

        if (
          first &&
          this.board[seq[i][2]] === '' &&
          paramsList.includes(String(seq[i][2]))
        ) {
          normalParams += seq[i][2]
        }

        if (
          second &&
          this.board[seq[i][1]] === '' &&
          paramsList.includes(String(seq[i][1]))
        ) {
          normalParams += seq[i][1]
        }

        if (
          third &&
          this.board[seq[i][0]] === '' &&
          paramsList.includes(String(seq[i][0]))
        ) {
          normalParams += seq[i][0]
        }
      }

      if (!isNaN(random)) {
        if (
          this.whoInit == 'bot' &&
          !this.board.includes('O') &&
          !this.board.includes('X')
        ) {
          this.board[4] = 'X'
        } else if (normalParams) {
          this.board[normalParams] = 'X'
        } else {
          this.board[random] = 'X'
        }

        paramsList = []
        normalParams = []

        const winningSequencesBot = this.checkWinning('X')
        const winningSequencesPlayer = this.checkWinning('O')

        if (
          winningSequencesBot.position >= 0 ||
          winningSequencesPlayer.position >= 0
        ) {
          this.lastPlay = 'X'
          this.draw()
          this.gameOverFunc()
        } else {
          this.lastPlay = 'X'
          this.draw()
        }
      }
    } else {
      let random = ''

      let paramsList = []
      for (i in this.board) {
        if (this.board[i] == '') {
          paramsList.push(i)
        }
      }
      random += paramsList[Math.floor(Math.random() * paramsList.length)]

      if (!isNaN(random)) {
        this.board[random] = 'X'

        paramsList = []

        const winningSequencesBot = this.checkWinning('X')
        const winningSequencesPlayer = this.checkWinning('O')

        if (
          winningSequencesBot.position >= 0 ||
          winningSequencesPlayer.position >= 0
        ) {
          this.lastPlay = 'X'
          this.draw()
          this.gameOverFunc()
        } else {
          this.lastPlay = 'X'
          this.draw()
        }
      }
    }
  },

  draw() {
    if (!this.gameOver) {
      let content = ''
      let youWin = ''

      const level = localStorage.getItem('level')

      const playerPoints = parseInt(localStorage.getItem('player_points'))
      const botPoints = parseInt(localStorage.getItem('bot_points'))

      if (level) {
        this.level = level

        const levelContent = `<p class="${level}" >${level} level</p>`

        document.querySelector('.levelString').innerHTML = levelContent
      } else {
        const levelContent = `<p class="easy" >easy level</p>`

        document.querySelector('.levelString').innerHTML = levelContent
      }

      if (
        this.whoInit == 'bot' &&
        !this.board.includes('O') &&
        !this.board.includes('X')
      ) {
        this.botCommands()
      }

      let winningSequencesDefault = this.checkWinning(this.lastPlay)

      for (i in this.board) {
        let normalSquare =
          `<div onclick="game.play(` + i + `)"> ${this.board[i]} </div>`

        if (
          winningSequencesDefault.position >= 0 &&
          this.board[i] === winningSequencesDefault.symbol
        ) {
          console.log(winningSequencesDefault.symbol)
          if (
            this.winningSequences[winningSequencesDefault.position][0] == i ||
            this.winningSequences[winningSequencesDefault.position][1] == i ||
            this.winningSequences[winningSequencesDefault.position][2] == i
          ) {
            if (winningSequencesDefault.symbol == 'X') {
              if (botPoints) {
                localStorage.setItem('bot_points', botPoints + 1)
              } else {
                localStorage.setItem('bot_points', 1)
              }

              content +=
                `<div class="winner-bot" onclick="game.play(` +
                i +
                `)"> ${this.board[i]} </div>`

              this.lastPlay = 'O'
            } else if (winningSequencesDefault.symbol == 'O') {
              if (playerPoints) {
                localStorage.setItem('player_points', playerPoints + 1)
              } else {
                localStorage.setItem('player_points', 1)
              }

              content +=
                `<div class="winner-player" onclick="game.play(` +
                i +
                `)"> ${this.board[i]} </div>`

              this.lastPlay = 'X'
            }
          } else {
            content += normalSquare
          }
        } else {
          content += normalSquare
        }
      }

      if (winningSequencesDefault.symbol == 'O') {
        youWin += `<p class="youWin">YOU WIN</p>`
      } else if (winningSequencesDefault.symbol == 'X') {
        youWin += `<p class="youLost">YOU LOST</p>`
      } else if (!this.board.includes('')) {
        youWin += `<p class="youLost">DRAW</p>`
      } else {
        youWin += `<p class="youLost">WAITING FOR RESULTS</p>`
      }

      if (playerPoints) {
        document.querySelector('.player-points').innerHTML = `${playerPoints}`
      } else {
        document.querySelector('.player-points').innerHTML = `0`
      }

      if (botPoints) {
        document.querySelector('.pc-points').innerHTML = `${botPoints}`
      } else {
        document.querySelector('.pc-points').innerHTML = `0`
      }

      document.querySelector('.banner').innerHTML = youWin
      this.container.innerHTML = content
    }
  }
}
