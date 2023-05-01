// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, movementSpeed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = movementSpeed;
    }

    update(){
        //move left
        this.x -= this.moveSpeed;

        //wrap around from left to right
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }



}