var events = require('events');

class IScarfData {
    constructor() {
        // event controller
        this.eventEmitter = new events.EventEmitter();
        this.EVENT_NAME = {
            "MESSAGE_SENDED": "MESSAGE_SENDED",
            "SCREEN_UPDATED": "SCREEN_UPDATED"
        }

        this.handleMessage = this.handleMessage.bind(this);
    }

    setTarget(window) {
        this.window = window;
        this.window.addEventListener("message", this.handleMessage, true);
    }

    sendMessage(data) {
        this.window.postMessage(data);
        this.eventEmitter.emit(this.EVENT_NAME.MESSAGE_SENDED);
    }

    handleMessage(event) {
        if (event.data.ScreenUpated != undefined) {
            this.eventEmitter.emit(this.EVENT_NAME.SCREEN_UPDATED);
        }
    }
}

var iScarfData = new IScarfData();

module.exports = iScarfData;
