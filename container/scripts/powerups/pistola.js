import { PowerUp } from "./powerup.js";

export class Pistola extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.setTexture('pistola')
        this.setScale(0.1, 0.1);

        this.duration = 10 * 1000;

        this.bullet = [];

        this.bullet_speed = 1000;

        this.ammo = 1;

        this.dissapear_cooldown = 1 * 1000;

        this.hit_damage = 30;

        this.body.setOffset(0, 0);
        this.body.setSize(361, 241, false);

        this.pistola_player_bullet_collider;

        this.timer;

    }

    collected() {
        console.log("platano recogido");

        this.picked = true;
        this.linkedPlayer = this.scene.player;

        this.timer = this.scene.time.delayedCall(this.duration, this.outTimeTrigger, null, this);

    }

    trigger(delta) {

        this.x = this.linkedPlayer.x+40;
        this.y = this.linkedPlayer.y - 20;

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.linkedPlayer.getNa() && this.ammo > 0) {
            this.ammo--;

            console.log('disparo realizado');

            this.scene.game_player_powerup_collider.active = false;

            this.bullet.push(this.scene.physics.add.image(this.x+25, this.y-7, 'disparo').setScale(0.2, 0.2));
            
            this.scene.time.delayedCall(this.dissapear_cooldown, this.outTimeTrigger, null, this)

            this.pistola_player_bullet_collider = this.scene.physics.add.collider(this.scene.player, this.bullet, this.hitPlayer, null, this);
        }

        if(this.bullet !== null){

            for(var i = 0; i < this.bullet.length; i++){
                this.bullet[i].body.velocity.x = this.bullet_speed;
                this.bullet[i].body.velocity.y = 0;
            }

        }

    }

    outTimeTrigger() {
        console.log('pistola destruida');
        this.timer.remove();

        this.scene.physics.world.removeCollider(this.pistola_player_bullet_collider);
        this.scene.game_player_powerup_collider.active = true;
        
        if(this.bullet !== null){
            for(var i = 0; i < this.bullet.length; i++){
                this.bullet[i].destroy();
            }
        }
        this.destroyPowerUp();

    }

    hitPlayer() {
        console.log('player dañado');
        this.scene.player.setVida(this.scene.player.getVida() - this.hit_damage);
        this.outTimeTrigger();
    }

}