class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.background = new Background(ctx);
    this.arrowDefense = new ArrowDefense(ctx);
    this.player = new Player(ctx, 60, 222, 65, this.arrowDefense);
    this.enemies = [
      new Enemy(this.ctx, this, 1450, 330, 20, 300, 200, 1, "images/ork_1.png"),
      new Enemy(this.ctx, this, 1850, 330, 20, 300, 200, 1.2, "images/ork_1.png"),
      new Enemy(this.ctx, this, 2350, 330, 20, 300, 200, 0.9, "images/ork_1.png"),
      new Enemy(this.ctx, this, 2850, 330, 20, 300, 200, 1, "images/ork_1.png"),
      new Enemy(this.ctx, this, 3350, 293, 26, 320, 250, 1.5, "images/troll_1.png"),
      new Enemy(this.ctx, this, 3850, 330, 20, 300, 200, 1, "images/ork_1.png"),
      new Enemy(this.ctx, this, 4350, 330, 20, 300, 200, 1.2, "images/ork_1.png"),
      new Enemy(this.ctx, this, 4850, 330, 20, 300, 200, 0.9, "images/ork_1.png"),
      new Enemy(this.ctx, this, 5350, 330, 20, 300, 200, 1, "images/ork_1.png"),
      new Enemy(this.ctx, this, 5850, 293, 20, 320, 250, 1.7, "images/troll_1.png"),

      new Enemy(this.ctx, this, 6850, 330, 20, 300, 200, 1.3, "images/ork_1.png"),
      new Enemy(this.ctx, this, 7350, 330, 20, 300, 200, 1.4, "images/ork_1.png"),
      new Enemy(this.ctx, this, 7850, 330, 20, 300, 200, 1.5, "images/ork_1.png"),
      new Enemy(this.ctx, this, 8350, 330, 20, 300, 200, 1.6, "images/ork_1.png"),
      new Enemy(this.ctx, this, 8850, 293, 26, 320, 250, 2, "images/troll_1.png"),
      new Enemy(this.ctx, this, 9350, 330, 20, 300, 200, 1.3, "images/ork_1.png"),
      new Enemy(this.ctx, this, 9850, 330, 20, 300, 200, 1.5, "images/ork_1.png"),
      new Enemy(this.ctx, this, 10350, 330, 20, 300, 200, 1.3, "images/ork_1.png"),
      new Enemy(this.ctx, this, 10850, 330, 20, 300, 200, 1.4, "images/ork_1.png"),
      new Enemy(this.ctx, this, 11350, 293, 26, 320, 250, 2, "images/troll_1.png"),
    ];
    this.healthbar = new Healthbar(this.ctx, this.player);
    this.intervalId = null;

    this.counter = 0;
    this.score = 0;

    this.music = new Audio();
    this.music.src = "audio/background_music.mp3";
    this.music.loop = true;
    this.music.volume = 0.3;
    this.music.play();

    this.enemyDeadSound = new Audio();
    this.enemyDeadSound.src = "audio/enemy_dead.mp3";
    this.enemyDeadSound.volume = 0.3;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.move();
      this.draw();
      this.youWin();
      this.checkCollisions();
      this.counter++;

      // if (this.counter % 150 === 0 && this.score < 3) {
      //   this.addEnemy();
      // }

      //this.enemyDead();
    }, 1000 / 60);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((enemy) => enemy.health > 0);
  }

  move() {
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.arrowDefense.move();
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.healthbar.draw();
    this.arrowDefense.startShooting(this.enemies);
    this.arrowDefense.draw();
  }

  // addEnemy() {
  //   const newEnemy = new Enemy(this.ctx, this, 1200, 330, 20);
  //   this.enemies.push(newEnemy);
  // }

  enemyDead() {
    this.player.gold += 15;
    this.enemyDeadSound.play();
  }

  checkCollisions() {
    const enemyArrowColliding = this.enemies.find((enemy) => {
      return this.arrowDefense.collide(enemy);
    });
    if (enemyArrowColliding && !this.arrowDefense.isHitting) {
      enemyArrowColliding.receiveDamage(this.arrowDefense.strength);
      this.arrowDefense.isHitting = true;
      this.arrowDefense.x = 180;
      setTimeout(() => {
        this.arrowDefense.isHitting = false;
      }, 500);
    }

    this.enemies.forEach((enemy) => {
      if (enemy.collide(this.player) && !enemy.isHitting) {
        console.log("RECEIVE DAMAGE");
        this.player.receiveDamage(enemy.strength);
        enemy.isHitting = true;
        enemy.speed = 0;
        setTimeout(() => {
          enemy.isHitting = false;
        }, 1000);
        if (this.player.health <= 0) {
          restartBtn.style.display = 'block'
          this.gameOver();
        }
      }
    });
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.ctx.font = "120px pixelFont";
    this.ctx.fillStyle = "#84853d";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2 + 30,
      this.ctx.canvas.height / 2 - 50
    );
    this.music.volume = 0;
  }

  youWin() {
    if (this.enemies.every((enemy) => enemy.health <= 0)) {
      restartBtn.style.display = 'block'
      this.endGame();
      this.player.upgradeSound.play();
    }
  }

  endGame() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.ctx.font = "120px pixelFont";
    this.ctx.fillStyle = "#84853d";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Victory!",
      this.ctx.canvas.width / 2 + 30,
      this.ctx.canvas.height / 2 - 50
    );
    //this.music.volume = 0;
  }
}
