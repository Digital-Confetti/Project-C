// importing
import { GrundLegend } from './grundlegend.js';
//import { Player } from './player.js';

// exporting
export class Game_Scene extends Phaser.Scene {



    constructor() {
        super({ key: 'game_Scene' });

        // atribute declaration
        this.player;
        // Play
        this.aceleration = 3;
        this.horizontalSpeed = 225;
        this.verticalSpeed = 10;

        // Input Variables
        this.keyW = false;   // ^ Boolean Key Catchers
        this.keyS = false;
        this.keyA = false;
        this.keyD = false;
        this.keySPACE = false;
        this.keySHIFT = false;

        // Platforms
        this.platforms;

        // moving
        this.moving_R = false;
        this.dash_R = false;
        this.drag = 4.5;
        this.dashForce = 800;
                         // s -> ms
        this.dashCoolDown = 3 * 1000;
        this.dashAllowed = false;
        this.dashActivated = false;


        // Timers
        this.timer_dash;

        // debug
        this.text_Debug;


        // proto
        const stateMachine = {
            IDDLE: "iddle",
            RIGHT: "right",
            LEFT: "left",
            JUMPING: "jumping",
        }

    }

    preload() {
        // loading the spritesheet on 

        this.load.spritesheet('byConfetti', 'stores/by_Confetti.png', { frameWidth: 60, frameHeight: 84 });

        this.load.spritesheet('dude', 'stores/dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('ground', 'stores/platform.png');

        //this.load.spritesheet('kennewsprites', 'src/sprites/kennewsprites.png', 76, 101, 63);
    }

    // Function thats add all the sprites to the gameObjects
    createGameObjects() {
        this.player = new GrundLegend(this, 100, 100);
/*
        // Adding Sprite to the player
        //this.player = this.physics.add.sprite(400, 250, 'byConfetti');
        // Setting bounce
        this.player.setBounce(0.1);
        // Making player collideable by WorldBounds
        this.player.setCollideWorldBounds(true);
        // Displacing the hitbox
        this.player.body.setOffset(11, 0);
        // Setting Size of the collider box
        this.player.body.setSize(33, 84, false);
        //this.player.body.refreshBody();
*/

        // Creating Platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(700, 700, 'ground').setScale(4, 2).refreshBody();
        this.platforms.create(600, 375, 'ground').setScale(0.5, 1).refreshBody();
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(1100, 220, 'ground');
        this.platforms.create(1180, 580, 'ground').setScale(0.25, 1).refreshBody();
        this.platforms.create(980, 480, 'ground').setScale(0.25, 1).refreshBody();
        this.platforms.create(170, 500, 'ground');

        // Add collider
        this.physics.add.collider(this.player, this.platforms);

    }

    //TO DO: Use JSON atlas.
    // Fuctiong thats create the animations
    createAnimations() {

        // Iddle
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'dude', frame: 4 }],
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

    timer_Create() {

        // Dash Timer
        this.timer_dash = this.time.addEvent({ delay: this.dashCoolDown, loop: true });

    }

    create() {

        this.timer_Create();

        // Adding sprites
        this.createGameObjects();

        // Creating animations
        //this.createAnimations();

        // Declarating input methods
        this.inputDeclaration();

        // text debug
        this.text_Debug = this.add.text(32, 32);

       

    }

    timer_Update() {
        let progress = this.timer_dash.getProgress();

        
        this.timer_dash.paused = this.player.dashAllowed;

        if (progress >= 0.08 && progress <= 0.97)
        {
            this.player.dashActivated = false;
            if (this.player.body.velocity.x > this.horizontalSpeed) {
                if (this.moving_R) {
                    this.player.body.velocity.x = 0.95 * this.horizontalSpeed;
                } else {
                    this.player.body.velocity.x = -0.95 * this.horizontalSpeed;
                }
            }


        } else if (progress >= 0.98) {
            this.player.dashAllowed = true;
        }


    }

    // NOT USED
    /*
    plyMove(delta)
    {
        // Horizontal movement
        if (this.keyD && !this.keyA) {
            if (this.player.body.velocity.x <= this.horizontalSpeed){
                this.player.body.velocity.x += this.aceleration * delta;
            }

            //this.player.anims.play('right', true);
            this.moving_R = true;       

        } else if (this.keyA && !this.keyD) {
            
            if (this.player.body.velocity.x >= -1 * this.horizontalSpeed){
                this.player.body.velocity.x -= this.aceleration * delta;
            }

            //this.player.anims.play('right', true);
            this.moving_R = false;
        
        // drag force
        } else if (!this.keyA && !this.keyD){
            if (this.moving_R && this.player.body.velocity.x != 0)
            {
                this.player.body.velocity.x -= this.drag * delta;
                
                if (this.player.body.velocity.x <= 0)
                {
                    this.player.setVelocityX(0);
                }
            } else if (!this.moving_R && this.player.body.velocity.x != 0)
            {
                this.player.body.velocity.x += this.drag * delta;
                
                if (this.player.body.velocity.x >= 0)
                {   
                    this.player.setVelocityX(0);
                }
            }
        }

        // Vertical movement
        // Jump
        if (this.keySPACE && this.player.body.touching.down)
        {
            console.log('Salto');
            this.setVelocityY(-430);
        }

        if(this.dashActivated)
        {
            if(this.player.body.touching.left)
            {
                this.dash_R = true;
                this.moving_R = true;
            } else if (this.player.body.touching.right)
            {
                this.dash_R = false;
                this.moving_R = false;
            }

            if (this.dash_R)
            {
                this.player.body.velocity.x = this.dashForce;
            } else {
                this.player.body.velocity.x = -1 * this.dashForce;
            }
        }

        if (this.timer_dash.paused && this.keySHIFT)
        {
            this.timer_dash.paused = false;
            this.dashAllowed = false;
            this.dashActivated = true;
            this.dash_R = this.moving_R;
        }

        if(this.player.body.velocity.x > 0)
        {
            this.player.flipX = false;
        } else if (this.player.body.velocity.x < 0){
            this.player.flipX = true;
        }
    }
    */  

    update(timer, delta) {

        this.timer_Update();

        this.player.update(delta);

        var out;

        out = 'Progreso: ' + this.timer_dash.getProgress().toString().substr(0, 4);

        this.text_Debug.setText(out);
        
    }

    inputDeclaration() {

        // that
        var that = this.player;

        // Input event that checks when a key goes down
        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W && !that.keyW) {
                that.keyW = true;
                console.log('W Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && !that.keyA) {
                that.keyA = true;
                console.log('A Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && !that.keyS) {
                that.keyS = true;
                console.log('S Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && !that.keyD) {
                that.keyD = true;
                console.log('D Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE) {
                that.keySPACE = true;
                console.log('SPACE Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT) {
                that.keySHIFT = true;
                console.log('SHIFT Pressed');
            }

        });

        // Input event that checks when a key goes up
        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W && that.keyW) {
                that.keyW = false;
                console.log('W Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && that.keyA) {
                that.keyA = false;
                console.log('A Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && that.keyS) {
                that.keyS = false;
                console.log('S Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && that.keyD) {
                that.keyD = false;
                console.log('D Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE) {
                that.keySPACE = false;
                console.log('SPACE Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT) {
                that.keySHIFT = false;
                console.log('SHIFT Depressed');
            }

        });
    }
}