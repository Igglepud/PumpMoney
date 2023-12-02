// set game configuration
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [preloadScene, titleScene, gameScene, ],
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug:true,
           // gravity: {y: 1000},
            
        }
    }
};

var operatingSystem

//create new game and send configuration
let game = new Phaser.Game(config)

