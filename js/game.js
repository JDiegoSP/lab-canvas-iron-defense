class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.background = new Background(ctx);
    this.arrowDefense = new ArrowDefense(ctx);
    this.player = new Player(ctx, 30, 150, 90, this.arrowDefense);
    this.enemies = [];
    this.healthbar = new Healthbar(this.ctx, this.player);
    this.intervalId = null;

    this.counter = 0;

    // this.music = new Audio();
    // this.music.src = 'audio/background_music.mp3';
    // this.music.loop = true;
    // this.music.volume = 0.3;
    // this.music.play();
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.move();
      this.draw();
      this.checkCollisions();
      this.counter++;

      if (this.counter % 150 === 0) {
        this.addEnemy();
      }
    }, 1000 / 60);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((enemy) => enemy.health > 0);
  }

  move() {
    // this.enemies.forEach((enemy) => {
    //   enemy.move();
    //  });
    // this.arrowDefense.move();
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

  addEnemy() {
    const newEnemy = new Enemy(this.ctx, this, 1320, 330);
    this.enemies.push(newEnemy);
  }

  checkCollisions() {
    const enemyArrowColliding = this.enemies.find((enemy) => {
      return this.arrowDefense.collide(enemy);
    });
    if (enemyArrowColliding && !this.arrowDefense.isHitting) {
      enemyArrowColliding.receiveDamage(this.arrowDefense.strength);
      this.arrowDefense.isHitting = true;
      this.arrowDefense.x = 200;
      setTimeout(() => {
        this.arrowDefense.isHitting = false;
      }, 500);
    }

    this.enemies.forEach((enemy) => {
      if (enemy.collide(this.player) && !enemy.isHitting) {
        console.log("ENEMY HITTING");
        this.player.receiveDamage(enemy.strength);
        enemy.isHitting = true;
        enemy.speed = 0;
        setTimeout(() => {
          enemy.isHitting = false;
        }, 1000);
        if (this.player.health <= 0) {
          this.gameOver();
        }
      }
    });
  }

  gameOver() {
    clearInterval(this.intervalId);
    setTimeout(() => {
      this.clear();
      this.ctx.font = "42px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(
        "Game Over",
        this.ctx.canvas.width / 2 - 100,
        this.ctx.canvas.height / 2,
        200
      );
    }, 0);
  }
}
