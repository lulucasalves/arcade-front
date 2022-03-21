const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/ball-shoot', (req, res) => {
  res.sendFile(path.join(__dirname + '/ball-shoot/index.html'))
})

router.get('/ping-pong', (req, res) => {
  res.sendFile(path.join(__dirname + '/ping-pong/index.html'))
})

router.get('/space-invaders', (req, res) => {
  res.sendFile(path.join(__dirname + '/space-invaders/index.html'))
})

router.get('/tetris', (req, res) => {
  res.sendFile(path.join(__dirname + '/tetris/index.html'))
})

router.get('/breakout', (req, res) => {
  res.sendFile(path.join(__dirname + '/breakout/index.html'))
})

router.get('/mario', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/index.html'))
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/principal/index.html'))
})

router.get('/betaGames', (req, res) => {
  res.sendFile(path.join(__dirname + '/betaGames/index.html'))
})

//IMAGES
router.get('/ball-shoot/lightning.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/ball-shoot/lightning.png'))
})

router.get('/space-invaders/spaceship.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/space-invaders/spaceship.png'))
})

router.get('/space-invaders/invader.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/space-invaders/invader.png'))
})

router.get('/img/arrowDown.svg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/arrowDown.svg'))
})

router.get('/img/arrowRight.svg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/arrowRight.svg'))
})

router.get('/img/arrowLeft.svg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/arrowLeft.svg'))
})

router.get('/img/arrowTop.svg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/arrowTop.svg'))
})

router.get('/img/home.svg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/home.svg'))
})

router.get('/img/mouse.svg', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/mouse.svg'))
})

//FAVICON
router.get('/favicon', (req, res) => {
  res.sendFile(path.join(__dirname + '/favicon.svg'))
})

module.exports = router
