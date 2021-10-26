export class GL_Proyectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, proyectile_size) {
        super(scene, x, y, );

        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;

        let aux = 'size' + proyectile_size;
        this.play(aux);

        this.body.setOffset(0, 0);

        this.body.setSize(14, 7, false);

        this.velocidadx = 800;
        this.velocidady = 0;

        this.scene.add.existing(this);

    }

    animation_Declaration(){

        

    }


    flipDirection() {
        
        this.flipX = true;
        this.velocidadx = -this.velocidadx;
    }

    update() {
        if (this.active) {
            this.body.velocity.x = this.velocidadx;
            this.body.velocity.y = this.velocidady;
        }

    }

}