// import { Message } from "discord.js";
// import Bot from "../../../../bot/Bot";
import OnCommandObservable from "./OnCommandObservable";

export default class OnCommand extends OnCommandObservable {
    public handle(command:string, ...args:string[]):void {
        this.notify_all(command, ...args);
    }
}
