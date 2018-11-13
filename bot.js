const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./default.json')
var fs = require("fs");
var date = new Date();

var STR = fs.readFileSync("./DB.json", "utf8");
var JsonF = JSON.parse(STR);

var SCoinF = fs.readFileSync("./CoinGames.json", "utf8");
var CoinF = JSON.parse(SCoinF);
var MinBet = config.MinBet; //Минимальная ставка в монеточке

var log = fs.readFileSync("./log.txt", "utf8");
var RolesMas = new Map([
    ['cs:go', '510114406407864320'],
    ['dota2', '510114519867981829'],
    ['pubg', '510114475874189333'],
    ['fortnite', '510114677813018644'],
    ['overwatch', '510114727964311554']
]);  //Добовляешь сюда роли. Первый аргумент - ключ, то, что пользователь будет вводить после `join`. Второй ID выдаваемой роли, можешь узнать его с помощью команды `roles`.

var DB_Update = config.DB_Update; //Частота вызова БД (Раз в секунду = 1000)
var DB_Backup = config.DB_Backup; //Частота создания бэкапов (Каждые 10 вызовов к БД)
var DB_BackupCount = config.DB_BackupCount; //Желаемое количество бэкапов
var DB_Current = 0; //Текущая запись (Не редактировать) 

var TimePerUpdate = config.TimePerUpdate; //Количество добавляемых очков времени за вызов БД
var CreditsPerUpdate = config.CreditsPerUpdate; //Количество добавляемых кредитов времени за вызов БД
var GameLiveTime = config.GameLiveTime; //Время жизни игры в Монеточку

var HoursRoleId = `489390455977541643`; //ID роли 2158

//Команды
const { DBC } = require("./Commands/DBC");
const { CreditsTrade } = require("./Commands/CreditsTrade");
const { Coin } = require("./Commands/Coin");
const { Join } = require("./Commands/Join");
const { Mute } = require("./Commands/Mute");
const { Wi } = require("./Commands/Wi");
const { Help } = require("./Commands/Help");


client.on('ready', () => {
    DBWork();
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(config);
    setInterval(DBWork, DB_Update);
    setInterval(MuteUpdate, DB_Update);
    setInterval(CoinUpdate, 1000);
});

var DB_Backup_Back = DB_Backup;

function MuteUpdate(){
    client.guilds.forEach(Guild => {
        Guild.members.forEach(Member => {
            var MemberId = Member.id;
            if (JsonF[MemberId].Mute > 0){
                JsonF[MemberId].Mute -= TimePerUpdate;
                Member.setMute(true);
            }
                
            else if(JsonF[MemberId].Mute === 0 && Member.voiceChannel != undefined){
                    JsonF[MemberId].Mute = -1;
                    Member.setMute(false);
            }
        })
    })
}

function DBWork() {
    client.guilds.forEach(Guild => {
        Guild.members.forEach(Member => {
            var MemberId = Member.id;
                    if(STR.toString().indexOf(MemberId) > -1){
                        if(Member.voiceChannel != undefined && !Member.selfDeaf && !Member.selfMute) {
                            JsonF[MemberId].Time += TimePerUpdate;
                            JsonF[MemberId].Credits += CreditsPerUpdate;
                        }

                        if(JsonF[MemberId].Time >= 90000){
                            Member.addRole(HoursRoleId);
                        }
                    }
                    else {
                        AddMemberToDb(MemberId);
                    }
        })
    })
    DB_Backup -= 1;
    if(DB_Current === DB_BackupCount) DB_Current = 0;
    if(DB_Backup <= 0) {fs.writeFile("./DB_Backup/DB_" + DB_Current + ".json",STR,function(err) {if(err) {return console.log(err);}}); DB_Backup = DB_Backup_Back; DB_Current += 1;}
    STR = JSON.stringify(JsonF);
    fs.writeFile(`./DB.json`,STR,function(err) {if(err) {return console.log(err);}});
    if(log != undefined) fs.writeFile(`./log.txt`,log,function(err) {if(err) {return console.log(err);}});
}

client.on('message', message => {
    try{var mem = message.guild.members.random()}
    catch{return;}
    if (!message.author.bot && message.toString().startsWith(config.prefix) && message.channel.name === `2158`) {
        log += DDDATE() + `  `  + message.author.username + `(` + message.author.id + `)` + `: `+ message.content + `\n`;
        console.log(message.author.username + `(` + message.author.id + `)` + `: `+ message.content);
        var parram = message.content.toLowerCase().split(' ');
        parram[0] = parram[0].substring(1, parram[0].length);
        if(message.guild.members.find("id", message.author.id).permissions.has("ADMINISTRATOR")){
            switch(parram[0]) {
                case `wi`:
                    Wi(message, parram);
                break;

                case `credit`:
                  DBC(message, parram, JsonF, D, config);
                break;

                case `roles`:
                    Roles(message, D);
                break;
            }
        }
        switch(parram[0]) {

            case `stats`:
                let embed = new Discord.RichEmbed()
                .setDescription(`***Ваша статистика:*** `)
                .setColor(`#007ACC`)
                .addField(`**Валюта:** `, JsonF[message.author.id].Credits + ` кредитов.`)
                .addField(`**Время в голосовых каналах:** `, Math.round((JsonF[message.author.id].Time/60)/60) + ` часов.`);
                message.author.sendEmbed(embed);

            break;

            case `dice`:
                Dices(message, parram);
            break;

            case `give`:
                CreditsTrade(message, parram,  D, JsonF, config);
            break;

            case `coin`:
                Coin(message, parram, D, SCoinF, JsonF, CoinF, RND, MinBet, GameLiveTime, config);
            break;

            case `mute`:
               Mute(message, config, parram, JsonF, D);
            break;

            case `join`:
                Join(message,parram,RolesMas, D, config)
            break;

            case `help`:
                Help(message, config, D, Discord);
            break;
        }
        message.delete();
    }
});

function Roles(message, D) {
    var MesCon = `[**roleName**]:[**roleId**]\n`;
    message.guild.roles.forEach(role => {
        MesCon += D + role.name + D + ` : ` + D + role.id + D + `\n`;
    });
    message.author.sendMessage(MesCon);
}

function DDDATE(){
    var today = new Date();
    var ret = today.getHours() +`:`+ today.getMinutes() + `:`;
    if(today.getSeconds()<=9) ret += `0` + today.getSeconds() +`  `+ today.getDate() +`.`+ today.getMonth() +`.` + today.getFullYear();
    else{ret += today.getSeconds() +`  `+ today.getDate() +`.`+ today.getMonth() +`.` + today.getFullYear()}
    return ret;
}

var D = "`";

function CoinUpdate(){
        client.guilds.forEach(Guild => {
            Guild.members.forEach(Member => {
                var MemberId = Member.id;
                try {CoinF[MemberId].Time -= 1;
                if(CoinF[MemberId].Time <= 0) {delete(CoinF[MemberId]);}} catch{}});})
                SCoinF = JSON.stringify(CoinF);
                fs.writeFile(`./CoinGames.json`,SCoinF,function(err) {if(err) {return console.log(err);}});
                }

    
function AddMemberToDb(_MemberId){
    JsonF[_MemberId] = {
        Time: 0,
        Credits: 0,
        Mute: -1
    };
}

function Dices(message, parram){
    var rollDie = RND( 1, 6 );
    message.reply(` Вы бросили кубик и вам выпало: `+D+ rollDie() + D + `.`);
}

function RND(bottom, top) {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}

client.login(process.env.bot_token);
