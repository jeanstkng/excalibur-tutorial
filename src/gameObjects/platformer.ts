import { Actor, Color, Engine, Keys, Vector, vec } from "excalibur";

class Platformer extends Actor {
  private speed = 1;
  private movement: Vector = vec(0, 0);
  private isOnGround: boolean = false;
  private ground?: Actor;

  public onInitialize(engine: Engine): void {
    this.ground = new Actor({
      pos: vec(640, 600),
      width: 1280,
      height: 32,
      color: Color.Red,
    });

    engine.add(this.ground);
  }

  public update(engine: Engine, delta: number): void {
    if (!this.isOnGround) {
      this.movement.y += 0.01 * delta;
    }

    if (this.ground && this.pos.y > this.ground.pos.y - this.height) {
      this.movement.y = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }

    if (engine.input.keyboard.wasReleased(Keys.W) && this.isOnGround) {
      this.movement.y = -2;
      this.isOnGround = false;
    }

    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.movement.x = -1;
    } else if (engine.input.keyboard.isHeld(Keys.D)) {
      this.movement.x = 1;
    } else {
      this.movement.x = 0;
    }

    this.pos.x += this.movement.x * this.speed * delta;
    this.pos.y += this.movement.y * this.speed * delta;
  }
}

const platformerCharacter: Platformer = new Platformer({
  width: 32,
  height: 64,
  color: Color.Black,
  pos: vec(640, 300),
});

export { platformerCharacter };
