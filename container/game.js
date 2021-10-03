// importing
import {Player} from './player.js';

// exporting
export class Game_Scene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'game_Scene'});

        this.ply = new Player();
        // atribute declaration
        this.player;
        // Play
        this.horizontalSpeed = 225;
        this.verticalSpeed = 10;
      
        // Input Variables
        this.keyW = false;   // ^ Boolean Key Catchers
        this.keyS = false;
        this.keyA = false;
        this.keyD = false;
        this.keySPACE = false;


        // Platforms
        this.platforms;

    }
    
    preload() {
        // loading the spritesheet on 
        this.load.spritesheet('kennewsprites', 'stores/kennewsprites.png', { frameWidth: 76, frameHeight: 101 });

        this.load.spritesheet('dude', 'stores/dude.png',{ frameWidth: 32, frameHeight: 48 });

        this.load.image('ground' , 'stores/platform.png');
           
        //this.load.spritesheet('kennewsprites', 'src/sprites/kennewsprites.png', 76, 101, 63);
    }
    
    // Function thats add all the sprites to the gameObjects
    createGameObjects() {
        // Adding Sprite to the player
        this.player = this.physics.add.sprite(400, 250, 'dude');
            // Setting bounce
            this.player.setBounce(0.1);
            // Making player collideable by WorldBounds
            this.player.setCollideWorldBounds(true);
            // Displacing the hitbox
            this.player.body.setOffset(0, 0);
            // Setting Size of the collider box
            this.player.body.setSize(32, 48, false);
            

        // Creating Platforms
        this.platforms = this.physics.add.staticGroup();
        this. platforms.create(700, 700, 'ground').setScale(4,2).refreshBody();
        this.platforms.create(600, 375, 'ground').setScale(0.5,1).refreshBody();
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(1100, 220, 'ground');
        this.platforms.create(1180, 580, 'ground').setScale(0.25,1).refreshBody();
        this.platforms.create(980, 480, 'ground').setScale(0.25,1).refreshBody();
        this.platforms.create(170, 500,'ground');

        // Add collider
        this.physics.add.collider(this.player, this.platforms);
    }

    // Fuctiong thats create the animations
    createAnimations(){

        // Iddle
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        // Right
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Left
        this.anims.create({
            key: 'left',
            frameRate: 8
        });
    }

    create(){

        // Adding sprites
        this.createGameObjects();

        // Creating animations
        this.createAnimations();

        // Declarating input methods
        this.inputDeclaration();

    }

    plyMove()
    {
        // Horizontal movement
        if (this.keyD && !this.keyA) {

            this.player.body.velocity.x = this.horizontalSpeed;
            this.player.anims.play('right', true);

            if(this.player.flipX)
            {
                this.player.flipX = false;
            }

        } else if (this.keyA && !this.keyD) {

            this.player.body.velocity.x = -1 * this.horizontalSpeed;
            this.player.anims.play('right', true);

            if(!this.player.flipX)
            {
                this.player.flipX = true;
            }

        } else {

            this.player.body.velocity.x = 0;
            this.player.anims.play('idle', true);
        }

        // Vertical movement
            // Jump
        if (this.keySPACE && this.player.body.touching.down)
        {
            console.log('Salto');
            this.player.setVelocityY(-430);
        }

        if (this.player.body.touching.none)
        {
            console.log('AA');
        }

    }  

    update() {

        this.plyMove();
    }

    inputDeclaration() {

        var that = this;
        // Input event that checks when a key goes down
        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W && !that.keyW)
            {
                that.keyW = true;
                console.log('W Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && !that.keyA)
            {
                that.keyA = true;
                console.log('A Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && !that.keyS)
            {
                that.keyS = true;
                console.log('S Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && !that.keyD)
            {
                that.keyD = true;
                console.log('D Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE)
            {
                that.keySPACE = true;
                console.log('SPACE Pressed');
            }else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT)
            {
                keySHIFT = true;
                console.log('SHIFT Pressed');
            }
    
        });

        // Input event that checks when a key goes up
        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W && that.keyW)
            {
                that.keyW = false;
                console.log('W Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && that.keyA)
            {
                that.keyA = false;
                console.log('A Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && that.keyS)
            {
                that.keyS = false;
                console.log('S Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && that.keyD)
            {
                that.keyD = false;
                console.log('D Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE)
            {
                that.keySPACE = false;
                console.log('SPACE Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT)
            {
                keySHIFT = false;
                console.log('SHIFT Depressed');
            }

        });
    }
}