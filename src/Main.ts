// eslint-disable-next-line @typescript-eslint/no-var-requires
if(process.env.NODE_ENV === "development") require("dotenv").config();
import {Client} from "discord.js";
import Bot from "./bot/Bot";
import { bot_config } from "./bot/bot_types";
import OnReady from "./listeners/onready/OnReady";
import Log from "./functionalities/Log";

class Main {
    public static main():void {
        const client = new Client();

        const guild_id = process.env.GUILD_ID;
        if(!guild_id) throw new Error("el id del servidor predefinido no está definido");

        const bot_config:bot_config = {
            prefix: "!",
            guild_id: guild_id
        };
        const bot = new Bot(bot_config, client);

        const bot_token = process.env.BOT_TOKEN;
        if(!bot_token) throw new Error("El token del bot no está definido");

        const on_ready = new OnReady(client);

        const log = new Log();

        on_ready.add_observer(log);

        bot.start(bot_token);
    }
}

Main.main();
