import { Message, MessageEmbed } from "discord.js";
import Command from "../Command";

export default class Ban extends Command {
    readonly name = "ban";
    readonly description = "Banea a un usuario mencionado del servidor";
    readonly alias = ["banear"];
    readonly permission = "BAN_MEMBERS";

    async executed(message: Message, userStr: string | undefined, ...args: string[]) {
        if (!message.guild?.me!.hasPermission("BAN_MEMBERS")) return message.reply("`❌|` No tengo permisos de banear en este servidor");
        if (!userStr) return message.channel.send("`❌|` No colocaste nada. Coloca una ID o menciona al usuario a banear.");

        let user = message.mentions.members!.first() || message.guild.members.cache.get(userStr);
        let bReason = args.join(" ");

        if (!user) return message.channel.send("`❌|` No pude encontrar al usuario");
        let rolMod = message.member?.roles.cache.array().sort((a, b) => b.position - a.position)![0]!;
        let rolUser = user.roles.cache.array().sort((a, b) => b.position - a.position)![0]!;
        if (user.user.id == message.author.id) return message.channel.send("`❌|` ¡¿Por qué quieres banearte?!");
        if (message.guild.owner && user.user.id == message.guild.owner.id)
            return message.channel.send("`⛔|` ¡¿Por qué quieres banear al propietario?! Eso es... imposible.");
        if (!user.bannable) return message.channel.send("`⛔|` No puedo banear al usuario. Es probable que tenga un rol mayor que el mío.");
        if (rolMod.position <= rolUser.position) return message.channel.send("`⛔|` No se puede banear al usuario. Tiene un rol mayor o igual que el tuyo.");
        bReason = bReason || "Ninguna.";

        message.delete();
        let embed = new MessageEmbed().setDescription(`Se baneó a ${user.user.tag}`).addField("Razón", bReason).setColor("#AE0000").setTimestamp();

        try {
            await message.guild.members.ban(user.user.id, {
                reason: `${message.author.tag} | ${bReason}`,
            });
        } catch (error) {
            return message.channel.send("`⛔|` No puedo banear al usuario. Es probable que tenga un rol mayor que el mío.");
        }

        let embedDM = embed;
        user.send(embedDM.addField("Servidor", message.guild.name).setThumbnail(message.guild.iconURL({ dynamic: true })!)).catch(() =>
            message.channel.send("`❌|` No puedo enviar mensajes privados al usuario.")
        );

        return message.channel.send(embed);
    }
}
