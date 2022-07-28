import Discord from "discord.js";
import token from "./token.js";
import axios from "axios";
import { MessageEmbed } from "discord.js";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "&";


//var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ player + "?api_key=" + APIKey
client.login(token);

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const param = message.content.slice(message.content.indexOf(" ") + 1);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const channelId = message.channel.id;
  let command = args.shift().toLowerCase();

  if (command == "search") {
    await findPlayerStat(param, channelId, args);
  } else if (command != "ping") {
    await searchForPlayer(message.channel.id, message.author.username);
  }
});

async function searchForPlayer(channelId, discordName) {
  client.channels.cache
    .get(channelId)
    .send(
      discordName +
        ", that is not a command please use **&help** to find a list of available commands.**"
    );
}

//  async function findPlayerStat(player,channelId, ) {

//     var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ player + "?api_key=" + APIKey

//     //axios.get(APICallString).then(function (response){
//      //   client.channels.cache.get(channelId).send(response.data.summonerLevel + " ");

//      try {
//         const response = await axios.get(APICallString);
//          client.channels.cache.get(channelId).send("**"+ player +"**'s "  + "Level is " + response.data.summonerLevel + " http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/" + response.data.profileIconId +  ".png");

//         } catch(error) {
//         console.log(error);

// //client.channel.catch.get(findPlayerStat)
// }}

async function findPlayerStat(player, channelId, summonerLevel) {
  var APICallString =
    "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
    player +
    "?api_key=" +
    APIKey;
  const response = await axios.get(APICallString);
  //axios.get(APICallString).then(function (response){
  //   client.channels.cache.get(channelId).send(response.data.summonerLevel + " ");

  try {
    const exampleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**" + player + "**'s " + "Summoners Profile")
      .setURL("https://na.op.gg/summoners/na/" + player)
      .setDescription("**" + player + "**'s Information")
      .setThumbnail(
        " http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/" +
          response.data.profileIconId +
          ".png"
      )
      .addFields(
        { name: "Level ", value: response.data.summonerLevel + " " },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addField("Inline field title", "Some value here", true)
      .setImage(
        "https://cdn.discordapp.com/attachments/397176214537633812/999862937793597471/Emblem_Diamond.png"
      )
      .setTimestamp()
      .setFooter({
        text: "&help for a list of commands.",
        iconURL:
          "http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/" +
          response.data.profileIconId +
          ".png",
      });

    client.channels.cache.get(channelId).send({ embeds: [exampleEmbed] });
  } catch (error) {
    console.log(error);

    //client.channel.catch.get(findPlayerStat)
  }
}
