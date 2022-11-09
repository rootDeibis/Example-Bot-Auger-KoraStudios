const { EmbedBuilder } = require('discord.js');

/*
	

	Vanilla * Available Message Types:


	optInState() => 

	lastUpdated() =>

	approvedClientVersion() =>

	workflowType() =>

	submissionDate() =>

	deleteRequest() =>

	archived() =>
	
	purchasable() =>


*/


module.exports = {

	optInState(offer) {

		return new EmbedBuilder()
				.setColor("#FFF059")
				.addFields({
					name: 'A __Vanilla Offer__ has been selected!',
					value: `[**${offer.offerTitle}**](https://auger.minecraft.net/viewOffer/${offer.offerId})`
				})
			

	}


}
