//Creates variable for our game scene.
let gameScene = new Phaser.Scene('Game');

//init
gameScene.init = function(){
    this.shoot = false;
    this.kanyeSpeed=1;
    this.monkeySpeed=this.add.group();
    this.score;
    this.scorePoint;
};



// load assets
gameScene.preload = function(){

};

// create after preload
gameScene.create = function(){
    this.monkeyBeepSound= this.sound.add('monkeyBeep');
    this.pumpBeepSound= this.sound.add('pumpBeep');
    this.music= this.sound.add('pumpMoney',{loop:true})
    //size the game to the screen
    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;
//load lilpump's head, roatate it upside down and attach to car coordinates
   // this.lilpump=this.add.sprite(this.car.x, this.car.y - 20, 'lilpump');
    this.lilpump=this.add.sprite(320, 320, 'lilpump');
    //define cursor keys as a variable
    cursors = this.input.keyboard.createCursorKeys();
    this.lilpump.setScale(.2);
    this.lilpump.flipY = true;
    this.lilpump.depth=2;
//load and place star kanye
    this.kanye=this.add.sprite(320,40, 'kanye');
    this.kanye.setScale(.3);
        this.kanye.depth=0

//load and place invisible money
    this.money=this.add.sprite(1000,1000, 'money');
    this.money.setScale(.05);
    //check OS, if mobile add mobile controls
    if(operatingSystem=='mobile'){
    this.leftArrow=this.add.sprite(130,this.gameH-60, 'leftArrow');
    this.leftArrow.setScale(.5);
    
    this.rightArrow=this.add.sprite(this.gameW-10,this.gameH-60, 'rightArrow');
    this.rightArrow.setScale(.5);}
    

        //create monkey group
        this.spaceMonkeys = this.add.group({
        key: 'spaceMonkey',
        repeat: 0,
        setXY: {
            x: this.kanye.x,
            y: this.kanye.y,
            
            }
            
      });
        
    
    //create stars group
    this.stars = this.add.group({
        key: 'star',
        repeat:200,
        visible:false,
        setXY:{
            x: Math.random()*640,
            y:Math.random()*360,
        }

        
    });

    


       this.gameW = this.sys.game.config.width;
        this.gameH = this.sys.game.config.height;
    
     this.scoreText=this.add.text(20,20,'Score: 0');
    
    //create function to spawn monkeys
    this.monkeySpawn= function(){
        this.spaceMonkeys.create(this.kanye.x, this.kanye.y,'spaceMonkey');
        };
        

    
    //create new monkeys timer
    this.spawnMonkeys = this.time.addEvent({
        delay: 2000,
        repeat: -1,
        callback: function(){this.monkeySpawn()},
        callbackScope: this
    });
    
    
        let spaceMonkeys = this.spaceMonkeys.getChildren();
        let numSpaceMonkeys = spaceMonkeys.length;
        for(let i = 0; i< numSpaceMonkeys; i++){
        spaceMonkeys[i].setScale(.05)
        spaceMonkeys[i].visible=true;
            
        };
    
    //add controls for mobile
        if(this.leftArrow){
        this.lilpump.setInteractive();
        this.lilpump.on('pointerdown', function(pointer){
        if(this.shoot==false){
        this.money.x = this.lilpump.x;
        this.money.y=this.lilpump.y;
        this.money.depth=3;
        this.money.visible=true;
        this.shoot = true; 
            
        }    
            
        })
        
    }
    
    //set mobile controls
       if(this.leftArrow){ this.leftArrow.setInteractive();

      this.leftArrow.on('pointerdown', function(pointer){
    if(this.lilpump.x>=0){
    this.lilpump.x = this.lilpump.x-5;
    this.lilpump.angle=this.lilpump.angle-10};
      }, this)};
    
        
    if(this.rightArrow){this.rightArrow.setInteractive();

    this.rightArrow.on('pointerdown', function(pointer){
        if(this.lilpump.x<=this.gameW){
        this.lilpump.x = this.lilpump.x+5;
      this.lilpump.angle=this.lilpump.angle+10};
    },this)};
    
 this.music.play();   
};
    



