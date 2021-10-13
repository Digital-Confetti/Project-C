// Encharced of handling player modularity
export class Player extends Phaser.GameObjects.Sprite{

    // This constructor is called on create() metho
    constructor(scene, x, y){
        super(scene, x, y, 'byConfetti');

        this.scene.add.existing(this);

        this.setInteractive();
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

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

        //this.timer_dash = timerDash;
        //this.timer_dash = this.time.addEvent({ delay: this.dashCoolDown, loop: true });

        this.moving_R = false;
        this.dash_R = false;
        this.drag = 3;
        this.dashForce = 800;
                        // s -> ms
        this.dashCoolDown = 3 * 1000;
        this.dashAllowed = false;
        this.dashActivated = false;

        
    }
    
    playerPhysics(delta){
        // Horizontal movement
        if (this.keyD && !this.keyA) {
            if (this.body.velocity.x <= this.horizontalSpeed){
                this.body.velocity.x += this.aceleration * delta;
            }

            if (!this.moving_R) this.moving_R = true;       

        } else if (this.keyA && !this.keyD) {
            
            if (this.body.velocity.x >= -1 * this.horizontalSpeed){
                this.body.velocity.x -= this.aceleration * delta;
            }

            if (this.moving_R) this.moving_R = false;  
        
        // No Key Down -> Movement degradation
        } else if (!this.keyA && !this.keyD){
            if (this.moving_R && this.body.velocity.x != 0)
            {
                this.body.velocity.x -= this.drag * delta;
                
                if (this.body.velocity.x <= 0)
                {
                    this.body.setVelocityX(0);
                }
            } else if (!this.moving_R && this.body.velocity.x != 0)
            {
                this.body.velocity.x += this.drag * delta;
                
                if (this.body.velocity.x >= 0)
                {   
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
            this.dash_R = this.moving_R;
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
                this.moving_R = true;
            } else if (this.body.touching.right)
            {
                this.dash_R = false;
                this.moving_R = false;
            }

            if (this.dash_R)
            {
                this.body.velocity.x = this.dashForce;
            } else {
                this.body.velocity.x = -1 * this.dashForce;
            }
             // Dash end movement
        } else if (this.body.velocity.x > this.horizontalSpeed) {
            if (this.moving_R) {
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