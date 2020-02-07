var React = require('react');
var iScarfData = require('../model/iscarfdata');

class StatusBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        };

        this.onMessageSended = this.onMessageSended.bind(this);
        this.onScreenUpdated = this.onScreenUpdated.bind(this);
    }

    componentDidMount() {
        iScarfData.eventEmitter.on(iScarfData.EVENT_NAME.MESSAGE_SENDED, this.onMessageSended);
        iScarfData.eventEmitter.on(iScarfData.EVENT_NAME.SCREEN_UPDATED, this.onScreenUpdated);
    }

    componentWillUnmount() {
        iScarfData.eventEmitter.removeListener(iScarfData.EVENT_NAME.MESSAGE_SENDED, this.onMessageSended);
        iScarfData.eventEmitter.removeListener(iScarfData.EVENT_NAME.SCREEN_UPDATED, this.onScreenUpdated);
    }

    onMessageSended() {
        this.setState({
            show: true
        });
    }

    onScreenUpdated() {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <div className="g_status_bar" >
                {this.state.show && (<p>loading</p>)}
            </div>
        );
    }
}

module.exports = StatusBar;