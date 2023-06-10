class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.image = new Image();
    this.image.src = "images/background1.png";
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
}
