var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

var winnerText;


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.stage.backgroundColor = "#736F6E";
	game.load.image("tux","res/tux.png");
	game.load.image("brick","res/brick.png");
	game.load.image('star', 'res/star.png');
	game.load.image('sky','res/sky.png');
	game.load.image('ground','res/ground.png');
	game.load.image('sun','res/sun.png');
	game.load.spritesheet('dude', 'res/dude.png', 32, 48);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sky');
	sunImage = game.add.sprite(10,10,'sun');

	sunImage.scale.setTo(0.1,0.1);
	players = game.add.group();
	platforms = game.add.group();
	platforms.enableBody = true;
	var ground = platforms.create(-10, game.world.height - 75, 'ground');
	ground.scale.setTo(3, 1);
	
	//  This stops it from falling away when you jump on it
	ground.body.immovable = true;
	
	//  Now let's create two ledges
	var ledge = platforms.create(500, 350, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-20, 250, 'ground');
	ledge.body.immovable = true;

	// The player and its settings
	player = game.add.sprite(32, game.world.height - 150, 'dude');

	//  We need to enable physics on the player
	game.physics.arcade.enable(player);

	//  Player physics properties. Give the little guy a slight bounce.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	cursors = game.input.keyboard.createCursorKeys();

	stars = game.add.group();
	stars.enableBody = true;

	
	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 12; i++)
	{
        	//  Create a star inside of the 'stars' group
        	var star = stars.create(i * 70, 0, 'star');

        	//  Let gravity do its thing
        	star.body.gravity.y = 6;

       		 //  This just gives each star a slightly random bounce value
        	star.body.bounce.y = 0.7 + Math.random() * 0.2;
    	}
	scoreText = game.add.text(516, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	cursors = game.input.keyboard.createCursorKeys();

	winnerText = game.add.text(66, 186, 'USE YOUR CURSOR KEYS TO PLAY', { fontSize: '32px', fill: '#000' });

}

function collectStar (player, star) {

	// Removes the star from the screen
	star.kill();
	//  Add and update the score
	score += 10;
	scoreText.text = 'Score: ' + score;
	if ( score == 120 ) {
		winnerText.text = "AWESOME YOU WIN !!!";
	}
}


function update() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);

	  //  Reset the players velocity (movement)
	player.body.velocity.x = 0;

	if (cursors.left.isDown){
        	//  Move to the left
        	player.body.velocity.x = -150;
        	player.animations.play('left');
	} else if (cursors.right.isDown) {
        	//  Move to the right
        	player.body.velocity.x = 150;
        	player.animations.play('right');
    	} else {
        	//  Stand still
        	player.animations.stop();
		player.frame = 4;
	}

	//  Allow the player to jump if they are touching the ground.
	if (cursors.up.isDown && player.body.touching.down)
	{
        	player.body.velocity.y = -350;
		if ( score !=120 ) {
			winnerText.text = "";
		}
	}	
}

function createPlayer(x,y){
	var player = players.create(x,y,"tux");

}

function playerUpdate(){
}

function createPlatform(){
}
