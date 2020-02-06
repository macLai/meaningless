var React = require('react');
var explorerData = require('../model/explorerdata');

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverState:"none"
        };
        this.handleClick = this.handleClick.bind(this);
        this.setHovering = this.setHovering.bind(this);
        this.closeTab = this.closeTab.bind(this);
    }

    handleClick() {
        explorerData.selectKey(this.props.value);
    }

    closeTab() {
        explorerData.deleteKey(this.props.value);
    }

    setHovering(hovering) {
        this.setState({
            hoverState:hovering
        });
    }

    render() {
        return (
                <div className ={this.props.isSelected ? "tabs selected":"tabs"}  style={{minWidth: this.props.name.length * 4 + 115, maxWidth: this.props.name.length * 5 + 100}} onMouseEnter ={()=>this.setHovering("block")} onMouseLeave={()=>this.setHovering("none")}>
                    <p onClick={this.handleClick}>
                        {this.props.name}
                    </p>
                    <button className ="close_tab" onClick={this.closeTab} style={this.props.isSelected ? {display: "block"} : {display:this.state.hoverState}}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <g id="close" transform="translate(-4.786 -4.868)">
                                <path id="Trazado_1" data-name="Trazado 1" d="M.7,1.5l12.336-.081a.467.467,0,0,1,.472.472.482.482,0,0,1-.478.478L.69,2.452a.467.467,0,0,1-.472-.472A.482.482,0,0,1,.7,1.5Z" transform="translate(16.917 7.296) rotate(135)" stroke-linecap="square" stroke-width="1.2"/>
                                <path id="Trazado_2" data-name="Trazado 2" d="M.428-.043,12.764.038a.482.482,0,0,1,.478.478.467.467,0,0,1-.472.472L.434.906A.482.482,0,0,1-.043.428.467.467,0,0,1,.428-.043Z" transform="translate(15.029 15.778) rotate(-135)" stroke-linecap="square" stroke-width="1.2"/>
                            </g>
                        </svg>
                    </button>
                </div>
        );
    }
}

class TabList extends React.Component{
    componentDidMount() {
        this.onListDataUpdate();
        this.onActiveItemUpdate();
        explorerData.traversalTree(explorerData.dataTree);
        explorerData.eventEmitter.on(explorerData.EVENT_NAME.DATASTATUS_UPDATE, this.onActiveItemUpdate);
        explorerData.eventEmitter.on(explorerData.EVENT_NAME.DATASTATUS_UPDATE, this.onListDataUpdate);
    }

    componentWillUnmount() {
        explorerData.eventEmitter.removeListener(explorerData.EVENT_NAME.DATASTATUS_UPDATE, this.onActiveItemUpdate);
        explorerData.eventEmitter.removeListener(explorerData.EVENT_NAME.DATASTATUS_UPDATE, this.onListDataUpdate);
    }

    onListDataUpdate() {
        this.setState({data: explorerData.selectedKey});
    }

    onActiveItemUpdate() {
        this.setState({selectedID: explorerData.activeKey});
    }

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            selectedID:""
        };
        this.onListDataUpdate = this.onListDataUpdate.bind(this);
        this.onActiveItemUpdate = this.onActiveItemUpdate.bind(this);
    }

    render() {
        let data = this.state.data;
        return (
            <div id= "g_taplist">
                {
                    Object.keys(data).map((key)=> {
                        if (typeof(data[key]) === "string") {
                            let name = explorerData.getNameByKey(data[key]);
                            if(data[key] === this.state.selectedID) {
                                return <Tab isSelected={true} name={name} value={data[key]} />
                            }
                            else {
                                return <Tab isSelected={false} name={name} value={data[key]} />;
                            }
                            
                        }
                    })
                }
            </div>
        );
    }
    
}

module.exports = TabList
