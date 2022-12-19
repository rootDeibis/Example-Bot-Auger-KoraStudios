import { EmbedBuilder } from 'discord.js';


/*
	

	Realms * Available Message Types:


	optedIn() => 

	optInDate() => 

	startDate() =>

	payout() =>

	title() =>

	releaseDate() =>

	endDate() =>

	archived() =>
	
	purchasable() =>



*/


export default {

	optedIn(offer: any) {

		let text;

		if (offer.optedIn)
			text = 'A __Realms Offer__ has been selected!'
		else
			text = 'A __Realms Offer__ has been deselected!'

		return new EmbedBuilder()
				.setColor("#FFF059")
				.addFields({
					name: text,
					value: `[**${offer.title}**](https://auger.minecraft.net/viewOffer/${offer.offerId})`
				})
			

	},

	contentPublication(offer: any) {

		return new EmbedBuilder()
			.setTitle("New realms offer " + offer.title)

	}


}
