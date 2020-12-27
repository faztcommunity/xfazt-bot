import { Message } from "discord.js";
import Command from "../Command";

export default class Ping extends Command {
    readonly name = "ping"
    readonly description = "Responde con el mensaje 'pong!'"

    executed(message:Message):void {
        message.channel.send("pong!");
    }
}
