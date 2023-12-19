const { Events } = require('discord.js');

// Your regex pattern
const regex = /(?:\s|^)[Ff](?:\.|\s|$)/;

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		// Ignore messages from bots
		if (message.author.bot) return;

		// Test the message content against the regex
		if (regex.test(message.content)) {
			// Send a response tagging the author and including the message text
			message.channel.send(`${message.author}, Has paid their respects. F.`);
		}
	},
};