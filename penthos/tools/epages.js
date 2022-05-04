const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const db = require("quick.db")
module.exports = (client) => class {
static createPages(interaction, embeds, rightEmoji, leftEmoji, cancelEmoji){
        if (!rightEmoji) throw new TypeError(`An emoji to go to the next page was not provided.`);
        if (!leftEmoji) throw new TypeError(`An emoji to go to the previous page was not provided.`);
        if (!leftEmoji) throw new TypeError(`An emoji to go cancel the embed page was not provided.`);
let buttonStyle = "PRIMARY"
        const fowardButton = new MessageButton()
            .setStyle(buttonStyle)
            .setEmoji(rightEmoji)
            .setCustomId('next-page');

        const backButton = new MessageButton()
            .setStyle(buttonStyle)
            .setEmoji(leftEmoji)
            .setCustomId('back-page');

        const deleteButton = new MessageButton()
            .setStyle(buttonStyle)
            .setEmoji(cancelEmoji)
            .setCustomId('delete-page');

        const interactiveButtons = new MessageActionRow()
            .addComponents(backButton)
            .addComponents(deleteButton)
            .addComponents(fowardButton);

interaction.followUp({content: interaction.user.toString(), components: [interactiveButtons], embeds: [embeds[0]] }).then(msg => {
db.set("data_" + msg.id, {interactor: interaction.user,message: msg, embeds: embeds, currentPage: 0, components: interactiveButtons})
}).catch(err => {
interaction.channel.send({content: interaction.user.toString(), components: [interactiveButtons], embeds: [embeds[0]] }).then(msg => {
db.set("data_" + msg.id, {interactor: interaction.user,message: msg, embeds: embeds, currentPage: 0, components: interactiveButtons})
}).catch(err => {
interaction.channel.send("Sayfa kısmında bir sorun oluştu.")    
})
})
client.on("interactionCreate", button => {
if(!button.isButton())  return
let interaction = db.fetch("data_" + button.message.id)
let update = page => {
db.set("data_" + button.message.id, {interactor: interaction.interactor,message: interaction.message, embeds: interaction.embeds, currentPage: page, components: interaction.components})
interaction = {interactor: interaction.interactor, message: interaction.message, embeds: interaction.embeds, currentPage: page,components: interaction.components}
}
if(!interaction) return;
let err = x => button.reply({embeds: [require("./embed.js")("Hata!",x,"error")], ephemeral: true})
if(interaction.interactor.id !== button.user.id) return err("Bu komut senin değil!") 
        if (button.customId == 'next-page') {
            (interaction.currentPage + 1 == interaction.embeds.length ? update(0) : update(interaction.currentPage += 1));
button.deferUpdate()
            button.message.edit({ embeds: [interaction.embeds[interaction.currentPage]], components: [interaction.components] });
        } else if (button.customId == 'back-page') {
            (interaction.currentPage - 1 < 0 ? update(interaction.embeds.length - 1) : update(interaction.currentPage -= 1));
button.deferUpdate()
         button.message.edit({ embeds: [interaction.embeds[interaction.currentPage]], components: [interaction.components] });
        } else if (button.customId == 'delete-page') {
button.deferUpdate()
            button.message.edit({content: `:white_check_mark: İşlem bitti.`, embeds: [], components: []});
            wait(5000).then(async () => {
                 button.message.delete();
            });
        }
    })
}
}
