const cmd = require("node-cmd") 
const db = require("quick.db")
const Discord = require("discord.js")
db.set("giveaways", ["for an array error", "for an array error"])
const fs = require("fs")
let ayarlar = require("./ayarlar.json")
let Embed = require("./tools/embed.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const client = new Discord.Client({intents: 32767}) 
Object.prototype.setYenilikler = function(options){
 let { yenilik } = options
  if(typeof options !== "object") throw new TypeError("Yanlış ayarlar tipi, bir *obje* belirtin.")
  if(!yenilik) throw new Error("Bir yenilik belirtmelisiniz.")
 client.yenilikler.set(this.commandName, { yenilik: yenilik, time: (Date.now() / 1000).toString().split(".")[0] })
db.set(this.commandName, { yenilik: yenilik, time: (Date.now() / 1000).toString().split(".")[0] })
  }
client.on("ready", () => {
	console.log(client.user.username + " Adı ile giriş yapıldı.")
})
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//Handler
client.commands = new Discord.Collection()
const commandArray = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = '940298930552438814';
const guildId = '939970119193481246';
client.yenilikler = new Discord.Collection()
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
if(db.fetch(command.data.name)) client.yenilikler.set(command.data.name, {yenilik: "Belirtilmedi", time: (Date.now() / 1000).toString().split(".")[0]})
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command)
let interaction = {commandName: command.data.name} 
if(!db.fetch("düzenleme_" + interaction.commandName)){
db.set("düzenleme_" + interaction.commandName, command.execute.toString())
   interaction.setYenilikler({
      yenilik: "Belirtilmedi."
   })
} else {
if(command.execute.toString() !== db.fetch("düzenleme_" + interaction.commandName)){
   interaction.setYenilikler({
      yenilik: "Belirtilmedi."
   })
db.set("düzenleme_" + interaction.commandName, command.execute.toString())
console.log(interaction.commandName + " komutu editlendi.") 
} 
}
commandArray.push(command.data.toJSON())
}
commandArray.push(new SlashCommandBuilder().setName("embed").setDescription("Embed oluşturursunuz.").toJSON())
//Events
	let eventfunction = (event) => require(`./events/${event}`)(client)
fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(event => {

	eventfunction(event)
})
  fs.readdirSync("./guards").filter(x => x.endsWith(".js")).forEach(xx => require("./guards/"+xx)(client))
  require("./tools/emoji.js")(client)
  require("./tools/form.js")(client)

  
  
const rest = new REST({ version: '9' }).setToken(ayarlar.token);

(async () => {
	try {
		console.log('Slash (/) komutları yüklenmeye başlandı.');
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commandArray },
			).catch(err => {console.error(err)})
		
				console.log('Slash (/) komutları başarıyla yüklendi.');
	} catch (error) {
		console.error(error);
	}
})();
//interactionCreate.js
client.on("interactionCreate", async interaction => {
	if(!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName)
	if(!command) return

	try{
		await command.execute(interaction, client) 
	}
	catch(err) {
		interaction.reply("Komutta bir hata oluştu.").catch(err => interaction.channel.send(interaction.user.toString() + " komutta bir hata oluştu."))
		console.error(err)
	}
})
setInterval(() => {
let kanallar = [client.channels.cache.get("944958618988609556"), client.channels.cache.get("944958567952289853")]
kanallar[0].setName("Üye Sayısı • " + kanallar[0].guild.members.cache.filter(x => !x.user.bot).size)
kanallar[1].setName("Bot Sayısı • " + kanallar[1].guild.members.cache.filter(x => x.user.bot).size)
}, 10000)


  
client.on("guildMemberRemove", member => {
db.delete("kayıt_" + member.guild.id + "_" + member.user.id)   
})


client.on("userUpdate", (oldmember, member) => {
member = client.guilds.cache.get("939970119193481246").members.cache.get(member.id)
if(oldmember.username == member.user.username) return;
if(member.user.username.includes("♆")){
if(!oldmember.username.includes("♆")){
member.roles.add("939970119352868943")
client.channels.cache.get("939970119944241179").send(`<a:AAAGif:941285348976246824> Oleyy! ${member.user.toString()} adlı kullanıcı tagımızı aldı!`)
} else return;
} else {
if(oldmember.username.includes("♆")){
member.roles.remove("939970119352868943")
client.channels.cache.get("939970119944241179").send(`<a:sadGif:941072520818356334>  Olamaz! ${member.user.toString()} adlı kullanıcı tagımızı adından çıkardı!`)
} else return;
}
})

