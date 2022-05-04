const db = require("quick.db")
const Embed = require("../tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
data: new SlashCommandBuilder()
  .setName("kayıtsil")
  .setDescription("Kayıt silersiniz")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Kaydını sileceğiniz kişi.')
			.setRequired(true)
                  ),
 execute(interaction, client) {
  let db = require("quick.db")
  if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.get(db.fetch("sistem_" + interaction.guild.id).yetkili)) return interaction.reply({ embeds: [Embed("Eksik yetkiler.", "Eksik yetkilere sahipsin.", "error")]})
  let mentioned = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
if(db.fetch("kayıt_" + interaction.guild.id + "_" + mentioned.user.id) !== true) return interaction.reply({ embeds: [Embed("Bir hata ile karşılaşıldı","Kişi zaten kayıt edilmemiş.","error")]})
db.delete("kayıt_" + interaction.guild.id + "_" + mentioned.user.id)   
mentioned.roles.remove(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).erkek)).catch(err => {})
mentioned.roles.remove(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).kız)).catch(err => {})
mentioned.roles.add(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).kayıtsız)).catch(err => {})
mentioned.setNickname(null).catch(err => {})
interaction.reply({embeds: [Embed(`Başarıyla ${mentioned.user.tag} kişinin kaydı silindi.`,"Artık kişi birdaha kaydedilebilir.","info")]})
}
}