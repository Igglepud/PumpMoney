//Creates variable for our game scene.
let titleScene = new Phaser.Scene('Title');




// create after preload
titleScene.create = function(){
this.title=this.add.sprite(0,0,'title');
this.title.setOrigin(0,0);
this.title.setScale(.6);  
this.titleText=this.add.sprite(300,200,'titleText');
this.titleText.setScale(.6);

   this.titleText.moveTween=this.tweens.add({
     targets:this.titleText,
      alpha:0,
    duration:750,
       yoyo:true,
       repeat:-1,

        });
    
    this.title.on('pointerup', function(){
this.scene.start('Game')
}, this);
this.title.setInteractive();    
};

titleScene.update = function(){

  
  
    
    

};