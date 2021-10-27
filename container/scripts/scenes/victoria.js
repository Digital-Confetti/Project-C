export class Victoria_Scene extends Phaser.Scene{

    constructor() {
        super({ key: 'Victoria_menu' });

        this.background;

        this.resume;

        this.pointer;
    }

    preload() {
        console.log('Menu Seleccion victoria');

        this.load.image('fondopausa', 'stores/menu/victoria.jpg');
        this.load.image('victoria', 'stores/menu/victoria_.png');
        this.load.image('botonsalir', 'stores/menu/button/boton_salir.png');

        this.load.audio('espada', 'stores/sounds/desenvainar_espada.mp3');
    }
   
    create() {
        
        this.background = this.add.image(0, 0, 'fondopausa');
        this.background.setScale(1.4);
        this.background.setOrigin(0);
        this.background.alpha= 0.7;

        this.victoria = this.add.image(650, 400, 'victoria').setInteractive();
        this.victoria.setScale(1.4);

        this.salir = this.add.image(60, 30, 'botonsalir').setInteractive();
        this.salir.setScale(0.7);

        this.pausa = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        var that = this;

        this.salir.on('pointerdown', function(pointer){
            that.sound.play('espada');
            that.scene.start("play_menu_Scene");
        })
     
           
        
    }

    update() {
        if(this.pausa.isDown){
            console.log('enter')
            this.scene.stop("select_Pausa");
            this.scene.wake("game_Scene")
        }
        this.pointer = this.input.activePointer;
        
        //console.log(this.pointer.x, this.pointer.y);
    }
}