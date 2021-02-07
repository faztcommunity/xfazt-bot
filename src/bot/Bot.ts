import { Client } from "discord.js";
import { bot_config } from "./bot_types";
import EventChannel from "./eventbroker/EventChannel";
import BotEvents, { bot_event, client_event } from "./eventbroker/BotEvents";

/**
 * Clase minima para la creación de bots
 * @see https://github.com/faztcommunity/xfazt-bot/wiki
 */
export default abstract class Bot {
    readonly client: Client;
    readonly prefix: string;
    readonly guild_id: string;
    readonly event_channels: Set<EventChannel<bot_event>> = new Set();

    /**
     * @param config Configuración del bot
     * @param discord_client Instancia de Client
     */
    constructor(config: bot_config, discord_client: Client) {
        this.client = discord_client;
        this.prefix = config.prefix;
        this.guild_id = config.guild_id;
    }

    /**
     * Funcion previa al encendido del bot.
     */
    private _prestart = async (): Promise<void> => {
        console.info("Nada que preinicializar.");
    };

    /**
     * Setea la función prestart.
     */
    set prestart(fun: () => Promise<void>) {
        this._prestart = fun;
    }

    /**
     * Setea un canal de eventos para un evento del Bot.
     * @param event Un evento del bot.
     * @param channel Un canal para el evento.
     */
    public on<Event extends bot_event, ChannelEvent extends EventChannel<Event>>(event: Event, channel: ChannelEvent): this {
        //Se comprueba si el evento ha sido cargado al EventEmitter de Client
        let is_in_client = false;
        this.event_channels.forEach((event_channel) => {
            if (event_channel.event_type === event) is_in_client = true;
        });

        //Se carga en el EventEmitter de Client, solo una vez por evento.
        if (!is_in_client) {
            this.client.on(event as client_event, (...args) => {
                this.emit(event, ...(args as BotEvents[Event]));
            });
        }

        this.event_channels.add(channel);

        return this;
    }

    /**
     * Emite un evento a los canales de eventos del Bot.
     * @param event Un Evento del Bot.
     * @param args Los argumentos del evento.
     */
    public emit<Event extends keyof BotEvents>(event: Event, ...args: BotEvents[Event]): void {
        this.event_channels.forEach((event_channel) => {
            //Emite el evento a su canal especifico
            if (event_channel.event_type === event) {
                event_channel.notify_all(...args);
            }
        });
    }

    /**
     * Inicia el bot.
     * @param token Token provisto por Discord
     * @see https://discord.com/developers/applications Portal de desarrolladores de Discord
     */
    public async start(token: string): Promise<void> {
        await this._prestart();
        this.client.login(token);
    }
}
