export class Play_Menu_Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'play_menu_Scene' });

        this.background;
        this.boton1;
        this.text1;
        this.boton2;
        this.text2;

        this.salir;

        this.controles;
        this.configuracion;
        this.personajes;

        this.pointer;
    }
   
    // Here we need to load all the graphics
    preload() {
        console.log('Menu Jugar Escena');

        //this.scene.launch("game_Scene");

        this.load.image('fondo_inicio', 'stores/menu/seleccion_menu.jpg');
        //BOTON ROJO
        this.load.image('botonrojo1', 'stores/menu/button/boton_rojo_sinpulsar.png');
        this.load.image('botonrojo2', 'stores/menu/button/boton_rojo.png');
        //BOTON AZUL
        this.load.image('botonazul1', 'stores/menu/button/boton_azul.png');
        this.load.image('botonazul2', 'stores/menu/button/boton_azul_pulsado.png');
        //BOTON SALIR
        this.load.image('botonsalir', 'stores/menu/button/boton_salir.png');
        this.load.image('botonsalir2', 'stores/menu/button/boton_salir_pulsado.png');
        //BOTON CONFIGURACION 
        this.load.image('botonconfiguracion', 'stores/menu/button/boton_configuracion.png');
        this.load.image('botonconfiguracion2', 'stores/menu/button/boton_configuracion_pulsado.png');

        //BOTTON PERSONAJES 
        this.load.image('botonpersonajes', 'stores/menu/button/boton_personajes.png');
        this.load.image('botonpersonajes2', 'stores/menu/button/boton_personajes_pulsado.png');

        //BOTTON CONTROLES
        this.load.image('botoncontroles', 'stores/menu/button/boton_controles.png');
        this.load.image('botoncontroles2', 'stores/menu/button/boton_controles_pulsado.png');

    }

    // Here we need to create all the Modules
    //^^^---Like player, platform, Pwr_Up..
    create() {
        this.TeclaA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.TeclaD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.TeclaW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.TeclaS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.iniciar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.menu_boton = 0;
        console.log(this);
        this.background = this.add.image(0, 0, 'fondo_inicio');
        this.background.setScale(1.4);
        this.background.setOrigin(0);

        this.boton1 = this.add.image(580, 370, 'botonrojo1').setInteractive();
        this.boton1.setScale(1.45);
        this.boton1_luz = this.add.image(580, 370, 'botonrojo2').setInteractive();
        this.boton1_luz.setScale(1.45);
        this.boton1_luz.alpha=1;
        //this.text1 = this.add.text(560, 300, 'Jugar Offline', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});

        this.boton2 = this.add.image(705, 375, 'botonazul1').setInteractive();
        this.boton2.setScale(1.45);
        this.boton2_luz = this.add.image(705, 375, 'botonazul2').setInteractive();
        this.boton2_luz.setScale(1.45);
        this.boton2_luz.alpha=0;
        //this.text2 = this.add.text(460, 270, 'Jugar Online', { color: '#000000', fontSize: '28px', fontFamily: 'Gemunu Libre'});

        this.salir = this.add.image(100, 50, 'botonsalir').setInteractive();
        this.salir.setScale(1);
        this.salir_luz = this.add.image(100, 50, 'botonsalir2').setInteractive();
        this.salir_luz.setScale(1);
        this.salir_luz.alpha = 0;


        this.controles = this.add.image(1150, 150, 'botoncontroles').setInteractive();
        this.controles.setScale(1);
        this.controles_luz = this.add.image(1150, 150, 'botoncontroles2').setInteractive();
        this.controles_luz.setScale(1);
        this.controles_luz.alpha = 0;

        this.configuracion = this.add.image(1150, 270, 'botonconfiguracion').setInteractive();
        this.configuracion.setScale(1);
        this.configuracion_luz = this.add.image(1150, 270, 'botonconfiguracion2').setInteractive();
        this.configuracion_luz.setScale(1);
        this.configuracion_luz.apha = 0;

        this.personajes = this.add.image(1150, 390, 'botonpersonajes').setInteractive();
        this.personajes.setScale(1);
        this.personajes_luz = this.add.image(1150, 390, 'botonpersonajes2').setInteractive();
        this.personajes_luz.setScale(1);
        this.personajes_luz.alpha = 0;
        //this.salir = this.add.text(50,50,'Salir', { color: '#000000', fontSize: '40px', fontFamily: 'Gemunu Libre'});
        //this.salir.setInteractive();
        
        var that = this;
        this.boton1.on('pointerdown', function(pointer){
            console.log('Boton rojo pulsado');
            that.scene.start("select_menu_Scene");
        });

        this.boton2.on('pointerdown', function(pointer){
            console.log('Boton azul pulsado');
            that.scene.start("select_menu_Scene");
        });

        this.salir.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("menu_Scene");
        });
        this.controles.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("select_menu_controles");
        });
        this.configuracion.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("menu_Scene");
        });
        this.personajes.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("select_menu_Scene");
        });

        
    }

    update() {
        if(this.TeclaA.isDown || this.TeclaW.isDown ){
            if(this.boton1_luz.alpha == 1){
                console.log('aagado')
                this.salir_luz.alpha = 1;
                this.boton1_luz.alpha = 0;
                this.menu_boton = 1;
                console.log(this.menu_boton);
            }else if (this.salir_luz.alpha == 1){
                console.log('salir izquierda')
                this.personajes_luz.alpha = 1;
                this.salir_luz.alpha = 0;
                this.menu_boton = 0;
                console.log(this.menu_boton);
            }else if (this.personajes_luz.alpha == 1){
                console.log(' s')
                this.personajes_luz.alpha = 0;
                this.configuracion_luz.alpha = 1;
                this.menu_boton = 4;
                console.log(this.menu_boton);
            }else if (this.configuracion_luz.alpha == 1){
                console.log(' r')
                this.configuracion_luz.alpha = 0;
                this.controles_luz.alpha = 1;
                this.menu_boton = 4;
                console.log(this.menu_boton);
            }else if (this.controles_luz.alpha == 1){
                console.log(' j')
                this.boton2_luz.alpha = 1;
                this.controles_luz.alpha = 0;
                this.menu_boton = 0;
                console.log(this.menu_boton);
            }else if (this.boton2_luz.alpha == 1){
                console.log(' g')
                this.boton2_luz.alpha = 0;
                this.boton1_luz.alpha = 1;
                this.menu_boton = 5;
                console.log(this.menu_boton);
            }
        }else if(this.TeclaD.isDown || this.TeclaS.isDown){
            if(this.boton1_luz.alpha == 1){
                console.log('aagado2')
                this.boton2_luz.alpha = 1;
                this.boton1_luz.alpha = 0;
                this.menu_boton = 0;
                console.log(this.menu_boton);
            } else if (this.boton2_luz.alpha == 1){
                console.log(' g2')
                this.boton2_luz.alpha = 0;
                this.controles_luz.alpha = 1;
                this.menu_boton = 4;
                console.log(this.menu_boton);
            }else if (this.controles_luz.alpha == 1){
                console.log(' j2')
                this.configuracion_luz.alpha = 1;
                this.controles_luz.alpha = 0;
                this.menu_boton = 4;
                console.log(this.menu_boton);
            }else if (this.configuracion_luz.alpha == 1){
                console.log(' r2')
                this.configuracion_luz.alpha = 0;
                this.personajes_luz.alpha = 1;
                this.menu_boton = 2;
                console.log(this.menu_boton);
            }else if (this.personajes_luz.alpha == 1){
                console.log(' s2')
                this.personajes_luz.alpha = 0;
                this.salir_luz.alpha = 1;
                this.menu_boton = 3;
                console.log(this.menu_boton);
            }else if (this.salir_luz.alpha == 1){
                console.log('salir izquierda2')
                this.boton1_luz.alpha = 1;
                this.salir_luz.alpha = 0;
                this.menu_boton = 1;
                console.log(this.menu_boton);
            }
        }else if (this.iniciar.isDown){
            switch(this.menu_boton){
                case 0: //elecion offline
                    console.log('enter')
                    this.scene.start("select_menu_Scene");
                    break;
                case 1: // salir
                    this.scene.start("menu_Scene");
                    break;
                case 2: //personajes
                    this.scene.start("select_menu_Scene");
                    break;
                case 3: //menu configuracion
                    this.scene.start("menu_Scene");
                    break;  
                case 4: //controles
                    this.scene.start("select_menu_controles");
                    break;
                case 5: //menu online
                    this.scene.start("select_menu_Scene");
                    break;   
            }
        }
      

  

        this.configuracion.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("menu_Scene");
        });
        this.personajes.on('pointerdown', function(pointer){
            console.log('Boton salir pulsado');
            that.scene.start("select_menu_Scene");
        });

        
        this.pointer = this.input.activePointer;
        //console.log(this.TecladoStatus);
        //console.log(this.pointer.x, this.pointer.y);
    }
}