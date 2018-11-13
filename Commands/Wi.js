function Wi(message, parram) {
    var Mem = message.guild.members.find("id", parram[1]);
    if (Mem != null) {
        console.log(Mem);
        try {
            message.reply(Mem.nickname);
        }
        catch {
            message.reply(Mem.displayName);
        }
    }
    else {
        message.reply(` the entry is not found!`);
    }
}
exports.Wi = Wi;