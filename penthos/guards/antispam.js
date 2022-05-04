const db = require("quick.db")
module.exports = client => {
  
  client.on("messageCreate", message => {
    return "x"
if(!message.member) return;

    let jail = x => {
      let member = message.guild.members.cache.get(x)
      if(!member) return message.channel.send("Bu kullanıcı bulunamadı.")
message.reply("Spam yapma lütfen `Çok fazla spam yaptığın için seni jaile atıyorum.`").then(msg => {
setTimeout(() => {
      let jailRole = message.guild.roles.cache.get("939970119243817070") 
let roles = []
member.roles.cache.forEach(role => {
roles.push(role.id) 
member.roles.remove(role.id).catch(err => {})
})
      member.roles.add(jailRole.id).catch(err => {})
setTimeout(() => {
db.set("jail_" + member.user.id, {time: eval(Date.now() + (2 * 60 * 60 * 1000)), roles: roles, reason: "spam"})
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kişisi çok fazla spam yaptığından jaile atıldı.")
msg.delete()
}, 3100)
}, 3000)
})
    }
if(message.author.bot || message.member.permissions.has("ADMINISTRATOR")) return;
let spam = db.fetch("spam_" + message.author.id)
if(!spam) db.set("spam_" + message.author.id, {time: eval(Date.now() + 500), count: 0})
if(spam){
if(spam.time > Date.now()){
spam = db.set("spam_" + message.author.id, {time: eval(Date.now() + 500), count: (spam.count+1)})
if(spam.count = 5) message.member.timeout(60 * 1000, "can be spam level: 1")
if(spam.count = 10) message.member.timeout(120 * 1000, "can be spam level: 2")
if(spam.count = 20) jail(message.author.id)
message.reply(message.author.toString() + " spam yapma!").then(msg => {
setTimeout(() => {
msg.delete()
message.delete()
db.set("spam_" + message.author.id, {time: spam.time, count: (spam.count-1)})
}, 1000)
})
} else {
db.set("spam_" + message.author.id, {time: eval(Date.now() + 500), count: 0})
}


}

})
  
}