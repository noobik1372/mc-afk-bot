const mineflayer = require('mineflayer')

function createBot(){

const bot = mineflayer.createBot({
  host: 'blockoriasmp12010.mcsh.io',
  port: 25565,
  username: 'BlockoriaSMPBot'
})

bot.once('spawn', () => {

console.log("Бот зашел")

setTimeout(()=>{
bot.chat("/login botbotRU")
},4000)

startChatSpam(bot)
startMovement(bot)

})

bot.on("death", ()=>{
console.log("Бот умер -> респавн")
bot.chat("/spawn")
})

bot.on("end", ()=>{
console.log("Переподключение через 10 сек")
setTimeout(createBot,10000)
})

bot.on("error", console.log)
bot.on("kicked", console.log)

}

function startChatSpam(bot){

setInterval(()=>{

bot.chat("Телеграм канал сервера: https://t.me/blockoriaSMP")

},150000)

}

function startMovement(bot){

setInterval(()=>{

const moves = ["forward","back","left","right"]

const move = moves[Math.floor(Math.random()*moves.length)]

bot.setControlState(move,true)

setTimeout(()=>{
bot.setControlState(move,false)
},3000)

if(Math.random()>0.5){
bot.setControlState("jump",true)

setTimeout(()=>{
bot.setControlState("jump",false)
},500)
}

},90000)

}

createBot()
