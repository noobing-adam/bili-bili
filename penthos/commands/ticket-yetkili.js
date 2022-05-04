const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")
const Embed = require("../tools/embed.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
data: new SlashCommandBuilder()
    .setName("ticket-yetkili")
    .setDescription("Ticket yetkililerini ayarlarsınız.")
  .addStringOption(option =>
		option.setName('işlem')
			.setDescription('role yapacağınız işlem.')
			.setRequired(true)
.addChoice("ekle","ekle")
.addChoice("çıkar","çıkar")
)
  .addRoleOption(option =>
		option.setName('rol')
			.setDescription('Yetkili rolü olarak ayarlayacağınız rol.')
			.setRequired(true))

,execute(interaction, client){
  //test

let err = x => interaction.reply({embeds: [Embed("Hata!", x, "error")], ephemeral: true})
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Yetersiz yetki.")
let yetkililer = db.fetch("yetkililer")
if(!yetkililer){ 
db.set("yetkililer", ["for an array error","for an array error"]) 
yetkililer = ["for an array error","for an array error"]
}
let rol = interaction.options.getRole("rol")
let işlem = interaction.options.getString("işlem")
if(işlem == "ekle"){
if(yetkililer.some(x => x == rol.id)) return err("Kişi Zaten ticket yetkilisi olarak ayarlı.")
db.push("yetkililer", rol.id)
interaction.reply({embeds: [Embed("Rol başarıyla ticket yetkisi olarak ayarlandı.",rol.toString() + " rolünde olan kişiler artık ticket'ları görebilecek.","info")]})
} else if(işlem == "çıkar"){
if(!yetkililer.some(x => x == rol.id)) return err("Kişi Zaten ticket yetkilisi olarak ayarlı değil.")
let news = []
yetkililer.forEach(role => {
if(role == rol.id) return 
news.push(role.id)
})
setTimeout(() => {
db.set("yetkililer", news)
interaction.reply({embeds: [Embed("Rol başarıyla ticket yetkilisi değil olarak ayarlandı.",rol.toString() + " rolünde olan kişiler artık ticket'ları göremeyecek.","info")]})
}, 50)
}
}
}  