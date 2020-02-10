var events = require('events');
var iScarfData = require('./iscarfdata');

class ExplorerData {
    constructor() {
        // event controller
        this.eventEmitter = new events.EventEmitter();
        this.EVENT_NAME = {
            "DATAPATH_UPDATE" : "DATAPATH_UPDATE",
            "DATATREE_UPDATE" : "DATATREE_UPDATE",
            "DATASTATUS_UPDATE" : "DATASTATUS_UPDATE",
        }

        // data path
        this.dataPath = "";

        // data tree
        this.dataTree = {
            "folder1" : {
                "uuid1" : "name1",
                "uuid2" : "name2"
            },
            "folder2" : {
                "folder3" : {
                    "uuid3" : "name3"
                }
            },
            "folder4" : {
                "uuid4" : "name4"
            }
        };

        // data status
        this.selectedKey = [];
        this.activeKey = "";
    }

    setDataPath(path) {
        this.dataPath = path;
        eventEmitter.emit(this.EVENT_NAME.DATAPATH_UPDATE);
    }

    selectKey(key) {
        if (this.selectedKey.indexOf(key) < 0) {
            this.selectedKey.push(key);
        }
        if (this.activeKey != key) {
            this.activeKey = key;
            var request = {"RequestView": key};
            iScarfData.sendMessage(request);
        }
        this.eventEmitter.emit(this.EVENT_NAME.DATASTATUS_UPDATE);
    }

    deleteKey(key) {
        var index = this.selectedKey.indexOf(key);
        if (index === -1) {
            return;
        }
        this.selectedKey.splice(index,1);
        
        if (this.selectedKey.length === 0) {
            this.eventEmitter.emit(this.EVENT_NAME.DATASTATUS_UPDATE);
            return;
        }

        if (key === this.activeKey) {
            index = ((index === 0) ? 0 : (index -1));
            this.selectKey(this.selectedKey[index]);
            return;
        }
        else {
            this.eventEmitter.emit(this.EVENT_NAME.DATASTATUS_UPDATE);
        }
    }

    setDataTree(tree) {
        this.dataTree = tree;
        this.eventEmitter.emit(this.EVENT_NAME.DATATREE_UPDATE);
    }

    getNameByKey(key){
        var name = "";
        var getname = function(tree) {
            Object.keys(tree).map((keyName)=> {
                if (name != "") return;
                if (typeof(tree[keyName]) === "object") getname(tree[keyName]);
                else if (keyName === key) name = tree[keyName];
            })
        }
        getname(this.dataTree);
        return name;
    }
}

var explorerData = new ExplorerData();

module.exports = explorerData;