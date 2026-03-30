const mineflayer = require('mineflayer')

const HOST = "blockoriasmp12010.mcsh.io"
const PORT = 25565
const USERNAME = "Bot_BlockoriaSMP"
const PASSWORD = "botbotRU"

process.on('uncaughtException', (err) => {
  console.log('Поймана ошибка (unknown chat format) — перезапуск через 5 сек')
  setTimeout(createBot, 5000)
})

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  })

  console.log(`[${USERNAME}] → Запуск...`)

  // Отключаем всё связанное с чатом
  bot._client.removeAllListeners('chat')
  bot._client.removeAllListeners('systemChat')
  bot._client.removeAllListeners('message')
  bot._client.removeAllListeners('messagestr')

  bot.once('spawn', () => {
    bot.physicsEnabled = false
    console.log(`[${USERNAME}] → Зашёл на сервер`)

    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
      console.log(`[${USERNAME}] → /register`)
    }, 4000)

    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
      console.log(`[${USERNAME}] → /login`)
    }, 8000)

    bot.physicsEnabled = false
    console.log(`[${USERNAME}] → Бот просто стоит (физика отключена)`)
  })

  // ←←← ОБРАБОТКА КИКОВ ←←←
  bot.on('kicked', (reason) => {
    console.log(`[${USERNAME}] Кик:`, reason)

    const reasonText = JSON.stringify(reason)

    if (reasonText.includes("The same username is already playing on the server!")) {
      console.log(`[${USERNAME}] Тот же ник уже на сервере — ждём 30 секунд`)
      setTimeout(createBot, 30000)
    } else {
      console.log(`[${USERNAME}] Обычный кик — перезаход через 5 секунд`)
      setTimeout(createBot, 5000)
    }
  })

  bot.on('end', () => {
    console.log(`[${USERNAME}] Отключился — перезаход через 5 сек`)
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log(`[${USERNAME}] Ошибка:`, err.message)
    setTimeout(createBot, 5000)
  })
}

createBot()
