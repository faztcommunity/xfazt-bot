// eslint-disable-next-line @typescript-eslint/no-var-requires
if(process.env.NODE_ENV === "development") require("dotenv").config();
import {Client, Message} from "discord.js";
import Bot from "./bot/Bot";
import { bot_config } from "./bot/bot_types";

//Los imports deben ir también en otro archivo controlador donde se hagan las instancias.
import OnReady from "./components/onready/OnReady";
import Ready from "./components/onready/observers/ready/Ready";

import OnMessage from "./components/onmessage/OnMessage";
import Ping from "./components/oncommand/commands/ping/Ping";

import OnCommand from "./components/oncommand/OnCommand";

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

        // Las instancias deben ser creadas en un controllador
        // para los componentes

        // ready --
        const on_ready = new OnReady();
        const ready = new Ready();
        on_ready.add_observer(ready);

        bot.client.on("ready", () => on_ready.handle());

        //message --
        const on_message = new OnMessage(bot);

        bot.client.on("message", (message:Message) => on_message.handle(message));

        //commands --
        const on_command = new OnCommand();
        const ping = new Ping();

        on_command.add_observer(ping);

        bot.command_handler = on_command;

        bot.start(bot_token);
    }
}

Main.main();
