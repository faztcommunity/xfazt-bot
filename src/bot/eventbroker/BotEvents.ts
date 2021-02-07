import { ClientEvents, Message } from "discord.js";

/**
 * Añade eventos del bot a los eventos del Client.
 * @extends ClientEvents
 */
interface BotEvents extends ClientEvents {
    command: [string, Message, ...string[]];
}
export default BotEvents;

/**
 * Tipos de eventos del bot.
 */
export type bot_event = keyof BotEvents;

/**
 * Tipos de eventos del Client.
 * @see https://discord.js.org/#/docs/main/stable/class/Client
 */
export type client_event = keyof ClientEvents;
