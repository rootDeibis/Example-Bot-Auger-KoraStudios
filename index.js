const $token = "*token*";

const { Client, GatewayIntentBits, EmbedBuilder  } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const SocketClient = require('./controllers/SocketClient.js');
const RealmMessages = require("./messages/realms-messages.js");
const PersonaMessages = require("./messages/persona-messages.js");
const VanillaMessages = require("./messages/vanilla-messages.js");


client.on('ready', bot => {

	const guild = bot.guilds.resolve("*guild-id*");
	const channel = guild.channels.resolve("*channel-id*");

	SocketClient.connect("localhost:3001");

	SocketClient.onCacheUpdate((data) => {

		let messageConatiner;

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

		if (messageConatiner == null) return;

		for(let element of data.changes.modifiedElements) 
			for(let { key } of element.modifiedKeys) 
				if(key in messageConatiner) channel.send({embeds: [messageConatiner[key](element)]})

			

	});
		

});


client.login($token);
