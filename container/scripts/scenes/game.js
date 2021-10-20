// importing
import { GrundLegend } from '../player/grundlegend.js';
import { Avalor } from '../player/avalor.js';
import { PunchingBag } from '../player/punchingbag.js';
import { EspecialDeTuichi } from '../powerups/especialdetuichi.js';
import { BebidaEnergetica } from '../powerups/bebidaenergetica.js';

// exporting
export class Game_Scene extends Phaser.Scene {



    constructor() {
        super({ key: 'game_Scene' });

        this.player;

        this.platforms;

        // Timers
        this.timer_dash;
        this.powerUp_duration_timer;

        // debug
        this.text_Debug;
        this.text_vida;
        this.text_velocidad;

        // s -> ms
        this.dashCoolDown = 3 * 1000;

        // receiver of the selected character
        this.selectedCharacter;

        //active powerup
        this.activePowerUp;

    }

    init(data) {
        // saving the selected character
        this.selectedCharacter = data.character;

    }

    preload() {
        // loading the spritesheet on 

        let route = "stores/characters/" + this.selectedCharacter;
        this.load.atlas(this.selectedCharacter, route + ".png", route + ".json");

        this.load.atlas("PunchingBag", "stores/characters/PunchingBag/PunchingBag.png", "stores/characters/PunchingBag/PunchingBag.json");
        
        //this.load.atlas(this.selectedCharacter, "stores/characters/a.png", "stores/characters/a.json");


        console.log(this.textures)
        //this.load.spritesheet('byConfetti', 'stores/characters/by_Confetti.png', { frameWidth: 60, frameHeight: 84 });

        this.load.spritesheet('dude', 'stores/characters/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('ground', 'stores/schenery/platform.png');

        //powerups
        this.load.spritesheet('especialdetuichi', 'stores/powerups/especialdetuichi.png', { frameWidth: 383, frameHeight: 312 });
        this.load.spritesheet('bebidaenergetica', 'stores/powerups/bebidaenergetica.png', { frameWidth: 190, frameHeight: 331 });

    }

    // Function thats add all the sprites to the gameObjects
    createGameObjects() {
        // Creating the player
        if (this.selectedCharacter == 'avalor') {
            this.player = new Avalor(this, 100, 100);

        } else if (this.selectedCharacter == 'grundlegend') {
            this.player = new GrundLegend(this, 100, 100);

        } else {
            console.log('error al crear personaje')
        }
        
        // Creating Punching Bag

        this.punchingBag = new PunchingBag(this, 600, 100);

        this.activePowerUp = new EspecialDeTuichi(this, 300, 0);

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
        this.physics.add.collider(this.player, this.punchingBag);

        this.physics.add.collider(this.punchingBag, this.platforms);
        this.physics.add.collider(this.activePowerUp, this.platforms);

        this.physics.add.collider(this.player, this.activePowerUp, this.pickPowerUp, null, this);
    }

    //TO DO: Use JSON atlas.
    // Fuctiong thats create the animations
    createAnimations() {

        var route = 'stores/characters/'

        var chara = this.selectedCharacter;
        // Idle
        this.anims.create({
            key: 'idle',
            frames: [{ key: chara, frame: chara + '_idle.png' }],
            frameRate: -1
        });

        this.anims.create({
            key: 'run',
            frames: [
                {   key: chara,
                    frame: chara + '_walk00.png'
                },
                {   key: chara,
                    frame: chara + '_walk01.png'
                },
            ],
            frameRate: 5,
            repeat: -1
        });

        // Debug Punching Bag animations

        this.anims.create({
            key: 'PB_punch',
            frames: [
                {   key: "PunchingBag",
                    frame: "PunchingBag_2.png" 
                },
                {   key: "PunchingBag",
                    frame: "PunchingBag_3.png" 
                },
                {   key: "PunchingBag",
                    frame: "PunchingBag_4.png" 
                },
            ],
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'PB_idle',
            frames: [{ key: "PunchingBag", frame: "PunchingBag_2.png" }],
            frameRate: -1
        });



        /*
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
        */
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
        this.createAnimations();

        // Declarating input methods
        this.inputDeclaration();

        // text debug
        this.text_Debug = this.add.text(32, 32);

        
        this.player.play('run');

        this.punchingBag.play('PB_idle');
        this.text_vida = this.add.text(32,82);

        this.text_velocidad = this.add.text(32,132);

    }

    timer_Update() {
        let progress = this.timer_dash.getProgress();


        this.timer_dash.paused = this.player.dashAllowed;

        if (progress >= 0.08 && progress <= 0.97) {
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

    update(timer, delta) {

        this.timer_Update();

        this.player.update(delta);

        this.punchingBag.renove();
        var out;

        out = 'Progreso: ' + this.timer_dash.getProgress().toString().substr(0, 4);

        this.text_Debug.setText(out);

        this.text_vida.setText('Vida: ' + this.player.getVida());

        this.text_velocidad.setText('Velocidad: ' + this.player.horizontalSpeed);

        //console.log(this.powerUp_duration_timer.getProgress());

    }


    pickPowerUp() {

        if (!this.activePowerUp.picked) {
            console.log('Objeto recogido');

            this.activePowerUp.picked = true;
            this.activePowerUp.linkedPlayer = this.player;

            this.activePowerUp.trigger();

            //this.powerUp_duration_timer = that.time.delayedCall({ delay: this.activePowerUp.duration, callback: this.activePowerUp.outTimeTrigger()})
            this.powerUp_duration_timer = this.time.addEvent({ delay: this.activePowerUp.duration, callback: this.activePowerUp.outTimeTrigger(), loop: false });

            /*
            if(this.activePowerUp.instausable){
                this.activePowerUp.activateEffect();
            }
            */

        }


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
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.J) {
                that.keyNA = true;
                console.log('J Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.K) {
                that.keySA = true;
                console.log('K Pressed');
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
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.J) {
                that.keyNA = false;
                console.log('J Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.K) {
                that.keySA = false;
                console.log('K Depressed');
            }
        });

        // Mouse Input
        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', function (event) {
            if (event.rightButtonDown()) {
                that.keySA = true;
                console.log('RClick Pressed');
            } else if (event.leftButtonDown()) {
                that.keyNA = true;
                console.log('LClick Pressed');
            }
        });

        this.input.on('pointerup', function (event) {
            if (event.leftButtonReleased()) {
                that.keyNA = false;
                console.log('LClick Deressed');
            }
            else if (event.rightButtonReleased()) {
                that.keySA = false;
                console.log('RClick Depressed');
            }
        });
    }
}