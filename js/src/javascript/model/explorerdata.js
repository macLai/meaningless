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
        this.keyNameTree = {};
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
            this.eventEmitter.emit(this.EVENT_NAME.DATASTATUS_UPDATE);
        }
    }

    deleteKey(key) {
        var index = this.selectedKey.indexOf(key);
        this.selectedKey.splice(index,1);
        var nextKey = this.activeKey;
        
        if(key === this.activeKey){
            nextKey = this.selectedKey[index - 1];
        }
        if( index === 0 && key === this.activeKey) {
            nextKey = this.selectedKey[index];
        }
        //关闭非activedKey 也需要重新刷新Tab列表 
        //或则调用selectKey(nextKey),将判断里面的 this.eventEmitter.emit(this.EVENT_NAME.DATASTATUS_UPDATE)放在外面
        if (this.activeKey != nextKey) {
            this.activeKey = nextKey;
        }
        this.eventEmitter.emit(this.EVENT_NAME.DATASTATUS_UPDATE); 
    }

    setDataTree(tree) {
        this.dataTree = tree;
        this.traversalTree(this.dataTree);
        this.eventEmitter.emit(this.EVENT_NAME.DATATREE_UPDATE);
    }

    getNameByKey(keys) {
        return this.keyNameTree[keys];
    }

    traversalTree(dataTree) {
        if(Object.keys(dataTree).length) {
            Object.keys(dataTree).map((key)=> {
                if (typeof(dataTree[key]) === "string") {
                    if(this.keyNameTree !== null) {
                        if(!this.keyNameTree.hasOwnProperty(key)){
                            //this.keyNameTree.push({key:dataTree[key]});
                            this.keyNameTree[key] = dataTree[key];
                        }
                    }
                }
                else if (typeof(dataTree[key]) === "object") {
                    this.traversalTree(dataTree[key]);
                }
            })        
        }
    }
}

var explorerData = new ExplorerData();

module.exports = explorerData;