module.exports = (client) => class voice {


static login(channel){
let {joinVoiceChannel} = require("@discordjs/voice");
let guild = client.guilds.cache.get("939970119193481246");
joinVoiceChannel({ 
      channelId: channel.id ? channel.id : channel,
      guildId: guild.id,adapterCreator: 
      guild.voiceAdapterCreator
})
setTimeout(() => {
if(guild.connection) return "Bağlantı sağlandı."
if(!guild.connection) return "Bağlantı sağlanamadı."
}, 5000)
}

static leave(){
let guild = client.guilds.cache.get("939970119193481246");
if(!guild.connection) return "Zaten herhangi bir ses kanalına bağlı değilim."
guild.connection.destroy()
return "Bağlantı kesildi."
}
}

