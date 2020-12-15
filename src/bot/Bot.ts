import {Client} from "discord.js";
import {bot_config} from "./bot_types";
import OnCommandObservable from "../components/oncommand/OnCommand";

export default class Bot {
    readonly client:Client
    readonly prefix:string
    readonly guild_id:string
    private _command_handler?:OnCommandObservable

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

    /**
     * Inyecta un command_handler que respete la interfaz OnCommandObservable
     * @see LINK_A_LA_DOCUMENTACIÓN
     */
    public set command_handler(command_handler:OnCommandObservable|undefined) {
        if(command_handler) this._command_handler = command_handler;
    }

    /**
     * Obtiene el command_handler
     */
    public get command_handler():OnCommandObservable|undefined {
        return this._command_handler;
    }
}
