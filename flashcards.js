const inquirer = require('inquirer');
const Table = require('cli-table');

const basic = require('./basic');
const cloze = require('./cloze');

var basicTable = new Table({
	head: ['Front', 'Back',],
	colWidths: [30, 10],
	chars: {
		'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
		, 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
		, 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
		, 'right': '║', 'right-mid': '╢', 'middle': '│'
	}
});

var clozeTable = new Table({
	head: ['Full Text', 'Cloze', 'Partial Text'],
	colWidths: [20, 10, 20],
	chars: {
		'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
		, 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
		, 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
		, 'right': '║', 'right-mid': '╢', 'middle': '│'
	}
});

// inquire which type of card
inquirer.prompt([
	{
		type: 'list',
		name: 'type',
		message: 'Which type of flashcard would you like to make?',
		choices: [
			'Basic card',
			'Cloze card'
		]
	}
]).then((answers) => {

	if (answers.type === 'Basic card') {
		inquireBasic();
	};

	if (answers.type === 'Cloze card') {
		inquireCloze();
	};
});

var inquireBasic = () => {
	inquirer.prompt([
		{
			type: 'input',
			name: 'front',
			message: 'Enter question or message for the front of the flashcard.\n\n'
		},
		{
			type: 'input',
			name: 'back',
			message: 'Enter the answer for the back of the flashcard.\n\n'
		}
	]).then((answers) => {
		basicTable.push([answers.front, answers.back]);
		console.log(basicTable.toString());
	});
};

var inquireCloze = () => {
	inquirer.prompt([
		{
			type: 'input',
			name: 'text',
			message: 'Enter the full text for the flashcard.\n\n'
		},
		{
			type: 'input',
			name: 'cloze',
			message: 'Enter the text for the fill in the blank answer.\n\n'
		}
	]).then((answers) => {
		if (answers.text.indexOf(answers.cloze) === -1) {
			console.log('That cloze is not part of the full text, please try again');
			console.log('---------------------------------------------------------');
			inquireCloze();
		} else {
			var clozeCard = new cloze.Cloze(answers.text, answers.cloze);
			var clozePartial = clozeCard.partial();

			clozeTable.push([clozeCard.text, clozeCard.cloze, clozePartial]);
			console.log(clozeTable.toString());
		};
	});
};