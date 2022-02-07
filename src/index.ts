import { Interaction } from "discord.js";
import dotenv from "dotenv";
import { Client, Intents } from 'discord.js';
import { initFunctions, getFunction } from "./functions";
import { createProvider } from "./createProvider";
import { connect } from "./walletConnect";
import { generateQR } from "./qr";
import { config } from "./config";

dotenv.config();
initFunctions();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Bot is ready to go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;
	try {
    const { chainConfig } = config();
    const func = getFunction(interaction);
    if (func.isView()) {
      const provider = createProvider();
      const results = await func.callView(provider);
      const content = results.length === 1 ?
        `${results[0]}` :
        JSON.stringify(results) ;
      await interaction.reply({
        content: content,
        ephemeral: true,
      });
      return;
    }
    const signer = await connect(async (uri) => {
      const buffer = await generateQR(uri);
      await interaction.reply({
        content: `Connect your wallet to ${chainConfig.name}`,
        ephemeral: true,
        files: [
          {
            attachment: buffer,
            name: "connect.png",
            description: "qr code",
          },
        ],
      });
    });
    const txnResponse = await func.callMethod(signer);
    await interaction.followUp({
      content: `[View transaction](${chainConfig.explorerUrl}tx/${txnResponse.hash})`,
      ephemeral: true,
    });
    return;
	} catch (err) {
		console.error(err);
    const message = {
      content: "An error occurred while executing this command.",
      ephemeral: true,
    };
    try {
      await interaction.reply(message);
    } catch {
      await interaction.followUp(message);
    }
	}
})

client.login(process.env.DISCORD_TOKEN!);

