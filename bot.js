const mineflayer = require('mineflayer')

const HOST = "blockoriasmp12010.mcsh.io"
const PORT = 25565
const USERNAME = "Bot_BlockoriaSMP"
const PASSWORD = "botbotRU"

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  })

  console.log(`[${USERNAME}] → Запуск...`)

  // Отключаем все обработчики чата, чтобы не было ошибки "unknown chat format code"
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

    console.log(`[${USERNAME}] → Бот просто стоит`)
  })

  // Перезаход при любом вылете
  bot.on('kicked', (reason) => {
    console.log(`[${USERNAME}] Кикнут:`, reason)
    setTimeout(createBot, 5000)
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
