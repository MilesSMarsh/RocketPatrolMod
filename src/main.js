//Miles Marsh
//Rocket Patrol II Return of the Reckoning, Strikes the Kingdom of Termination
//the approximate time it took to complete the project (in hours)
//the mods you chose from the list above, their point values, and, if necessary, an explanation of their implementation
//citations for any sources you used (you do not need to cite Nathan or Phaser documentation)
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;

let highScore = 0;