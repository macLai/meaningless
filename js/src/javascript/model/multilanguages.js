var path = require('path');
const fs = require('fs');
//# sourceURL=languages.js
let languages = [];
class Language {
    constructor(){
        fs.readdir(path.join(__dirname, '../../languages'), (err, paths) => {
            paths.forEach(dir => {
                fs.readFile(path.join(__dirname, '../../languages', dir), 'utf8', function (err, data) {
                    if (err) throw err
                    const obj = JSON.parse(data)
                    languages.push(obj)
                    // if (languages.length === paths.length) {
                    //     //loadConfig()
                    // }
                })
            })
        })
        console.log(languages);
    }

    loadLanguage(language) {
        console.log("Language :: loadLanguage" + "   laguage = "+ language);
        languages.map((item, index) => {
            console.log("Language :: loadLanguage" + "   item['g_l']  = "+ item['g_l']);
            if (item['g_l'] === language) {
                const toTranslate = document.getElementsByClassName('translate_word') //class 用这个命名
                console.log("toTranslate:: length = " + toTranslate.length);
                for (var i = 0; i < toTranslate.length; i++) {
                    console.log("item[toTranslate[i].getAttribute('textid')] 11" + toTranslate[i].getAttribute('textid') );
                    console.log("i = " + i);
                    console.log(toTranslate[i].className);
                    console.log("item" + item["loading"]);
                    if (item[toTranslate[i].getAttribute('textid')] != undefined) {
                        toTranslate[i].innerText = item[toTranslate[i].getAttribute('textid')];
                        console.log("item[toTranslate[i].getAttribute('textid')]" + item[toTranslate[i].getAttribute('textid')]);
                    } else {//没有对应的语言 就使用英文
                        languages.map((item, index) => {
                            if (item['g_l'] === 'english') {
                                if (item[toTranslate[i].getAttribute('textid')] != undefined) toTranslate[i].innerText = item[toTranslate[i].getAttribute('textid')]
                            }
                        })
                    }
                }
            }
        });
    }
}

var language = new Language();

module.exports = language;
