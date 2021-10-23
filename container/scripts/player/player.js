// Encharced of handling player modularity
export class Player extends Phaser.GameObjects.Sprite{

    // State Machine
    static PlayerStatus = {
        IDDLE: 0,
        MOVING: 1,
        DASHING: 2,
        JUMP_1: 3,
        JUMP_2: 4,
        ATA_S: 5,
        ATA_N: 6
    };

    // This constructor is called on game.create() method
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);

        this.scene.add.existing(this);

        this.setInteractive();
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.playerStatus = Player.PlayerStatus.IDDLE;

        // Dinamic atributes
        this.aceleration = 3;
        this.horizontalSpeed = 225;
        this.verticalpeed = 10;

        // Input Variables
        this.keyW = false;   // ^ Boolean Key Catchers
        this.keyS = false;
        this.keyA = false;
        this.keyD = false;
        this.keySPACE = false;
        this.keySHIFT = false;
        // Normal attack = KeyJ || LClick
        this.keyNA = false;
        // Normal attack = KeyK || RClick
        this.keySA = false;

        // Move Variables
        this.looking_R = false;
        this.dash_R = false;
        this.drag = 3;
        this.dashForce = 800;
        this.dashAllowed = false;
        this.dashActivated = false;

        this.dashCoolDown = 3 * 1000;
        this.dash_Timer = scene.time.addEvent({ delay: this.dashCoolDown, loop: true });

        // Vida
        this.maxVida;
        this.Vida;
    }

    getVida(){return this.vida;}
    setVida(v){this.vida = v;}

    getVelocidad(){return this.horizontalSpeed;}
    setVelocidad(v){this.horizontalSpeed = v;}

    getAceleration(){return this.aceleration;}
    setAceleration(a){this.aceleration = a;}

    getNa(){return this.keyNA;}
    
    playerPhysics(delta){

        // Horizontal movement
        if (this.keyD && !this.keyA) {
            if (this.body.velocity.x <= this.horizontalSpeed){
                this.body.velocity.x += this.aceleration * delta;
            }

            if (!this.looking_R) this.looking_R = true;       

        } else if (this.keyA && !this.keyD) {
            
            if (this.body.velocity.x >= -1 * this.horizontalSpeed){
                this.body.velocity.x -= this.aceleration * delta;
            }

            if (this.looking_R) this.looking_R = false;  
        
        // No Key Down -> Movement degradation
        } else if (!this.keyA && !this.keyD){
            if (this.looking_R && this.body.velocity.x != 0){
                this.body.velocity.x -= this.drag * delta;
                if (this.body.velocity.x <= 0){
                    this.body.setVelocityX(0);
                }
            } else if (!this.looking_R && this.body.velocity.x != 0){
                this.body.velocity.x += this.drag * delta;
                if (this.body.velocity.x >= 0){   
                    this.body.setVelocityX(0);
                }
            }
        }

        // Horizontal movement
        // Dash caption
        if (this.dashAllowed && this.keySHIFT)
        {
            this.dashAllowed = false;
            this.dashActivated = true;
            this.dash_R = this.looking_R;
        }

        // Vertical movement
        // Jump
        if (this.keySPACE && this.body.touching.down)
        {
            this.body.setVelocityY(-430);
        }

        // Dash Movement
        if(this.dashActivated)
        {
            if(this.body.touching.left)
            {
                this.dash_R = true;
                this.looking_R = true;
            } else if (this.body.touching.right)
            {
                this.dash_R = false;
                this.looking_R = false;
            }

            if (this.dash_R)
            {
                this.body.velocity.x = this.dashForce;
            } else {
                this.body.velocity.x = -1 * this.dashForce;
            }
             // Dash end movement
        } else if (Math.abs(this.body.velocity.x) > this.horizontalSpeed) {
            if (this.looking_R) {
                this.body.velocity.x = 0.95 * this.horizontalSpeed;
            } else {
                this.body.velocity.x = -0.95 * this.horizontalSpeed;
            }
        }

        // Auto-Flip Sprite
        if(this.body.velocity.x > 0)
        {
            this.flipX = false;
        } else if (this.body.velocity.x < 0){
            this.flipX = true;
        }
    }

    update(delta){
        this.playerPhysics(delta);
    }


}