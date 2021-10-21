//import { Player } from "/scripts/player/player.js";

export class PowerUp extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);

        this.linkedPlayer;

        this.picked = false;

        //duration of the powerup
        //default 0 for non duration powerups
        this.duration;

        this.scene.add.existing(this);

        //this.body.setBounce(0.1);
        this.setInteractive();
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

    }



    collected(){
        console.log('objeto recogido');
    }

    trigger(delta){
        console.log('objeto activado');
    }

    destroyPowerUp(){
        this.scene.activePowerUp = null;
        this.destroy();
    }

}