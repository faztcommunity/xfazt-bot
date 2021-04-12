import MessageChannel from "./eventchannels/MessageChannel";
import CommandChannel from "./eventchannels/CommandChannel";
import ReadyChannel from "./eventchannels/ReadyChannel";
import { MessageEmbed, TextChannel } from "discord.js";
import ReadyLog from "./suscriptors/ReadyLog";
import * as Commands from "./commands";
import { Reloj } from "libs";
import Bot from "./bot/Bot";

export default class FaztBot extends Bot {
    public main(bot: FaztBot): void {
        const ready_channel = new ReadyChannel(bot);
        const message_channel = new MessageChannel(bot);
        const command_channel = new CommandChannel(bot);

        const ready_log = new ReadyLog();
        ready_channel.add_suscriptor(ready_log);

        for (let command in Commands) {
            let classCommand = (Commands as any)[command];
            command_channel.add_suscriptor(new classCommand(bot));
        }

        bot.on("ready", ready_channel);
        bot.on("message", message_channel);
        bot.on("command", command_channel);

        /* ========================================================== */
        /*                           LOGS                             */
        /* ========================================================== */
        const ErrorSend = (type: "Error" | "Warn", title: string, error: Error | string, origin?: string) => {
            console.error(
                `\x1b[35m[${Reloj()}]\x1b[97m  ${type} ${title}`,
                `${error instanceof Error ? error.stack : error}${origin ? `\nOrigen: ${origin}` : ""}`
            );
            var embed = new MessageEmbed().setColor(type == "Error" ? 0xd7342a : 0xffa500).setTitle(title);

            if (typeof error == "string") embed.addField(type, error.substring(0, 1024));
            else
                embed
                    .addField(type, `**Nombre:** ${error.name}\n**Mensaje:** ${error.message.substring(0, 900)}`)
                    .addField("Código", `\`\`\`${error.stack ? error.stack.substring(0, 1015) : error ? error.toString().substring(0, 1015) : "-"}\`\`\``);
            if (origin) embed.addField("Origen", origin);
            var canal; // = bot.client.channels.cache.get("ID_Canal_Errore_Logs") as TextChannel | undefined;
            if (canal) canal.send(embed);
        };

        process.on("warn", (warn: Error) => ErrorSend("Warn", "Advertencia", warn));
        process.on("unhandledRejection", (error: Error) => ErrorSend("Error", "Rechazo de promesa no captada", error));
        process.on("uncaughtException", (error: Error, origin: string) => ErrorSend("Error", "Nodo No Saliendo...", error, origin));

        bot.client.on("error", (error: Error) => ErrorSend("Error", "Client", error));
        bot.client.on("warn", (warn: string) => ErrorSend("Warn", "Client", warn));
        bot.client.on("invalidated", () => ErrorSend("Error", "INVALIDATED", "Discord Bot"));
        bot.client.on("shardDisconnect", (error, ID) =>
            ErrorSend("Error", `SHARD DISCONNECT [${ID}]`, `Code: ${error.code} Reason: ${error.reason}`, error.target)
        );
        bot.client.on("shardError", (error, ID) => ErrorSend("Error", `SHARD [${ID}]`, error));
    }
}
