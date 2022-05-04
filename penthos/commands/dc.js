const db = require("quick.db")
const Embed = require("../tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
data: new SlashCommandBuilder()
  .setName("doğruluk-cesaret")
  .setDescription("Doğruluk cesaret oynarsınız.")
,execute(interaction, client) {
let err = x => interaction.reply({embeds: [Embed("Hata!",x,"warn")], ephemeral: true})
if(!interaction.member.voice || !interaction.member.voice.channel) return err("Lütfen <#939970122406297634> ses kanalına giriniz.")
if(interaction.member.voice.channel.id !== "939970122406297634") return err("Lütfen <#939970122406297634> ses kanalına giriniz.")
let ses = interaction.guild.members.cache.filter(x => x.voice && x.voice.channel && x.voice.channel.id == "939970122406297634")
if(ses.length < 2) return err("Oynamak için en az iki kişi gerekir.")
let soran = ses.random()
let newses = []
ses.forEach(s => {
if(s == soran) return;
newses.push(s)
})
setTimeout(() => {
let sorulan = newses[0]
if(!sorulan) return err("Bir hata oluştu kişi seçilemedi.")
interaction.reply({embeds: [Embed("Doğruluk Cesaret başlıyor, Kişiler belirlendi.", soran + " kişisi " + sorulan.toString() + " kişisine soracak.","")]})
}, 50)
}
}