import { SocketClient } from "./web-api/client";
import { Client, GatewayIntentBits , GuildMember } from 'discord.js';

import RealmMessages from "./messages/realms-messages";
import PersonaMessages from "./messages/persona-messages";
import VanillaMessages from "./messages/vanilla-messages";

import * as config from "./app.config.json";

const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages] });
const client: SocketClient = new SocketClient(config.API_SERVER);

DiscordClient.on('ready', (e: Client) => {
	
    const members: GuildMember[] = [];
	const unFoundedMembers = () => config.NOTIFICATIONS_RECEIVERS.filter(id => !members.find(m => m.id == id));



	client.onCacheUpdate((data: any) => {

		// # Message Type Container

		let messageConatiner: any;


		

		for(const unfmember of unFoundedMembers()) {
			const guild = DiscordClient.guilds.cache.find(g => g.members.resolve(unfmember))

			if(guild) {
				const member = guild.members.resolve(unfmember);

				if(member) members.push(member);
			}
		}
		
		



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
		for(let element of data.modifiedElements) {
			// # Each keys in modification 

			for(let key of element.changes){
				// Find Modification key in message Container
				if(key in messageConatiner) $messages.push(messageConatiner[key](element, data));
			}
			
		}


		// Publication and Removed Key in Message Container
		let pubKey = "contentPublication";
		let remKey = "contentRemoved";

		// # Each new elements
		for(let element of data.newElements)
			if (pubKey in messageConatiner) $messages.push(messageConatiner[pubKey](element, data));

		// # Each removed elements
		for(let element of data.removedElements)
			if (remKey in messageConatiner) $messages.push(messageConatiner[remKey](element, data))




		// # Send Messages To Channel
		if ($messages.length >= 1) {
			for(const member of members) 
				member.send({embeds: $messages})
				.catch((err) => {
					console.log("Failed to send message: " + member.id)
				});
			
		}
			

	});
})

//DiscordClient.login(config.BOT_TOKEN);