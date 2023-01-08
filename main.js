const electron = require("electron");
const { app, BrowserWindow } = electron;
const speedTest = require("speedtest-net");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile("main.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

function getSpeeds() {
  speedTest.visual({ maxTime: 5000 }, function (data) {
  });
}

setInterval(getSpeeds, 10000);
