import { Message } from "discord.js";
import Bot from "../../bot/Bot";
import OnMessageObservable from "./OnMessageObservable";

/**
 * Actúa como message handler
 */
export default class OnMessage extends OnMessageObservable {
    private bot:Bot

    constructor(bot:Bot){
        super();
        this.bot = bot;
    }

    public handle(message:Message):void {
        this.notify_all(message);
        //Se handlea todo...
        const command = "ping";
        this.notify_command(command);
    }

    private notify_command(command:string, ...args:string[]):void {
        if(this.bot.command_handler) {
            this.bot.command_handler.handle(command, ...args);
        }
    }
}
