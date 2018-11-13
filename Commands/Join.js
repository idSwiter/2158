function Join(message, parram, RolesMas, D, config) {
    if (parram.length === 2 && RolesMas.has(parram[1].toString())) {
        var Mems = message.guild.members.find("id", message.author.id);
        if (!Mems.roles.has(parram[1])) {
            Mems.addRole(RolesMas.get(parram[1]));
        }
        else {
            message.author.sendMessage(`У Вас уже есть роль ` + D + parram[1] + D + ` .`);
        }
    }
    else {
        var Roles = ``; var Sika = 0;
        for (let key of RolesMas.keys()) {
            Roles += key + `/`;
        }
        Roles = Roles.substring(0,Roles.length-1);
        message.author.sendMessage(`Команда введена неверно. \n` + D + config.prefix + `join [` + Roles +`]` +D+`.`);
    }
}
exports.Join = Join;