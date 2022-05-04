const Embed = require("../tools/embed.js")
const d = require("discord.js")
const db = require("quick.db")
const Builders =  require("@discordjs/builders")
module.exports = {
  data: new Builders.SlashCommandBuilder()
  .setName("afk")
  .setDescription("Afk kalırsınız.")
  .addStringOption(o => 
                  o
                   .setName("sebep")
                   .setDescription("Afk kalma sebebiniz.")
                   .setRequired(false)
                  )
  , execute(interaction, client ) {
    let sebep = interaction.options.getString("sebep") ? interaction.options.getString("sebep") : "Sebep belirtilmedi"
    interaction.reply({ embeds: [Embed("", `İşlem başarılı. Artık birisi seni etiketlediğinde, \`${sebep}\` diyeceğim!`, "info", "no")]})
    db.set("afk_" + interaction.user.id, { reason: sebep, time: Math.floor(Date.now() / 1000) })
  } 
}