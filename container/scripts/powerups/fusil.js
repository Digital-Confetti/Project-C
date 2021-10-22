import { PowerUp } from "./powerup.js";

export class Fusil extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.setTexture('fusil')
        this.setScale(0.1, 0.1);

        this.duration = 10 * 1000;

        this.bullet = [];

        this.bullet_speed = 100;

        this.max_ammo = 3
        this.ammo = this.max_ammo;

        this.shoot_cooldown = 0.5 * 1000;

        this.able_shoot = true;

        this.dissapear_cooldown = 10 * 1000;

        this.hit_damage = 20;

        this.dissapeared = false;

        this.body.setOffset(0, 0);
        this.body.setSize(855, 251, false);

        this.fusil_player_bullet_collider = [];

        this.timer;
        this.shoot_timer;

    }

    collected() {
        console.log("platano recogido");

        this.picked = true;
        this.linkedPlayer = this.scene.player;

        //this.timer = this.scene.time.delayedCall(this.duration, this.outTimeTrigger, null, this);

    }

    trigger(delta) {

        this.x = this.linkedPlayer.x + 40;
        this.y = this.linkedPlayer.y;

        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.linkedPlayer.getNa() && this.ammo > 0 && this.able_shoot) {
            this.ammo--;
            this.able_shoot = false;

            console.log('disparo realizado');

            this.scene.game_player_powerup_collider.active = false;

            this.bullet.push(this.scene.physics.add.image(this.x + 25, this.y - 7, 'disparo').setScale(0.2, 0.2));

            var aux = (this.max_ammo - 1) - this.ammo;
            var args = [aux];
            //console.log(aux);
            //this.fusil_player_bullet_collider.push(this.scene.physics.add.collider(this.scene.player, this.bullet[aux], this.hitPlayer, args, this));
            this.fusil_player_bullet_collider.push(this.scene.physics.add.collider(this.scene.player, this.bullet[aux], this.hitPlayer, aux, this));
            //console.log(aux);
            this.scene.time.delayedCall(this.shoot_cooldown, function () { this.able_shoot = true }, null, this);
        }

        if (this.bullet !== null) {
            //console.log(this.shoot_timer.getProgress());
            for (var i = 0; i < this.bullet.length; i++) {
                this.bullet[i].body.velocity.x = this.bullet_speed;
                this.bullet[i].body.velocity.y = 0;
            }

        }

        if (this.ammo == 0 && !this.dissapeared) {
            this.dissapeared = true;

            this.scene.time.delayedCall(this.dissapear_cooldown, this.outTimeTrigger, null, this)
        }


    }

    outTimeTrigger() {
        console.log('fusil destruido');
        this.timer.remove();

        this.scene.game_player_powerup_collider.active = true;

        if (this.bullet !== null) {
            for (var i = 0; i < this.bullet.length; i++) {
                this.bullet[i].destroy();
                this.scene.physics.world.removeCollider(this.fusil_player_bullet_collider[i]);
            }
        }

        this.destroyPowerUp();

    }

    hitPlayer(aux) {
        console.log('player dañado');
        console.log(aux);

        this.scene.player.setVida(this.scene.player.getVida() - this.hit_damage);

        this.bullet[aux].destroy();
        this.scene.physics.world.removeCollider(this.fusil_player_bullet_collider[aux]);

        //this.outTimeTrigger();
    }

}