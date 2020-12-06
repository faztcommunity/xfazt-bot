import { Client } from "discord.js";
import Observer from "../patterns/observer/Observer";

export default class Log implements Observer {
    notify(/*client:Client*/):void {
        console.log("Estoy listo");
    }
}
