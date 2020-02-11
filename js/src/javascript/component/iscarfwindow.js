var React = require('react');
var iScarfData = require('../model/iscarfdata');
var TestArea = require('../component/testSetting')
class IScarfWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        iScarfData.setTarget(this.refs.iscarf);
    }

    componentWillUnmount() {
        iScarfData.setTarget(undefined);
    }

    render() {
        return (
            <div className="g_editors_editors" >
                <TestArea />
                <embed type="application/x-iscarf" width="100%" height="100%" ref="iscarf" />
            </div>
        );
    }
}

module.exports = IScarfWindow;