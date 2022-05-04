const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("eventlog")
    .setDescription("Son yapılan işlemlere bakarsınız.")
,execute(interaction, client) {
const { createPages } = require("../tools/epages.js")(client)
String.prototype.trActions = function(){
return this.replace("MESSAGE_DELETE", "Mesaj silme")
.replace("MEMBER_ROLE_UPDATE","Üye rolü güncelleme")
.replace("INVITE_CREATE","Davet oluşturma")
.replace("MEMBER_KICK","Üye atma")
.replace("MEMBER_BAN_ADD","Üye yasaklama")
.replace("GUILD_UPDATE","Sunucu güncelleme")
.replace("CHANNEL_CREATE","Kanal oluşturma")
.replace("CHANNEL_UPDATE","Kanal güncelleme")
.replace("CHANNEL_DELETE","Kanal silme")
.replace("CHANNEL_OVERWRITE_CREATE","Kanal izni oluşturma")
.replace("CHANNEL_OVERWRITE_UPDATE","Kanal izni güncelleme")
.replace("CHANNEL_OVERWRITE_DELETE","Kanal izni silme")
.replace("MEMBER_BAN_REMOVE","Üye yasağı kaldırma")
.replace("MEMBER_UPDATE","Üye güncelleme")
.replace("MEMBER_MOVE","Üyeyi sesli kanalda taşıma")
.replace("MEMBER_DISCONNECT","Üyenin sesli kanal bağlantısını kesme")
.replace("BOT_ADD","Bot ekleme")
.replace("ROLE_CREATE","Rol oluşturma")
.replace("ROLE_UPDATE","Rol güncelleme")
.replace("ROLE_DELETE","Rol silme")
.replace("INVITE_UPDATE","Davet güncelleme")
.replace("INVITE_DELETE","Davet silme")
.replace("WEBHOOK_CREATE","Webhook oluşturma")
.replace("WEBHOOK_DELETE","Webhook silme")
.replace("WEBHOOK_UPDATE","Webhook güncelleme")
.replace("EMOJI_CREATE","Emoji oluşturma")
.replace("EMOJI_DELETE","Emoji silme")
.replace("EMOJI_UPDATE","Emoji güncelleme")
.replace("MESSAGE_PIN","Mesaj sabitleme").replace("MESSAGE_UNPIN","Mesaj sabitlemesini kaldırma") + " işlemi"
}
let err = x => interaction.reply({embeds: [Embed("Hata!", x, "error")], ephemeral: true})
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Yetersiz yetki.")
let embeds = []
let i = 0
let reali = 0
let page = 1
interaction.guild.fetchAuditLogs({limit: 100}).then(entries => {
entries = entries.entries.map(x => x)
entries = entries.filter(x => x.executor && !x.executor.bot)
let embed = Embed("Event Log","Son yapılan işlemler gösteriliyor.Sayfa 1","info")
entries.forEach(entry => {
if(i > 14){
embeds.push(embed)
page += 1
embed = Embed("Event Log","Son yapılan işlemler gösteriliyor. Sayfa " + page,"info")
i = 0
}
i++
reali++
let yapan = entry.executor.toString()
let target = entry.target
let event = entry.action.trActions()
if(target){
embed.addField(eval(reali+1) + `. Event`, yapan + " kişisi " + target.toString() + " üzerinde " + event + " yaptı.")
} else {
embed.addField(eval(reali+1) + `. Event`, yapan + " kişisi " + event + " yaptı.")
}
})
if(!embeds|| embeds.length < 1 && embed.fields.length > 1){
embeds.push(embed)
}
setTimeout(() => {
if(!embeds || embeds.length < 1) return err("Bir hata oluştu.")
interaction.reply("Aşağıdaki embedden bilgilere bakabilirsin.")
setTimeout(() => {
createPages(interaction, embeds, "👉", "👈", "❌")
}, 400)
}, 200)
})
}
}  