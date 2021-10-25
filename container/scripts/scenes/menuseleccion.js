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

        this.load.image('fondoseleccion', 'stores/menu/seleccion_perosnajes2.jpg');
        this.load.image('gunlegends', 'stores/menu/grunlegend.png');
    }

    create() {
        this.background = this.add.image(0, 0, 'fondoseleccion');
        this.background.setScale(1.4);
        this.background.setOrigin(0);

        this.grunlegendsboton = this.add.image(670, 210, 'gunlegends').setInteractive();
        this.grunlegendsboton.setScale(1.0);
        this.grunlegendsboton.alpha=0.2;
        


        /*this.text1 = this.add.text(460, 300, 'Grund Legend', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});
        this.text1.setInteractive();

        this.text2 = this.add.text(660, 300, 'Avalor', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});
        this.text2.setInteractive();
        */
        this.salir = this.add.text(50,50,'Salir', { color: '#000000', fontSize: '40px', fontFamily: 'Gemunu Libre'});
        this.salir.setInteractive();

        //this.events.emit ('gameCountDown', ({countDown: 10}));
        
        var that = this;
        this.grunlegendsboton.on('pointerdown', function(pointer){
            console.log('Personaje 1 seleccionado');
            that.scene.start("game_Scene", {character: 'grundlegend'});
        });
        /*
        this.text2.on('pointerdown', function(pointer){
            console.log('Personaje 2 seleccionado');
            that.scene.start("game_Scene", {character: 'avalor'});
        });
        */
        this.salir.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("play_menu_Scene");
        })
        this.iniciar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        this.pointer = this.input.activePointer;
        if(this.iniciar.isDown){
            console.log('enter')
            this.scene.start("game_Scene", {character: 'grundlegend'});
        }
        //console.log(this.pointer.x, this.pointer.y);
    }
}