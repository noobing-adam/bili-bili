const db = require("quick.db")
const Embed = require("../tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
data: new SlashCommandBuilder()
  .setName("erkek")
  .setDescription("Kişiyi erkek olarak kaydedersiniz")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Kayıt edeceğiniz kişi.')
			.setRequired(true)
                  )
  .addStringOption(option =>
		option.setName('isim')
			.setDescription('Kişinin ismi.')
			.setRequired(true)
                  ) 
  .addIntegerOption(option =>
		option.setName('yaş')
			.setDescription('Kişinini yaşı.')
			.setRequired(true)
                  ),


 execute(interaction, client) {
 
  let db = require("quick.db")
  if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.get(db.fetch("sistem_" + interaction.guild.id).yetkili)) return interaction.reply({ embeds: [Embed("Eksik yetkiler.", "Eksik yetkilere sahipsin.", "error")]})
  let mentioned = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
if(db.fetch("kayıt_" + interaction.guild.id + "_" + mentioned.user.id) == true) return interaction.reply({ embeds: [Embed("Bir hata ile karşılaşıldı","Kayıt olan bir kullanıcıyı 2. kere kayıt edemezsiniz.","error")]})
  let isim = interaction.options.getString("isim")
let text2 = [];
isim = isim.split("");
for(let i = 0; i < isim.length; i++){
if(i == 0){ 
text2.push(isim[i].toLocaleUpperCase("tr"))
} else {
text2.push(isim[i].toLocaleLowerCase("tr"))
}
} 
isim = text2.join("")
  let yaş = interaction.options.getInteger("yaş")
mentioned.roles.remove(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).kayıtsız)).catch(err => {})
mentioned.roles.add(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).erkek)).catch(err => {
  return interaction.reply({ embeds: [Embed("Hata tespit edildi.", "Kullanıcıya rol verilemedi.", "error")]})
  console.error(err)
})
mentioned.setNickname(`${db.fetch(`sistem_`+ interaction.guild.id).tag} ${isim} ${db.fetch(`sistem_`+ interaction.guild.id).ara} ${yaş}`).catch(err => {})

db.set("kayıt_" + interaction.guild.id + "_" + mentioned.user.id, true)
interaction.reply({ embeds: [Embed("Bir kişi erkek olarak kaydedildi.", "Bilgiler verilmiştir.", "info").addField(`Kayıt edilen kişi`, `${mentioned}`).addField(`Kayıt edilen kişinin adı`, `${isim}`).addField(`Kayıt edilen kişinin yaşı`, `${yaş}`)]})

let log = client.channels.cache.get(db.fetch("sistem_" + interaction.guild.id).kanal2)
let embed = Embed("Yeni bir kişi kayıt oldu.","Aramıza hoşgeldin <@" + mentioned.user.id + ">","info").addField("Cinsiyet:","Erkek").addField("Kayıt eden yetkili:", interaction.user.toString())
log.send({embeds: [embed]})
setTimeout(() => {
mentioned.roles.remove(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).kayıtsız)).catch(err => {})
mentioned.roles.add(interaction.guild.roles.cache.get(db.fetch(`sistem_`+ interaction.guild.id).erkek)).catch(err => {})
}, 5000)   
}
}