const { EmbedBuilder } = require('discord.js');


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


module.exports = {

	optedIn(offer) {

		return new EmbedBuilder()
				.setColor("#FFF059")
				.addFields({
					name: 'A __Realms Offer__ has been selected!',
					value: `[**${offer.title}**](https://auger.minecraft.net/viewOffer/${offer.offerId})`
				})
			

	}


}
