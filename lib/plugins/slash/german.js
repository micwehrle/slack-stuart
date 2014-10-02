
/********************************************
 *
 * Convert numbers to german
 *
 * Author : Michael Wehrle mic
 *
 ********************************************/

var _ = require("underscore");

var word_to_number = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
};

var lookup_table = {
    "0": "null",
    "1": "eins",
    "2": "zwei",
    "3": "drei",
    "4": "vier",
    "5": "fünf",
    "6": "sechs",
    "7": "sieben",
    "8": "acht",
    "9": "neun"
};


var convert = function(input) {
	// turn input into string
    var string, output = '';
    
    if (word_to_number[input]) {
        return lookup_table[word_to_number[input]];
    }
    else {
        string = String(input);
    }
    
    // very inefficient translator!!!
    _.each(string, function (el) {
	if ([',','.'].indexOf(el) === -1) {
	    output += lookup_table[el] + " ";
	}
    });
    return output.trim();
}

// translate numbers
module.exports.run = function(request, stuart) {
    // get the string containing the number to be converted
	var number_in = request.text.substr(request.text.indexOf(" ") + 1);
	stuart.slack_post(number_in + ' in deutsch  :  _' + convert(number_in) + '_', '@' + request.user_name, request.user_name);
};

module.exports.help = function(request, stuart) {
	stuart.slack_post("Translate numbers to German! Usage : \n\n'/stuart german <your number ([1,385, eight,...])>'", '@' + request.user_name, request.user_name);
};
