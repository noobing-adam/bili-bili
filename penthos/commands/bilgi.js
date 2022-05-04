const db = require("quick.db");
const Embed = require("../tools/embed.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const sc = require("starcode.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bilgi")
    .setDescription("Bir kanal,üye yada rolün bilgilerine bakarsınız.")
    .addUserOption((option) =>
      option
        .setName("üye")
        .setDescription("Bilgilerine bakacağınız üye.")
        .setRequired(false)
    )
    .addRoleOption((option) =>
      option
        .setName("rol")
        .setDescription("Bilgilerine bakacağınız rol.")
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName("kanal")
        .setDescription("Bilgilerine bakacağınız kanal.")
        .setRequired(false)
    ),
  execute(interaction, client) {
    let flags = function (ehi) {
      return ehi
        .replace("DISCORD_EMPLOYEE", "Discord Yetkilisi")
        .replace("PARTNERED_SERVER_OWNER", "Discord Partneri")
        .replace("BUGHUNTER_LEVEL_1", "Bug Hunter")
        .replace("HOUSE_BRAVERY", "Hypesquad Bravery")
        .replace("HOUSE_BRILLIANCE", "Hypesquad Brilliance")
        .replace("HOUSE_BALANCE", "Hypesquad Balance")
        .replace("EARLY_SUPPORTER", "Erken Dönem Destekçisi")
        .replace("BUGHUNTER_LEVEL_2", "Pro Bug Hunter")
        .replace("VERIFIED_BOT", "Onaylanmış Bot")
        .replace("EARLY_VERIFIED_BOT_DEVELOPER", "Erken Onaylanmış Geliştirici")
        .replace("DISCORD_CERTIFIED_MODERATOR", "Discord Onaylı Moderator");
    };
    let err = (x) =>  interaction.reply({embeds: [Embed(`${client.emoji("carpi")} | Hata!`, x, "error")],ephemeral: true,});
    let embed = (x) => {
     return Embed(
        "Bilgi Komutu",
        x + " ile ilgili bilgiler gösteriliyor.",
        "info"
      );
    }
    let user = interaction.options.getUser("üye")
      ? interaction.guild.members.cache.get(
          interaction.options.getUser("üye").id
        )
      : null;
    let kanal = interaction.options.getChannel("kanal");
    let rol = interaction.options.getRole("rol");

if (user) {
      let created = sc.date(user.user.createdTimestamp, "tr-TR");
      let joined = sc.date(user.joinedTimestamp, "tr-TR");
      let roles = user.roles.cache.filter((x) => x.name !== "@everyone")
        .map((x) => x.toString())
      .join(",") ? user.roles.cache
            .filter((x) => x.name !== "@everyone")
            .map((x) => x.toString())
            .join(",")
        : "Kişinin rolü yok";
      let flags3 = user.user.flags
        .toArray()
        .map((x) => flags(x))
        .join(",");
      if (!flags3 || flags3 == " " || flags3 == "")
        flags3 = `${client.emoji(
          "carpi"
        )} | Kişisinin herhangi bir rozeti bulunmuyor.`;
      embed = embed(user.user.toString())
        .addField("Kişinin adı: ", user.user.username)
        .addField("Kişinin id'si: ", user.user.id)
        .addField("Hesabını oluşturduğu tarih:", created)
        .addField("Sunucuya katıldığı tarih:", joined)
        .addField("Rozetleri:", flags3)
        .addField("Rolleri:", roles);
      interaction.reply({ embeds: [embed] });
    } else if (rol) {
      let x = "```";
      let createdAt = sc.date(rol.createdTimestamp, "tr-TR");
      let iconurl;
      if (rol.icon !== null)
        iconurl = rol.iconURL().toString()
      else if (iconurl == null)
        iconurl = `${client.emoji("carpi")} | Rolde ikon bulunmuyor.`;
      let members = rol.members.size.toString();
      let canMentionable = rol.mentionable
        .toString()
        .replace("true", `${client.emoji("tik")} | Etiketlenebilir.`)
        .replace("false", `${client.emoji("carpi")} | Etiketlenemez.`);
      let hoist = rol.hoist
        .toString()
        .replace(
          "true",
          `${client.emoji("tik")} | Diğer rollerden ayrı gösteriliyor.`
        )
        .replace(
          "false",
          `${client.emoji("carpi")} | Diğer rollerden ayrı gösterilmiyor.`
        );
      let editable = rol.editable
        .toString()
        .replace(
          "true",
          `${client.emoji("tik")} | Bot tarafından editlenebilir.`
        )
        .replace(
          "false",
          `${client.emoji("carpi")} | Bot tarafından editlenemez`
        );
      let name = `${x}${rol.name}${x}`;
      let id = `:id: | ${rol.id}`;
      let position = rol.position.toString();
      embed = embed(rol.toString());
      embed.addField("Rolün adı:", name);
      embed.addField("Rolün id'si:", id);
      embed.addField("Rolün iconu:", iconurl);
      embed.addField("Rolün bulunduğu üye sayısı:", members);
      embed.addField("Rolün pozisyonu:", position);
      embed.addField("Rol etiketlenebilirmi:", canMentionable);
      embed.addField("Diğer rollerden üstte gözükme:", hoist);
      embed.addField("Bot tarafından editlenebilirliği:", editable);
      interaction.reply({ embeds: [embed] });
    } else if (kanal) {
      let created = sc.date(kanal.createdTimestamp, "tr-TR");
      let position = kanal.position.toString();
      let id = `:id: | ${kanal.id}`;
      let type = kanal.type
        .toString()
        .replace("GUILD_TEXT", "Yazı kanalı")
        .replace("GUILD_VOICE", "Ses kanalı")
        .replace("GUILD_CATEGORY", "Kategori");
      embed = embed(kanal.toString())
        .addField("Kanalın adı: ", kanal.name.split("-").join(" "))
        .addField("Kanalın id'si: ", kanal.id)
        .addField("kanalın pozisyonu:", position)
        .addField("kanalın oluşturduğu tarih:", created)
        .addField("kanalın türü:", type);
      interaction.reply({ embeds: [embed] });
    }
  },
};
