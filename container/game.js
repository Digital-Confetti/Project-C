        // create a new scene named "Game"
        let gameScene = new Phaser.Scene('Game');

        // our game's configuration
        let config = {
        type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
        width: 800,         // game width 640
        height: 500,        // game height 360
        scene: gameScene    // our newly created scene
        };

        // create the game, and pass it the configuration
        let game = new Phaser.Game(config);

    gameScene.preload = function() {

        this.load.spritesheet('dude',
        'stores/Char_4.png',
        { frameWidth: 64, frameHeight: 64 });   
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    gameScene.create = function() {
        // reset camera effects
        this.cameras.main.resetFX();
        this.input.mouse.disableContextMenu();

        // let bg = this.add.sprite(0,0, 'background');
        // bg.setOrigin(0,0);
        
        this.player = this.add.sprite(40, 180, 'dude');
        // this.player.setScale(0.5);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        

    }

    // some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
    gameScene.init = function() {
        
    }

    gameScene.update = function(){

        this.player.anims.play('left', true);
        
    }

    gameScene.gameOver = function() {
        // flag to set player is dead
        this.isPlayerAlive = false;

        // shake the camera
        this.cameras.main.shake(500);

         // fade camera
        this.time.delayedCall(250, function() {
            this.cameras.main.fade(250);
        }, [], this);

        // restart game
        this.time.delayedCall(500, function() {
          this.scene.restart();
        }, [], this);
      };
