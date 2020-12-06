import {Client} from "discord.js";
import {bot_config} from "./bot_types";

export default class Bot {
    readonly client:Client
    readonly prefix:string
    readonly guild_id:string

    constructor(config:bot_config, discord_client:Client){
        this.client = discord_client;
        this.prefix = config.prefix;
        this.guild_id = config.guild_id;
    }

    /**
     * Funcion previa al encendido del bot.
     */
    private _prestart = async () => {
        console.info("Nada que preinicializar.");
    }

    /**
     * Define una funcion que se ejecuta antes de iniciar el bot.
     */
    set prestart(func:()=>Promise<void>){
        this._prestart = func;
    }

    /**
     * Inicia el bot.
     * @param token Token provisto por Discord
     * @see https://discord.com/developers/applications Portal de desarrolladores de Discord
     */
    public async start(token:string):Promise<void> {
        await this._prestart();
        this.client.login(token);
    }
}
