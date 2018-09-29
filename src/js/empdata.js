window.$ = window.jQuery = require('jquery')
const {ipcRenderer} = require('electron')

$(document).ready(()=>{
    $('#nav-bar').load('./nav-bar.html');
    
    console.log('hello')
    
    loadPage()

    function loadPage(){
        ipcRenderer.send('employee-get', 'ping')
    }
})

ipcRenderer.on('employee-reply', (event, arg) => {
    document.getElementById('employees').innerHTML = arg
})