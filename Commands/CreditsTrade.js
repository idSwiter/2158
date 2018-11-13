function CreditsTrade(message, parram,  D, JsonF, config) {
    var MM = message.mentions.users.first();
    if (MM === undefined) {
        message.author.sendMessage(`Команда введена неверно, либо у Вас недостаточно средств. \n` + D + config.prefix + `give [mention] [amount]` + D + `.`);
    }
    else {
        if (JsonF[message.author.id].Credits >= parram[2] && JsonF[message.author.id].Credits > 0 && parram.length === 3 && parram[2] > 1) {
            JsonF[message.author.id].Credits -= Math.floor(parram[2]);
            JsonF[MM.id].Credits += Math.floor(parram[2]);
            message.reply(` Вы успешно передали ` + D + Math.floor(parram[2]) + D + ` кредитов ` + MM + `.`);
        }
        else {
            message.author.sendMessage(`Команда введена неверно, либо у Вас недостаточно средств. \n` + D + config.prefix + `give [mention] [amount]` + D + `.`);
        }
    }
}
exports.CreditsTrade = CreditsTrade;