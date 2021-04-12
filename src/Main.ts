// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV === "development") require("dotenv").config();
import { Client } from "discord.js";
import FaztBot from "./FaztBot";

class Main {
    public static main(): void {
        console.time("Tiempo de Inicio");
        const client = new Client();

        const bot = new FaztBot(
            {
                prefix: "!",
                guild_id: "1",
            },
            client
        );

        bot.main(bot);
        bot.start(process.env.BOT_TOKEN as string);
        console.timeEnd("Tiempo de Inicio");
    }
}

Main.main();
