// Encharced of handling player modularity
export class Player extends Phaser.GameObjects.Sprite{

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
        this.dashForce = 200;
        // s -> ms
        this.dashCoolDown = 3 * 1000;
        this.dashAllowed = false;
        this.dashActivated = false;

        
    }
    /*
    timer_Update() {
        let progress = this.timer_dash.getProgress();

        if (progress >= 0.18 && progress <= 0.97) {
            this.dashActivated = false;

            if (this.player.body.velocity.x > this.horizontalSpeed) {
                if (this.moving_R) {
                    this.player.body.velocity.x = 0.95 * this.horizontalSpeed;
                } else {
                    this.player.body.velocity.x = -0.95 * this.horizontalSpeed;
                }
            }


        } else if (progress >= 0.98) {
            this.timer_dash.paused = true;
            this.dashAllowed = true;
        }

        if (this.timer_dash.paused && this.keySHIFT) {
            this.timer_dash.paused = false;
            this.dashAllowed = false;
            this.dashActivated = true;
        }
    }*/

    plyMove(){
        
        // Horizontal movement
        if (this.keyD && !this.keyA) {
            console.log("muevete puto");
            if (this.body.velocity.x <= this.horizontalSpeed) {
                this.body.velocity.x += this.aceleration;
                console.log("mueve a la derecha");
            }

            //this.player.anims.play('right', true);
            this.moving_R = true;

            // Unflipping the sprite
            if (this.flipX) {
                this.flipX = false;
            }

        } else if (this.keyA && !this.keyD) {

            if (this.body.velocity.x >= -1 * this.horizontalSpeed) {
                this.body.velocity.x -= this.aceleration;
            }

            //this.player.anims.play('right', true);
            this.moving_R = false;

            // Flipping the sprite
            if (!this.flipX) {
                this.flipX = true;
            }

            // Move degradation
        } else if (!this.keyA && !this.keyD) {
            if (this.moving_R && this.body.velocity.x != 0) {
                this.body.velocity.x -= this.drag;
                if (this.body.velocity.x <= 0) {
                    this.body.setVelocityX(0);
                }
            } else if (!this.moving_R && this.body.velocity.x != 0) {
                this.body.velocity.x += this.drag;
                if (this.body.velocity.x >= 0) {
                    this.body.setVelocityX(0);
                }
            }
            //this.player.anims.play('idle', true);
        }

        // Vertical movement
        // Jump
        if (this.keySPACE && this.body.touching.down) {
            console.log('Salto');
            this.body.setVelocityY(-430);
        }

        // Horizontal movement
        // Dash
        /*
    if(this.dashAllowed && this.keySHIFT)
    {
        if (this.keyD)
        { 
            this.player.body.velocity.x += this.dashForce;
        } else if (this.keyA)
        {
            this.player.body.velocity.x -= this.dashForce;
        }
    }*/

        if (this.dashActivated && this.moving_R) {
            this.body.velocity.x = 2 * this.dashForce;
        } else if (this.dashActivated && !this.moving_R) {

            this.body.velocity.x = -2 * this.dashForce;
        }


        /*
        if (this.player.body.touching.none)
        {
            console.log('AA');
        }
        */



    }

    

    update(){
        /*
        if(this.keyD){
            console.log("muevete puto");
            this.body.velocity.x = 10;
        }
        */
        this.plyMove();
        //this.timer_Update();
    }


}