import OnReadyObserver from "../OnReadyObserver";

export default class Ready implements OnReadyObserver {
    notify():void {
        console.log("Bot is ready");
    }
}
