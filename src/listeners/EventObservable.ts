import { Client } from "discord.js";
import Observable from "../patterns/observer/Observable";
import Observer from "../patterns/observer/Observer";

export default abstract class EventObservable implements Observable {
    public observers:Array<Observer> = []

    public notify_all(client:Client, ...args:any):void {
        this.observers.forEach(observer => {
            observer.notify(client, ...args);
        });
    }

    public add_observer(observer:Observer):void {
        const observer_index = this.observers.indexOf(observer);
        if(observer_index === -1) this.observers.push(observer);
    }

    public remove_observer(observer:Observer):void {
        const observer_index = this.observers.indexOf(observer);
        if(observer_index !== -1) this.observers.splice(observer_index, 1);
    }
}
