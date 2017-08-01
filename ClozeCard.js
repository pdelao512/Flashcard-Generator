var ClozeCard = function(text, cloze){
	var textCard = text;
	var clozeCard = cloze;

	if (!text.includes(clozeC)){
		console.log("Error: The deletion does not appear in your text");
		return;
	}

	this.text = text;
	this.cloze = cloze;
	this.clozeTest = text.replace(cloze, "________");
};

module.exports = ClozeCard;