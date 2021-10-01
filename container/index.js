import {Game_Scene} from './game.js';

const config = {
    type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
    width: 1280,         // game width 640
    height: 720,        // game height 360
    scene: [Game_Scene],   // our newly created scene
    // Adding Physics
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 550 },
                debug: false
            }
        }
    };

    var game = new Phaser.Game(config);