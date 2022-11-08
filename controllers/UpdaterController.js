

function UpdaterController(type, changes, old) {
	const messages = [];


	if (type == 'realms') {

		for(let $value of changes) {
			const position = $value.pos;

			const oldValue = old.result[position];


			if (old.optedIn != $value.optedIn) {
				messages.push({text: `*${$value.title}* has been selected!`});
			}


		}


	}

	return messages;

}

module.exports = UpdaterController;