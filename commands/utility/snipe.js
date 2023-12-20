/* eslint-disable quotes */
/* eslint-disable brace-style */
// snipe.js
const { Client, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { name } = require('../../events/messageDelete');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Shows previously deleted messages.'),
	// Set cooldown in seconds
	cooldown: 5,
	async execute(interaction) {
		// Check if the user is on cooldown
		const cooldownExpiration = interaction.client.cooldowns.get(interaction.user.id);
		if (cooldownExpiration && Date.now() < cooldownExpiration) {
			const remainingCooldown = Math.ceil((cooldownExpiration - Date.now()) / 1000);

			return interaction.reply({
				content: `You are on cooldown. Please wait for ${remainingCooldown} before using the command again. Fucking noob.`,
				ephemeral: true,
			});
		}

		const snipedMessage = interaction.client.deletedMessages.get(interaction.channel.id);

		if (!snipedMessage) {
			return interaction.reply('Sorry but I can\'t find any recently deleted message for some reason? Wait. You\'re messing with me right?');
		}

		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setAuthor({ name: `@${snipedMessage.author.tag}`, iconURL: snipedMessage.author.displayAvatarURL() })
			.setDescription(snipedMessage.content)
			.setTimestamp(snipedMessage.timestamp)
			.setFooter({ text: 'lmao have fun covering that up' });


		interaction.reply({ embeds: [embed] });

		// Set user cooldown
		interaction.client.cooldowns.set(interaction.user.id, Date.now() + (this.cooldown * 1000));
		// Remove user cooldown after the specified cooldown period
		setTimeout(() => {
			interaction.client.cooldowns.delete(interaction.user.id);
		}, this.cooldown * 1000);

	},
};
