function Roles(message, D) {
    var MesCon = `[**roleName**]:[**roleId**]\n`;
    message.guild.roles.forEach(role => {
        MesCon += D + role.name + D + ` : ` + D + role.id + D + `\n`;
    });
    message.author.sendMessage(MesCon);
}
exports.Roles = Roles;