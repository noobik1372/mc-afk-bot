const mineflayer = require('mineflayer')
const HOST = "blockoriasmp12010.mcsh.io"
const PORT = 25565
const USERNAME = "Bot_BlockoriaSMP"   // ← используй именно этот ник, как в логе
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

    bot.physicsEnabled = false   // ← очень важно на 1.21+

    // Login
    setTimeout(() => bot.chat(`/login ${PASSWORD}`), 4000)

    // После логина — spectator + tp (spectator лучше всего защищает от кика)
    setTimeout(async () => {
      bot.chat('/gamemode spectator')
      console.log("Переведён в spectator")

      await bot.waitForTicks(20)

      bot.chat('/tp 0 100 0')        // ←←← ПОМЕНЯЙ НА СВОИ БЕЗОПАСНЫЕ КООРДИНАТЫ
      console.log("Телепортирован")

      await bot.waitForTicks(30)

      bot.chat('/gamemode creative')
      bot.physicsEnabled = true
      console.log("Переведён в creative")
    }, 8000)

    // Запускаем твои функции ОЧЕНЬ поздно
    setTimeout(() => {
      startMovement(bot)
      startLook(bot)
      startChatSpam(bot)
      console.log("AFK-функции запущены")
    }, 45000)   // 45 секунд после спавна
  })

  bot.on("kicked", (reason) => console.log("Кик:", reason))
  bot.on("error", (err) => console.log("Ошибка:", err))
  bot.on("end", () => {
    console.log("Перезаход через 10 сек...")
    setTimeout(createBot, 10000)
  })
}

// === ТВОИ ФУНКЦИИ (оставил точно как были) ===
function startChatSpam(bot) {
  setInterval(() => {
    const messages = [
      "Телеграм канал сервера: https://t.me/blockoriaSMP",
      "Присоединяйтесь к нашему телеграму: https://t.me/blockoriaSMP",
      "Новости сервера тут: https://t.me/blockoriaSMP"
    ]
    bot.chat(messages[Math.floor(Math.random() * messages.length)])
  }, 150000)
}

function startMovement(bot) {
  setInterval(() => {
    const moves = ["forward", "back", "left", "right"]
    const move = moves[Math.floor(Math.random() * moves.length)]
    bot.setControlState(move, true)
    setTimeout(() => bot.setControlState(move, false), 3000)
    if (Math.random() > 0.5) {
      bot.setControlState("jump", true)
      setTimeout(() => bot.setControlState("jump", false), 400)
    }
  }, 80000)
}

function startLook(bot) {
  setInterval(() => {
    const yaw = Math.random() * Math.PI * 2
    const pitch = (Math.random() - 0.5) * 0.5
    bot.look(yaw, pitch, true)
  }, 60000)
}

createBot()
