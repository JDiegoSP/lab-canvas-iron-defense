class Player {
  constructor(ctx, x, y, gold, arrowDefense) {
    this.ctx = ctx;
    this.arrowDefense = arrowDefense;
    this.x = x;
    this.y = y;

    this.image = new Image();
    this.image.src = "images/tower_1.png";
    this.width = 220;
    this.height = 300;
    this.health = 20;
    // this.health2 = 22;
    // this.health3 = 25;

    this.imageA = new Image();
    this.imageA.src = "images/archer.png";
    this.imageA.width = 70;
    this.imageA.height = 90;

    this.image2 = new Image();
    this.image2.src = "images/tower_2.png";
    this.width = 220;
    this.height = 300;
    this.health = 20;

    this.image3 = new Image();
    this.image3.src = "images/tower_3.png";
    this.width = 220;
    this.height = 300;
    this.health = 20;

    this.gold = gold;
    this.strength = 5;

    this.isReady = false;

    this.image.onload = () => {
      this.isReady = true;
    };

    this.upgradeSound = new Audio();
    this.upgradeSound.src = "audio/warcry.mp3";
    this.upgradeSound.volume = 0.35;

    this.receiveDamageSound = new Audio();
    this.receiveDamageSound.src = "audio/enemy_attack.mp3";
    this.receiveDamageSound.volume = 0.3;
  }

  draw() {
    if (this.isReady && this.strength < 7) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.ctx.drawImage(
        this.imageA,
        140,
        380,
        this.imageA.width,
        this.imageA.height
      );
    } else if (this.isReady && this.strength >= 7 && this.strength < 9) {
      this.ctx.drawImage(this.image2, this.x, this.y, this.width, this.height);
      this.ctx.drawImage(
        this.imageA,
        140,
        380,
        this.imageA.width,
        this.imageA.height
      );
    } else {
      this.ctx.drawImage(this.image3, this.x, this.y, this.width, this.height);
      this.ctx.drawImage(
        this.imageA,
        140,
        380,
        this.imageA.width,
        this.imageA.height
      );
    }
    this.drawGold();
    this.drawTowerAttack();
    if (this.gold >= 50) {
      this.drawUpgradeButton();
    }
  }

  receiveDamage(damage) {
    this.receiveDamageSound.play();
    this.health -= damage;
  }

  drawTowerAttack() {
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Tower Attack: ${this.strength}`, 700, 40);
  }

  drawGold() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(`Gold: ${this.gold}`, 1100, 40);
  }

  drawUpgradeButton() {
    this.ctx.fillStyle = "BROWN";
    this.ctx.fillRect(70, 58, 210, 30);
    this.ctx.strokeRect(70, 58, 210, 30);
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "WHITE";
    this.ctx.fillText("UPGRADE TOWER (U)", 80, 80);
  }

  getInput(event) {
    if (!event.repeat) {
      switch (event.key) {
        case "U":
        case "u":
          this.upgrade();
          break;
      }
    }
  }

  upgrade() {
    this.upgradeSound.play();
    if (this.gold >= 50) {
      this.gold -= 50;
      this.strength += 1;
      this.arrowDefense.strength = this.strength;
    }
    if (this.arrowDefense.strength === 7) {
      this.health += 2;
    } else if (this.arrowDefense.strength === 9) {
      this.health += 3;
    }
  }
}
