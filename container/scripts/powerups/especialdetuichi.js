import { PowerUp } from "./powerup.js";
import { Player } from "/scripts/player/player.js";

export class EspecialDeTuichi extends PowerUp{
    constructor(scene, x, y){
        super(scene, x, y);

        this.setTexture('especialdetuichi')
        this.setScale(0.2,0.2);

        this.duration = 0;

        this.body.setOffset(-10, 0);
        this.body.setSize(393, 312, false);

    }

    trigger(){
        console.log("especial de tuichi consumido");

        this.linkedPlayer.setVida( this.linkedPlayer.getVida() + 20)

        this.destroyPowerUp();

    }

    
}