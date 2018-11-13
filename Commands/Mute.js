function Mute(message, config, parram, JsonF, D) {
    if(message.guild.members.find("id", message.author.id).permissions.has("ADMINISTRATOR") || message.author.id === `272302848950403072`){
        var MM = message.mentions.users.first();
        if(parram.length === 3 && MM != undefined)
        {
            if(parram[2] === 0) {
                JsonF[MM.id].Mute = -1;
                message.author.sendMessage(`Вы успешно размьютили ` + MM + `.`);
            }
            else {
                message.guild.members.find("id", MM.id).setMute(true, parram[2]).then(() => console.log(MM.username + ` был замьючен.`));
                JsonF[MM.id].Mute = parram[2] * 60;
                message.author.sendMessage(`Вы успешно замьютили ` + MM + ` на ` + D + parram[2] + D + ` минут.`);
                message.guild.members.find("id", MM.id).sendMessage(`Вы были замьючины ` + message.author + ` на ` + D + parram[2] + D + ` минут!`);
            }
        }
        else{
            message.author.sendMessage(`Команда введена неверно. \n` + config.prefix + `mute [mention] [amount(minutes)].`);
        }
    }
    else{
        if(JsonF[message.author.id].Mute >= 1) message.author.sendMessage(`До конца мута осталось: ` + D + Math.floor(JsonF[message.author.id].Mute/60) + D + ` минут ` + D + JsonF[message.author.id].Mute % 60 + D + ` секунд.`);
        else{message.author.sendMessage(`Вы не замьючены.`)}
    }
}
exports.Mute = Mute;