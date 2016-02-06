
var app = require('app')
var BrowserWindow = require('browser-window')

var mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    'use-content-size': true
  })

  mainWindow.loadURL('file://' + __dirname + '/build/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null;
  })
})
