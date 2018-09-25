// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog, Menu, ipcMain} = require('electron')

const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

// Hook up to database
// let dbFile = path.join(app.getAppPath(), 'EmployeeDB.db')
const db = new sqlite3.Database("./Employee.db")

ipcMain.on('employee-get', (event, arg) => {
  let allEmployees = []
  db.serialize(function(){
    db.all('SELECT * FROM Employees', (err, rows)=>{
      // processes each employee and puts it into an array to be inserted into the front page
      rows.forEach((e)=>{
          let employee = []
          // solution from https://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
          let obj = e //assigns object in array
          for (var key in obj){ // key = object attribute name & obj = the object itself
              var attrName = key // the arributes name is the key
              var attrValue = obj[key] // how to retireve the obj value
              employee.push(obj[key])
          }
          allEmployees.push(employee)
      })
      event.sender.send('employee-reply', allEmployees)
    })
  })
})


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 800})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
