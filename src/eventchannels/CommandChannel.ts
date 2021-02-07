//import Suscriptor from "bot/eventbroker/Suscriptor";
import { TextChannel } from "discord.js";
import EventChannel from "../bot/eventbroker/EventChannel";
import Command from "../commands/Command";

export default class CommandChannel extends EventChannel<"command"> {
    public event_type: "command" = "command";

    public configure_command(command_name: string, text_channel: TextChannel, config: object): void {
        this.suscriptors.forEach((command) => {
            if (command instanceof Command && command.configured) {
                command.configured(command_name, text_channel, config);
            }
        });
    }
}
