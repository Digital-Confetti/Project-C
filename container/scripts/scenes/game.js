// importing
import { GrundLegend } from '../player/grundlegend.js';
import { Avalor } from '../player/avalor.js';
import { Player } from '../player/player.js';
import { PunchingBag } from '../player/punchingbag.js';
import { EspecialDeTuichi } from '../powerups/especialdetuichi.js';
import { BebidaEnergetica } from '../powerups/bebidaenergetica.js';
import { Platano } from '../powerups/platano.js';
import { Pistola } from '../powerups/pistola.js';
import { Fusil } from '../powerups/fusil.js';

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
        this.activePowerUp = null;

        //first player-powerup collider
        this.game_player_powerup_collider;

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
        this.load.spritesheet('platano', 'stores/powerups/platano.png', { frameWidth: 161, frameHeight: 151 });
        this.load.spritesheet('pistola', 'stores/powerups/pistola.png', { frameWidth: 361, frameHeight: 241 });
        this.load.spritesheet('fusil', 'stores/powerups/fusil.png', { frameWidth: 855, frameHeight: 251 });
        this.load.spritesheet('disparo', 'stores/powerups/disparo.png', { frameWidth: 111, frameHeight: 31 });


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

        this.activePowerUp = new Pistola(this, 600, 500);

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
        this.physics.add.collider(this.player, this.punchingBag, this.hit_Treatment, null, this);

        this.physics.add.collider(this.punchingBag, this.platforms);
        this.physics.add.collider(this.activePowerUp, this.platforms);

        this.game_player_powerup_collider = this.physics.add.collider(this.player, this.activePowerUp, this.pickPowerUp, null, this);
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
                {
                    key: chara,
                    frame: chara + '_walk00.png'
                },
                {
                    key: chara,
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
                {
                    key: "PunchingBag",
                    frame: "PunchingBag_2.png"
                },
                {
                    key: "PunchingBag",
                    frame: "PunchingBag_3.png"
                },
                {
                    key: "PunchingBag",
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

        //this.timer_Create();

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
        this.text_vida = this.add.text(32, 82);

        this.text_velocidad = this.add.text(32, 132);

    }

    timer_Update() {
        let progress = this.timer_dash.getProgress();


        this.timer_dash.paused = this.player.dashAllowed;

        if (progress >= 0.08 && progress <= 0.97) {
            this.player.playerStatus = Player.PlayerStatus.IDDLE;
            this.player.dashActivated = false;
            if (math.abs(this.player.body.velocity.x) > this.horizontalSpeed) {
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

        //this.timer_Update();

        this.player.update(delta);

        this.punchingBag.renove(delta);
        var out;

        out = 'Progreso: ' + this.player.dash_Timer.getProgress().toString().substr(0, 4);

        this.text_Debug.setText(out);

        this.text_vida.setText('Vida: ' + this.player.getVida());

        this.text_velocidad.setText('Velocidad: ' + this.player.horizontalSpeed);

        
        if (this.activePowerUp !== null) {

            //console.log(this.activePowerUp.picked);
            if (this.activePowerUp.picked) {
                
                this.activePowerUp.trigger(delta);
            }
        }

        
    }

    hit_Treatment()
    {
        console.log('Tocado el saco');
    }

    pickPowerUp() {

        if (!this.activePowerUp.picked) {

            this.activePowerUp.collected();

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