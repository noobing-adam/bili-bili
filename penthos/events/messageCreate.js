module.exports = client => {
  
  const Embed = require("../tools/embed.js")
  const db = require("quick.db")
  client.on("messageCreate", message => {
if(message.author.bot) return;
if(db.fetch("afk_" + message.author.id)){
let data = db.fetch("afk_" + message.author.id)
db.delete("afk_" + message.author.id)
let embed = Embed("Başarıyla afk modundan çıkış yaptın.",`<t:${data.time}:R> ${data.reason} sebebiyle afk olmuştun.`,"info", "no")
message.reply({embeds: [embed]})
}
      if(!message.mentions.users.first()) return
let ehi = message.mentions.users
ehi.forEach(x => {
if(db.fetch("afk_" + x.id)){  
message.reply({ content: message.author.toString() ,embeds: [Embed("Kişi afk.", `${x} kullanıcısı, <t:${db.fetch("afk_" + x.id).time}:R> afk oldu, **${db.fetch("afk_"+ x.id).reason}** sebebi ile afk.`, "info","no")]})
}
})
    }) 
   
}