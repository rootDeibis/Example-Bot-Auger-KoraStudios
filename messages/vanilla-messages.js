const { EmbedBuilder } = require('discord.js');


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
