const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("unjail")
    .setDescription("Kişiyi hapse atarsınız.")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Hapisten çıkaracağınız kişi.')
			.setRequired(true)
                  )
,execute(interaction, client) {
let err = x => interaction.reply({embeds: [Embed("Hata!", x, "error")], ephemeral: true})
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Yetersiz yetki.")
let user = interaction.options.getUser("kişi")
let member = interaction.guild.members.cache.get(user.id)
if(!db.fetch("jail_" + user.id)) return err("Kişi zaten jailde değil.")
let roles = db.fetch("jail_" + user.id).roles
interaction.reply({embeds: [Embed("Kişi başarıyla jailden çıkarıldı.",user.toString() + " kişisi başarıyla hapisten çıkarıldı.","info")]})
roles.forEach(x => member.roles.add(x).catch(err => {}))
member.roles.remove("939970119243817070").catch(err => {})
db.set("jail_" + user.id, {time: Date.now(), roles: roles})
}
}  