var React = require('react');
var ReactDOM = require('react-dom');
var Explorer = require('../component/explorer');
var Editor = require('../component/editor')

class MainView extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Explorer />
                <div id="g_spacer"></div>
                <Editor />
            </React.Fragment>
        );
    }
}
   
ReactDOM.render(<MainView />, document.getElementById("g_content"));