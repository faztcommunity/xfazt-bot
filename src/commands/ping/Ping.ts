import { Message, MessageEmbed } from "discord.js";
import Command from "../Command";
import Bot from "../../bot/Bot";

export default class Ping extends Command {
    readonly name = "ping";
    readonly description = "Obtén el tiempo de respuesta del bot";
    readonly alias = ["silbido"];
    readonly bot: Bot;

    constructor(bot: Bot) {
        super();
        this.bot = bot;
    }

    executed(message: Message): void {
        const client = this.bot.client;
        const ping = Math.floor(client.ws.ping);

        const embed = new MessageEmbed()
            .setAuthor(client.user!.username, client.user!.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
            .setTimestamp()
            .setDescription("Calculando...");

        message.channel.send(embed).then((m) => {
            const gateway = m.createdTimestamp - message.createdTimestamp;

            embed
                .setDescription(`Pong!\n📡 API: ${ping}\n⏳ Gateway: ${gateway}`)
                .setColor(gateway > 300 || ping > 300 ? 0xff0000 : gateway > 150 || ping > 150 ? 0xffcc00 : 0x66ff66);
            m.edit(embed);
        });
    }
}
