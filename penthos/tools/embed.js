const Discord = require("discord.js")
const {MessageEmbed} = Discord;

module.exports = (title, description, color, gif) => {
    const infoEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
if(!gif || gif == "yes"){
    infoEmbed.setImage("https://media.discordapp.net/attachments/939970121420648524/941712191306989578/standard_2.gif?width=480&height=192")
} else if(gif && gif == "no"){

}
    let newColor = ""
    if(color == 'error') newColor = "#ff0000"
    else if(color == 'info') newColor = "#1f75ff"
    else if(color == 'warn') newColor = "#eeff00"
   
    if(newColor == "" && color) infoEmbed.setColor(color)
    else if(newColor !== "") infoEmbed.setColor(newColor)

    return infoEmbed
}