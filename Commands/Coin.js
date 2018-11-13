function Coin(message, parram, D, SCoinF, JsonF, CoinF, RND, MinBet, GameLiveTime, config) {
    switch (parram[1]) {
        case `create`:
            CoinFlip(message, parram, D, SCoinF, JsonF, CoinF, MinBet, GameLiveTime, config);
            break;
        case `remove`:
            CoinFlipRemove(message, JsonF, CoinF, D);
            break;
        case `accept`: {
            CoinAccept(message, D, SCoinF, JsonF, CoinF, RND, config);
            break;
        }
        default:
            message.author.sendMessage(`Команда введена неверно. \n` + D + config.prefix + `coin [create||remove||accept] ([amount||mention])` + D + `.`);
            break;
    }
}
exports.Coin = Coin;

function CoinFlip(message, parram, D, SCoinF, JsonF, CoinF, MinBet, GameLiveTime, config) {
    if (JsonF[message.author.id].Credits >= parram[2] && parram.length === 3) {
        if (parram[2] >= MinBet) {
            if (SCoinF.toString().indexOf(message.author.id) === -1) {
                JsonF[message.author.id].Credits -= parseInt(parram[2]);
                CoinF[message.author.id] = {
                    Bet: parseInt(parram[2]),
                    Time: GameLiveTime
                };
                message.reply(` приглашает Вас поиграть в **Монеточка**. Ставка: ` + D + parram[2] + D + ` кредитов!\n` + `Чтобы принять вызов введите: ` + D + config.prefix + `coin accept [mention]` + D + `!`);
            }
            else {
                message.author.sendMessage(`Вы уже создали приглашение! \nДля отменны введите: ` + D + config.prefix + `coin remove` + D + `!`);
            }
        }
        else {
            message.author.sendMessage(`Игра не создана, т.к. ставка ниже минимальной! \nМинимальная ставка: ` + D + MinBet + D + ` кредитов.`);
        }
    }
    else {
        message.author.sendMessage(`Команда введена неверно, либо у Вас недостаточно средств. \n` + D + config.prefix + `coin [create||remove||accept] ([amount||mention])` + D + `.`);
    }
}
function CoinFlipRemove(message, JsonF, CoinF, D) {
    JsonF[message.author.id].Credits += CoinF[message.author.id].Bet;
    message.author.sendMessage(`Вы успешно удалили игру и вернули себе ` +D+ CoinF[message.author.id].Bet +D+ ` кредитов.`);
    delete (CoinF[message.author.id]);
}
function CoinAccept(message, D, SCoinF, JsonF, CoinF, RND, config) {
    var MM = message.mentions.users.first();
    if (MM === undefined) {
        message.author.sendMessage(`Команда введена неверно, либо у Вас недостаточно средств. \n` + D + config.prefix + `coin [create||remove||accept] ([amount||mention])` + D + `.`);
    }
    else {
        if (SCoinF.toString().indexOf(MM.id > -1)) {
            if (message.author.id != MM.id) {
                if (JsonF[message.author.id].Credits >= CoinF[MM.id].Bet) {
                    JsonF[message.author.id].Credits -= CoinF[MM.id].Bet;
                    var rs = RND(1, 2);
                    var res = rs();
                    console.log(`Результат монеточки:` + res);
                    if (res === 2) {
                        JsonF[message.author.id].Credits += CoinF[MM.id].Bet * 2;
                        message.reply(` Вы приняли вызов ` + MM + ` и **победили**, забрав себе ` + D + CoinF[MM.id].Bet * 2 + D + ` кредитов.`);
                        delete (CoinF[MM.id]);
                    }
                    else {
                        JsonF[MM.id].Credits += CoinF[MM.id].Bet * 2;
                        message.channel.sendMessage(message.author.me + `, Вы приняли вызов ` + MM + ` и **проиграли**, победитель забрал себе ` + D + CoinF[MM.id].Bet * 2 + D + ` кредитов.`);
                        delete (CoinF[MM.id]);
                    }
                }
                else {
                    message.author.sendMessage(`У Вас недостаточно средств!`);
                }
            }
            else {
                message.author.sendMessage(`Вы не можете принять собственную игру!`);
            }
        }
        else {
            message.author.sendMessage(`Игра не найдена!`);
        }
    }
}