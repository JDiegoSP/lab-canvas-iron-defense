class Enemy {
  constructor(ctx, game, x, y, health, width, height, speed, imagesrc) {
    this.ctx = ctx;
    this.game = game;
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = width;
    this.height = height;
    // this.width = 300;
    // this.height = 200;
    this.xFrame = 0;
    this.yFrame = 0;
    this.xFramesCount = 10;
    this.yFramesCount = 1;
    this.speed = speed;
    this.strength = 1;
    this.isHitting = false;

    this.image = new Image();
    this.image.src = imagesrc;
    this.isReady = false;
    this.image.onload = () => {
      this.isReady = true;
    };

    this.arrowSound = new Audio();
    this.arrowSound.src = "audio/arrow_impact.mp3";
    this.arrowSound.volume = 0.2;
  }

  draw() {
    if (this.isReady) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.x + 100, this.y + 70, (this.health * 20) / 5, 7);
      this.ctx.strokeRect(this.x + 100, this.y + 70, (this.health * 20) / 5, 7);
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
    this.arrowSound.play();
    this.health -= damage;
    if (this.health <= 0) {
      this.game.score++;
      this.game.enemyDead();
    }
  }

  collide(player) {
    const collideX = player.x + player.width - 105 >= this.x;
    const collideY = player.y <= this.y && player.y + player.height >= this.y;
    return collideX && collideY;
  }
}
