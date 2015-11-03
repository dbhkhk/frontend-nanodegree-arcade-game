// Enemies our player must avoid
// Parameter: row, in which to put the enemy
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
    this.setSpeed();
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
        this.setSpeed();
    }

    // Check collision with player
    if (this.y === player.y && this.x > player.x - 75 && this.x < player.x + 75) {
        player.score -= 10;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set enemy's speed
Enemy.prototype.setSpeed = function() {
    this.speed = Math.random() * 400 + 100;
}

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

// Handle user's key input
// Parameter: key, the key user release
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
                allGems.forEach(function(gem) {
                    gem.setLoc();
                });
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

// Reset player's position to original spot
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 392;
};

// Gem class
// Parameter: color, 'blue', 'green', or 'orange'
var Gem = function(color) {
    this.setLoc();
    switch (color) {
        case 'blue':
            this.sprite = 'images/gem-blue.png';
            this.score = 5;
            break;
        case 'green':
            this.sprite = 'images/gem-green.png';
            this.score = 10;
            break;
        case 'orange':
            this.sprite = 'images/gem-orange.png';
            this.score = 15;
            break;
    }
};

// Set gem's location
Gem.prototype.setLoc = function() {
    this.x = Math.floor(Math.random() * 5) * 101;
    this.y = 60 + Math.floor(Math.random() * 3) * 83;
};

// Update the gem's position
Gem.prototype.update = function() {
    if (this.x === player.x && this.y === player.y) {
        player.score += this.score;
        this.x = 505;
        this.y = 606;
    }
};

// Draw gems on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.add = function() {
    var enemiesInOneRow = 3;
    for (var i = 0; i < enemiesInOneRow; i++) {
        for (var j = 0; j < 3; j++) {
            allEnemies.push(new Enemy(j));
        }
    }
}
allEnemies.add();

// Place the player object in a variable called player
var player = new Player();

// Place all gem objects in an array called allGems
var allGems = [];
allGems.add = function() {
    allGems.push(new Gem('blue'));
    allGems.push(new Gem('green'));
    allGems.push(new Gem('orange'));
};
allGems.add();


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

var ar=new Array(33,34,35,36,37,38,39,40);

$(document).keydown(function(e) {
     var key = e.which;
      //console.log(key);
      //if(key==35 || key == 36 || key == 37 || key == 39)
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
});