client.on("ready", () => {
bot = "açık"
setInterval(() => {
client.guilds.cache.get("939970119193481246").members.cache.forEach(member => {
let jail = db.fetch("jail_" + member.user.id)
if(!jail) return;
if(Date.now() >= jail.time){
member.roles.remove("939970119243817070").catch(err => {})
jail.roles.forEach(x => member.roles.add(x).catch(err => {}))
db.delete("jail_" + member.user.id)
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kişisi hapisten çıkarıldı.")
} else return;
})
}, 100)
})
client.on("messageCreate", ms => {
  if(ms.content == "asdds") {
    ms.delete()
     let d = require("discord.js"); let component = new d.MessageActionRow().addComponents(new d.MessageButton().setCustomId("openTicket").setLabel("Ticket Açın").setEmoji(client.emoji("tik")).setStyle("SUCCESS")); ms.channel.send({ embeds: [require("./tools/embed.js")(client.emoji("tik")+" | Ticket Açın.", "Bir istek, bir şikayet veya farklı bir sorun, yetkili ekibimiz sizlere daima yardımcı olacaktır!")], components: [component] })
  }
})
client.on("guildMemberAdd", member => {
let jail = db.fetch("jail_" + member.user.id)
if(!jail) return
member.roles.cache.forEach(role => {
member.roles.remove(role).catch(err => {})
})
member.roles.add("939970119243817070").catch(err => {})
client.channels.cache.get("939970120468553804").send(member.user.toString() + " kendini akıllı sanıp çık gir yaptı.")
setTimeout(() => {
db.set("jail_" + member.user.id, {time: jail.time, roles: jail.roles})
}, 5000)
})


client.on("messageCreate", async(message) => {
if(message.channel.id !== "939970125904375819") return;
const Embed = require("./tools/embed.js")
let partners = db.fetch("partner_" + message.author.id)
if(!partners){
db.set("partners_" + message.author.id, [])
partners = []
}
let gif = "içermiyor"
let davet = "içermiyor" 
setTimeout(() => {
if(!message.content) return
if(!message.content.includes("@everyone") && !message.content.includes("@here")) return;
if(message.content.includes("discord.gg/") || message.content.includes("discord.com/invite")) davet = "içeriyor"
if(message.content.includes(".gif") || message.content.includes("tenor.com")) gif = "içeriyor"
client.users.cache.get("686679597986611285").send({embeds: [Embed("Bir partnerlik yapıldı.","Bilgiler aşağıda verilmiştir.","info").addField("Partnerlik yapan:", message.author.toString() + "(" + message.author.id + ")").addField("Kişisinin yaptığı toplam partnerlik sayısı:",eval(partners.length+1).toString()).addField("Text davet linki içeriyormu:",davet).addField("Text gif içeriyormu:", gif)]})
db.push("partners_" + message.author.id, {gif: gif,davet: davet, partners: partners[partners.length-1] ? (partners[partners.length-1].partners + 1) : 1, msg: message.id})
}, 300)
})


client.on("messageCreate", message => {
if(message.author.bot) return;
if(message.channel.type == "DM") return;
let content = message.content
if(!message.guild.emojis.cache.some(x => content.includes(":" + x.name + ":") && x.animated && !content.includes("<a:" + x.name + ":" + x.id + ">") && !content.includes("<a:" + x.name + ":9"))) return;
message.guild.emojis.cache.filter(x => content.includes(":" + x.name + ":") && x.animated && !content.includes("<a:" + x.name + ":" + x.id + ">") && !content.includes("<a:" + x.name + ":9")).forEach(y => {
content = content.split(":" + y.name + ":").join("<a:" + y.name + ":" + y.id + ">")
})
setTimeout(() => {
message.channel.createWebhook(message.member.nickname ? message.member.nickname : message.author.username, {})
    .then(webhook2 => {
const {  WebhookClient } = require('discord.js');

let webhook = new WebhookClient({ id: webhook2.id, token: webhook2.token });
if(!webhook) return;
webhook.send({
    content: content,
    username: message.member.nickname ? message.member.nickname : message.author.username,
    avatarURL: message.author.avatarURL({dynamic: true}),
})
setTimeout(() => {
message.delete()
webhook2.delete()
}, 100)
}).catch(err => console.error(err));
}, 500)
})



client.login(ayarlar.token)
