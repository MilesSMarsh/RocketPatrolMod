class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('stars', './assets/stars.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('tinyship', './assets/tinyship.png');
        this.load.image('galaxy', './assets/galaxy.png');
        this.load.image('asteroids', './assets/asteroids.png');
    }

    create(){



        //place tile sprite
        this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0);
        this.galaxy = this.add.tileSprite(0, 80, 800, 480, 'galaxy').setOrigin(0, 0);
        this.galaxy.setScale(2);
        this.asteroids = this.add.tileSprite(0, 0, 640, 480, 'asteroids').setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add 3 space ships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'tinyship', 0, 40, game.settings.spaceshipSpeed*2).setOrigin(0, 0);
        this.ship04.setScale(2);


        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }


        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.highScoreText = this.add.text(game.config.width - borderUISize - borderPadding * 10.5, borderUISize + borderPadding*2, highScore, scoreConfig);
        
        
        this.initialTime = game.settings.gameTimer;
        this.countDown = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, this.initialTime/1000 , scoreConfig);
        
        
        this.firingText = this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding*2, "FIRE", scoreConfig);
        this.firingText.setVisible(false);
        
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > highScore){
                highScore = this.p1Score;
                this.highScoreText.text = highScore;
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'HIGH SCORE: ' + highScore, scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update(){


        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart()
        }

        this.stars.tilePositionX -= 4;
        this.galaxy.tilePositionX -= 0.5;
        this.asteroids.tilePositionX -= 2;
        this.stars.asteroidsPositionY-= 1;


        if(!this.gameOver){
            //update Rocket
            this.p1Rocket.update();
            //update Spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        
        if(this.p1Rocket.isFiring){
            this.firingText.setVisible(true);
        }
        else{
            this.firingText.setVisible(false);
        }

        const progress = this.clock.getProgress();
        this.countDown.setText(game.settings.gameTimer/1000 - (Math.floor((progress*100)*(game.settings.gameTimer/100000))));

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
    }

    shipExplode(ship){
        //temporarilly hide ship
        ship.alpha = 0;
        //create explosion at ship
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    
}
