const { REST } = require('@discordjs/rest');
const { Routes, APIApplicationCommand} = require('discord-api-types/v9');
const fs = require('fs');

const commands: JSON[] = [];
const commandFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'));

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

for (const item of commandFiles) {
	const command = require(`./commands/${item}`);
	commands.push(command.data.toJSON());
}

(async () => {
	try {
		console.log('Started refreshing and adding application (/) guild commands.');
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);
		console.log('Successfully loaded application (/) guild commands.');
	} catch (err) {
		console.error(err);
	}
})();