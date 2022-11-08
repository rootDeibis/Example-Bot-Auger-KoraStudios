const { EmbedBuilder } = require('discord.js');


module.exports = {

	cardState(offer) {

		return new EmbedBuilder()
				.setColor("#FFF059")
				.addFields({
					name: 'A __Persona Offer__ has been selected!',
					value: `[**${offer.offerTitle}**](https://auger.minecraft.net/viewOffer/${offer.offerId})`
				})
			

	}


}
