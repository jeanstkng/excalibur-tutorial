import { Actor, Color, Engine } from "excalibur";

class TouchAndGo extends Actor {
  public onInitialize(engine: Engine): void {
    engine.input.pointers.at(0).on("move", (event) => {
      this.pos = event.screenPos;
    });
  }
}

export const touchAndGoCharacter: TouchAndGo = new TouchAndGo({
  width: 64,
  height: 64,
  color: Color.Black,
});
