const { log } = require("console");
const {
  MessageEmbed,
} = require("discord.js");
module.exports = {
    name: "wl",
    helpname : "wl <add/remove> <@user>",
    description : "Ajouter ou retirer un wl",
  
  async execute(message, args, client) {
    //check if the user is the wl of the bot

    if(message.member.id !== client.config.ownerID) return;
    let db = client.db;
    //check for args
    if(!args[0]) return message.reply({content : "Veuillez préciser une action"})
    if(!args[1] && args[0] !==  "list") return message.reply({content : "Veuillez préciser un utilisateur"})


   
    if(args[0] == "remove"){

        let member =  await client.users.fetch( message.mentions?.members.first()?.id == null ? args[1] :  message.mentions?.members.first().id);
    if(!member) return message.reply({content : "Veuillez préciser un utilisateur"})
  
        if(db.get(`wls_${message.guild.id}_${member.id}`) !== true) return message.reply({content : `${member} n'est pas wl`})
        db.delete(`wls_${message.guild.id}_${member.id}`)
       
       
        //here the message is not send cause 
        return message.reply({content : `${member} n'est plus wl`})
    }
    if(args[0] == "add"){
        let member =  await client.users.fetch( message.mentions?.members.first()?.id == null ? args[1] :  message.mentions?.members.first().id);;
    if(!member) return message.reply({content : "Veuillez préciser un utilisateur"})

        if(db.get(`wls_${message.guild.id}_${member.id}`) == true) return message.reply({content : `${member} est déjà wl`})
        db.set(`wls_${message.guild.id}_${member.id}`, true)
       
        return message.reply({content : `${member} est maintenant wl`})
    }
    if(args[0] == "list"){
        let currentIndex = 0;
 
        let wls = db.all().filter(data => data.ID.startsWith(`wls_${message.guild.id}`)).map(data => data.ID.split("_")[2])
       let embed = new MessageEmbed()
         .setTitle("Liste des whitelist")
           //we gonna set an invisible color for the embed
          .setColor("2F3136")
            nextTenwls()
    async function nextTenwls(){
        embed.description = "";
        for(let i = currentIndex; i < currentIndex + 10; i++){
            if(!wls[i]) break;
            let wl = await client.users.fetch(wls[i])
            embed.description += `${ wl}\n`;
        }
        currentIndex += 10;
        message.channel.send({embeds : [embed]})

    }
    }
 
  }
}