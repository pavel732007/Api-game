import "./style/main.css";
import { Logic } from "./logic.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Game</h1>
  <div id="grid"></div>
  <div id="modalWindows">
    
  </div>
`;

new Logic();
