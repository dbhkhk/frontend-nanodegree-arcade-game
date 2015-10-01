// Enemies our player must avoid

var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set Enemy initial location
    this.x = -1000 + Math.floor(Math.random() * 900);
    this.y = 60 + row * 83;

    // Set Enemy initial speed (100-500)
    this.speed = Math.random() * 400 + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -1000 + Math.floor(Math.random() * 900);
    }

    // Check collision with player
    if (this.y === player.y && this.x > player.x - 75 && this.x < player.x + 75) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // Set player initial location
    this.reset();

    // Set player initial score
    this.score = 0;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};



// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '28pt cursive';
    ctx.clearRect(0, 0, 505, 40);
    ctx.fillText('Score: ' + this.score, 0, 40);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x != 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y != 60) {
                this.y -= 83;
            } else {
                this.score += 10;
                this.reset();
            }
            break;
        case 'right':
            if (this.x != 404) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y != 392) {
                this.y += 83;
            }
            break;
    };
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 392;
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
function addEnemy() {
    var enemiesInOneRow = 2;
    for (var i = 0; i < enemiesInOneRow; i++) {
        for (var j = 0; j < 3; j++) {
            allEnemies.push(new Enemy(j));
        }
    }
}
addEnemy();
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
