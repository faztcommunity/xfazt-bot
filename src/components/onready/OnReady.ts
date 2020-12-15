import OnReadyObservable from "./OnReadyObservable";

export default class OnReady extends OnReadyObservable {
    public handle():void {
        this.notify_all();
    }
}
