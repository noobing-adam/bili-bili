const ms = require("ms")
const Embed = require("../tools/embed.js")
const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Bir kişiyi susturursunuz.")
   .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Susturacağınız kişi.')
			.setRequired(true)
                  )
  .addStringOption(option =>
		option.setName('süre')
			.setDescription('Kişinin ne kadar süre konuşamayacağı.')
			.setRequired(true)
                  )
  .addStringOption(option => 
                  option.setName("sebep")
                   .setDescription("Neden mutelediğinizin sebebi.")
                   .setRequired(false)
                  )
,execute(interaction, client) {
  let err = x => interaction.reply({embeds: [Embed(client.emoji("carpi")+" | Hata!", x, "error")], ephemeral: true})
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Yetersiz yetki.")
  let member = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
  let süre = interaction.options.getString("süre")
  let reason = interaction.options.getString("sebep")
  if(!reason) reason = "Sebep belirtilmedi"
if(member.user.id == interaction.user.id) return err("Kendini muteleyemezsin.")
if(!interaction.member.roles) return;
  if(member.user.id == client.user.id) return err("Botu muteleyemezsin.")
  if(interaction.member.roles.highest.position < member.roles.highest.position) return err("Rolleri senin rollerinden daha üstün bir kullanıcıyı susturamazsın.")
  member.timeout(require("ms")(süre), reason).then(() => {
    let i = x => !x.name.includes(x)
    let log = interaction.guild.channels.cache.get("939970125052919874")
    let yetkisi = interaction.member.roles.cache.filter(x => !x.name.includes("Dansei") || !x.name.includes("Josei") || !x.name.includes("Sorumlusu") || !x.name.includes("Renk") || !x.name.includes("For you penthos") || !x.name.includes("Partner görme") || !x.name.includes("Old but gold penthos") || !x.name.includes("V.I.P") || !x.name.includes("Sevgili") || !x.name.includes("🎮"))
    log.send({ embeds: [Embed("Bir kişi mutelendi.", "Bir yetkili tarafından susturuldu.", "#f0f0f0").addField("Muteleyen yetkili", interaction.user.toString()).addField("Mutelenen kişi", member.user.toString()).addField("Süre", moment.duration(ms(süre)).format("w [hafta], d [gün], h [saat], m [dakika], s [saniye]").toString()).addField("Sebep:",`${reason}`)]})
interaction.reply({embeds: [Embed("Başarıyla mute atıldı.",member.user.toString() + " kişisi " + reason + " sebebiyle " + moment.duration(ms(süre)).format("w [hafta], d [gün], h [saat], m [dakika], s [saniye]").toString() + " süresince susturuldu.","")]})
  })
 }
}  