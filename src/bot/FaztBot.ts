import { MessageEmbed, TextChannel } from "discord.js";
import { Reloj } from "../libs";

import Bottie from "@enzodiazdev/bottie";
import FaztBotProperties from "./FaztBotProperies";
import CommandChannel from "./event_channels/CommandChannel";
import Command, { command_payload } from "./commands/Command";

export default class FaztBot extends Bottie {
    private command_channel: CommandChannel

    constructor(properties: FaztBotProperties) {
        super(properties);

        this.command_channel = new CommandChannel(this.broker);
        this.on("command", this.command_channel)

        const message_channel = this.new_EventChannel("message");
        message_channel.handle = message => {
            const prefix = this.properties.prefix;
            console.log(message.content)

            if (
                !message.author.bot &&
                message.content.startsWith(prefix) &&
                message.guild?.id === properties.guild_allowed
            ) {
                const command = this.content_to_command(this.command_match, message.content);
                console.log(command)
                this.emit("command", command.name, message, ...command.args);
            }

            message_channel.suscriptors.forEach((suscriptor) => suscriptor.notified(message));
        }

        this.on("message", message_channel);

        //---
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

        this.client.on("error", (error: Error) => ErrorSend("Error", "Client", error));
        this.client.on("warn", (warn: string) => ErrorSend("Warn", "Client", warn));
        this.client.on("invalidated", () => ErrorSend("Error", "INVALIDATED", "Discord Bot"));
        this.client.on("shardDisconnect", (error, ID) =>
            ErrorSend("Error", `SHARD DISCONNECT [${ID}]`, `Code: ${error.code} Reason: ${error.reason}`, error.target)
        );
        this.client.on("shardError", (error, ID) => ErrorSend("Error", `SHARD [${ID}]`, error));
    }

    public add_command(command: Command): this {
        this.command_channel.add_suscriptor(command);
        return this;
    }

    public remove_command(command: Command): this {
        this.command_channel.remove_suscriptor(command);
        return this;
    }

    /**
     * Extrae el comando y los argumentos del contenido de un mensaje.
     * @param prefix El prefijo del bot como RegExp.
     * @param content El contenido de un mensaje.
     */
    private content_to_command(prefix: RegExp, content: string): Omit<command_payload, "message"> {
        // Se toman los argumentos.
        const command_arguments = content
            .toLowerCase()
            .replace(prefix, "") // se retira el prefix del mensaje.
            .split(" ") // se separa los argumentos por cada espacio en el mensaje.
            .slice(1) // se retira el comando
            .filter(arg => arg) // se filtran los argumentos vacios.
            .map(arg => arg.trim()); // se limpian los espacios al inicio y al final de cada argumento.

        // Se toma el comando.
        const command = content
            .toLowerCase()
            .replace(prefix, "") // se retira el prefix del mensaje.
            .split(" ")
            .shift()
            ?.normalize("NFD")
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
            .normalize() || "";


        return {
            name: command,
            args: command_arguments,
        };
    }
}