//Update Function.
gameScene.update = function(){
    
  
    
    if (this.score ==null){
        this.score=0
    };
    if (this.scorePoint == true){
        this.score = this.score + 1;
        this.scorePoint = false;
    };
    
this.scoreText.setText('Score: '+ this.score); 
    
    if(this.score<0){
            this.music.stop();
            alert('YOU LOSE!');
            this.score=0;
            this.scene.start('Title')
        };  
            
            if(this.score>=100){
            alert('YOU WIN!');
            this.score=0;
            this.scene.restart()
        }; 
    
Monkey=this.spaceMonkeys.getChildren();
    
 //tween example, delete
 // this.spaceMonkey.moveTween=this.tweens.add({
   //  targets:Monkey,
    //  x:Math.random()*600,
     // y:Math.random()*300,
//    scaleX:Math.random()*2,
  //  scaleY:Math.random()*2,
//    duration:3000,
      
  //   }) 
  
    
    
    //move car left and right
    if(cursors.left.isDown && this.lilpump.x>=0){
       
        this.lilpump.x = this.lilpump.x-5;
        this.lilpump.angle=this.lilpump.angle-10};

    

    if(cursors.right.isDown && this.lilpump.x<=this.gameW){
    this.lilpump.x = this.lilpump.x+5;
    this.lilpump.angle=this.lilpump.angle+10};

    
    //make kanye move back and forth
    if(this.kanye.x<0 || this.kanye.x > this.gameW){
    this.kanyeSpeed=this.kanyeSpeed*-1
        
    };
    this.kanye.x = this.kanye.x + this.kanyeSpeed;
    if(this.kanyeSpeed==1){this.kanye.rotation = this.kanye.rotation+.05;};
    if(this.kanyeSpeed==-1){this.kanye.rotation = this.kanye.rotation-.05;};
    //move money to car on arrow key press
    if(cursors.up.isDown && this.shoot == false){
        this.money.x = this.lilpump.x;
        this.money.y=this.lilpump.y;
        this.money.depth=3;
        this.money.visible=true;
        this.shoot = true;
              };
    

     this.money.y=this.money.y-15;
    this.money.angle=this.money.angle+15;
       
        if (this.money.y<0){
            this.money.y = this.gameH;
            this.money.visible = false;
            this.shoot=false;
        };

    
    let spaceMonkeys = this.spaceMonkeys.getChildren();
    let numSpaceMonkeys = spaceMonkeys.length;
    for(let i = 0; i< numSpaceMonkeys; i++){
        spaceMonkeys[i].setScale(.05)
        if(this.monkeySpeed[i]==null){
            this.monkeySpeed[i]=i+2
        }
        spaceMonkeys[i].x = spaceMonkeys[i].x  + this.monkeySpeed[i];
        if(spaceMonkeys[i].x  < 0 || spaceMonkeys[i].x> this.gameW){
            this.monkeySpeed[i]=this.monkeySpeed[i]*-1

            spaceMonkeys[i].y=spaceMonkeys[i].y+20    
        };
        //create hit boxes
        let lilpumpRect=this.lilpump.getBounds();
        let spaceMonkeyRect = spaceMonkeys[i].getBounds();
        let kanyeRect=this.kanye.getBounds();
        let moneyRect=this.money.getBounds();
        //check for collision between projectile and enemy
        if(Phaser.Geom.Intersects.RectangleToRectangle(moneyRect, spaceMonkeyRect)){
        this.money.y=1000;
        this.money.x=1000;
        spaceMonkeys[i].y=-500;
        this.monkeyBeepSound.stop();       
        this.monkeyBeepSound.play();       
        spaceMonkeys[i].y=this.kanye.y;
        spaceMonkeys[i].x=this.kanye.x;
        this.money.visible = false;
        this.shoot=false;
        this.scorePoint=true;
            
        }
        //check for collision between hero and enemy
        if(Phaser.Geom.Intersects.RectangleToRectangle(lilpumpRect, spaceMonkeyRect)){
            spaceMonkeys[i].depth=3;
            this.monkeyBeepSound.stop();
            this.pumpBeepSound.stop();
            this.pumpBeepSound.play();
            //shake camera
           // this.spaceMonkeys.moveTween=this.tweens.add({
             //       targets:spaceMonkeys[i],
               //     x:this.lilpump.x,
                 //   y:this.lilpump.y,
                   // duration:1000,});
            
            
            spaceMonkeys[i].y=this.kanye.y ;
                spaceMonkeys[i].x=this.kanye.x;

            this.cameras.main.shake(500,Math.random());
            this.score=this.score-10;
                
            
            
                };
        
           };
    
    let stars=this.stars.getChildren();
    let numStars=stars.length
    for(let i = 0; i<numStars; i++){
        stars[i].setScale(.002)
        stars[i].visible=true;
        stars[i].x = Math.random()*640
        stars[i].y=Math.random()*340
        stars[i].depth=0
        
    }
        
  console.log(this.kanye)  
        
};
