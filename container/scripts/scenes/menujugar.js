export class Play_Menu_Scene extends Phaser.Scene {

    constructor() {
        super({ key: 'play_menu_Scene' });

        this.background;
        this.boton1;
        this.text1;
        this.boton2;
        this.text2;

        this.salir;

        this.pointer;
    }

    // Here we need to load all the graphics
    preload() {
        console.log('Menu Jugar Escena');

        //this.scene.launch("game_Scene");

        this.load.image('fondo', 'stores/menu/bluemenu.jpg');
        this.load.image('botonrojo1', 'stores/menu/button/boton_rojo.png');
        this.load.image('botonrojo2', 'stores/menu/button/boton_rojo_luz.png');
        this.load.image('botonazul1', 'stores/menu/button/boton_azul.png');
        this.load.image('botonazul2', 'stores/menu/button/boton_azul_luz.png');
    }

    // Here we need to create all the Modules
    //^^^---Like player, platform, Pwr_Up..
    create() {
        this.background = this.add.image(0, 0, 'fondo');
        this.background.setScale(1.5);

        this.boton1 = this.add.image(710, 350, 'botonrojo1').setInteractive();
        this.boton1.setScale(1.3);
        this.boton1.setAngle(30);
        this.text1 = this.add.text(660, 300, 'Jugar Offline', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});

        this.boton2 = this.add.image(540, 270, 'botonazul1').setInteractive();
        this.boton2.setScale(1.3);
        this.boton2.setAngle(30);
        this.text2 = this.add.text(460, 270, 'Jugar Online', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});

        this.salir = this.add.text(50,50,'Salir', { color: '#000000', fontSize: '40px', fontFamily: 'Gemunu Libre'});
        this.salir.setInteractive();
        
        var that = this;
        this.boton1.on('pointerdown', function(pointer){
            console.log('Boton rojo pulsado');
            that.scene.start("game_Scene");
        });

        this.boton2.on('pointerdown', function(pointer){
            console.log('Boton azul pulsado');
            that.scene.start("game_Scene");
        });

        this.salir.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("menu_Scene");
        })
        
    }

    update() {
        this.pointer = this.input.activePointer;

        //console.log(this.pointer.x, this.pointer.y);
    }
}