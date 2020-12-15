// import Bot from "../../../../../../bot/Bot"; //omg
// import { Message } from "discord.js";
import OnCommandObserver from "../OnCommandObserver";

export default class Ping implements OnCommandObserver {
    readonly name = "ping"

    public notify(command:string/*, ...args:string[]*/):void {
        if(command === this.name) this.exe();
    }

    private exe():void {
        console.log("pong!");
    }
}
