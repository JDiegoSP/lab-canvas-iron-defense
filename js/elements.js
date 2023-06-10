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
    this.ctx.fillRect(70, 30, this.player.health * 20, 17);
    this.ctx.strokeRect(70, 30, 20 * 20, 17);

    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`20 / ${this.player.health}`, 250, 44);
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
  constructor(ctx, enemy) {
    this.ctx = ctx;
    this.enemy = enemy;
    //this.arrows = [];
    this.x = 200;
    this.y = 400;
    this.width = 60;
    this.height = 60;
    this.speed = 8;
    this.strength = 4;
    (this.isHitting = false), (this.image = new Image());
    this.image.src = "images/arrow1.png";
    this.isReady = false;
    this.image.onload = () => {
      this.isReady = true;
    };
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    this.x += this.speed;

    if (this.x >= 1400) {
      this.x = 200;
    }
  }

  attack() {
    return this.strength;
  }

  collide(enemy) {
    const collideX = enemy.x <= this.x + this.width - 125;
    const collideY = enemy.y <= this.y && enemy.y + enemy.height >= this.y;
    return collideX && collideY;
  }
}
