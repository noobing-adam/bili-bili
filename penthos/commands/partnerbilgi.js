const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("partnerlog")
    .setDescription("Partner bilgilerine bakarsınız.")
    .addUserOption(option => 
  option.setName("kişi")
  .setDescription("Partner bilgilerine bakacağınız kişi")
  .setRequired(false)
)
,execute(interaction, client) {
const { createPages } = require("../tools/epages.js")(client)
let err = x => interaction.reply({embeds: [Embed("Hata!", x, "error")], ephemeral: true})
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Yetersiz yetki.")
let user = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
let embeds = []
let i = 0
let partnerlikler = db.fetch("partners_" + user.id)
if(!partnerlikler || partnerlikler == []) return err("Kişinin bir partnerlik bilgisi bulunamadı.")
partnerlikler = partnerlikler.sort(function(a, b){return a.partners - b.partners})
partnerlikler = partnerlikler.reverse();
partnerlikler.forEach(partner => {
let mesaj = "https://discord.com/channels/939970119193481246/939970125904375819/" + partner.msg
let em = Embed("Partner log",user.toString() + " kişisinin yaptığı " + partner.partners + ". partnerlik gösteriliyor.","info")
.addField("Text davet linki içeriyormu:",partner.davet)
.addField("Text gif içeriyormu:", partner.gif)
.addField("Mesaj:", mesaj)
embeds.push(em)
})
setTimeout(() => {
if(!embeds || embeds == undefined || embeds == null || embeds == []) return err("Kişinin yaptığı herhangi bir partnerlik bilgisi bulunamadı.")
interaction.reply("Aşağıdaki embedden bilgilere bakabilirsin.\n**Kişinin toplam `" + embeds.length + "` partnerliği var.**")
setTimeout(() => {
createPages(interaction, embeds, "👉", "👈", "❌")
}, 300)
}, 100)
}
}  