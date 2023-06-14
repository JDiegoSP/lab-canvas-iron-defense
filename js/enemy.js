class Enemy {
  constructor(ctx, game, x, y, health) {
    this.ctx = ctx;
    this.game = game;
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = 300;
    this.height = 200;
    this.xFrame = 0;
    this.yFrame = 0;
    this.xFramesCount = 10;
    this.yFramesCount = 1;
    this.speed = 1;
    this.strength = 1;
    this.isHitting = false;

    this.image = new Image();
    this.image.src = "images/ork1.png";
    this.isReady = false;
    this.image.onload = () => {
      this.isReady = true;
    };
  }

  draw() {
    if (this.isReady) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.x + 100, this.y + 60, (this.health * 20) / 5, 7);
      this.ctx.strokeRect(this.x + 100, this.y + 60, (20 * 20) / 5, 7);
      this.ctx.drawImage(
        this.image,
        (this.xFrame * this.image.width) / this.xFramesCount,
        (this.yFrame * this.image.height) / this.yFramesCount,
        this.image.width / this.xFramesCount,
        this.image.height / this.yFramesCount,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  move() {
    if (this.game.counter % 10 === 0) {
      this.xFrame++;
      if (this.xFrame >= this.xFramesCount) {
        this.xFrame = 0;
      }
    }

    this.x -= this.speed;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.game.score ++;
      this.game.enemyDead();
    }
  }

  collide(player) {
    const collideX = player.x + player.width - 160 >= this.x;
    const collideY = player.y <= this.y && player.y + player.height >= this.y;
    return collideX && collideY;
  }
}
