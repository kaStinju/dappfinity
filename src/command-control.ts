import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { initFunctions, getCommands } from './functions';
import dotenv from "dotenv";

dotenv.config();

(async () => {
	try {
    initFunctions();
    const commands = getCommands();
  const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);
		console.log('Started refreshing and adding application (/) guild commands.');
		await rest.put(
			Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!,
      ),
			{ body: commands },
		);
		console.log('Successfully loaded application (/) guild commands.');
	} catch (err) {
		console.error(err);
	}
})();
