import { PowerUp } from "./powerup.js";

export class BebidaEnergetica extends PowerUp{
    constructor(scene, x, y){
        super(scene, x, y);

        this.setTexture('bebidaenergetica')
        this.setScale(0.2,0.2);

        this.alpha = 1;

        //velocity boost 50%
        this.baseVelocity;
        this.baseAceleration;
        this.bonusVelocity = 1;
        this.bonusAceleration = 1;

        this.duration = 5 * 1000;

        this.body.setOffset(0, 0);
        this.body.setSize(190, 331, false);

    }

    collected(){
        console.log("bebida energetica consumida");

        this.picked = true;
        this.linkedPlayer = this.scene.player;

        this.baseVelocity = this.linkedPlayer.getVelocidad();
        //this.baseAceleration = this.linkedPlayer.getAceleration();

        this.linkedPlayer.setVelocidad(this.linkedPlayer.getVelocidad() + this.linkedPlayer.getVelocidad() * this.bonusVelocity);
        //this.linkedPlayer.setAceleration(this.linkedPlayer.getAceleration() + this.linkedPlayer.getAceleration() * this.bonusAceleration);

        //provisional object dissapear
        this.scene.physics.world.disableBody(this.body);
        this.alpha = 0;

        this.scene.time.delayedCall(this.duration, this.outTimeTrigger, null, this);

    }

    outTimeTrigger(){
        console.log('se acabo el tiempo');

        this.linkedPlayer.setVelocidad( this.baseVelocity);
        //this.linkedPlayer.setAceleration( this.baseAceleration);

        this.destroyPowerUp();
    }
}