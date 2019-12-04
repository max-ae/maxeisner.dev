var myTerminal = new Terminal();
var indent = "<span class='indent'></span>"
var whoamiObj = {
    "name": "Max Eisner",
    "dateOfBirth": "11.04.2000",
    "placeOfBirth": "Lahnstein, Germany",
    "location": "Munich, Germany",
    "education:": {
        "bischöflichesCusanusGymnasium": {
            "type": "High School",
            "location": "Koblenz",
            "from": "2009",
            "to": "2018"
        },
        "TUM": {
            "type": "Bachelor Studies, Informatics",
            "location": "Munich",
            "from": "2018",
            "to": "2021 (expected)"
        }
    }
}
var whoamiStr = JSON.stringify(whoamiObj, undefined, 2)

window.onload = function () {
    document.getElementById("terminal").append(myTerminal.html);
    setup();
    readMessage();
}

function setup() {
    myTerminal.print("Hi,");
    myTerminal.print("I'm glad you made it this far!");
    myTerminal.print("Feel free to explore");
    myTerminal.print("(C) 2019 🌈 Max Eisner, based in Munich 🥨");
    myTerminal.print("\u2063");
}

function readMessage() {
    myTerminal.input("", function (userInput) {
        messageReceived(userInput)
    });
}

function messageReceived(message) {
    myTerminal.print(getResponse(message))
    // printlines(getResponse(message));
    readMessage();
}

function getResponse(input) {
    switch (input) {
        case "help":
            var res = "Available commands: <br>";
            res += indent + "help<br>";
            res += indent + "whoami<br>";
            res += indent + "contact<br>";
            //  res += indent+"projects<br>";
            res += indent + "clear<br>";
            res += indent + "exit<br>";
            return res;
        case "whoami":
            return "<pre>\n" + syntaxHighlight(whoamiStr) + "</pre>\n";
        case "clear":
            myTerminal.clear();
            return "";
        case "rm -rf /":
            myTerminal.print("<span class='error'>segmentation fault (core dumped)</span>");
            myTerminal = null;
            return "";
        case "exit":
            window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            return "";
        case "contact":
            var mail = caesarShift("ij@kptdibt.qbhf", -1);
            var ret = "Uhh, you want to get in touch? Awesome, I'm always up for a chat:<br><br>";
            ret += indent + "<a style='color:#fff;' href='mailto:" + mail + "'>" + mail + "</a> &lt-- click here<br>";
            ret += indent + "or here! --> <a style='color:#fff;' href='https://twitter.com/joschahen'>twitter.com/joschahen</a><br>";
            ret += indent + "<a style='color:#fff;' href='https://t.me/joschahenningsen'>t.me/joschahenningsen</a> <-- maybe even there<br><br>";
            return ret
        default:
            return "<span class='error'>✘</span> command not found: " + input;
    }
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '"> ' + match + '</span>';
    });
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Don't want plaintext email addresses online
var caesarShift = function (str, amount) {
    if (amount < 0)
        return caesarShift(str, amount + 26);
    var output = '';
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c.match(/[a-z]/i)) {
            var code = str.charCodeAt(i);
            if ((code >= 65) && (code <= 90))
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            else if ((code >= 97) && (code <= 122))
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
        output += c;
    }
    return output;
};
