module.exports = client => {
  client.on("messageCreate", message => {
    if(!message.member) return;
if(message.member.permissions.has("ADMINISTRATOR")) return;
    let d = require("discord.js")
       let jail = x => {
      let member = message.guild.members.cache.get(x)
      if(!member) return message.channel.send("Bu kullanıcı bulunamadı.")
message.reply("Küfür etme lütfen `Çok fazla küfür ettiğin için seni jaile atıyorum.`").then(msg => {
setTimeout(() => {
      let jailRole = message.guild.roles.cache.get("939970119243817070") 
let roles = []
member.roles.cache.forEach(role => {
roles.push(role.id) 
member.roles.remove(role.id).catch(err => {})
})
      member.roles.add(jailRole.id).catch(err => {})
setTimeout(() => {
db.set("jail_" + member.user.id, {time: eval(Date.now() + (6 * 60 * 60 * 1000)), roles: roles, reason: "küfür"})
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kişisi küfür ettiğinden jaile atıldı.")
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
if(!db.fetch("küfür_" + message.author.id)) db.set("küfür_" + message.author.id, 0) 
   let array =  [
        "mq",
        "aq",
        "mına koyim",
        "ına koyim",
        "ına koyayım",
        "ina koyayım",
        "ına koyayim",
        "ina koyayim",
        "mina koyim",
        "amine",
        "döl",
        "sg",
        "oç",
        "oçe",
        "ananı sikim",
        "anneni sikim",
        "anneni sikeyim",
        "ananı sikeyim",
        "ağzına",
        "ağzına sıçim",
        "ağzına sıçayım",
        "ağzına s",
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yara",
        "yarra",
        "yarrak",
        "yarak",
        "amcık",
        "orospu",
        "orosbu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşak",
        "daşşak",
        "sikm",
        "sikim",
        "sikmm",
        "skim",
        "skm",
        "sg",
        "öç",
        "AQ",
        "AQI",
        "AQİ",
        "shit"
      ]
let content = message.content.toLowerCase().split("¡").join("i")
let content2 = content
let üç = content
let sayı = 0
let tür = 0
for(sayı; array.some(x => content.includes(x)); sayı++){
content = content.replace(array.filter(x => content.includes(x))[0], "")
content2 = content2.split(array.filter(x => content.includes(x))[0]).join("")
if(content2 !== üç){
tür++
üç = content2
} 
}
setTimeout(() => {

  if(sayı == 0 || !array.some(x => message.content.toLowerCase().includes(x)) || message.author.bot) return
  let warns = db.fetch("küfür_" + message.author.id) +1
message.member.send({ embeds: [Embed(`${client.emoji("unlem")} **${message.guild.name}** sunucusunda uyarıldın.`, `${message.author}, küfür ettiğin için bu sunucuda uyarıldın. Toplam \`${warns}\` kez küfür etmişsin.`, "warn")]})  
message.delete()
    var mutelog = message.guild.channels.cache.get("939970125052919874")
    
    var jaillog = message.guild.channels.cache.get("939970120468553804")
   if(warns == 5) {
    
    mutelog.send({ embeds: [Embed("Bir kişi mutelendi.", "Bot tarafından AutoGuard ile susturuldu.", "#f0f0f0").addField("Susturulan kişi:", message.author + `, 5 kez küfür ettiği için susturuldu.`)]})
    timeout(message.author.id, 1800000, "5 kez Küfür etmek.")
    
} else if(warns == 10) {
    mutelog.send({ embeds: [Embed("Bir kişi mutelendi.", "Bot tarafından AutoGuard ile susturuldu").addField("Susturulan kişi:", message.author + `, 10 kez küfür ettiği için susturuldu.`)]})
   timeout(message.author.id, 3600000, "10 kez Küfür etmek.")
 } else if(warns == 20) {
  
  jaillog.send({ embeds: [Embed("Bir kişi hapse girdi.", "Bot tarafından AutoGuard ile hapse atıldı.").addField("Hapse atılan kişi:", message.author + `, 20 kez küfür ettiği için hapse atıldı.`)]})
  jail(message.author.id)  
   message.guild.channels.cache.get("939970120468553802").send({ content: message.author.toString(),embeds: [Embed("Yeni mahkum geldi!", "Aranıza AutoGuard ile yeni gelen arkadaşınıza merhaba deyin <@&939970119243817070>!", "info")]})
} else if(warns == 30) {
  message.member.ban({reason: "30 küfür etmek."})
  message.guild.channels.cache.get("939970125539455027").send({ embeds: [Embed("Bir kullanıcı yasaklandı.", `${message.author.username} adlı kullanıcı 30 kere küfür ettiği için yasaklandı.`)]}) 
} 
db.add("küfür_" + message.author.id, 1)
}, 100)
})
}