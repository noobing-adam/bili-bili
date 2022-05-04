module.exports = (client) => {
  client.emoji = function(e){
    let tik = client.emojis.cache.find(x => x.name.includes("OnayPng"))
    let carpi= client.emojis.cache.find(x => x.name.includes("ReddetmekPng"))
    let kalp = client.emojis.cache.find(x => x.name.includes("KalpPng"))
    let dot = client.emojis.cache.find(x => x.name.includes("dot"))
    let unlem = client.emojis.cache.find(x => x.name.includes("YanpSnennleGif")) 
    if(e == "tik") return "<:"+tik.name+":"+tik+">"
    if(e == "carpi") return "<:" +carpi.name + ":" + carpi + ">"
    if(e == "kalp") return "<:" + kalp.name + ":" + kalp + ">"
    if(e == "dot") return "<:" + dot.name + ":" + dot + ">"
    if(e == "unlem") return "<a:" + unlem.name + ":" + unlem + ">" 
  }
}