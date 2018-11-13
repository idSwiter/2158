function Credit(message, parram, JsonF, D, config) {
    var MM = message.mentions.users.first();
    if (MM != undefined) {
        switch (parram[1]) {
            case `add`:
                JsonF[MM.id].Credits += parseInt(parram[3]);
                message.author.sendMessage(` Вы успешно добавили ` + MM + " - " + D + parram[3] + D + " кредитов!");
                break;
            case `remove`:
                JsonF[MM.id].Credits -= parseInt(parram[3]);
                message.author.sendMessage(` Вы успешно забрали у ` + MM + " - " + D + parram[3] + D + " кредитов!");
                break;
            case `set`:
                JsonF[MM.id].Credits = parseInt(parram[3]);
                message.author.sendMessage(` Вы успешно установили ` + MM + " баланс в - " + D + parram[3] + D + " кредитов!");
                break;
            case `get`:
                message.author.sendMessage(MM + ` имеет ` + D + JsonF[MM.id].Credits + D + ` кредитов.`);
                break;
            default:
                message.author.sendMessage(`Команда введена неверно. \n` + config.prefix + `credit [add||remove||set||get] [mention] ([amount]).`);
                break;
        }
    }
    else {
        message.author.sendMessage(`Команда введена неверно. \n` + config.prefix + `credit [add||remove||set||get] [mention] ([amount]).`);
    }
}
exports.Credit = Credit;