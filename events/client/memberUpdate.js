const client = require("../../index")

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    let db = client.db
    if(db.get("blrank_" + newMember.guild.id + "_" + newMember.id)) {
       if(newMember.roles.cache.size > oldMember.roles.cache.size) {
        let role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first()
        newMember.roles.remove(role.id)
        
       }
    }
})