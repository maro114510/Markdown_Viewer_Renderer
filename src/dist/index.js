'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { app, BrowserWindow } = require('electron');
app.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('App is ready');
    yield createWindow();
}));
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => __awaiter(void 0, void 0, void 0, function* () {
    if (BrowserWindow.getAllWindows().length === 0) {
        console.log('App is activated');
        yield createWindow();
    }
}));
function createWindow() {
    return __awaiter(this, void 0, void 0, function* () {
        const WIDTH = 1300;
        const HEIGHT = 800;
        let mainWindow = new BrowserWindow({
            width: WIDTH,
            height: HEIGHT,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: true,
                devTools: true,
                javascript: true,
            }
        });
        mainWindow.loadURL('file://' + __dirname + '/html/index.html');
    });
}
//# sourceMappingURL=index.js.map