class Healthbar {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.player = player;
  }

  draw() {
    if (this.player.health >= 15) {
      this.ctx.fillStyle = "green";
    } else if (this.player.health >= 10) {
      this.ctx.fillStyle = "orange";
    } else {
      this.ctx.fillStyle = "red";
    }

    if (this.player.isReady && this.player.strength < 7) {
      this.ctx.fillRect(70, 20, this.player.health * 20, 17);
      this.ctx.strokeRect(70, 20, 20 * 20, 17);
      this.ctx.font = "15px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`${this.player.health} / 20`, 250, 34);
    } else if (
      this.player.isReady &&
      this.player.strength >= 7 &&
      this.player.strength < 9
    ) {
      this.ctx.fillRect(70, 20, this.player.health * 22, 17);
      this.ctx.strokeRect(70, 20, 20 * 22, 17);
      this.ctx.font = "15px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`${this.player.health} / 22`, 260, 34);
    } else {
      this.ctx.fillRect(70, 20, this.player.health * 25, 17);
      this.ctx.strokeRect(70, 20, 20 * 25, 17);
      this.ctx.font = "15px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`${this.player.health} / 25`, 275, 34);
    }
  }
}

// class EnemyHealthbar {
//   constructor(ctx, enemies) {
//     this.ctx = ctx;
//     this.enemies = enemies;
//     this.x = 1100;
//     this.y = 390;
//     this.speed = this.enemies.speed;
//   }

//   // draw() {
//   //   this.ctx.fillStyle = "green";
//   //   this.ctx.fillRect(this.x, this.y, (this.enemy.health * 20) / 5, 7);
//   //   this.ctx.strokeRect(this.x, this.y, (20 * 20) / 5, 7);
//   // }

//   move() {
//     this.x -= this.speed;
//   }
// }

class ArrowDefense {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 180;
    this.y = 400;
    this.width = 60;
    this.height = 20;
    this.speed = 8;
    this.strength = 10;
    this.shooting = false;
    (this.isHitting = false), (this.image = new Image());
    this.image.src = "images/arrow1.png";
    this.isReady = false;
    this.image.onload = () => {
      this.isReady = true;
    };
  }

  draw() {
    if (this.shooting) {
      if (this.isReady && this.shooting && this.strength < 7) {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.speed = 9;
      } else if (
        this.isReady &&
        this.shooting &&
        this.strength >= 7 &&
        this.strength < 9
      ) {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.speed = 11;
      } else {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.speed = 14;
      }
    }
  }

  move() {
    if (this.shooting) {
      this.x += this.speed;

      if (this.x >= 1400) {
        this.x = 200;
      }
    }
  }

  startShooting(enemies) {
    if (enemies.some((enemy) => enemy.x <= 1150)) {
      this.shooting = true;
    } else {
      this.shooting = false;
    }
  }

  attack() {
    return this.strength;
  }

  collide(enemy) {
    const collideX = enemy.x <= this.x + this.width - 80;
    const collideY = enemy.y <= this.y && enemy.y + enemy.height >= this.y;
    return collideX && collideY;
  }
}
