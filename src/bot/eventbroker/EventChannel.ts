import Suscriptor from "./Suscriptor";
import BotEvents, {bot_event} from "./BotEvents";

/**
 * Clase minima para la creación de canales de eventos.
 * @see https://github.com/faztcommunity/xfazt-bot/wiki
 */
export default abstract class EventChannel<Event extends bot_event> {
    /**
     * El tipo de evento corresponde al tipo de canal de eventos.
     * @example class MyEventChannel extends EventChannel<"myevent"> {
     * public event_type:"myevent" = "myevent"
     * }
     */
    public abstract event_type:Event

    /**
     * Lista de suscriptores.
     * @see https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Set
     */
    readonly suscriptors:Set<Suscriptor<Event>> = new Set()

    /**
     * El objeto que envía el evento al canal.
     */
    protected sender:object

    /**
     * @param sender El origen de los eventos.
     */
    constructor(sender:object){
        this.sender = sender;
    }

    /**
     * Añade un suscriptor del mismo tipo de evento del canal.
     * @param suscriptor Un suscriptor de igual tipo de evento del canal.
     */
    public add_suscriptor(suscriptor:Suscriptor<Event>):this {
        this.suscriptors.add(suscriptor);
        suscriptor.event_channel = this;
        return this;
    }

    /**
     * Remueve un suscriptor de la lista de suscriptores.
     * @param suscriptor Un suscriptor que esté suscripto.
     */
    public remove_suscriptor(suscriptor:Suscriptor<Event>):this {
        this.suscriptors.delete(suscriptor);
        return this;
    }

    /**
     * Notifica a todos sus suscriptores que el evento ha ocurrido.
     * @param args Argumentos de la notificación.
     */
    public notify_all(...args:BotEvents[Event]):void {
        this.suscriptors.forEach(suscriptor => suscriptor.notified(...args));
    }
}
