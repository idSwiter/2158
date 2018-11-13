function DBC(message, parram, JsonF, D, config) {
    var MM = message.mentions.users.first();
    if (MM != undefined && parram.lenght === 5) {
        switch (parram[2]) {
            case `add`:
                if(parram[1] === `credits`){
                    JsonF[MM.id].Credits += parseInt(parram[4]);
                    message.author.sendMessage(` Вы успешно добавили ` + MM + " - " + D + parram[3] + D + " кредитов!");}
                else if (parram[1] === `time`){
                    JsonF[MM.id].Time += parseInt(parram[4]);
                    message.author.sendMessage(` Вы успешно добавили ` + MM + " - " + D + parram[3] + D + " секунд!");}
                break;
            case `remove`:
                if(parram[1] === `credits`){
                    JsonF[MM.id].Credits -= parseInt(parram[4]);
                    message.author.sendMessage(` Вы успешно забрали у ` + MM + " - " + D + parram[3] + D + " кредитов!");}
                else if (parram[1] === `time`){
                    JsonF[MM.id].Time -= parseInt(parram[4]);
                    message.author.sendMessage(` Вы успешно забрали у ` + MM + " - " + D + parram[3] + D + " секунд!");}
                break;
            case `set`:
                if(parram[1] === `credits`){
                    JsonF[MM.id].Credits = parseInt(parram[4]);
                    message.author.sendMessage(` Вы успешно установили ` + MM + " баланс в - " + D + parram[3] + D + " кредитов!");}
                else if (parram[1] === `time`){
                   JsonF[MM.id].Time = parseInt(parram[4]);
                   message.author.sendMessage(` Вы успешно установили ` + MM + " баланс в - " + D + parram[3] + D + " секунд!");}
                break;
            case `get`:
            if(parram[1] === `credits`){
                message.author.sendMessage(MM + ` имеет ` + D + JsonF[MM.id].Credits + D + ` кредитов.`);}
            else if (parram[1] === `time`){
                message.author.sendMessage(MM + ` имеет ` + D + JsonF[MM.id].Credits + D + ` секунд.`);
            }
                break;
            default:
                message.author.sendMessage(`Команда введена неверно. \n` + D + config.prefix + `dbc [credits||time] [add||remove||set||get] [mention] ([amount])`+ D +`.`);
                break;
        }
    }
    else {
        message.author.sendMessage(`Команда введена неверно. \n` + D + config.prefix + `dbc [credits||time] [add||remove||set||get] [mention] ([amount])`+ D +`.`);
    }
}
exports.DBC = DBC;