import { PowerUp } from "./powerup.js";

export class BebidaEnergetica extends PowerUp{
    constructor(scene, x, y){
        super(scene, x, y);

        this.setTexture('bebidaenergetica')
        this.setScale(0.2,0.2);

        //velocity boost 50%
        this.baseVelocity;
        this.bonusVelocity = 0.5;

        this.duration = 5 * 1000;

        this.body.setOffset(0, 0);
        this.body.setSize(190, 331, false);

    }

    calculateVelocity(){
        
        return (this.baseVelocity + this.baseVelocity * this.velocityBonus);
    }

    trigger(){
        console.log("bebida energetica consumida");

        this.baseVelocity = this.linkedPlayer.getVelocidad();

        this.linkedPlayer.setVelocidad(this.linkedPlayer.getVelocidad() + this.linkedPlayer.getVelocidad() * this.bonusVelocity);

        this.destroyPowerUp();

    }

    outTimeTrigger(){
        this.linkedPlayer.setVelocidad( this.baseVelocity);
        console.log('se acabo el tiempo');

        
    }
}