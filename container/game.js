// importing
import {Player} from './player.js';

// exporting
export class Game_Scene extends Phaser.Scene {


    constructor()
    {
        super({ key: 'game_Scene'});
    }

    // Here we need to load all the graphics
    preload(){
    //  vvvv---- really important this this ¬.¬
        this.ply = new Player();
        this.ply.print_Key();
    }

    // Here we need to create all the Modules
                                        //^^^---Like player, platform, Pwr_Up..
    create(){

    }
}