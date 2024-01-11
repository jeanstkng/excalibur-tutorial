import { Actor, Color, Engine, Keys, Vector, vec } from "excalibur";

class TopDown extends Actor {
  private speed = 1;
  private movement: Vector = vec(0, 0);

  private speedUpDuration: number = 100;
  private speedUpCounter: number = 0;
  private shouldResetSpeed: boolean = true;

  public update(engine: Engine, delta: number): void {
    if (this.speedUpCounter < this.speedUpDuration) {
      this.shouldResetSpeed = false;
      this.speedUpCounter += delta;
    } else {
      this.speedUpCounter = 0;
      this.shouldResetSpeed = true;
    }

    if (
      engine.input.keyboard.wasPressed(Keys.Space) &&
      !this.shouldResetSpeed
    ) {
      this.speed = 3;
    } else if (this.shouldResetSpeed) {
      this.speed = 1;
    }

    this._handleMovement(engine, delta);
  }

  private _handleMovement(engine: Engine, delta: number): void {
    if (engine.input.keyboard.isHeld(Keys.W)) {
      this.movement.y = -1;
      // this.pos.y -= this.speed * delta;
    } else if (engine.input.keyboard.isHeld(Keys.S)) {
      this.movement.y = 1;
      // this.pos.y += this.speed * delta;
    } else if (engine.input.keyboard.isHeld(Keys.A)) {
      this.movement.x = -1;
      // this.pos.x -= this.speed * delta;
    } else if (engine.input.keyboard.isHeld(Keys.D)) {
      this.movement.x = 1;
      // this.pos.x += this.speed * delta;
    } else {
      this.movement.y = 0;
      this.movement.x = 0;
      return;
    }

    this.movement = this.movement.normalize();

    this.pos.x += this.movement.x * this.speed * delta;
    this.pos.y += this.movement.y * this.speed * delta;
  }
}

export const topDownCharacter: TopDown = new TopDown({
  width: 64,
  height: 64,
  color: Color.Black,
  pos: vec(640, 360),
});
