const Discord = require("discord.js")
const { Permissions } = Discord
const db = require("quick.db")
const Embed = require("../tools/embed.js")
module.exports = (client) => {
client.on("interactionCreate", (i) => {
let err = x => i.reply({embeds: [Embed("Hata!",x,"error")]})
if(!i.isButton()) return;
if(!db.fetch("likes_" + i.message.id)) db.set("likes_" + i.message.id, ["for an array error","for an array error"])
if(!db.fetch("dislikes_" + i.message.id)) db.set("dislikes_" + i.message.id, ["for an array error","for an array error"])
let likes = db.fetch("likes_" + i.message.id)
let dislikes = db.fetch("dislikes_" + i.message.id)
if(i.customId.includes("sevmedim")){
let msg = i.message
let embed = msg.embeds[0]
if(dislikes.includes(i.user.id)) return i.reply({content: "Zaten dislike vermişsin", ephemeral: true})
db.push("dislikes_" + msg.id, i.user.id)
let eiy2 = []
db.fetch("likes_" + msg.id).forEach(x => {
if(x == i.user.id) return
eiy2.push(x)
})
setTimeout(() => {
db.set("likes_" + msg.id, eiy2)
setTimeout(() => {
msg.edit({embeds: [embed.setDescription(`Like sayısı: ${db.fetch("likes_" + msg.id).length -2}\nDislike sayısı: ${db.fetch("dislikes_" + msg.id).length -2}`)]})
i.reply({content: "Başarıyla dislike verdiniz.", ephemeral: true})
}, 200)
}, 100)
} else if(i.customId == "like"){
if(i.customId == "like"){
  let int = i.message
  let embed = i.message.embeds[0]  
if(likes.includes(i.user.id)) return i.reply({content: "Zaten like vermişsin", ephemeral: true})
db.push("likes_" + int.id, i.user.id)
let eiy = []
db.fetch("likes_" + int.id).forEach(x => {
if(x == i.user.id) return
eiy.push(x)
})
setTimeout(() => {
db.set("dislikes_" + int.id, eiy)
setTimeout(() => {
int.edit({embeds: [embed.setDescription(`Like sayısı: ${db.fetch("likes_" + int.id).length -2}\nDislike sayısı: ${db.fetch("dislikes_" + int.id).length -2}`)]})
i.reply({content: "Başarıyla like verdiniz.", ephemeral: true})
}, 100)
}, 50)
} 
} else if(i.customId == "openTicket") {
let i2 = db.fetch("ticketCount") ? db.fetch("ticketCount") : 1
if(i2 == 1) db.set("ticketCount", 1)
let chn = client.channels.cache.get(db.fetch("ticket_" + i.user.id)) ? client.channels.cache.get(db.fetch("ticket_" + i.user.id)).toString() : "kanal bulunamadı"
if(db.has("ticket_" + i.user.id)) return i.reply({content: `Zaten hazırda açık olan bir ticketın var.\n${chn}`,ephemeral: true})
let permissions = []
let yetkililer = db.fetch(`yetkililer`) 
if(yetkililer){
yetkililer.forEach(yetkili => {
if(!yetkili || yetkili == "" || yetkili == "for an array error") return;
if(yetkili == undefined) return;
permissions.push({
id: yetkili,
allow: [Permissions.FLAGS.VIEW_CHANNEL],
})
})
permissions.push({
id: i.user.id,
allow: [Permissions.FLAGS.VIEW_CHANNEL],
})
permissions.push({
id: i.guild.id,
deny: [Permissions.FLAGS.VIEW_CHANNEL],
})

}

setTimeout(() => {
i.guild.channels.create("ticket_" + i2, {
  type: 'GUILD_TEXT',
  permissionOverwrites: permissions, 
  topic: `${i.user.toString()} adlı kullanıcının ticketi`,
  nsfw: false,
  position: 1,
  rateLimitPerUser: 1,
}).then(channel_ => {
channel_.setParent("939970119730364438",{lockPermissions: false})
let row = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
   .setLabel("Ticket Kapat")
   .setStyle("PRIMARY")
   .setCustomId("closeticket") 
   .setEmoji("❌")
)
    i.guild.channels.cache.get(channel_.id).send({ content: "**" + i.user.toString()+" ticket başarıyla oluşturuldu.**, ",embeds: [require("../tools/embed.js")("Ticket oluşturuldu.", `${client.emoji("tik")} | Başarı ile ${i.user.toString()} adlı kullanıcının ticket'ı oluşturuldu. Unutma ${i.user.toString()}, eğer birini şikayet edeceksen bir kanıtın olmalı.`,"info")], components: [row]})
db.add("ticketCount", 1)
db.set("ticket_" + i.user.id, channel_.id)
db.set(channel_.id, i.user.id)
i.reply({content: `Başarıyla ticketınız oluşturuldu. ${channel_.toString()}`, ephemeral: true})
})
}, 2000)
   
} else if(i.customId == "closeticket"){
let permissions = []
let yetkililer = db.fetch(`yetkililer`) 
yetkililer.forEach(yetkili => {
if(!yetkili || yetkili == "" || yetkili == "for an array error") return;
if(yetkili == undefined) return;
permissions.push({
       id: yetkili,
       allow: [Permissions.FLAGS.VIEW_CHANNEL],
})
})
permissions.push({
       id: i.user.id,
       deny: [Permissions.FLAGS.VIEW_CHANNEL],
})
permissions.push({
       id: i.guild.id,
       deny: [Permissions.FLAGS.VIEW_CHANNEL],
})
i.channel.edit({permissionOverwrites: permissions})
i.reply("Ticket kapatılıyor.")
i.channel.send({embeds: [Embed("Ticket 3 saniye içinde kapatılacak.","Ticketı açan kişi artık ticketı göremeyecek.","info")]}).then((msg) => {
setTimeout(() => {
let row = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
                 .setLabel("Ticket Sil")
                 .setStyle("PRIMARY")
                 .setCustomId("deleteticket") 
                 .setEmoji("❌")
)
msg.edit({embeds: [Embed("Ticket başarıyla kapatıldı.","Kanalı silebilir veya ondan önce ticketa birdaha göz atabilirsiniz.","info")], components: [row]})
db.delete("ticket_" + db.fetch(i.channel.id))
}, 3000)
})

} else if(i.customId == "deleteticket"){
i.reply({embeds: [Embed("Ticket siliniyor.","hoop silindi.","info")]})
setTimeout(() => {
i.channel.delete()
}, 500)
} else if(i.customId.includes("kabul_")) {
let user = client.users.cache.get(i.customId.replace("kabul_", ""))
if(!user) return err("Kullanıcı bulunamadı.")
let filter = xxx => xxx.content.toLocaleLowerCase("tr").includes("partner sorumlusu") || xxx.content.toLocaleLowerCase("tr").includes("kayıt sorumlusu") || xxx.content.toLocaleLowerCase("tr").includes("chat sorumlusu") || xxx.content.toLocaleLowerCase("tr").includes("admin")
i.reply({ embeds: [Embed("Kullanıcının başvurusunu kabul ediyorsunuz.", "Şimdi kanal vermek istediğini rolleri arasına virgül koyarak yazın.\nRoller: partner sorumlusu, kayıt sorumlusu, chat sorumlusu, admin","info")]})
i.channel.awaitMessages({filter: filter, errors: ["time"], max:1, time:30000}).then(msg=> {
let şeys = ["partnersorumlusu","kayıtsorumlusu","chatsorumlusu", "admin"]
let mısıjı = [{e: "partnersorumlusu" , real: "Partner Sorumlusu"},{e: "kayıtsorumlusu" , real: "Kayıt Sorumlusu"},{e: "chatsorumlusu" , real: "Chat Sorumlusu"},{e: "admin" , real: "Admin"}]
let cevap = msg.first().content.split(" ").join("")
let array = []
if(!şeys.some(h => h == cevap.toLocaleLowerCase("tr"))){
cevap = cevap.split(",")
cevap.forEach(c => {
c = c.toLocaleLowerCase("tr")
if(!şeys.some(y => y == c) || array.includes(c)) return;
array.push(c.toLocaleLowerCase("tr"))
})
} else {
array.push(cevap.toLocaleLowerCase("tr"))       
}

setTimeout(() => {
let partnerRole = "939970119378018315"; 
let kayıtRole = "939970119378018316"
let chatRole = "939970119378018317"
let adminRole = "939970119378018322"
let a = "```"
if(array.length <1) return i.followUp("Girdiğin mesajda herhangi bir düzgün rol bulunamadı.")
let member = i.guild.members.cache.get(user.id)
array.forEach(role => {
if(role == "kayıtsorumlusu"){
member.roles.add(kayıtRole)
} else if(role == "partnersorumlusu"){
member.roles.add(partnerRole)
} else if(role == "chatsorumlusu"){
member.roles.add(chatRole)
} else if(role == "admin"){
member.roles.add(adminRole)
}
})
array = array.map(arra => mısıjı.find(x => x.e == arra).real)
setTimeout(() => {
let em = Embed(i.guild.name + " sunucusundaki yetkili alım başvurun onaylandı.","Bilgiler aşağıda verilmiştir.","info")
em.addField("Onaylayan yetkili:", i.user.toString() + `(id:${i.user.id}, Kullanıcı adı:${i.user.username})`)
em.addField("Verdiği roller:", array.join(", "))
em.addField("Extra bilgi:","O kadar aktifim yetkili alım başvurusu yaptım sadece küçük rolleri vermişler gibi şeyler demeyiniz. Yetkili olduktan sonra işinizi iyi yaparsanız yetkiniz artırılacaktır.")
user.send({embeds: [em]})
}, 4000)
i.followUp("başarıyla kişiye " + array.join(", ") + " rolleri verildi.")
}, 1000)     
}).catch(err => {console.error(err);i.followUp("Bir rol girmediğin için işlem iptal edildi.")})
  
} else if(i.customId.includes("red_")){
let user = client.users.cache.get(i.customId.replace("red_",""))
if(!user) return err("Kullanıcı bulunamadı.")
i.reply({embeds: [Embed("Başvurunun reddedilmesi için lütfen bir sebep giriniz.","Eğer 30 saniye içinde sebep girmezsenize sebep: `sebep belirtilmedi.` olarak işaretlenecektir.","info")], ephemeral: true})
let filter = x => x.author.id == i.user.id && x.content
i.channel.awaitMessages({filter: filter, errors: ["time"], max: 1, time: 30000}).then(collected => {
let reason = collected.first()
reason.delete()
reason = reason.content
client.users.cache.get(user.id).send(i.guild.name + " sunucusundaki yetkili başvurun reddedildi. Bilgiler aşağıda verilmiştir.")
let em = Embed("Reddedilme verileri çekildi.","Bilgiler aşağıda verilmiştir.","info")
em.addField("Reddeden yetkili:", i.user.toString() + `(id:${i.user.id}, Kullanıcı adı:${i.user.username})`)
em.addField("Reddetme sebebi:", reason)
client.users.cache.get(user.id).send({embeds: [em]})
i.followUp({embeds: [Embed("Başvuru reddedildi.", "Sebep " + reason + " olarak işaretlendi.").addField("Reddeden yetkili:", i.user.toString() + `(id:${i.user.id}, Kullanıcı adı:${i.user.username})`)]})
}).catch(err => {
let reason = "sebep belirtilmedi."
client.users.cache.get(user.id).send(i.guild.name + " sunucusundaki yetkili başvurun reddedildi. Bilgiler aşağıda verilmiştir.")
let em = Embed("Reddedilme verileri çekildi.","Bilgiler aşağıda verilmiştir.","info")
em.addField("Reddeden yetkili:", i.user.toString() + `(id:${i.user.id}, Kullanıcı adı:${i.user.username})`)
em.addField("Reddetme sebebi:", reason)
client.users.cache.get(user.id).send({embeds: [em]})
i.followUp({embeds: [Embed("Başvuru reddedildi.", "Sebep " + reason + " olarak işaretlendi.").addField("Reddeden yetkili:", i.user.toString() + `(id:${i.user.id}, Kullanıcı adı:${i.user.username})`)]})
})
} else if (i.customId == "katıl"){
let err = x => i.reply({ephemeral: true, embeds: [Embed("Hata!",x,"error")]})
let gw = db.fetch("giveaways").find(x => x.msg && x.msg == i.message.id)
if(!gw) return err("Bu çekiliş iptal edilmiş veya bitmiş.")
if(Date.now() > gw.time) return err("Bu çekiliş bitmiş.")
if(db.fetch(i.user.id + "_" + gw.msg)){
i.reply({content: "Çekilişten başarıyla ayrıldın.", ephemeral: true})
db.delete(i.user.id + "_" + gw.msg)
setTimeout(() => {
db.set("users_" + gw.msg, db.fetchAll().filter(x => !x.ID.includes("gw_") && !x.ID.includes("users") &&!x.ID.includes("likes") &&x.ID.includes("_" + gw.msg)).map(x => x.ID.replace("_" + gw.msg, "")))
}, 250)
return
}
i.reply({content: "Çekilişe başarıyla katıldın.",ephemeral: true})
db.set(i.user.id + "_" + gw.msg, true)
setTimeout(() => {
db.set("users_" + gw.msg, db.fetchAll().filter(x => !x.ID.includes("gw_") && !x.ID.includes("users") &&!x.ID.includes("likes") &&x.ID.includes("_" + gw.msg)).map(x => x.ID.replace("_" + gw.msg, "")))
}, 250)
}
})
}