export class Play_Select_Scene extends Phaser.Scene{

    constructor() {
        super({ key: 'select_menu_Scene' });

        this.background;
        
        this.text1;
        
        this.text2;

        this.salir;

        this.pointer;
    }

    preload() {
        console.log('Menu Seleccion Escena');

        //this.scene.launch("game_Scene");

        this.load.image('fondo', 'stores/menu/bluemenu.jpg');
    }

    create() {
        this.background = this.add.image(0, 0, 'fondo');
        this.background.setScale(1.5);

        this.text1 = this.add.text(460, 300, 'Grund Legend', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});
        this.text1.setInteractive();

        this.text2 = this.add.text(660, 300, 'Avalor', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});
        this.text2.setInteractive();

        this.salir = this.add.text(50,50,'Salir', { color: '#000000', fontSize: '40px', fontFamily: 'Gemunu Libre'});
        this.salir.setInteractive();

        //this.events.emit ('gameCountDown', ({countDown: 10}));
        
        var that = this;
        this.text1.on('pointerdown', function(pointer){
            console.log('Personaje 1 seleccionado');
            that.scene.start("game_Scene", {character: 'grundlegend'});
        });

        this.text2.on('pointerdown', function(pointer){
            console.log('Personaje 2 seleccionado');
            that.scene.start("game_Scene", {character: 'avalor'});
        });

        this.salir.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("play_menu_Scene");
        })
        
    }

    update() {
        this.pointer = this.input.activePointer;

        //console.log(this.pointer.x, this.pointer.y);
    }
}