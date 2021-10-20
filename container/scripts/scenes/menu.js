export class Menu_Scene extends Phaser.Scene {

    constructor() {
        super({ key: 'menu_Scene' });

        this.background;
        this.text;
        this.pointer;
    }

    // Here we need to load all the graphics
    preload() {
        console.log('Menu Escena');

        //this.scene.launch("game_Scene");

        this.load.image('fondo', 'stores/menu/bluemenu.jpg');
    }

    // Here we need to create all the Modules
    //^^^---Like player, platform, Pwr_Up..
    create() {
        this.background = this.add.image(0, 0, 'fondo');
        this.background.setScale(1.5);

        this.text = this.add.text(270, 360, 'Pulsa en cualquier lugar para continuar', { color: '#000000', fontSize: '50px', fontFamily: 'Gemunu Libre'});

        var that = this;
        this.input.on('pointerdown', function(pointer){
            console.log('Menu a Game');
            that.scene.start("play_menu_Scene");
        });
    }

    update() {
        this.pointer = this.input.activePointer;

        //console.log(this.pointer.x, this.pointer.y);
    }
}