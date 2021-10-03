export class Menu_Scene extends Phaser.Scene{

    constructor()
    {
        super({ key: 'menu_Scene'});
    }

    // Here we need to load all the graphics
    preload(){
        console.log('Menu Escena');

        this.scene.launch("game_Scene_pene");
    }

    // Here we need to create all the Modules
                                        //^^^---Like player, platform, Pwr_Up..
    create(){
    }

    update()
    {
    }
}