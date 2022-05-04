const db = require("quick.db")
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
data: new SlashCommandBuilder()
  .setName("eval")
  .setDescription("Kod test")
  .setDefaultPermission(true)
  .addStringOption(option =>
		option.setName('kod')
			.setDescription('Test etmek istediğiniz kod.')
			.setRequired(true)
                  ),
execute(interaction, client) { 
   let Embed = require("../tools/embed.js")
   let {login, leave} = require("../tools/voice.js")(client)
   
    if (interaction.user.id !== "658665326258683932" && interaction.user.id !== "829778241396408360") return interaction.reply("knk bunu sadece sahibim kullanabilir")
      try { 
    let codein = interaction.options.getString("kod").split("message.author").join("interaction.user").split("message.user").join("interaction.user").split("message.reply").join("interaction.reply")
    let code = eval(codein)
    if(code !== undefined && code !== null && code.length > 2000) return interaction.reply({embeds: [Embed("Bu kodun sonucu çok büyük çıktı.","Kodun sonucu çok uzun çıktığı için sonuç konsola yazdırıldı.","warn")]})
    if (codein.length < 1) return interaction.reply('Bir kod girmelisin !')
    if (typeof code !== 'string')    
      code = require('util').inspect(code, { depth: 0 });
code = code.split(process.env.token).join("Token")
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Kod', `\`\`\`js\n${codein}\n\`\`\``)
    .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\``)
    interaction.reply({embeds: [embed]}).catch(err => {
interaction.followUp({embeds: [embed]}).catch(err => {
interaction.channel.send({embeds: [embed]})
interaction.channel.send("eval hata verdi.\nHata:" + err.message)
})
})
  } catch(e) {
    let embed2 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Hata', " ``\`js\n"+e+"\n\`\`\`")
    interaction.reply({embeds: [embed2]}).catch(err => {
interaction.followUp({embeds: [embed2]}).catch(err => {
interaction.channel.send({embeds: [embed2]})
interaction.channel.send("eval hata verdi.\nHata:" + err.message)
})
})

  }

}
}