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

    
    outTimeTrigger(){
        console.log('se acabo el tiempo');
    }

    destroyPowerUp(){
        this.destroy();
    }

}