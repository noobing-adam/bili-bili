const db = require("quick.db")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const {MessageActionRow, MessageButton} = Discord
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
  .setName("öneri")
  .setDescription("öneri yaparsınız")
  .addStringOption(option =>
		option.setName('öneri')
			.setDescription('öneriniz.')
			.setRequired(true)
                  ),
 execute(interaction, client) {
   let Embed = require("../tools/embed.js")
let dön = x => {
  if(x.includes("Eksik Argüman Tespit Edildi")) interaction.reply({ embeds: [Embed("Eksik argüman tespit edildi. tespit edildi.", `${client.emoji("carpi")} | ` + x)], ephemeral: true })
else interaction.reply({ embeds: [Embed("Hata tespit edildi.", client.emoji("carpi") + " | " + x)]})
}

let time = db.fetch("öneri_" + interaction.user.id)
if(time >= Date.now()) return dön("Öneri yapmak için " + moment.duration(time-Date.now()).format("m [dakika], s [saniye beklemelisin.]"))
let öneri = interaction.options.getString("öneri")
let buttons = new MessageActionRow()
.addComponents(
new MessageButton()
  .setCustomId("like")
  .setLabel("Destekliyorum")
  .setStyle("SUCCESS")
  .setEmoji("✅")
)
.addComponents(
new MessageButton()
  .setCustomId("sevmedim")
  .setLabel("Desteklemiyorum")
  .setStyle("DANGER") 
  .setEmoji("❌")
)
let embed = Embed("Yeni bir öneri yapıldı","bura gg","info") // neden gg
.addField("Önerisi: ", öneri)
.addField("Öneri yapan: ", interaction.user.toString())
.setDescription("Like sayısı: 0\nDislike sayısı: 0")
client.channels.cache.get("945010231958720562").send({embeds: [embed], components: [buttons]}) 
}
}