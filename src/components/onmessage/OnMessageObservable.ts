import { Message } from "discord.js";
import Observable from "../../patterns/observer/Observable";
import OnMessageObserver from "./observers/OnMessageObserver";

export default abstract class OnMessageObservable implements Observable<OnMessageObserver> {
    readonly observers = new Set<OnMessageObserver>()

    protected notify_all(message:Message):void {
        this.observers.forEach(observer =>observer.notify(message));
    }

    abstract handle(message:Message):void;

    public add_observer(observer:OnMessageObserver):this {
        this.observers.add(observer);
        return this;
    }

    public remove_observer(observer:OnMessageObserver):this {
        this.observers.delete(observer);
        return this;
    }
}
