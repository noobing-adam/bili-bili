const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("jail")
    .setDescription("Kişiyi hapse atarsınız.")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Hapse atacağınız kişi.')
			.setRequired(true)
                  )
  .addStringOption(option =>
		option.setName('süre')
			.setDescription('Kişinin hapiste ne kadar süre kalacağı.')
			.setRequired(true)
                  )
  .addStringOption(option =>
		option.setName('sebep')
			.setDescription('Kişinin hapise atılma sebebi.')
)
,execute(interaction, client) {
let err = x => interaction.reply({embeds: [Embed("Hata!", x, "error")], ephemeral: true})
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Yetersiz yetki.")
let user = interaction.options.getUser("kişi")
let member = interaction.guild.members.cache.get(user.id)
let time = interaction.options.getString("süre")
let reason = interaction.options.getString("sebep")
reason = reason ? reason.toString() : "Sebep belirtilmedi"
let roles = [] 
if(!ms(time) || ms(time) == undefined || ms(time) == null) return err("Lütfen düzgün bir süre giriniz.")
if(db.fetch("jail_" + user.id)) return err("Kişi zaten jailde.")
interaction.reply({embeds: [Embed("Kişi başarıyla jaile atıldı.",user.toString() + " kişisi başarıyla " + reason + " sebebiyle " + moment.duration(ms(time)).format("d [gün], h [saat], m [dakika], s [saniye süreliğine hapse atıldı.]"),"info")]})
member.roles.cache.forEach(role => {
roles.push(role.id)
member.roles.remove(role.id).catch(err => {})
})
member.roles.add("939970119243817070").catch(err => {})
db.set("jail_" + user.id, {time: eval(Date.now() + ms(time)), roles: roles, sebep: reason})
client.channels.cache.get("939970120468553804").send(user.toString() + " kişisi " + reason + " sebebiyle " +  moment.duration(ms(time)).format("d [gün], h [saat], m [dakika], s [saniye süreliğine hapse atıldı.]"))
}
}  