const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Sunucu istatistiklerine bakarsınız."),
 execute(interaction, client) {
let offline = interaction.guild.members.cache.filter(x => !x.user.bot && (!x.presence || !x.presence.status || x.presence.status == "offline")).size.toString()
let online = interaction.guild.members.cache.filter(x => !x.user.bot && x.presence && x.presence.status && (x.presence.status == "online" || x.presence.status == "idle" || x.presence.status == "dnd")).size.toString() 
let boost = interaction.guild.premiumSubscriptionCount.toString()
let booster = interaction.guild.members.cache.filter(x => x.roles.cache.find(x => x.name.toLowerCase("tr").includes("booster"))).size.toString()
let ses = interaction.guild.members.cache.filter(x => !x.user.bot && x.voice.channel && x.voice.channel.id).size.toString()
let kanalbul = y => interaction.guild.channels.cache.filter(x => x.type == y).size
let kanal = `Kategori: ${kanalbul("GUILD_CATEGORY")} ,Yazı: ${kanalbul("GUILD_TEXT")} ,Ses: ${kanalbul("GUILD_VOICE")}`
let embed = require("../tools/embed.js")("Sunucu istatisikleri","Ad: " + interaction.guild.name,"info")
embed.addField("Online üye sayısı",online)
embed.addField("Offline üye sayısı",offline)
embed.addField("Boost sayısı",boost)
embed.addField("Booster sayısı",booster)
embed.addField("Ses kanalında üye sayısı",ses)
embed.addField("Kanal sayısı:", kanal)
interaction.reply({embeds: [embed]})
}
}  