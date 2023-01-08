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
  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

function getSpeeds() {
  speedTest.visual({ maxTime: 5000 }, function (data) {
    document.getElementById("download-speed").innerHTML = data.speeds.download;
    document.getElementById("upload-speed").innerHTML = data.speeds.upload;
  });
}

setInterval(getSpeeds, 10000);
