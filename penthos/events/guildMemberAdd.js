module.exports = client => {
const Embed = require("../tools/embed.js")
client.on("guildMemberAdd", m => {
m.roles.add("940965894773932082")
  let c = client.channels.cache.get("939970120963465294")
c.send({content: "<@&939970119378018316>," + m.user.toString(), embeds: [Embed("Aramıza yeni bir üye katıldı","Hoşgeldin " + m.user.toString() + " ismini ve yaşını söyleyerek kayıt olabilirsin.","info")]})
})

}