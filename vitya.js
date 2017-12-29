const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const sql = require("sqlite");
sql.open("./vityaa.sqlite");

const swearWords = ["darn", "shit", "fuck", "damn"];
const yuuriWords = ["i love yuuri"];
const goodVitya = ["good vitya", "good viktor", "good vik", "love viktor", "love vitya"];
const badWords = ["terrible", "awful", "not good"];
const nudeWords = ["send nudes", "send n00ds", "Send "];

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    if (message.content.startsWith(config.prefix + "ping")) {
        message.channel.send("pong!");
    } else

    if( swearWords.some(word => message.content.includes(word)) ) {
      message.channel.send("Oh no you said a bad word :c");
    }

    if( yuuriWords.some(word => message.content.includes(word)) ) {
      message.channel.send("not as much as I love him!!!");
    }

    if( goodVitya.some(word => message.content.includes(word)) ) {
      message.channel.send(":heart::two_hearts::sparkling_heart::heart::two_hearts::sparkling_heart:");
    }

// POSITIVITYA
    if (message.content.startsWith(config.prefix + "addpositivitya")) {
        sql.get(row => {
            sql.run("INSERT INTO positive (posContent) VALUES (?)", [message.content]);
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS positive (posContent TEXT)").then(() => {
                sql.run("INSERT INTO positive (posContent) VALUES (?)", [message.content]);
            });
        });
        message.channel.send("Prompt added!");
    } else

    if( badWords.some(word => message.content.includes(word)) ) {
        sql.get("SELECT * FROM positive ORDER BY RANDOM() LIMIT 1").then(row => {
            var positiveyContent = `${row.posContent}`;
            var posResult = positiveyContent.slice(15);
            message.reply(posResult)
        })
    } else

// VITYA'S NUDE PICS
    if (message.content.startsWith(config.prefix + "addnudevitya")) {
        sql.get(row => {
            sql.run("INSERT INTO nudes (nudeContent) VALUES (?)", [message.content]);
        }).catch(() => {
            console.error;
            sql.run("CREATE TABLE IF NOT EXISTS nudes (nudeContent TEXT)").then(() => {
                sql.run("INSERT INTO nudes (nudeContent) VALUES (?)", [message.content]);
            });
        });
        message.channel.send("Prompt added!");
    } else

    if( nudeWords.some(word => message.content.includes(word)) ) {
        sql.get("SELECT * FROM nudes ORDER BY RANDOM() LIMIT 1").then(row => {
            var nudeyContent = `${row.nudeContent}`;
            var nudeResult = nudeyContent.slice(13);
            message.channel.send({embed: { image: { url: nudeResult } }})
        })
    }
});

client.login(config.token);
