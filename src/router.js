const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/tic-tac-toe', (req, res) => {
  res.sendFile(path.join(__dirname + '/tic-tac-toe/index.html'))
})

router.get('/wordle', (req, res) => {
  res.sendFile(path.join(__dirname + '/wordle/index.html'))
})

router.get('/pac-man', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/index.html'))
})

router.get('/candy-crush', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/index.html'))
})

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

router.get('/break-bricks', (req, res) => {
  res.sendFile(path.join(__dirname + '/breakout/index.html'))
})

router.get('/mario', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/index.html'))
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/principal/index.html'))
})

router.get('/beta-games', (req, res) => {
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

router.get('/img/ghost.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/img/ghost.png'))
})

router.get('/mario/platform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/platform.png'))
})

router.get('/mario/hills.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/hills.png'))
})

router.get('/mario/background.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/background.png'))
})

router.get('/mario/platformSmallTall.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/platformSmallTall.png'))
})

router.get('/mario/block.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/block.png'))
})

router.get('/mario/blockTri.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/blockTri.png'))
})

router.get('/mario/mdPlatform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/mdPlatform.png'))
})

router.get('/mario/lgPlatform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/lgPlatform.png'))
})

router.get('/mario/tPlatform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/tPlatform.png'))
})

router.get('/mario/xtPlatform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/xtPlatform.png'))
})

router.get('/mario/flagPole.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/flagPole.png'))
})

router.get('/mario/spriteRunLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteRunLeft.png'))
})

router.get('/mario/spriteRunRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteRunRight.png'))
})

router.get('/mario/spriteStandLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteStandLeft.png'))
})

router.get('/mario/spriteStandRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteStandRight.png'))
})

router.get('/mario/spriteMarioRunLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteMarioRunLeft.png'))
})

router.get('/mario/spriteMarioRunRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteMarioRunRight.png'))
})

router.get('/mario/spriteMarioStandLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteMarioStandLeft.png'))
})

router.get('/mario/spriteMarioStandRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteMarioStandRight.png'))
})

router.get('/mario/spriteMarioJumpRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteMarioJumpRight.png'))
})

router.get('/mario/spriteMarioJumpLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteMarioJumpLeft.png'))
})

router.get('/mario/spriteFireFlowerRunRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerRunRight.png'))
})

router.get('/mario/spriteFireFlowerRunLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerRunLeft.png'))
})

router.get('/mario/spriteFireFlowerStandRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerStandRight.png'))
})

router.get('/mario/spriteFireFlowerStandLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerStandLeft.png'))
})

router.get('/mario/spriteFireFlowerJumpRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerJumpRight.png'))
})

router.get('/mario/spriteFireFlower.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlower.png'))
})

router.get('/mario/spriteFireFlowerJumpLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerJumpLeft.png'))
})

router.get('/mario/spriteGoomba.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteGoomba.png'))
})

router.get('/mario/level2/background.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/level2/background.png'))
})

router.get('/mario/level2/mountains.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/level2/mountains.png'))
})

router.get('/mario/level2/lgPlatform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/level2/lgPlatform.png'))
})

router.get('/mario/level2/mdPlatform.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/level2/mdPlatform.png'))
})

router.get('/mario/spriteFireFlowerShootLeft.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerShootLeft.png'))
})

router.get('/mario/spriteFireFlowerShootRight.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/mario/spriteFireFlowerShootRight.png'))
})

router.get('/pac-man/ghost.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/ghost.png'))
})

router.get('/pac-man/pac0.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/pac0.png'))
})

router.get('/pac-man/pac1.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/pac1.png'))
})

router.get('/pac-man/pac2.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/pac2.png'))
})

router.get('/pac-man/scaredGhost2.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/scaredGhost2.png'))
})

router.get('/pac-man/wall.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/pac-man/wall.png'))
})

router.get('/candy-crush/blue-candy.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/blue-candy.png'))
})

router.get('/candy-crush/green-candy.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/green-candy.png'))
})

router.get('/candy-crush/orange-candy.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/orange-candy.png'))
})

router.get('/candy-crush/purple-candy.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/purple-candy.png'))
})

router.get('/candy-crush/red-candy.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/red-candy.png'))
})

router.get('/candy-crush/yellow-candy.png', (req, res) => {
  res.sendFile(path.join(__dirname + '/candy-crush/yellow-candy.png'))
})

//FAVICON
router.get('/favicon', (req, res) => {
  res.sendFile(path.join(__dirname + '/favicon.svg'))
})

module.exports = router
