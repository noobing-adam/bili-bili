const db = require("quick.db")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
data: new SlashCommandBuilder()
  .setName("roles")
  .setDescription("Rollerin kaç kişide olduğunu gösterir.")
  .addIntegerOption(option => 
		option.setName('kaç-rol')
			.setDescription('Kaç rol gösterileceğini seçin.')
			.setRequired(false)
  ),
  execute(interaction, client) {
    let Embed = require("../tools/embed.js")
    let err = x => interaction.reply({embeds:[Embed(`${client.emoji("carpi")} | Hata!`, x, "error")], ephemeral: true})
    let i = 0
    
    let kaçrol = interaction.options.getInteger("kaç-rol") 
if(!kaçrol) kaçrol = 20
let roles = interaction.guild.roles.cache.map(x => x).sort(function(a, b){return b.position - a.position})     
roles = roles.filter(x => !x.name.includes("-"))
let kod ="`"
let ehi = `${kod}${kod}${kod}
                       Roller\n
` 
if(kaçrol > 72) return err("Girdiğiniz sayı, gösterilebilecek rol sayısından fazla. Gösterilebilecek tüm rolleri görüntülemek için `72` olarak girmeniz gerekmektedir.") 
   for(i; i < kaçrol; i++){

ehi = ehi + `${roles[i].name}: ${roles[i].members.size} üyede var.\n`
}
setTimeout(() => {
ehi = ehi + `${kod}${kod}${kod}`
interaction.reply({content: ehi, ephemeral: true})
}, 75)
  }
}