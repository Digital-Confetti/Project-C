// importing
import { GrundLegend } from '../player/grundlegend.js';
import { Ottonai } from '../player/ottonai.js';
import { Player } from '../player/player.js';
import { EspecialDeTuichi } from '../powerups/especialdetuichi.js';
import { BebidaEnergetica } from '../powerups/bebidaenergetica.js';
import { Platano } from '../powerups/platano.js';
import { Pistola } from '../powerups/pistola.js';
import { Fusil } from '../powerups/fusil.js';
import { TT_WebSocket } from "../socket/TT_WebSocket.js";

// exporting
export class Online_Game_Scene extends Phaser.Scene {


    constructor() {
        super({ key: 'Online_Game_Scene' });

        this.playerLocal;
        this.playerNet;
        
        this.i = 0;

        this.platforms;

        // Timers
        this.timer_dash;
        this.timer_Imp;
        this.powerUp_duration_timer;
        this.game_duration_timer,

            // debug player 1
            this.text_Debug;
        this.text_vida;
        this.text_vidas;

        // debug player 1
        this.text_Debug2;
        this.text_vida2;
        this.text_vidas2;

        //timer de la partida
        this.text_game_timer;

        // s -> ms
        this.dashCoolDown = 3 * 1000;
        this.power_ups_respawn_cooldown = 2 * 1000;
        this.min_duration = 5;
        this.game_duration = this.min_duration * 60 * 1000;

        // lado del jugador
        this.mySide;

        // Player picked
        this.myPlayer;

        this.elsePlayer;

        //active powerup
        this.activePowerUp = null;
        this.power_up_spawned = false;

        //first player-powerup collider
        this.game_player_powerup_collider;

        var that = this;

        this.processImperative = function(body) {
            that.playerNet.x = body.x;
            that.playerNet.y = body.y;
            that.playerNet.body.setVelocityX(body.vX);
            that.playerNet.body.setVelocityY(body.vY);
            that.playerLocal.vida = body.Hp; 
            if (this.playerLocal.vidas > body.Vidas){
                this.playerLocal.muerto = true;
                this.playerLocal.respawn();
            }
            that.playerLocal.vidas = body.Vidas;
        }
        
        this.sendImperative = function () {
            if (that.playerLocal != undefined) {
                let a = that.playerLocal.x, b = that.playerLocal.y;
                let v_x = that.playerLocal.body.velocity.x, v_y = that.playerLocal.body.velocity.y;

                let pkg = {
                    x: a,
                    y: b,
                    vX: v_x,
                    vY: v_y,
                    Hp: that.playerNet.vida,
                    Vidas: that.playerNet.vidas
                }

                console.log(pkg);
    
                TT_WebSocket.prototype.sendMessage(pkg, "imp")
            }
    
        }

        TT_WebSocket.prototype.setGame(this);
    }

    setMeFromOutside(){
        TT_WebSocket.prototype.setGame(this);
    }

    init(data) {
        // saving the selected character
        this.myPlayer = data.character;
        this.mySide = data.side;
        this.elsePlayer = data.elseChara;

        console.log(data);
    }

