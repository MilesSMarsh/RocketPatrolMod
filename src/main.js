//Miles Marsh
//Rocket Patrol II Return of the Reckoning, Strikes the Kingdom of Termination
//Approximately 7 hours of work
//the mods you chose from the list above, their point values, and, if necessary, an explanation of their implementation
// 
//5-Point Tier
// Track a high score that persists across scenes and display it in the UI (5) - I created a global variable that stores the highscore across scenes
// Implement the 'FIRE' UI text from the original game (5) - simple text box on the top of the screen when th isFiring boolean is active
// Implement the speed increase that happens after 30 seconds in the original game (5) - I made the spaceship speed an argument in the constructor of the space shipclass then using an if else statement piggy backing off the time remaining function in the 10 point question I set the speed to double
// Create a new scrolling tile sprite for the background (5) - I made custom space background using pixilart.com
// Allow the player to control the Rocket after it's fired (5) - I got rid of the code that stops input while the ship is firing
//
// 10-Point Tier
// Display the time remaining (in seconds) on the screen (10) - I used the getProgress() function to get the percent complete the clock has finished, then through simple math I converted it to a countdown that changes based on the difficulty
// Create a new title screen  (10) - I made a custom title screen using pixilart.com 
// Implement parallax scrolling for the background (10) - I made more transparent tilesprites and loaded them into the background then set their speed to be slower than the stars in the back
//
// 15-Point Tier
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15) - because I changed the arguments of spaceship to accept a movement speed, I just made and instance of spaceship with double speed and worth more points
// Implement an alternating two-player mode (15) - I made a boolean that switches on and off every time a rocket is fired and made a second score text box to display player two's score, then at the end of the play sequence I sdisplay the winner or if their is a tie
// Implement mouse control for player movement and mouse click to fire (15) - I made the spacec ship move right if the mouse is to the right of it, and left if the mouse is to the left of it, if you click it fires
//
//credits: I just used Phaser API and The proffesors examples

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT, keyP, keyM, keyN;

let highScore = 0;