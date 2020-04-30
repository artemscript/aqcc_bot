/* require() will be used to load external npm/node modules. */
/* source() will be used to load local modules written by Artem Dev for AQCC Bot. */
global.source = (name) =>
  require(`${__dirname}/${require('./modules.json')[name]}`)
global.Discord = require('discord.js')
global.client = new Discord.Client()
const config = require('../config.json')
const fs = require('fs')

client.on('ready', () => {
  console.log('Running in AQCC!')
  client.user.setActivity('AQCC ppl 😳', { type: 'WATCHING' })
  client.channels.fetch('704686025385050132').then((ch) => {
    ch.send(`Running!`)
  })
})

client.on('message', (message) => {
  // NO REPLY TO BOT
  if (message.author.bot) return
  // ONLY AQCC
  if (message.guild.id !== '604199269716459530') return
  // ONLY DROUX
  if (message.author.id !== '100666740307955712') return

  // PREFIX
  if (!message.content.startsWith(config.prefix)) return

  // CMD/ARGS FROM D.JS
  args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase().replace(/\W/g, '')

  if (command === 'download') {
    message.reply('DOWNLOADING')
    async function lots_of_messages_getter(channel, limit) {
      const sum_messages = []
      let last_id

      while (true) {
        console.log('Looping')
        const options = { limit: 100 }
        if (last_id) {
          options.before = last_id
        }

        const messages = await channel.messages.fetch(options)
        sum_messages.push(...messages.array())
        last_id = messages.last().id

        if (messages.size != 100 || sum_messages.length >= limit) {
          break
        }
      }

      return sum_messages
        .map((m) => [
          `"${m.attachments.first().url}"`,
          m.content
            .replace(/\\/g, '')
            .split(',')
            .map((i) => `"${i}"`),
        ])
        .reverse()
    }

    msgs = lots_of_messages_getter(
      message.guild.channels.resolve('704354704691560530'),
      15000
    ).then((msgs) => {
      let stream = fs.createWriteStream('pics_dump_list.txt')
      stream.once('open', function (fd) {
        msgs.forEach((m) => {
          stream.write(`[${Array.from(m)}],\n`)
        })
        stream.end()
        message.channel.send({
          files: [
            {
              attachment: 'pics_dump_list.txt',
              name: 'pics_dump_list.txt',
            },
          ],
        })
      })
      // msgs.forEach((m) => {
      //   console.log(m)
      // })
    })
  }
})
client.login(config.token)
