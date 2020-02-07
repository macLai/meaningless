const remote = require('electron');

class MenuData {
    constructor() {
        this.menuTree = {
            "File" : {
                "NewFile" : "", 
                "Save" : {
                    "SaveAll" : ""
                }
            },
            "Edit" : {
                "Editor" : "",
                "Window" : "",
                "DeveloperTool" : ""
            }
        };

        this.menuFunction = {
            "DeveloperTool" : ()=> {
                require('electron').BrowserWindow.getFocusedWindow().webContents.toggleDevTools()
            }
        }

        this.menuAccelerator = {
            "DeveloperTool" : "CmdOrCtrl+Alt+i"
        }
    }

    getMenu(labelName, data) {
        var obj ={
            label: labelName,
        }
        if (this.menuFunction[labelName]) {
            obj.click = this.menuFunction[labelName];
        }
        if (this.menuAccelerator[labelName]) {
            obj.accelerator = this.menuAccelerator[labelName];
        }
        if (!data) {
            return obj;
        }
        let sub = [];
        Object.keys(data).map((key)=>{
            sub.push(this.getMenu(key, data[key]));
        })
        obj.submenu = sub;
        return obj;
    }
    
    getMenuTemplate()
    {
        let sambled = [{label: 'defaultLabelForMac'}];
        Object.keys(this.menuTree).map((key)=>{
            sambled.push(this.getMenu(key, this.menuTree[key]));
        })
        return sambled;
    }
}



var menuData = new MenuData();

module.exports = menuData;