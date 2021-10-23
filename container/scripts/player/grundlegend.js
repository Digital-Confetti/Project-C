import { Player } from "./player.js";

export class GrundLegend extends Player{
    constructor(scene, x, y){
        super(scene, x, y, 'grundlegend');

        this.maxVida = 100;
        this.vida = 100;

        this.body.setBounce(0.1);
        //animacion run
        this.body.height = 80;
        //animacion idle
        //this.body.height = 84;
        this.horizontalJumpSpeed = 1.5 * this.horizontalSpeed;
        
    }

    move_Jump(delta){
        if (this.looking_R && this.keyA){
            this.looking_R = false
        } else if (!this.looking_R && this.keyD){
            this.looking_R = true
        } else if (!this.keyA && !this.keyD)
        {
            if (this.looking_R && this.body.velocity.x != 0){
                this.body.velocity.x -= this.drag * delta;
                if (this.body.velocity.x <= 0){
                    this.body.setVelocityX(0);
            }} else if (!this.looking_R && this.body.velocity.x != 0){
                this.body.velocity.x += this.drag * delta; 
                if (this.body.velocity.x >= 0){   
                    this.body.setVelocityX(0);
            }}
            return;
        }

        if(this.looking_R){
            if (this.body.velocity.x < this.horizontalJumpSpeed) this.body.velocity.x += this.aceleration * delta;
        } else {
            if (this.body.velocity.x > -1 * this.horizontalJumpSpeed) this.body.velocity.x -= this.aceleration * delta;
        }

        
    }

    check_Jump(){
        if (this.playerStatus == Player.PlayerStatus.JUMP_1 || this.playerStatus == Player.PlayerStatus.JUMP_2)
        {
            if (this.body.touching.down){
                this.playerStatus = Player.PlayerStatus.IDDLE;
            }
        }

        if (this.keySPACE && this.body.touching.down)
        {
            this.body.setVelocityY(-430);
            this.playerStatus = Player.PlayerStatus.JUMP_1;
        }
    }

    check_Dash(){
        if (this.dashAllowed && this.keySHIFT){
            this.dashAllowed = false;
            this.playerStatus = Player.PlayerStatus.DASHING;
            this.dash_R = this.looking_R;
        }
    }


    timer_Update(){
        let progress = this.dash_Timer.getProgress();

        this.dash_Timer.paused = this.dashAllowed;

        if (progress >= 0.08 && progress <= 0.97) {
            this.playerStatus = Player.PlayerStatus.IDDLE;
            this.dashActivated = false;
            if (Math.abs(this.body.velocity.x) > this.horizontalSpeed) {
                if (this.moving_R) {
                    this.body.velocity.x = 0.95 * this.horizontalSpeed;
                } else {
                    this.body.velocity.x = -0.95 * this.horizontalSpeed;
                }
            }

        } else if (progress >= 0.99) {
            this.dashAllowed = true;
        }
    }

    // PrevST + Inputs = NewST
    logic(delta)
    {
        switch(this.playerStatus)
        {
            case Player.PlayerStatus.IDDLE:
                    if(this.keyA){
                        this.playerStatus = Player.PlayerStatus.MOVING;
                        this.looking_R = false;
                    } else if(this.keyD) {
                        this.playerStatus = Player.PlayerStatus.MOVING;
                        this.looking_R = true;
                    }
                    this.check_Jump();
                    this.check_Dash();
                break;
            case Player.PlayerStatus.MOVING:
                    if(this.keyA){
                        this.looking_R = false;
                    } else if(this.keyD){
                        this.looking_R = true;
                    } 
                    if(!this.keyA && !this.keyD){
                        this.playerStatus = Player.PlayerStatus.IDDLE;
                    }
                    this.check_Jump();
                    this.check_Dash();
                break;
            case Player.PlayerStatus.DASHING:
                this.dashAllowed = false;
                break;
            case Player.PlayerStatus.JUMP_1:
                if (this.keySPACE && this.body.velocity.y > -200) {
                    this.body.setVelocityY(-430);
                    this.playerStatus = Player.PlayerStatus.JUMP_2;
                }
                if (this.body.touching.down){
                    this.playerStatus = Player.PlayerStatus.IDDLE;
                }
                this.check_Dash();
                break;
            case Player.PlayerStatus.JUMP_2:
                if (this.body.touching.down){
                    this.playerStatus = Player.PlayerStatus.IDDLE;
                }
                this.check_Dash();
                break;
            case Player.PlayerStatus.ATA_S:
                break;
            case Player.PlayerStatus.ATA_N:
                break;
        }

    }

    // Actualize  position // Create 
    calculate(delta)
    {
        switch(this.playerStatus)
        {
            case Player.PlayerStatus.IDDLE:
                if (this.looking_R && this.body.velocity.x != 0){
                    this.body.velocity.x -= this.drag * delta;
                    if (this.body.velocity.x <= 0){
                        this.body.setVelocityX(0);
                }} else if (!this.looking_R && this.body.velocity.x != 0){
                    this.body.velocity.x += this.drag * delta; 
                    if (this.body.velocity.x >= 0){   
                        this.body.setVelocityX(0);
                }}
                break;
            case Player.PlayerStatus.MOVING:
                if (this.looking_R && this.keyA){
                    this.looking_R = false
                } else if (!this.looking_R && this.keyD){
                    this.looking_R = true
                }

                if(this.looking_R){
                    if (this.body.velocity.x < this.horizontalSpeed) this.body.velocity.x += this.aceleration * delta;
                } else {
                    if (this.body.velocity.x > -1 * this.horizontalSpeed) this.body.velocity.x -= this.aceleration * delta;
                }

                if (Math.abs(this.body.velocity.x) > this.horizontalSpeed) {
                    if (this.looking_R) {
                        this.body.velocity.x = 0.95 * this.horizontalSpeed;
                    } else {
                        this.body.velocity.x = -0.95 * this.horizontalSpeed;
                    }
                } 
                break;
            case Player.PlayerStatus.DASHING:
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
                break;
            case Player.PlayerStatus.JUMP_1:
                this.move_Jump(delta);
                break;
            case Player.PlayerStatus.JUMP_2:
                this.move_Jump(delta);
                break;
            case Player.PlayerStatus.ATA_S:
                break;
            case Player.PlayerStatus.ATA_N:
                break;
        }
    }

    // Load the animation
    animate(delta)
    {
        switch(this.playerStatus)
        {
            case Player.PlayerStatus.IDDLE:
                break;
            case Player.PlayerStatus.MOVING:
                break;
            case Player.PlayerStatus.DASHING:
                break;
            case Player.PlayerStatus.JUMP_1:
                break;
            case Player.PlayerStatus.JUMP_2:
                break;
            case Player.PlayerStatus.ATA_S:
                break;
            case Player.PlayerStatus.ATA_N:
                break;
        }

        // Auto-Flip Sprite
        if(this.body.velocity.x > 0)
        {
            this.flipX = false;
        } else if (this.body.velocity.x < 0){
            this.flipX = true;
        }
    }

    update(delta)
    {
        this.timer_Update();

        this.logic(delta);

        this.calculate(delta);

        this.animate(delta);

        console.log(this.playerStatus);
    }

/*  #### OLD ####
    update(delta){
        this.playerPhysics(delta);
    }
*/
}