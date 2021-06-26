import { BotProperties } from "@enzodiazdev/bottie";

export default interface FaztBotProperties extends BotProperties {
    prefix: string;
    guild_allowed: string;
}
