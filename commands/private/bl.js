
const { MessageEmbed } = require("discord.js")
module.exports = {
    //here we gonna set proprieties for the command like the name, the description, the aliases, the category and the usage in the collection that we created in the index.js file
    name : "blrank",
    //here we gonna use helpname for our help command later
    helpname : "blrank <add/remove/list> <user>",
    description : "Ajouter ou retirer un membre de la blacklist des rôles",

    execute(message, args, client) {
        let db = client.db
        if(db.get("wls_" + message.guild.id + "_" + message.member.id) || message.member.id == client.config.ownerID) {
       let type = args[0]
      
       
    if(!type) return;
    if(type === "add") {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!member) return message.channel.send("Veuillez spécifier un utilisateur")
        if(db.get("blrank_" + message.guild.id + "_" + member.id)) return message.channel.send("Cet utilisateur est déjà dans la blacklist")
        db.set("blrank_" + message.guild.id + "_" + member.id, true)
        message.channel.send(`${member} a été ajouté à la blacklist`)
    }
    if(type === "remove") {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!member) return message.channel.send("Veuillez spécifier un utilisateur")
        if(!db.get("blrank_" + message.guild.id + "_" + member.id)) return message.channel.send("Cet utilisateur n'est pas dans la blacklist")
        db.delete("blrank_" + message.guild.id + "_" + member.id)
        message.channel.send(`${member} a été retiré de la blacklist`)
    }
    if(type == "list"){
        let currentIndex = 0;
 
        let owners = db.all().filter(data => data.ID.startsWith(`blrank_${message.guild.id}`)).map(data => data.ID.split("_")[2])
       let embed = new MessageEmbed()
         .setTitle("Liste des blacklist rank")
           //we gonna set an invisible color for the embed
          .setColor("2F3136")
            nextTenOwners()
    async function nextTenOwners(){
        embed.description = "";
        for(let i = currentIndex; i < currentIndex + 10; i++){
            if(!owners[i]) break;
            let owner = await message.guild.members.cache.get(owners[i])
            embed.description += `${ owner}\n`;
        }
        currentIndex += 10;
        message.channel.send({embeds : [embed]})

    }
    }

}
}
}