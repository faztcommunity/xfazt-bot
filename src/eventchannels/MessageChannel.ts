import Bot from "../bot/Bot";
import { Message } from "discord.js";
import EventChannel from "../bot/eventbroker/EventChannel";
import {command_payload} from "../commands/Command";

/**
 * Este canal de eventos `message` filtra y dispara comandos por defecto.
 */
export default class MessageChannel extends EventChannel<"message"> {
    event_type:"message" = "message"

    /**
     * @inheritdoc
     * @param message Un mensaje de Discord.
     * @override
     * @todo Implementar el condicional de partials.
     */
    public notify_all(message:Message):void {
        if(this.sender instanceof Bot){
            const prefix = this.sender.prefix;

            if(!message.author.bot && message.content.startsWith(prefix)){
                const command = this.content_to_command(prefix, message.content);
                this.sender.emit("command", command.name, message, ...command.args);
            }
        }

        this.suscriptors.forEach(suscriptor => suscriptor.notified(message));
    }

    /**
     * Extrae el comando y los argumentos del contenido de un mensaje.
     * @param prefix El prefijo del bot.
     * @param content El contenido de un mensaje.
     */
    private content_to_command(prefix:string, content:string):Omit<command_payload, "message"> {
        // se retira el prefijo del mensaje
        const content_wo_prefix = content.split(" ")[0] === prefix ?
            content.split(" ").slice(1).join(" ").toLowerCase() :
            content.split("").slice(prefix.length).join("").toLowerCase();

        // se toma el comando
        const command_name = content_wo_prefix.split(" ")[0];

        // se toman los argumentos
        const command_arguments = content_wo_prefix.split(" ")
            .slice(1) // se retira el comando
            .filter(command_argument => command_argument !== "") // se filtran los argumentos vacios
            .map(command_argument => command_argument.trim()); // se limpian los espacios al inicio y al final del string

        return {
            name: command_name,
            args: command_arguments
        };
    }
}
