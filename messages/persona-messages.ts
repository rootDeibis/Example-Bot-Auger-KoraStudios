import { EmbedBuilder } from 'discord.js';


/*
	

	Persona * Available Message Types:


	optInState() => 

	lastUpdated() =>

	approvedClientVersion() =>

	workflowType() =>

	submissionDate() =>

	deleteRequest() =>

	archived() =>
	
	purchasable() =>


*/

export default {

	optInState(offer: any, data: any) {

		const offv1: number = data.cache?.filter((c: any) => c.optInState == "Opted In").length | 0;
		const offv2: number = data.cache?.filter((c: any) => c.optInState == "Active").length | 0;

		let text;

		if (offer.optInState == 'Eligible')
			text = "A __Persona Offer__ has been deselected!"
		else
			text = "A __Persona Offer__ has been selected!"
		


		return new EmbedBuilder()
				.setColor("#FFF059")
				.addFields({
					name: text,
					value: `[**${offer.offerTitle}**](https://auger.minecraft.net/viewOffer/${offer.offerId})`
				})
				.setFooter({text: `Persona selected: ${offv1} / ${offv2}`})
			

	}


}
