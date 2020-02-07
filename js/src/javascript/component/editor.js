var React = require('react');
var IScarfWindow = require('./iscarfwindow');
var TabList = require('../component/tab');

class Editor extends React.Component {
    render() {
        return (
            <div className="g_editors" >              
                <TabList />
                <IScarfWindow />
                <div className="g_status_bar" >
                    <p></p>
                </div>
            </div>
        );
    }
}

module.exports = Editor;