//Creates variable for our game scene.
let preloadScene = new Phaser.Scene('Preload');

//init
preloadScene.init = function(){

};

// set game configuration


// load assets
preloadScene.preload = function(){
    
    
     //loading box
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    progressBox.y = this.sys.game.config.width/2
    progressBox.x = this.sys.game.config.height/2
    
    
    //create loading screen 
    this.load.on('progress', function (value) {
    console.log(value);
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
    
});

            
this.load.on('fileprogress', function (file) {
    console.log(file.src);
});
 
    this.load.on('complete', function () {
        console.log('complete');
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        });
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Creating evil...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
loadingText.setOrigin(0.5, 0.5);    
    
this.load.image('hero', 'images/car.png')
this.load.image('kanye', 'images/kanye.png')
this.load.image('lilpump', 'images/lilpump.png')
this.load.image('money', 'images/money.png')
this.load.image('leftArrow', 'images/leftArrow.png')
this.load.image('rightArrow', 'images/rightArrow.png')
this.load.image('spaceMonkey', 'images/spaceMonkey.png')
this.load.image('star', 'images/star.png')
this.load.image('title', 'images/title.png')
this.load.image('titleText', 'images/titleText.png')
this.load.audio('monkeyBeep', 'sounds/monkeybeep.wav')
this.load.audio('pumpBeep', 'sounds/pumpbeep.wav')
this.load.audio('pumpMoney', 'sounds/pumpMoney.mp3')
if(this.sys.game.device.os.android==true){operatingSystem='mobile'};
if(this.sys.game.device.os.iOS==true){operatingSystem='mobile'};
};


// create after preload
preloadScene.create = function(){
    this.scene.start('Title'); 

    };
    


