const { SlashCommandBuilder } = require("@discordjs/builders")
const Embed = require("../tools/embed.js")
    const db = require("quick.db")
                      module.exports = {
  
  data: new SlashCommandBuilder()
  .setName("komut-duyuru")
  .setDescription("Yeni komut duyurusu yaparsınız.")
  .addStringOption(option => 
                  option
                   .setName("komut")
                   .setDescription("Duyurusu yapılacak komutun adı.")
                   .setRequired(true)
                  )
  .addStringOption(option => 
                  option
                   .setName("yenilik")
                   .setDescription("Duyurusu yapılacak komutta yapılan yenilik.")
                  )

,execute(interaction,client) {
    let err = x => interaction.reply({ embeds: [Embed(`${client.emoji("carpi")} | Hata!`, x, "warn")], ephemeral: true})
if(!require("../ayarlar.json").owners.includes(interaction.user.id)) return err("Botun geliştiricilerinden olmadığınız için bu komuta erişiminiz kapalıdır.")
    let komutadı = interaction.options.getString("komut")
    let yenilik = interaction.options.getString("yenilik")
 let cmd = client.commands.get(komutadı)
 let duyuru = interaction.guild.channels.cache.get("944307005663875072")
 let yetkiliduyuru = interaction.guild.channels.cache.get("939970120963465288")
 if(!cmd) return err(`**${komutadı}** adında bir komut bulunamadı. Eğer doğru yazdığınızdan eminseniz, büyük küçük harf uyumuna dikkat ediniz.`)
 if(!client.yenilikler.get(komutadı)) return err(`**${komutadı}** adlı komutta herhangi bir düzenleme yapılmamış.`)
  let sonDüzenleme = client.yenilikler.get(komutadı) ? `<t:${client.yenilikler.get(komutadı).time.toString()}:f>` : "Süre algılanamadı."
  let xx = "```"
  interaction.reply({ embeds:[Embed("İşlem başarılı!", `${client.emoji("tik")} | **${komutadı}** ismli komudun verileri çekilerek, bu komut ile ilgili duyuru mesajı gönderildi!`)]})
  let duyuruembed = Embed("Bir komut eklendi veya değiştirildi!", `${interaction.member} kullanıcısı tarafından değiştirilen komudun bilgileri:`, "warn").addField(client.emoji("dot")+" | Değiştirilen / Yeni gelen komutun adı:", `${xx}${client.commands.get(komutadı).data.name}${xx}`).addField(`${client.emoji("dot")} | Değiştirilen / Yeni gelen komutun açıklaması:`, `${xx}${client.commands.get(komutadı).data.description}${xx}`).addField(client.emoji("dot")+" | Değiştirilen / Yeni gelen komutun değiştirilme tarihi:", `${sonDüzenleme}`).addField(`${client.emoji("dot")} | Değiştirilen / Yeni gelen komutun yenilikleri:`, `${xx}${yenilik || "Yenilik belirtilmemiş."}${xx}`)
  duyuru.send({ embeds: [duyuruembed]})
  yetkiliduyuru.send({ embeds: [duyuruembed]})
  }
}