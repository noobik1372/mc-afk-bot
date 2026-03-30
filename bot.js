const mineflayer = require('mineflayer')
const HOST = "blockoriasmp12010.mcsh.io"
const PORT = 25565
const USERNAME = "Bot_BlockoriaSMP"
const PASSWORD = "botbotRU"

process.on('uncaughtException', (err) => {
  console.log("CRASH PREVENTED:", err)
})

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  })

  bot.once('spawn', async () => {
    console.log("Бот заспавнился")

    await bot.waitForChunksToLoad()
    console.log("Чанки загружены")

    bot.physicsEnabled = false
    console.log("Физика отключена")

    // Логин
    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
      console.log("Отправлен /login")
    }, 5000)

    // Самая безопасная стратегия для 1.21.8:
    setTimeout(async () => {
      bot.chat('/gamemode spectator')
      console.log("✅ Переведён в SPECTATOR")

      await bot.waitForTicks(40)   // длинная пауза

      bot.chat('/tp 0 100 0')      // ←←← ОБЯЗАТЕЛЬНО ПОМЕНЯЙ НА СВОИ КООРДИНАТЫ!!!
      console.log("✅ Телепорт выполнен")

      await bot.waitForTicks(60)

      bot.chat('/gamemode creative')
      bot.physicsEnabled = true
      console.log("✅ Переведён в creative")
    }, 12000)
  })

  // ТВОИ ФУНКЦИИ ЗАПУСКАЕМ ТОЛЬКО ЧЕРЕЗ 70 СЕКУНД
  setTimeout(() => {
    startMovement(bot)
    startLook(bot)
    startChatSpam(bot)
    console.log("AFK-функции запущены")
  }, 70000)

  bot.on("kicked", (reason) => {
    console.log("Кик:", reason)
  })

  bot.on("error", (err) => {
    console.log("Ошибка:", err)
  })

  bot.on("end", () => {
    console.log("Перезаход через 15 сек...")
    setTimeout(createBot, 15000)
  })
}

// === ТВОИ ФУНКЦИИ (оставил без изменений) ===
function startChatSpam(bot){
  setInterval(() => {
    const messages = [
      "Телеграм канал сервера: https://t.me/blockoriaSMP",
      "Присоединяйтесь к нашему телеграму: https://t.me/blockoriaSMP",
      "Новости сервера тут: https://t.me/blockoriaSMP"
    ]
    const msg = messages[Math.floor(Math.random()*messages.length)]
    bot.chat(msg)
  }, 150000)
}

function startMovement(bot){
  setInterval(() => {
    const moves = ["forward","back","left","right"]
    const move = moves[Math.floor(Math.random()*moves.length)]
    bot.setControlState(move,true)
    setTimeout(()=>{ bot.setControlState(move,false) },3000)
    if(Math.random()>0.5){
      bot.setControlState("jump",true)
      setTimeout(()=>{ bot.setControlState("jump",false) },400)
    }
  },80000)
}

function startLook(bot){
  setInterval(() => {
    const yaw = Math.random() * Math.PI * 2
    const pitch = (Math.random() - 0.5) * 0.5
    bot.look(yaw,pitch,true)
  },60000)
}

createBot()
