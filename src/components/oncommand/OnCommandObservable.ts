// import { Message } from "discord.js";
// import Bot from "../../../../bot/Bot";
import Observable from "../../patterns/observer/Observable";
import OnCommandObserver from "./commands/OnCommandObserver";

export default abstract class OnCommandObservable implements Observable<OnCommandObserver> {
    readonly observers = new Set<OnCommandObserver>()

    protected notify_all(command:string, ...args:string[]):void {
        this.observers.forEach(observer => observer.notify(command, ...args));
    }

    abstract handle(command:string, ...args:string[]):void

    public add_observer(observer:OnCommandObserver):this {
        this.observers.add(observer);
        return this;
    }

    public remove_observer(observer:OnCommandObserver):this {
        this.observers.delete(observer);
        return this;
    }
}
