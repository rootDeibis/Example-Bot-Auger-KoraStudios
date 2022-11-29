import { SocketClient } from "./web-api/client";
import { Client, GatewayIntentBits } from 'discord.js';

import RealmMessages from "./messages/realms-messages";
import PersonaMessages from "./messages/persona-messages";
import VanillaMessages from "./messages/vanilla-messages";

const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });


DiscordClient.on('ready', () => {
    const guild: any = DiscordClient.guilds.resolve("849024759508762704");
	const channel = guild.channels.resolve("849024759508762709");
    const client = new SocketClient("http://localhost:3000");

	client.onCacheUpdate((data) => {

		// # Message Type Container

		let messageConatiner: any;

		// # Find message container from name
		switch(data.cacheName) {
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
		for(let element of data.modifiedElements) 
			// # Each keys in modification 
			for(let { key } of element.modifiedKeys){
				// Find Modification key in message Container
				if(key in messageConatiner) $messages.push(messageConatiner[key](element, data.new));
			}
			



		// Publication and Removed Key in Message Container
		let pubKey = "contentPublication";
		let remKey = "contentRemoved";

		// # Each new elements
		for(let element of data.newElements)
			if (pubKey in messageConatiner) $messages.push(messageConatiner[pubKey](element, data.new));

		// # Each removed elements
		for(let element of data.removedElements)
			if (remKey in messageConatiner) $messages.push(messageConatiner[remKey](element, data.new))




		// # Send Messages To Channel
		if ($messages.length >= 1) channel.send({embeds: $messages});
			

	});
})

DiscordClient.login("ODM3MTQzMTI2MDIzNjAyMjE4.GYD7h3.H-9mIPeufSmW3-N2leir2oOynuIy3hyAwEYIMQ");