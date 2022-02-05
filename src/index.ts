const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Bot is ready to go!');
});

client.login(process.env.DISCORD_TOKEN);

