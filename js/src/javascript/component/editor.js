var React = require('react');
var IScarfWindow = require('./iscarfwindow');
var TabList = require('./component/tab');
var StatusBar = require('./statusbar');

class Editor extends React.Component {
    render() {
        return (
            <div className="g_editors" >              
                <TabList />
                <IScarfWindow />
                <StatusBar />
            </div>
        );
    }
}

module.exports = Editor;