// cloze constructor
var Cloze = function (text, cloze) {
	this.text = text;
	this.cloze = cloze;
};

Cloze.prototype.partial = function () {
	var lowerText = this.text.toLowerCase();
	var lowerCloze = this.cloze.toLowerCase();

	if (lowerText.indexOf(lowerCloze) !== -1) {
		return this.text.replace(this.cloze, '____');
	};
};

module.exports = {
	Cloze
}