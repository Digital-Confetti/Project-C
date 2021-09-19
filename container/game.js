        // create a new scene named "Game"
        let gameScene = new Phaser.Scene('Game');

        // our game's configuration
        let config = {
        type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
        width: 800,         // game width 640
        height: 500,        // game height 360
        scene: gameScene,   // our newly created scene
        // Added by Confetti
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 400 },
                    debug: false
                }
            }
        };

        // create the game, and pass it the configuration
        let game = new Phaser.Game(config);

    gameScene.preload = function() {
        // loading the spritesheet on 
        this.load.spritesheet('kennewsprites', 'stores/kennewsprites.png', { frameWidth: 76, frameHeight: 101 });   
        //this.load.spritesheet('kennewsprites', 'src/sprites/kennewsprites.png', 76, 101, 63); 
    }

    // Player
    var player;
    var YValueBlankaLevel = 140;


    gameScene.create = function() {

        player = this.add.sprite(400, 250, 'kennewsprites');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('kennewsprites', { start: 0, end: 3 }),
            frameRate: 8
        });
        
    }

    gameScene.update = function(){

        player.anims.play('idle', true);
    }

