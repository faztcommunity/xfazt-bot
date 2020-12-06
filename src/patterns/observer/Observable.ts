import { Client } from "discord.js";
import Observer from "./Observer";

interface Observable {
    notify_all(client:Client, ...args:any):void
    add_observer(observer:Observer):void
    remove_observer(observer:Observer):void
}

export default Observable;
