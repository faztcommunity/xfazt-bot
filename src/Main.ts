// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV === "development") require("dotenv").config();
import FaztBot from "./bot/FaztBot";

import ReadyLog from "./bot/listeners/ReadyLog";
import Ping from "./bot/commands/core/Ping"
import Ban from "./bot/commands/moderation/Ban";


class Main {
    private static bot = new FaztBot({ prefix: "!", guild_allowed: "408626752257261578" })

    private static setup() {
        const ready_channel = this.bot.new_EventChannel("ready");
        ready_channel.add_suscriptor(new ReadyLog())
        this.bot.on("ready", ready_channel)

        this.bot.add_command(new Ping(this.bot))
            .add_command(new Ban());
    }

    public static main(): void {
        this.setup();

        //bot.main(bot);
        this.bot.start(process.env.BOT_TOKEN as string);
    }
}

Main.main();
