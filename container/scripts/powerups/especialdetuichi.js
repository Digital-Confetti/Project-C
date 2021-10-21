import { PowerUp } from "./powerup.js";

export class EspecialDeTuichi extends PowerUp{
    constructor(scene, x, y){
        super(scene, x, y);

        this.setTexture('especialdetuichi')
        this.setScale(0.2,0.2);

        this.duration = 0;

        this.body.setOffset(0, 0);
        this.body.setSize(383, 312, false);

    }

    collected(){
        console.log("especial de tuichi consumido");

        this.picked = true;
        this.linkedPlayer = this.scene.player;

        this.linkedPlayer.setVida( this.linkedPlayer.getVida() + 20)

        this.destroyPowerUp();

    }
    
}