import Suscriptor from "../bot/eventbroker/Suscriptor";

export default class ReadyLog extends Suscriptor<"ready"> {
    public event_type: "ready" = "ready";

    public notified(): void {
        console.log("El bot está listo");
    }
}
