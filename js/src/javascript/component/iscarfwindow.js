var React = require('react');
var iScarfData = require('../model/iscarfdata');

class IScarfWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        iScarfData.setTarget(this.refs.iscarf);
    }

    render() {
        return (
            <div className="g_editors_editors" >
                <embed type="application/x-iscarf" width="100%" height="100%" ref="iscarf" />
            </div>
        );
    }
}

module.exports = IScarfWindow;