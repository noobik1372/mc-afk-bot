const mineflayer = require('mineflayer')
const HOST = "blockoriasmp12010.mcsh.io"
const PORT = 25565
const USERNAME = "BlockoriaSMPBot"
const PASSWORD = "botbotRU"

process.on('uncaughtException', (err) => {
  console.log("CRASH PREVENTED:", err)
})

function createBot(){
const bot = mineflayer.createBot({
  host: HOST,
  port: PORT,
  username: USERNAME,
  version: false
})

bot._client.removeAllListeners('playerChat')
bot._client.removeAllListeners('systemChat')
bot._client.removeAllListeners('message')
bot._client.removeAllListeners('messagestr')

bot.once('spawn', async () => {          // ←←← ИЗМЕНЕНО НА async
  await bot.waitForChunksToLoad();       // ←←← теперь правильно работает

  bot._client.removeAllListeners('playerChat')
  bot._client.removeAllListeners('systemChat')
  bot._client.removeAllListeners('message')
  bot._client.removeAllListeners('messagestr')

  console.log("Бот зашел на сервер")
  setTimeout(()=>{
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
  },3000)
  setTimeout(()=>{
    bot.chat(`/login ${PASSWORD}`)
  },6000)
  startMovement(bot)
  startLook(bot)
  startChatSpam(bot)

  setInterval(() => {
  bot.swingArm("right")
}, 15000)
})

bot.on("death",()=>{
  console.log("Бот умер")
  setTimeout(()=>{
    try{
      bot.respawn()
    }catch{
      bot.quit()
    }
  },2000)
})
bot.on("kicked",(reason)=>{
  console.log("Кик:",reason)
})
bot.on("error",(err)=>{
  console.log("Ошибка:",err)
})
bot.on("end",()=>{
  console.log("Перезаход через 10 сек")
  setTimeout(createBot,10000)
})
}

function startChatSpam(bot){
setInterval(()=>{
const messages = [
"Телеграм канал сервера: https://t.me/blockoriaSMP",
"Присоединяйтесь к нашему каналу: https://t.me/blockoriaSMP",
"Новости сервера тут: https://t.me/blockoriaSMP",
"Если увидели баг в работе сервера/плагинов сообщите в TG: @BlockoriaSMP_Help. За находку багов вы можете получить вознаграждение.",
"Пожелания? Жалобы? Вопросы? Пиши админу, ответим! (TG: @BlockoriaSMP_Help)"
]
const msg = messages[Math.floor(Math.random()*messages.length)]
bot.chat(msg)
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
},400)
}
},80000)
}

function startLook(bot){
setInterval(()=>{
const yaw = Math.random() * Math.PI * 2
const pitch = (Math.random() - 0.5) * 0.5
bot.look(yaw,pitch,true)
},60000)
}

createBot()
