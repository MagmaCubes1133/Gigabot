const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageDelete,
	async execute(message) {
		// Store the deleted message in a Map
		message.client.deletedMessages.set(message.channel.id, {
			content: message.content,
			author: message.author,
			timestamp: message.createdTimestamp,
		});
	},
};