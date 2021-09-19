        // create a new scene named "Game"
        let gameScene = new Phaser.Scene('Game');

        // our game's configuration
        let config = {
        type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
        width: 640,         // game width
        height: 360,        // game height
        scene: gameScene    // our newly created scene
        };

        // create the game, and pass it the configuration
        let game = new Phaser.Game(config);

    gameScene.preload = function() {
        this.load.image('background', 'stores/background.png');
        this.load.image('player', 'stores/player.png');
        this.load.image('dragon', 'stores/dragon.png');
        this.load.image('treasure', 'stores/treasure.png');
    }

    gameScene.create = function() {
        // reset camera effects
        this.cameras.main.resetFX();

        this.input.mouse.disableContextMenu();

        this.movingVerticaly = 0;
        this.movingUp = 0;

        this.input.on('pointerdown', function (pointer) {

            if (pointer.rightButtonDown())
            {
                //if (pointer.getDuration() > 500)
                this.playerSpeed = this.playerMaxSpeed * 2;
            }
            else if (pointer.leftButtonDown())
            {
                // player walks
                this.playerSpeed = this.playerMaxSpeed;
            }
            
        }, this);

        this.input.on('pointerup', function (pointer) {

            if (pointer.leftButtonReleased() || pointer.rightButtonReleased()){
                this.playerSpeed = 0;
            }
    
        }, this);

        let bg = this.add.sprite(0,0, 'background');
        bg.setOrigin(0,0);

        
        this.player = this.add.sprite(40, 180, 'player');
        this.player.setScale(0.5);

        // player is alive
        this.isPlayerAlive = true;

         // goal
        this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
        this.treasure.setScale(0.6);

        // group of enemies
        this.enemies = this.add.group({
            key: 'dragon',
            repeat: 5,
            setXY: {
            x: 110,
            y: 100,
            stepX: 80,
            stepY: 20
            }
        });
        // scale enemies
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

        // set speeds
        Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
            enemy.speed = Math.random() * 2 + 1;
        }, this);

        // this.add.image(400,300,'pelota');
        /* this.add.image(0,0,'pelota');
         -> Añade la imagen
        
        #   this.add.image(0,0,'pelota').setOrigin(0,0);
        #   -> Añade la imagen + cambia las coordenadas de su anchor

        #   this.gameoverImage = this.add.image(x,y,'name');
        #   -> Carga la imagen de gameOver

        #   this.gameoverImage.visible  = false;
        #   -> Hacemos invisible una imagen;

        #   this.platform = this.physics.add.image(x,y,'name');
        #   -> Añadimos fisicas a un objeto platform generico

        #   this.platform.body.allowGravity = false;
        #   -> Hacemos que no le afecte la gravedad

        */

        /*  / Version unitaria
        #   
        #   this.pelota = this.physics.add.image(400,300,'pelota').setScale(0.1);
        #   this.pelota.setBounce(0.4);
        #   this.pelota.setCollideWorldBounds(true);
        */
        
        //this.pelotas = this.physics.add.staticGroup();

        //this.cursors = this.input.keyboard.createCursorKeys();

    }

    // some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
    gameScene.init = function() {
        this.playerMaxSpeed = 1.5;
        this.playerSpeed = 0;
        this.enemyMaxY = 280;
        this.enemyMinY = 80;
    }

    gameScene.update = function(){
         // only if the player is alive
        if (!this.isPlayerAlive) {
            return;
        }

        var pointer = this.input.activePointer;

        this.MovePlayer();

        /*
          // check for active input
        if (pointer.isDown) {
                // player walks
            this.player.x += this.playerSpeed;
            
        }
        */
        

        // enemy movement
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;
        for (let i = 0; i < numEnemies; i++) {
            // move enemies
            enemies[i].y += enemies[i].speed;
            // reverse movement if reached the edges
            if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
            enemies[i].speed *= -1;
            } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
            enemies[i].speed *= -1;
            }

             // enemy collision
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
                this.gameOver();
            }
        }

        

        // treasure collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
            this.gameOver();
        }

        //this.pelotas.create(100,300, 'pelota').setScale(0.1).setBounce(0.4).setCollideWorldBounds(true);
    
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
    
      gameScene.MovePlayer = function(){
          this.player.x += this.playerSpeed;

          if (this.movingVerticaly == 1)
          {
            console.log("TRAZA");
              if(this.movingUp == 1)
              {
                  this.player.y += 10;
              } else {
                  this.player.y += -10;
              }
              this.movingVerticaly = 0;
          }
      }

      gameScene.MovePlayerVertical = function(k){
          this.player.y += k;
      }
