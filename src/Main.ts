// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV === "development") require("dotenv").config();
import { Client } from "discord.js";
import FaztBot from "./FaztBot";
import ReadyChannel from "./eventchannels/ReadyChannel";
import MessageChannel from "./eventchannels/MessageChannel";
import CommandChannel from "./eventchannels/CommandChannel";
import ReadyLog from "./suscriptors/ReadyLog";
import Ping from "./commands/ping/Ping";

class Main {
    public static main(): void {
        const client = new Client();

        const bot = new FaztBot(
            {
                prefix: "!",
                guild_id: "1",
            },
            client
        );

        const ready_channel = new ReadyChannel(bot);
        const message_channel = new MessageChannel(bot);
        const command_channel = new CommandChannel(bot);

        const ready_log = new ReadyLog();
        ready_channel.add_suscriptor(ready_log);

        const ping = new Ping(bot);
        command_channel.add_suscriptor(ping);

        bot.on("ready", ready_channel);
        bot.on("message", message_channel);
        bot.on("command", command_channel);

        bot.start(process.env.BOT_TOKEN as string);
    }
}

Main.main();
