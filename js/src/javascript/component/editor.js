var React = require('react');
var IScarfWindow = require('./iscarfwindow');
var TabList = require('../component/tab');

class Editor extends React.Component {
    render() {
        return (
            <div className="g_editors" >
                <div className="g_tabs_bar flex smallScrollBar">
                    <TabList />
                </div>
                <IScarfWindow />
                <div className="g_status_bar" >
                    <p></p>
                </div>
            </div>
        );
    }
}

module.exports = Editor;