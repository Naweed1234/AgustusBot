 import Discord from "discord.js";
 import token from "./token.js";


 const client = new Discord.Client({ intents:["GUILDS", "GUILD_MESSAGES" ]}); 
 const prefix = "&";
 

client.login(token);

client.on('ready', () => {
    console.log("ready")
})

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();  

    if(command=="ping"){
        message.channel.send("pong")
 } else if (command!="ping"){
    searchForPlayer(message.channel.id, message.author.username);
   // message.channel.send("This is not a command")
 }

})
 

 function searchForPlayer(channelId, discordName){
    
    client.channels.cache.get(channelId).send( discordName +  " that is not a command")
    

}

