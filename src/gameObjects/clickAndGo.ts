import {
  Actor,
  Color,
  Engine,
  PointerButton,
  PointerType,
  Vector,
  vec,
} from "excalibur";

class ClickAndGo extends Actor {
  private speed: number = 1;
  private shouldMove: boolean = false;
  private destination: Vector | undefined;
  private movement: Vector = vec(0, 0);

  public onInitialize(engine: Engine): void {
    engine.input.pointers.primary.on("down", (event) => {
      if (
        event.pointerType === PointerType.Mouse &&
        event.button === PointerButton.Left
      ) {
        this.shouldMove = true;
        this.destination = event.screenPos;
      }
    });
  }

  public update(_engine: Engine, delta: number): void {
    if (this.shouldMove && this.destination) {
      if (this.destination.distance(this.pos) > 10) {
        if (this.destination.x > this.pos.x) {
          this.movement.x = 1;
        } else {
          this.movement.x = -1;
        }

        if (this.destination.y > this.pos.y) {
          this.movement.y = 1;
        } else {
          this.movement.y = -1;
        }

        this.movement = this.movement.normalize();

        if (Math.abs(this.destination.y - this.pos.y) <= this.speed * delta) {
          this.pos.y = this.destination.y;
          this.movement.y = 0;
        } else {
          this.pos.y += this.movement.y * this.speed * delta;
        }

        if (Math.abs(this.destination.x - this.pos.x) <= this.speed * delta) {
          this.pos.x = this.destination.x;
          this.movement.x = 0;
        } else {
          this.pos.x += this.movement.x * this.speed * delta;
        }
      } else {
        this.shouldMove = false;
      }
    }
  }
}

export const clickAndGoCharacter: ClickAndGo = new ClickAndGo({
  radius: 32,
  color: Color.Black,
  pos: vec(640, 360),
});
