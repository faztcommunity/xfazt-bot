import EventChannel from "./EventChannel";
import BotEvents, { bot_event } from "./BotEvents";

/**
 * Clase minima para la creación de suscriptores (listeners) de canales de eventos
 * @see https://github.com/faztcommunity/xfazt-bot/wiki
 */
export default abstract class Suscriptor<Event extends bot_event> {
    /**
     * El tipo de evento corresponde al tipo de suscriptor.
     * @example class MySuscriptor extends Suscriptor<"myevent"> {
     * public event_type:"myevent" = "myevent"
     * }
     */
    public abstract event_type: bot_event;

    /**
     * El canal al que está suscripto el suscriptor.
     */
    protected channel?: EventChannel<Event>;

    /**
     * Setea por unica vez el primer canal al que se suscribe.
     */
    public set event_channel(event_channel: EventChannel<Event>) {
        if (!this.channel) this.channel = event_channel;
    }

    /**
     * Función llamada cada vez que se lea un evento en el canal de eventos.
     * @param args Argumentos de la notificación.
     */
    public abstract notified(...args: BotEvents[Event]): void;
}
