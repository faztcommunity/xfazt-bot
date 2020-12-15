import { Message } from "discord.js";

interface OnMessageObserver {
    notify(message:Message):void;
}

export default OnMessageObserver;
