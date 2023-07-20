// Desc: Main process of the app
//@ts-check
'use strict';

// Modules
const { app, BrowserWindow } = require('electron');

app.on( 'ready', async () => {
	console.log( 'App is ready' );

	await createWindow();
});

app.on( 'window-all-closed', () => {
	// in macOS, keep app running until user quits explicitly
	if( process.platform !== 'darwin' )
	{
		app.quit();
	}
})

app.on( 'activate', async () => {
	// in macOS, re-create window when dock icon is clicked and there are no other windows
	if( BrowserWindow.getAllWindows().length === 0 )
	{
		console.log( 'App is activated' );
		await createWindow();
	}
});

async function createWindow()
{
	const WIDTH = 1300;
	const HEIGHT = 800;

	let mainWindow: any = new BrowserWindow({
		width: WIDTH,
		height: HEIGHT,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false,
			sandbox: false,
			devTools: true,
			javascript: true,
		}
	});

	mainWindow.loadURL(
		'file://' + __dirname + '/html/index.html'
	);
}