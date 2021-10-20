import { Player } from "./player.js";

export class Avalor extends Player{
    constructor(scene, x, y){
        super(scene, x, y, 'avalor');

        this.body.setBounce(0.9);
        this.body.setOffset(11, 0);
        this.body.setSize(33, 84, false);
    }
}