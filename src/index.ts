import { Interaction } from "discord.js";
const dotenv = require('dotenv');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'));

for (const item of commandFiles) {
	const command = require(`./commands/${item}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Bot is ready to go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if(!command) return;
	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(err);
		await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true});
	}
})

client.login(process.env.DISCORD_TOKEN);

