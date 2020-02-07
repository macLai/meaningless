var React = require('react');
var IScarfWindow = require('./iscarfwindow');
var StatusBar = require('./statusbar');

class Editor extends React.Component {
    render() {
        return (
            <div className="g_editors" >
                <div className="g_tabs_bar flex smallScrollBar"></div>  
                <IScarfWindow />
                <StatusBar />
            </div>
        );
    }
}

module.exports = Editor;