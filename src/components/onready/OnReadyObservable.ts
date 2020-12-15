import Observable from "../../patterns/observer/Observable";
import OnReadyObserver from "./observers/OnReadyObserver";

export default abstract class OnReadyObservable implements Observable<OnReadyObserver> {
    readonly observers = new Set<OnReadyObserver>()

    protected notify_all():void {
        this.observers.forEach(observer => observer.notify());
    }

    abstract handle():void;

    public add_observer(observer:OnReadyObserver):this {
        this.observers.add(observer);
        return this;
    }

    public remove_observer(observer:OnReadyObserver):this {
        this.observers.delete(observer);
        return this;
    }
}
