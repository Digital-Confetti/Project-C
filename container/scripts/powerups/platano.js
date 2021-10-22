import { PowerUp } from "./powerup.js";

export class Platano extends PowerUp{
    constructor(scene, x, y){
        super(scene, x, y);

        this.setTexture('platano')
        this.setScale(0.3,0.3);

        this.duration = 10 * 1000;

        this.throwed = false;

        this.hit_damage = 40;

        this.throw_force = 200;

        this.body.setOffset(0, 0);
        this.body.setSize(161, 151, false);

        this.drag = 2;

        this.platano_player_platano_collider;

        this.timer;

    }

    collected(){
        console.log("platano recogido");

        this.picked = true;
        this.linkedPlayer = this.scene.player;

        this.timer = this.scene.time.delayedCall(this.duration, this.outTimeTrigger, null, this);

    }

    trigger(delta){
        
        if(this.linkedPlayer.getNa() && !this.throwed){
            this.throwed = true;

            this.body.velocity.x = this.throw_force;
            this.body.velocity.y = -this.throw_force;

            console.log('1');

            this.scene.game_player_powerup_collider.active = false;

            this.platano_player_platano_collider = this.scene.physics.add.collider(this.scene.player, this, this.hitPlayer, null, this);
        }

        if(!this.throwed){
            
            this.x = this.linkedPlayer.x;
            this.y = this.linkedPlayer.y-20;

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

        }else if(this.throwed && this.body.touching.down){
            this.body.velocity.x -= this.drag * delta;

            if (this.body.velocity.x <= 0)
                {
                    this.body.setVelocityX(0);
                }
        }

    }

    outTimeTrigger(){
        console.log('platano destruido');
        this.timer.remove();
        this.scene.physics.world.removeCollider(this.platano_player_platano_collider);
        this.scene.game_player_powerup_collider.active = true;
        this.destroyPowerUp();

    }

    hitPlayer(){
        console.log('player dañado');
        this.scene.player.setVida(this.scene.player.getVida() - this.hit_damage);
        
        this.outTimeTrigger();
    }

}