    preload() {
        // loading the spritesheet on 
        

        //let route = "stores/characters/" + this.selectedCharacter;
        this.load.atlas('grundlegend', "stores/characters/grundlegend.png", "stores/characters/grundlegend.json");
        this.load.atlas('ottonai', "stores/characters/ottonai.png", "stores/characters/ottonai.json");

        this.load.atlas("PunchingBag", "stores/characters/PunchingBag/PunchingBag.png", "stores/characters/PunchingBag/PunchingBag.json");

        //this.load.atlas(this.selectedCharacter, "stores/characters/a.png", "stores/characters/a.json");

        //this.load.spritesheet('byConfetti', 'stores/characters/by_Confetti.png', { frameWidth: 60, frameHeight: 84 });
        this.load.image('fondoescenario', 'stores/schenery/fondo_escenario.jpg');
        this.load.spritesheet('dude', 'stores/characters/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('large_ground', 'stores/schenery/Layer_large.png');
        this.load.image('medium_ground', 'stores/schenery/Layer_medium.png');
        this.load.image('short_ground', 'stores/schenery/Layer_short.png');


        //powerups
        this.load.spritesheet('especialdetuichi', 'stores/powerups/especialdetuichi.png', { frameWidth: 42, frameHeight: 30 });
        this.load.spritesheet('bebidaenergetica', 'stores/powerups/bebidaenergetica.png', { frameWidth: 30, frameHeight: 32 });
        this.load.spritesheet('platano', 'stores/powerups/platano.png', { frameWidth: 30, frameHeight: 25 });
        this.load.spritesheet('pistola', 'stores/powerups/pistola.png', { frameWidth: 30, frameHeight: 31 });
        this.load.spritesheet('fusil', 'stores/powerups/fusil.png', { frameWidth: 59, frameHeight: 26 });
        this.load.spritesheet('disparo', 'stores/powerups/disparo.png', { frameWidth: 14, frameHeight: 7 });

        //sound effects
        this.load.audio('disparo', 'stores/sounds/disparo.mp3');
        this.load.audio('impacto', 'stores/sounds/impacto.mp3');
        this.load.audio('comer', 'stores/sounds/comer.mp3');
        this.load.audio('beber', 'stores/sounds/beber.mp3');
        this.load.audio('caida', 'stores/sounds/caida.mp3');
    }

    createPlayers() {
        let x, y;
        let a, b;

        if (this.mySide == "blue") {
            x = 100, a = 1000;
            y = 100; b = 100;
        } else {
            x = 1000; a = 100;
            y = 100; b = 100;
        }

        if (this.myPlayer == 'ottonai') {
            this.playerLocal = new Ottonai(this, x, y);
        } else if (this.myPlayer == 'grundlegend') {
            this.playerLocal = new GrundLegend(this, x, y);
        } else {
            console.log('error al crear playerLocal')
        }

        if (this.elsePlayer == 'otonnai') {
            this.playerNet = new Ottonai(this, a, b);
        } else if (this.elsePlayer == 'grundlegend') {
            this.playerNet = new GrundLegend(this, a, b);
        } else {
            console.log('error al crear playerLocal')
        }

        TT_WebSocket.prototype.setGame(this);
    }



    // Function thats add all the sprites to the gameObjects
    createGameObjects() {

        this.createPlayers();
        // Creating Punching Bag

        //this.punchingBag = new PunchingBag(this, 600, 100);

        //this.activePowerUp = new Fusil(this, 600, 500);

        // Creating Platforms
        this.platforms = this.physics.add.staticGroup();

        //Bottom layer
        this.platforms.create(320, 600, 'large_ground').setScale(2.5, 2).refreshBody();
        this.platforms.create(960, 600, 'large_ground').setScale(2.5, 2).refreshBody();

        //Medium layer
        this.platforms.create(640, 450, 'medium_ground').setScale(2.5, 2).refreshBody();

        //Upper layer
        this.platforms.create(180, 300, 'medium_ground').setScale(2.5, 2).refreshBody();
        this.platforms.create(1100, 300, 'medium_ground').setScale(2.5, 2).refreshBody();

        // Add collider
        this.physics.add.collider(this.playerLocal, this.platforms);
        //this.physics.add.collider(this.playerLocal, this.punchingBag, this.hit_Treatment, null, this);

        this.physics.add.collider(this.playerNet, this.platforms);
        //this.physics.add.collider(this.playerNet, this.punchingBag, this.hit_Treatment, null, this);

        this.physics.add.collider(this.playerNet, this.playerLocal, this.hit_Treatment_2P, null, this);

        //this.game_player_powerup_collider = this.physics.add.collider(this.playerNet, this.activePowerUp, this.pickPowerUp, null, this);

        //this.physics.add.collider(this.punchingBag, this.platforms);
        //this.physics.add.collider(this.activePowerUp, this.platforms);

        //this.game_player_powerup_collider = this.physics.add.collider(this.playerLocal, this.activePowerUp, this.pickPowerUp, null, this);
    }

    //TO DO: Use JSON atlas.
    // Fuctiong thats create the animations
    createAnimations() {

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
            repeat: 0
        });

