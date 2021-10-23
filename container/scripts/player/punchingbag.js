import { Player } from "./player.js";

export class PunchingBag extends Player{
    constructor(scene, x, y){
        super(scene, x, y, 'PB');

        this.body.setSize(33, 64, false);
    }

    renove(delta)
    {
        //this.body.setVelocityX(0);
        if (this.body.velocity.x > 0){
            this.body.velocity.x -= this.drag * delta;
            if (this.body.velocity.x <= 0) this.body.velocity.x = 0;
        }  else if(this.body.velocity.x < 0){
            this.body.velocity.x += this.drag * delta;
            if (this.body.velocity.x >= 0) this.body.velocity.x = 0;
        }
    }
}