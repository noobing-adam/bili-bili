module.exports = client => {
  client.on("messageCreate", message => {
    
    let d = require("discord.js")
       let jail = x => {
      let member = message.guild.members.cache.get(x)
      if(!member) return message.channel.send("Bu kullanıcı bulunamadı.")
message.reply("Reklam yapma lütfen `Çok fazla reklam yaptığın için seni jaile atıyorum.`").then(msg => {
setTimeout(() => {
      let jailRole = message.guild.roles.cache.get("939970119243817070") 
let roles = []
member.roles.cache.forEach(role => {
roles.push(role.id) 
member.roles.remove(role.id).catch(err => {})
})
      member.roles.add(jailRole.id).catch(err => {})
setTimeout(() => {
db.set("jail_" + member.user.id, {time: eval(Date.now() + (6 * 60 * 60 * 1000)), roles: roles, reason: "reklam"})
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kişisi reklam yaptığından jaile atıldı.")
msg.delete()
}, 3100)
}, 3000)
})
       }
    let timeout = (id, süre, sebep) => {
      if(!id) return message.member.send("Bir id girin")
      if(!süre) return message.member.send("Bir süre girin.")
      if(!sebep) return message.member.send("Bir sebep girin.")
      let member = message.guild.members.cache.get(id)
      member.timeout(süre,sebep)
      
  }
const db = require("quick.db")
const Embed = require("../tools/embed.js")
if(!db.fetch("reklam_" + message.author.id)) db.set("reklam_" + message.author.id, 0) 
   let array =  [
        "discord.app",
        "discord.gg",
        "discordapp",
        "discord gg",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        ".party",
        ".rf.gd",
        ".az",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        ".rf",
        ".gd",
        ".az",
        ".party",
        ".gf",
        ".co",
        ".tc",
        ".cm",
        ".org",
        ".gq",
        ".ml",
        ".me",
        ".xyz",
        ".eu",
        ".ch",
        ".rf"
      ];
if(!message.member) return;
if(message.channel.id == "939970125904375819") return;
if(message.member.permissions.has("ADMINISTRATOR")) return
  if(!array.some(x => message.content.includes(x)) || message.author.bot) return
  let warns = db.fetch("reklam_" + message.author.id) +1
message.member.send({ embeds: [Embed(`${client.emoji("unlem")} **${message.guild.name}** sunucusunda uyarıldın.`, `${message.author}, reklam yaptığın için bu sunucuda uyarıldın. Toplam \`${warns}\` kez reklam yapmışsın.`, "warn")]})  
message.delete()

    var mutelog = message.guild.channels.cache.get("939970125052919874")
    
    var jaillog = message.guild.channels.cache.get("939970120468553804")
   if(warns == 5) {
    
    mutelog.send({ embeds: [Embed("Bir kişi mutelendi.", "Bot tarafından AutoGuard ile susturuldu.", "#f0f0f0").addField("Susturulan kişi:", message.author + `, 5 kez reklam yaptığı için susturuldu.`)]})
    timeout(message.author.id, 1800000, "5 kez reklam yapmak.")
    
} else if(warns == 10) {
    mutelog.send({ embeds: [Embed("Bir kişi mutelendi.", "Bot tarafından AutoGuard ile susturuldu").addField("Susturulan kişi:", message.author + `, 10 kez reklam yaptığı için susturuldu.`)]})
   timeout(message.author.id, 3600000, "10 kez reklam yapmak.")
 } else if(warns == 20) {
  
  jaillog.send({ embeds: [Embed("Bir kişi hapse girdi.", "Bot tarafından AutoGuard ile hapse atıldı.").addField("Hapse atılan kişi:", message.author + `, 20 kez reklam yaptığı için hapse atıldı.`)]})
  jail(message.author.id)  
   message.guild.channels.cache.get("939970120468553802").send({ content: message.author,embeds: [Embed("Yeni mahkum geldi!", "Aranıza AutoGuard ile yeni gelen arkadaşınıza merhaba deyin <@&939970119243817070>!", "info")]})
} else if(warns == 30) {
  message.member.ban({reason: "30 reklam yapmak."})
  message.guild.channels.cache.get("939970125539455027").send({ embeds: [Embed("Bir kullanıcı yasaklandı.", `${message.author.username} adlı kullanıcı 30 kere reklam yaptığı için yasaklandı.`)]}) 
} 
db.add("reklam_" + message.author.id, 1)
}, 100)
}