import { Interaction } from "discord.js";
import dotenv from "dotenv";
import { Client, Intents } from 'discord.js';
import { initFunctions, getFunction } from "./functions";
import { createProvider } from "./createProvider";
import { connect } from "./walletConnect";
import { generateQR } from "./qr";

dotenv.config();
initFunctions();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Bot is ready to go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;
	try {
    const func = getFunction(interaction);
    if (func.isView()) {
      const provider = createProvider();
      const result = await func.callView(provider);
      await interaction.reply({
        content: JSON.stringify(result),
        ephemeral: true,
      });
      return;
    }
    const signer = await connect(async (uri) => {
      const buffer = await generateQR(uri);
      await interaction.reply({
        content: "Connect to WalletConnect",
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
      content: `txn hash: ${txnResponse.hash}`,
      ephemeral: true,
    });
    return;
	} catch (err) {
		console.error(err);
		await interaction.reply({
      content: 'An error occurred while executing this command.',
      ephemeral: true,
    });
	}
})

client.login(process.env.DISCORD_TOKEN!);

