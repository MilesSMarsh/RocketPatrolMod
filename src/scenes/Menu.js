class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('stars', './assets/stars.png');
        this.load.image('rocket_patrol', './assets/rocket_patrol.png');
        
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0);
        this.rocket_patrol = this.add.tileSprite(0, 0, 640, 480, 'rocket_patrol').setOrigin(0, 0);

        this.add.text(game.config.width/2, game.config.height/2, 
        'Use <- -> arrows to move & (f) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        this.stars.tilePositionX -= 4;

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }


}
