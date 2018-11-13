function Help(message, config, D, Discord) {
    let embed = new Discord.RichEmbed()
        .setDescription(`***Список команд:*** `)
        .setColor(`#007ACC`)
        .addField(`**stats** - ` + `Просмотр статистика Вашего аккаунта.`, `:octopus: `)
        .addField(`**help** - ` + `Список доступных команд.`, `:octopus: `)
        .addField(`**coin** - ` + `Игра в Монеточку.`, D + config.prefix + `coin [create||remove||accept] ([amount||mention])` + D + `.`)
        .addField(`**mute** - ` + `Выдача мута участнику/просмотр оставшегося времени мута.`, D + config.prefix + `mute [mention] [amount(minutes)]` + D + `.`)
		.addField(`**give** - ` + `Передача кредитов участнику.`, D + config.prefix + `give [mention] [amount]` + D + `.`)
        .addField(`**join** - ` + `Получение тематической роли.`, D + config.prefix + `join [role]` + D + `.`);
    message.author.sendEmbed(embed);
}
exports.Help = Help;