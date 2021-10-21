import { Player } from "./player.js";

export class GrundLegend extends Player{
    constructor(scene, x, y){
        super(scene, x, y, 'grundlegend');

        this.maxVida = 100;
        this.vida = 100;

        this.body.setBounce(0.1);
        
        this.body.height = 80;
        
    }
}