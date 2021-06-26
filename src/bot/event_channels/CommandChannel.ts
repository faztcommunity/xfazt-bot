//import Suscriptor from "bot/eventbroker/Suscriptor";
import { TextChannel } from "discord.js";
import { EventChannel, EventBroker } from "@enzodiazdev/bottie";
import Command from "../commands/Command";

export default class CommandChannel extends EventChannel<"command"> {
    constructor(broker: EventBroker) {
        super("command", broker);
    }

    public configure_command(command_name: string, text_channel: TextChannel, config: object): void {
        this.suscriptors.forEach((command) => {
            if (command instanceof Command && command.configured) {
                command.configured(command_name, text_channel, config);
            }
        });
    }
}
