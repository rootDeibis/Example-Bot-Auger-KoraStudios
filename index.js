const $token = "*token*";


const { Client, GatewayIntentBits, EmbedBuilder  } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });


// # Import Socket Client Controller
const SocketClient = require('./controllers/SocketClient.js');


// # Import Messages Modules
const RealmMessages = require("./messages/realms-messages.js");
const PersonaMessages = require("./messages/persona-messages.js");
const VanillaMessages = require("./messages/vanilla-messages.js");


client.on('ready', bot => {

	const guild = bot.guilds.resolve("*guild-id*");
	const channel = guild.channels.resolve("*channel-id*");

	SocketClient.connect("localhost:3001");

	SocketClient.onCacheUpdate((data) => {

		// # Message Type Container

		let messageConatiner;

		// # Find message container from name
		switch(data.name) {
			case 'auger-realms':
				messageConatiner = RealmMessages;
				break;
			case 'auger-persona':
				messageConatiner = PersonaMessages;
				break;
			case 'auger-vanilla':
				messageConatiner = VanillaMessages;
				break;
		}


		// # if message container is empty cancel
		if (messageConatiner == null) return;


		const $messages = [];



		// # Each modifications in object
		for(let element of data.changes.modifiedElements) 
			// # Each keys in modification 
			for(let { key } of element.modifiedKeys){
				// Find Modification key in message Container
				if(key in messageConatiner) $messages.push(messageConatiner[key](element, data.new));
			}
			



		// Publication and Removed Key in Message Container
		let pubKey = "contentPublication";
		let remKey = "contentRemoved";

		// # Each new elements
		for(let element of data.changes.newElements)
			if (pubKey in messageConatiner) $messages.push(messageConatiner[pubKey](element, data.new));

		// # Each removed elements
		for(let element of data.changes.removedElements)
			if (remKey in messageConatiner) $messages.push(messageConatiner[remKey](element, data.new))




		// # Send Messages To Channel
		if ($messages.length >= 1) channel.send({embeds: $messages});
			

	});
		

});


client.login($token);