window.$ = window.jQuery = require('jquery')

const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

// Hook up to database
//let dbFile = path.join(app.getAppPath(), 'EmployeeDB.db')
const db = new sqlite3.Database("Employee.db")

console.log(document)

let employee1 = []

$(document).ready(()=>{
    console.log('hello')
    loadPage()
    function loadPage(){
        db.all('SELECT * FROM Employees', (err, rows)=>{
            console.log(rows)

            // solution from https://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
            let obj = rows[0] //assigns object in array
            for (var key in obj){ // key = object attribute name & obj = the object itself
                var attrName = key // the arributes name is the key
                var attrValue = obj[key] // how to retireve the obj value
                employee1.push(obj[key])
            }
            document.getElementById('employees').innerHTML = employee1
        })
    }
})
