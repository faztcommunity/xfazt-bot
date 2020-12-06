import { Client } from "discord.js";

interface Observer {
    notify(client:Client, ...args:any);
}

export default Observer;
