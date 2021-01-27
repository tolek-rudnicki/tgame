// Imports
import { app, BrowserWindow } from "electron"

import { Farm } from "./buildings/Farm"
import { Warehouse } from "./buildings/Warehouse";
import { GameMap } from "./map/GameMap"


// Window for app
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true
        }
    })

    win.loadFile('dist/index.html')
    
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Starting the game (console)
const map = new GameMap('PLAINS', 10, 0, 5);
const farm = new Farm();
const warehouse = new Warehouse();
warehouse.setProduct('FOOD');
map.build(3, 3, farm);
map.build(5, 4, warehouse);
map.build(1, 1, warehouse);
farm.connectTo(warehouse);

// Map Render
console.log(map.render());
console.log(farm);
console.log(warehouse);

let i = 10;
while (i--) map.tick();

