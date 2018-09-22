window.$ = window.jQuery = require('jquery')

const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

// Hook up to database
let dbFile = path.join(app.getAppPath(), 'EmployeeDB.db')
const db = new sqlite3.Database("./Employee.db")

let allEmployees = []

$(document).ready(()=>{
    console.log('hello')
    
    loadPage()

    function loadPage(){
        db.all('SELECT * FROM Employees', (err, rows)=>{
            console.log(rows)

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
            document.getElementById('employees').innerHTML = allEmployees
        })
    }
})
