export class Controles_Scene extends Phaser.Scene{

    constructor() {
        super({ key: 'select_menu_controles' });

        this.background;

        this.salir;

        this.pointer;
    }

    preload() {
        console.log('Menu Seleccion Escena');

        //this.scene.launch("game_Scene");

        this.load.image('fondo2', 'stores/menu/controles.jpg');
        this.load.image('botonsalir', 'stores/menu/button/boton_salir.png');
    }

    create() {
        this.background = this.add.image(0, 0, 'fondo2');
        this.background.setScale(1.4);
        this.background.setOrigin(0);


        this.salir = this.add.image(60, 30, 'botonsalir').setInteractive();
        this.salir.setScale(0.7);

        //this.events.emit ('gameCountDown', ({countDown: 10}));
        
        var that = this;

        this.salir.on('pointerdown', function(pointer){
            console.log(this);
            console.log(that);
            that.scene.start("play_menu_Scene");
        })
        this.iniciar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        this.pointer = this.input.activePointer;
        if(this.iniciar.isDown){
            console.log('enter')
            this.scene.start('play_menu_Scene');
        }
        //console.log(this.pointer.x, this.pointer.y);
    }
}