        this.anims.create({
            key: 'PB_idle',
            frames: [{ key: "PunchingBag", frame: "PunchingBag_2.png" }],
            frameRate: -1
        });

    }

    timer_Create() {

        var that = this;
        // Dash Timer
        this.timer_dash = this.time.addEvent({ delay: this.dashCoolDown, loop: true });

    }

    create() {
        //pausa
        this.pausa = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //this.timer_Create();
        this.background = this.add.image(0, 0, 'fondoescenario');
        this.background.setScale(1.4);
        this.background.setOrigin(0);
        // Adding sprites
        this.createGameObjects();

        // Creating animations
        this.createAnimations();

        // Declarating input methods
        this.inputDeclaration();

        // text debug
        if(this.mySide == "blue"){

        this.text_Debug = this.add.text(32, 32);
        this.text_vida = this.add.text(32, 82);
        this.text_vidas = this.add.text(32, 132);

        this.text_Debug2 = this.add.text(1100, 32);
        this.text_vida2 = this.add.text(1100, 82);
        this.text_vidas2 = this.add.text(1100, 132);

        }else if(this.mySide == "red"){

        this.text_Debug = this.add.text(1100, 32);
        this.text_vida = this.add.text(1100, 82);
        this.text_vidas = this.add.text(1100, 132);

        this.text_Debug2 = this.add.text(32, 32);
        this.text_vida2 = this.add.text(32, 82);
        this.text_vidas2 = this.add.text(32, 132);

        }

        

        this.text_game_timer = this.add.text(610, 50, '', { fontSize: 40, color: '#000000' });

        //this.punchingBag.play('PB_idle');

        this.game_duration_timer = this.time.delayedCall(this.game_duration, this.endGame, [3], this);

    }

    spawnPowerUp() {
        this.i = Math.floor(Math.random() * 5) + 1;
        //this.i = 5;
        this.x = Math.floor(Math.random() * 1080) + 200;
        this.y = 50;

        if (this.i == 1) {
            this.activePowerUp = new EspecialDeTuichi(this, this.x, this.y);

        } else if (this.i == 2) {
            this.activePowerUp = new BebidaEnergetica(this, this.x, this.y);

        } else if (this.i == 3) {
            this.activePowerUp = new Platano(this, this.x, this.y);

        } else if (this.i == 4) {
            this.activePowerUp = new Pistola(this, this.x, this.y);

        } else if (this.i == 5) {
            this.activePowerUp = new Fusil(this, this.x, this.y);
        }
        this.physics.add.collider(this.activePowerUp, this.platforms);
        this.game_player_powerup_collider = this.physics.add.collider(this.playerLocal, this.activePowerUp, this.pickPowerUp, null, this);
        this.game_player2_powerup_collider = this.physics.add.collider(this.playerNet, this.activePowerUp, this.pickPowerUp, null, this);
    }

    checkEndGame() {
        if (this.playerLocal.getVidas() == 0) {
            //gana jugador 2
            this.sendImperative();
            this.endGame(this.playerNet.key);
        } else if (this.playerNet.getVidas() == 0) {
            //gana jugador 1
            this.sendImperative();
            this.endGame(this.playerLocal.key);
        }
    }

    endGame(i) {

        console.log(i);
        this.scene.start("Victoria_menu", { index: i });

    }

    update(timer, delta) {
        /*
        if(this.pausa.isDown){
            console.log('enter')
            this.scene.launch("select_Pausa");
            this.scene.pause("game_Scene")
        }
*/      

        this.i += 1;

        //this.timer_Update();

        this.playerLocal.update(delta);
        this.playerNet.update(delta);

        //this.punchingBag.renove(delta);
        var out;

        out = 'Progreso: ' + this.playerLocal.dash_Timer.getProgress().toString().substr(0, 4);

        this.text_Debug.setText(out);

        this.text_vida.setText('Vida: ' + this.playerLocal.getVida());

        this.text_vidas.setText('Vidas: ' + this.playerLocal.getVidas());

        this.text_Debug2.setText('Progreso: ' + this.playerNet.dash_Timer.getProgress().toString().substr(0, 4));

        this.text_vida2.setText('Vida: ' + this.playerNet.getVida());

        this.text_vidas2.setText('Vidas: ' + this.playerNet.getVidas());

        this.duration_aux = this.game_duration_timer.getProgress().toString().substr(0, 5) * this.game_duration / 1000;
            
        this.duration_aux2 = parseInt(this.duration_aux, 10);

        
        



        this.min_aux = (this.min_duration - 1) - (parseInt(this.duration_aux2 / 60));
        this.seg_aux = 59 - (this.duration_aux2 % 60);

        this.min = this.min_aux;
        this.seg = this.seg_aux;
        this.text_game_timer.setText(this.min + ':' + this.seg);

        /*
        if (this.activePowerUp !== null) {

            //console.log(this.activePowerUp.picked);
            if (this.activePowerUp.picked) {

                this.activePowerUp.trigger(delta);
            }
        } else {
            if (!this.power_up_spawned) {
                this.power_up_spawned = true;
                this.time.delayedCall(this.power_ups_respawn_cooldown, this.spawnPowerUp, null, this);

            }

        }
        */

        this.checkEndGame();

        if (this.i%40 == 0) {
            this.sendImperative();
            if (this.i >= 6000000)
            {
                this.i = 0;
            }
        }
    }

    hit_Treatment_2P() {
        if (this.playerNet.playerStatus != Player.PlayerStatus.ATA_N) {
            if (this.playerLocal.playerStatus == Player.PlayerStatus.DASHING && this.playerNet.playerStatus != Player.PlayerStatus.HITTED) {
                this.playerNet.x_move = 2;
                this.playerNet.y_move = -250;
                this.playerNet.looking_R = this.playerLocal.x < this.playerNet.x;
                this.playerNet.playerStatus = Player.PlayerStatus.HITTED;
                this.playerNet.vida -= this.playerLocal.attack_damage;
                this.playerNet.lauch_reset_HITTED();
            } else if (this.playerLocal.playerStatus == Player.PlayerStatus.ATA_N && this.playerNet.playerStatus != Player.PlayerStatus.HITTED) {
                this.playerNet.x_move = 2;
                this.playerNet.y_move = -250;
                this.playerNet.looking_R = this.playerLocal.x < this.playerNet.x;
                this.playerNet.playerStatus = Player.PlayerStatus.HITTED;
                this.playerNet.vida -= this.playerLocal.attack_damage;
                this.playerNet.lauch_reset_HITTED();
            }
        }
        
        if (this.playerLocal.playerStatus != Player.PlayerStatus.ATA_N) {
            if (this.playerNet.playerStatus == Player.PlayerStatus.DASHING && this.playerLocal.playerStatus != Player.PlayerStatus.HITTED) {
                this.playerLocal.x_move = 2;
                this.playerLocal.y_move = -250;
                this.playerLocal.looking_R = this.playerNet.x < this.playerLocal.x;
                this.playerLocal.playerStatus = Player.PlayerStatus.HITTED;
                //this.playerLocal.vida -= this.playerNet.attack_damage;
                this.playerLocal.lauch_reset_HITTED();
            } else if (this.playerNet.playerStatus == Player.PlayerStatus.ATA_N && this.playerLocal.playerStatus != Player.PlayerStatus.HITTED) {
                this.playerLocal.x_move = 1;
                this.playerLocal.y_move = -50;
                this.playerLocal.looking_R = this.playerNet.x < this.playerLocal.x;
                this.playerLocal.playerStatus = Player.PlayerStatus.HITTED;
                //this.playerLocal.vida -= this.playerNet.attack_damage;
                this.playerLocal.lauch_reset_HITTED();
            }
        }

    }

    hit_Treatment() {
        if (this.playerLocal.playerStatus == Player.PlayerStatus.DASHING) {
            this.punchingBag.getHitted(this.playerLocal.x < this.punchingBag.x, 2, -250);
        } else if (this.playerLocal.playerStatus == Player.PlayerStatus.ATA_N && !this.punchingBag.hited) {
            this.punchingBag.getHitted(this.playerLocal.x < this.punchingBag.x, 1, -50);
        }
    }

    pickPowerUp(player, powerup) {

        if (!this.activePowerUp.picked) {

            this.activePowerUp.collected(player);

        }
    }

    inputDeclaration() {

        // that
        var that = this.playerLocal;
        var this_game = this;


        // Input event that checks when a key goes down
        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W) {
                that.keySPACE = true;
                this_game.sendMsg("SPACE", "1");
                console.log('W Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && !that.keyA) {
                that.keyA = true;
                this_game.sendMsg("A", "1");
                console.log('A Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && !that.keyS) {
                that.keyS = true;
                this_game.sendMsg("S", "1");
                console.log('S Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && !that.keyD) {
                that.keyD = true;
                this_game.sendMsg("D", "1");
                console.log('D Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE) {
                that.keySPACE = true;
                this_game.sendMsg("SPACE", "1");
                console.log('SPACE Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT) {
                that.keySHIFT = true;
                this_game.sendMsg("SHIFT", "1");
                console.log('SHIFT Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.J) {
                that.keyNA = true;
                this_game.sendMsg("NA", "1");
                console.log('J Pressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.K) {
                that.keySA = true;
                this_game.sendMsg("SA", "1");
                console.log('K Pressed');
            }
        });

        // Input event that checks when a key goes up
        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W) {
                that.keySPACE = false;
                this_game.sendMsg("SPACE", "0");
                console.log('W Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.A && that.keyA) {
                that.keyA = false;
                this_game.sendMsg("A", "0");
                console.log('A Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.S && that.keyS) {
                that.keyS = false;
                console.log('S Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.D && that.keyD) {
                that.keyD = false;
                this_game.sendMsg("D", "0");
                console.log('D Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE) {
                that.keySPACE = false;
                this_game.sendMsg("SPACE", "0");
                console.log('SPACE Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.SHIFT) {
                that.keySHIFT = false;
                this_game.sendMsg("SHIFT", "0");
                console.log('SHIFT Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.J) {
                that.keyNA = false;
                this_game.sendMsg("NA", "0");
                console.log('J Depressed');
            } else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.K) {
                that.keySA = false;
                this_game.sendMsg("SA", "0");
                console.log('K Depressed');
            }

        });

        // Mouse Input
        this.input.mouse.disableContextMenu();
    }

    // Desde aqui comunicaremos al servidor lo que estamos haciendo
    sendMsg(k, val) {

        var pkg = {
            key: k,
            value: val
        }

        TT_WebSocket.prototype.sendMessage(pkg, "game");
    }

    // Desde aqui controlaremos el player2 a "comandazos"
    processMsg(pkg) {
        if (pkg.value == "1") {
            switch (pkg.key) {
                case "SPACE":
                    this.playerNet.keySPACE = true;
                    break;
                case "SHIFT":
                    this.playerNet.keySHIFT = true;
                    break;
                case "A":
                    this.playerNet.keyA = true;
                    break;
                case "D":
                    this.playerNet.keyD = true;
                    break;
                case "NA":
                    this.playerNet.keyNA = true;
                    break;
                case "SA":
                    this.playerNet.keySA = true;
                    break;
            }
        } else if (pkg.value == "0") {
            switch (pkg.key) {
                case "SPACE":
                    this.playerNet.keySPACE = false;
                    break;
                case "SHIFT":
                    this.playerNet.keySHIFT = false;
                    break;
                case "A":
                    this.playerNet.keyA = false;
                    break;
                case "D":
                    this.playerNet.keyD = false;
                    break;
                case "NA":
                    this.playerNet.keyNA = false;
                    break;
                case "SA":
                    this.playerNet.keySA = false;
                    break;
            }

        }
    }

}