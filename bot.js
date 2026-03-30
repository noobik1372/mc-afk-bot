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

  bot.once('spawn', () => {
    console.log(`[${USERNAME}] → Зашёл на сервер`)

    // Только register и login
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
      console.log(`[${USERNAME}] → Отправлен /register`)
    }, 4000)

    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
      console.log(`[${USERNAME}] → Отправлен /login`)
    }, 8000)

    // Больше ничего не делаем — просто стоим
    console.log(`[${USERNAME}] → Бот просто стоит на месте`)
  })

  // Перезаход при отключении
  bot.on('kicked', (reason) => {
    console.log(`[${USERNAME}] Кикнут:`, reason)
    setTimeout(createBot, 5000)
  })

  bot.on('end', () => {
    console.log(`[${USERNAME}] Отключился — перезаход через 5 секунд`)
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log(`[${USERNAME}] Ошибка:`, err.message)
    setTimeout(createBot, 5000)
  })
}

createBot()
