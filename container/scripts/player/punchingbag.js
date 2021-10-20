import { Player } from "./player.js";

export class PunchingBag extends Player{
    constructor(scene, x, y){
        super(scene, x, y, 'PB');

        this.body.setSize(33, 64, false);
    }

    renove()
    {
        this.body.setVelocityX(0);
    }
}