import { Suscriptor } from "@enzodiazdev/bottie";

export default class ReadyLog extends Suscriptor<"ready"> {
    public event_type: "ready" = "ready";

    public notified(): void {
        console.info("Beep boop o/");
    }
}
