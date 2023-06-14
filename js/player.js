class Player {
  constructor(ctx, x, y, gold, arrowDefense) {
    this.ctx = ctx;
    this.arrowDefense = arrowDefense;
    this.x = x;
    this.y = y;
    
    this.image = new Image();
    this.image.src = "images/tower_1.png";
    this.width = 320;
    this.height = 450;
    this.health = 20;

    this.gold = gold;
    this.strength = 5;

    this.isReady = false;

    this.image.onload = () => {
      this.isReady = true;
    };
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.drawGold();
    this.drawTowerAttack();
    if (this.gold >= 100) {
      this.drawUpgradeButton();
    }
  }

  receiveDamage(damage) {
    this.health -= damage;
  }

  drawTowerAttack() {
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Tower Attack: ${this.strength}`, 700, 50);
  }

  drawGold() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(`Gold: ${this.gold}`, 1100, 50);
  }

  drawUpgradeButton() {
    this.ctx.fillStyle = "BROWN";
    this.ctx.fillRect(70, 58, 210, 30);
    this.ctx.strokeRect(70, 58, 210, 30);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "WHITE";
    this.ctx.fillText("UPGRADE TOWER", 85, 80);
  }

  getInput(event) {
    if (!event.repeat) {
      switch (event.key) {
        case 'U':
        case 'u':
          this.upgrade();
          break;
      }
    }
  }

  upgrade() {
    if (this.gold >= 100) {
      this.gold -= 50;
      this.strength += 2;
      this.arrowDefense.strength = this.strength;
    }
  }
}
