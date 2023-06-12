class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.background = new Background(ctx);
    this.player = new Player(ctx, 30, 150);
    //this.enemy = new Enemy(ctx, this.player, this);
    this.enemies = [];
    this.healthbar = new Healthbar(this.ctx, this.player);
    this.arrowDefense = new ArrowDefense(ctx, this.enemy, this);
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

      if (this.counter % 100 === 0) {
        this.addEnemy();
      }
    }, 1000 / 60);
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.healthbar.draw();
    this.arrowDefense.draw();
    //this.arrowDefense.clearArrows();
  }

  move() {
    // this.enemies.forEach((enemy) => {
    //   enemy.move();
    //  });
    // this.arrowDefense.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.enemies = this.enemies.filter((newEnemy) => newEnemy.health <= 20);
  }

  addEnemy() {
    const newEnemy = new Enemy(this.ctx, this, 1100, 330);
    this.enemies.push(newEnemy);
  }

  checkCollisions() {
    const enemyArrowColliding = this.enemies.find((enemy) => {
      return this.arrowDefense.collide(enemy);
    });
    if (enemyArrowColliding && !this.arrowDefense.isHitting) {
      console.log("ARROW HITTING");
      console.log(`Enemy health is: ${this.enemies.health}`)
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
