var React = require('react');
var language = require('../model/multilanguages');

class TestArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.loadEnglish = this.loadEnglish.bind(this);
        this.loadChinese = this.loadChinese.bind(this);
        this.loadJpanese = this.loadJpanese.bind(this);
    }

    loadEnglish(){
        language.loadLanguage("english");
    }

    loadChinese(){
        language.loadLanguage("chinese");
    }

    loadJpanese(){
        language.loadLanguage("japanese");
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div id="language_list">
                <div className="language_div" onClick= {this.loadChinese} style={{display: "inline-block"}}>简体中文</div>
                <div className="language_div" onClick= {this.loadEnglish} style={{display: "inline-block"}}>English</div>
                <div className="language_div" onClick= {this.loadJpanese} style={{display: "inline-block"}}>Japanese</div>
                <p className="translate_word" textid = "loading">loading</p>
                <p className="translate_word" textid = "language">language</p>
                <p className="translate_word" textid = "setting">setting</p>
            </div>
        );
    }
}

module.exports = TestArea;