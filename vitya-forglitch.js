const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const sql = require("sqlite");
sql.open("./vityaa.sqlite");

const swearWords = ["darn", "shit", "fuck", "damn", "FUCK", "SHIT", "DAMN"];
const yuuriWords = ["i love yuuri"];
const goodVitya = ["good vitya", "good viktor", "good vik", "love viktor", "love vitya", "love you vi"];
const badWords = ["terrible", "awful", "not good", "i suck"];
const nudeWords = ["send nudes", "send n00ds", "Send nudes"];
const hateWords = ["hate vitya", "hate viktor", "hate you vitya", "you suck vitya", "hate you vitya", "hate u vitya", "hate you viktor", "hate u viktor", "vitya you suck"];
const footWords = ["foot fetish"];
const whereYuuri = ["where's yuuri", "wheres yuuri"];
const sendLove = ["vitya send love to"];

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    if (message.content.startsWith(config.prefix + "ping")) {
        message.channel.send("pong!");
    } else
    if( swearWords.some(word => message.content.includes(word)) ) {
      message.channel.send("Oh no you said a bad word :c");
    } else
    if( yuuriWords.some(word => message.content.includes(word)) ) {
      message.channel.send("not as much as I love him!!!");
    } else
    if( goodVitya.some(word => message.content.includes(word)) ) {
      message.channel.send(":heart::two_hearts::sparkling_heart::heart::two_hearts::sparkling_heart:");
    } else
    if( hateWords.some(word => message.content.includes(word)) ) {
      message.channel.send("that's fine. yuuri loves me anyway :heart_eyes:");
    } else
    if( footWords.some(word => message.content.includes(word)) ) {
      message.reply("it's body worship");
    } else
    if( whereYuuri.some(word => message.content.includes(word)) ) {
      message.reply("in my heart :heart:");
  } else

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

    if( sendLove.some(word => message.content.includes(word)) ) {
        sql.get("SELECT * FROM positive ORDER BY RANDOM() LIMIT 1").then(row => {
            var positiveyContent = `${row.posContent}`;
            var posResult = positiveyContent.slice(15);
            var messContent = message.content.slice(18);
            message.channel.send(messContent + " " + posResult)
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
