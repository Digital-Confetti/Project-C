import { PowerUp } from "./powerup.js";

export class EspecialDeTuichi extends PowerUp{
    constructor(scene, x, y){
        super(scene, x, y);

        this.setTexture('especialdetuichi')
        this.setScale(1.5,1.5);

        this.duration = 0;

        this.healing = 20;

        this.body.setOffset(0, 0);
        this.body.setSize(42, 32, false);

    }

    collected(){
        console.log("especial de tuichi consumido");

        this.picked = true;
        this.linkedPlayer = this.scene.player;

        this.linkedPlayer.setVida( this.linkedPlayer.getVida() + this.healing);

        this.destroyPowerUp();

    }
    
}