import { Color, Engine } from "excalibur";
import { topDownCharacter } from "./gameObjects/topDown";
import { clickAndGoCharacter } from "./gameObjects/clickAndGo";
import { touchAndGoCharacter } from "./gameObjects/touchAndGo";
import { platformerCharacter } from "./gameObjects/platformer";

const game = new Engine({
  height: 720,
  width: 1280,
  backgroundColor: Color.Green,
});

game.start();

// game.add(topDownCharacter);
// game.add(platformerCharacter);
// game.add(clickAndGoCharacter);
game.add(touchAndGoCharacter);
