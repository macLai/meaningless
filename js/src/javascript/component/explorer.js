var React = require('react');
var explorerData = require('../model/explorerdata');

class ExplorerFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        explorerData.selectKey(this.props.name);
    }

    render() {
        return (
            <div onClick={this.handleClick} name={this.props.value} mypadding="7" className="directory" style={{marginLeft:7, verticalAlign:'middle'}}>
                <img elementtype="directorie" style={ {float:'left', paddingRight:3, height:22, width:24} } src="src/icons/files/unknown.svg"></img>
                <p elementtype="directorie">{this.props.value}</p>
            </div>
        );
    }
}

class ExplorerFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            open : !this.state.open
        });
    }

    render() {
        let value = this.props.value;
        return (
            <div>
                <div name={this.props.name} style={{paddingLeft:7, verticalAlign:'middle'}}>
                    <div className="directory" onClick={this.handleClick}>
                        <img style={{float:'left', paddingRight:3, height:22, width:24}} src="src/icons/files/folder_closed.svg"></img>
                        <p>{this.props.name}</p>
                    </div>
                    <div mypadding="7">
                        {
                            this.state.open && 
                            Object.keys(value).map(function(key) {
                                if (typeof(value[key]) === "object") {
                                    return <ExplorerFolder name={key} value={value[key]} />;
                                }
                                else {
                                    return <ExplorerFile name={key} value={value[key]} />;
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

class Explorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.onDataTreeUpdate();
        explorerData.eventEmitter.on(explorerData.EVENT_NAME.DATATREE_UPDATE, this.onDataTreeUpdate);
    }

    componentWillUnmount() {
        explorerData.eventEmitter.removeListener(explorerData.EVENT_NAME.DATATREE_UPDATE, this.onDataTreeUpdate);
    }

    onDataTreeUpdate() {
        this.setState({data: explorerData.dataTree});
    }

    render() {
        let data = this.state.data;
        return (
            <div id="g_explorer">
                <div id="g_directories">
                    <div id="g_directory" mypadding="50">
                        <p>iScarf</p>
                        { Object.keys(data).length ?
                            Object.keys(data).map(function(key) {
                                if (typeof(data[key]) === "object") {
                                    return <ExplorerFolder name={key} value={data[key]} />;
                                }
                                else {
                                    return <ExplorerFile name={key} value={data[key]} />;
                                }
                            }) : 
                            (<span id="openFolder" height="24px" width="24px" onClick="openFolder()"></span>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Explorer;