import { Client } from "discord.js";
import EventObservable from "../EventObservable";

export default class OnReady extends EventObservable {
    constructor(client:Client){
        super();

        client.on("ready", () => {
            this.notify_all(client);
        });
    }
}
