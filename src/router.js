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

module.exports = router
