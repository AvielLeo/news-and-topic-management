
var removePunctuation = function(string){
    return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

var lowerCase = function(string){
    return string.toLowerCase();
}

var replaceSpace = function(string){
    return string.replace(/ /g, "-");
}


exports.removePunctuation = removePunctuation;
exports.lowerCase = lowerCase;
exports.replaceSpace = replaceSpace;