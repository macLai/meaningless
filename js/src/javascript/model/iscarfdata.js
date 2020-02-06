class IScarfData {
    constructor() {
        this.handleMessage = this.handleMessage.bind(this);
    }

    setTarget(window) {
        this.window = window;
        this.window.addEventListener("message", this.handleMessage, true);
    }

    sendMessage(data) {
        this.window.postMessage(data);
    }

    handleMessage(data) {
        console.log(data);
    }
}

var iScarfData = new IScarfData();

module.exports = iScarfData;
