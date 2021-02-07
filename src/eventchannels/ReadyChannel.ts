import EventChannel from "../bot/eventbroker/EventChannel";

export default class ReadyChannel extends EventChannel<"ready"> {
    public event_type: "ready" = "ready";
}
