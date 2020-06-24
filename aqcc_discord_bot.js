/* require() will be used to load external npm/node modules. */
/* source() will be used to load local modules written by Artem Dev for AQCC Bot. */
global.source = (name) =>
  require(`${__dirname}/${require('./modules.json')[name]}`)
global.Discord = require('discord.js')
global.client = new Discord.Client()
const config = require('./../config.json')
const fs = require('fs')

client.on('ready', () => {
  console.log('Running in AQCC!')
  client.user.setActivity('AQCC', { type: 'WATCHING' })
  client.channels.fetch(config.admin_chat).then((channel) => {
    channel.send(`Running!`)
  })
})

client.on('message', (message) => {
  // NO REPLY TO BOT
  if (message.author.bot) return
  // ONLY AQCC
  if (message.guild.id !== config.guild) return

  // MONITORS ==========

  // FIX COLOURS CHAT
  if (message.channel.id === config.colour_chat) {
    // Should have something written
    if (!message.cleanContent) {
      return message
        .reply(
          '❌Text `id,colour,colour2,...` is missing or erronous. Type `?text` to see what to write when adding pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    // split arg string and remove null elements
    const args = message.cleanContent
      .replace(/ /g, '')
      .split(',')
      .filter((i) => i)

    let id = null
    let colours = null
    try {
      id = parseInt(args[0])
      colours = args
      colours.shift()
    } catch (e) {
      return message
        .reply(
          '❌Text `id,colour,colour2,...` is missing or erronous. Type `?text` to see what to write when adding pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (isNaN(id) || id <= 0 || id >= 10000) {
      return message
        .reply(
          "❌`id` must be a valid **ID** from the item list. Please check you're entiering the right value."
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!colours) {
      return message
        .reply(
          '❌Colours in to be provied as a list `colour,colour2,...`. You can enter between 1 and 5 colours. To see the colours list, type `?colours`.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (colours.length < 1 || colours.length > 5) {
      return message
        .reply(
          '❌Colours in to be provied as a list `colour,colour2,...`. You can enter between 1 and 5 colours. To see the colours list, type `?colours`.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (
      !colours.every((c) =>
        [
          'black',
          'white',
          'grey',
          'brown',
          'purple',
          'yellow',
          'blue',
          'orange',
          'green',
          'red',
          'all',
        ].includes(c)
      )
    ) {
      return message
        .reply(
          '❌One of the colours are invalid. Possible colours are `black,white,grey,brown,purple,yellow,blue,orange,green,red,all`. To see the colours list again, type `?colours`.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }
  }

  if (message.channel.id === config.female_chat) {
    if (!message.cleanContent) {
      return message
        .reply(
          '❌Text `id,colour,colour2,...` is missing or erronous. Type `?text` to see what to write when adding pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    const args = message.cleanContent
      .replace(/ /g, '')
      .split(',')
      .filter((i) => i)

    let id = null
    try {
      id = parseInt(args[0])
    } catch (e) {
      return message.reply('❌Text `id` is missing or erronous.').then((m) => {
        m.delete({ timeout: 30000 })
        message.delete({ timeout: 30000 })
      })
    }

    if (isNaN(id) || id <= 0 || id >= 10000) {
      return message
        .reply(
          "❌`id` must be a valid **ID** from the item list. Please check you're entiering the right value."
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!config.ndone_f.includes(id)) {
      return message
        .reply(
          `❌It seems this pictures for this gender has already been taken. Please look at what's left in the lists in the #links chat.`
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!parseInt(message.attachments.size) == 1) {
      return message
        .reply(
          '❌Either no pictures were submitted or more than one. Type `?pics` to see how to add pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!message.attachments.first().url.endsWith('.png')) {
      return message
        .reply(
          "❌Pictures are only accepted in `.png` format. Things like `.jpg` or `.PNG` will not be accepted. Type `?picsmore` to see how to add pics with the correct format, especially if you're on mobile."
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }
  }

  if (message.channel.id === config.male_chat) {
    if (!message.cleanContent) {
      return message
        .reply(
          '❌Text `id,colour,colour2,...` is missing or erronous. Type `?text` to see what to write when adding pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    const args = message.cleanContent
      .replace(/ /g, '')
      .split(',')
      .filter((i) => i)

    let id = null
    let colours = null
    try {
      id = parseInt(args[0])
      colours = args
      colours.shift()
    } catch (e) {
      return message
        .reply(
          '❌Text `id,colour,colour2,...` is missing or erronous. Type `?text` to see what to write when adding pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (isNaN(id) || id <= 0 || id >= 10000) {
      return message
        .reply(
          "❌`id` must be a valid **ID** from the item list. Please check you're entiering the right value."
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!config.ndone_m.includes(id)) {
      return message
        .reply(
          `❌It seems this pictures for this gender has already been taken. Please look at what's left in the lists in the #links chat.`
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!colours) {
      return message
        .reply(
          '❌Colours in to be provied as a list `colour,colour2,...`. You can enter between 1 and 5 colours. To see the colours list, type `?colours`.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (colours.length < 1 || colours.length > 5) {
      return message
        .reply(
          '❌Colours in to be provied as a list `colour,colour2,...`. You can enter between 1 and 5 colours. To see the colours list, type `?colours`.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (
      !colours.every((c) =>
        [
          'black',
          'white',
          'grey',
          'brown',
          'purple',
          'yellow',
          'blue',
          'orange',
          'green',
          'red',
          'all',
        ].includes(c)
      )
    ) {
      return message
        .reply(
          '❌One of the colours are invalid. Possible colours are `black,white,grey,brown,purple,yellow,blue,orange,green,red,all`. To see the colours list again, type `?colours`.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!parseInt(message.attachments.size) == 1) {
      console.log(parseInt(message.attachments.size) === 1)
      return message
        .reply(
          '❌Either no pictures were submitted or more than one. Type `?pics` to see how to add pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!parseInt(message.attachments.size) == 1) {
      return message
        .reply(
          '❌Either no pictures were submitted or more than one. Type `?pics` to see how to add pics.'
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }

    if (!message.attachments.first().url.endsWith('.png')) {
      return message
        .reply(
          "❌Pictures are only accepted in `.png` format. Things like `.jpg` or `.PNG` will not be accepted. Type `?picsmore` to see how to add pics with the correct format, especially if you're on mobile."
        )
        .then((m) => {
          m.delete({ timeout: 30000 })
          message.delete({ timeout: 30000 })
        })
    }
  }

  if (message.channel.id === config.admin_chat) {
    // COMMANDS ========

    // PREFIX
    if (!message.content.startsWith(config.prefix)) return

    // CMD/ARGS FROM D.JS
    args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase().replace(/\W/g, '')

    if (command === 'hi') {
      message.channel.send("Hi, I'm working here 👀")
    }
    if (command === 'text') {
      message.channel.send('WIP')
    }
    if (command === 'colours') {
      message.channel.send('WIP')
    }
    if (command === 'pics') {
      message.channel.send('WIP')
    }
    if (command === 'picsmore') {
      message.channel.send('WIP')
    }

    if (command === 'download') {
      message.reply('DOWNLOADING')
      async function lots_of_messages_getter(channel, limit, cols) {
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

        if (cols) {
          return sum_messages
            .map((m) => [
              m.content
                .replace(/\\/g, '')
                .split(',')
                .map((i) => `"${i}"`)[0],
              `[` +
                m.content
                  .replace(/\\/g, '')
                  .split(',')
                  .map((i) => `"${i}"`)
                  .slice(1) +
                `]`,
            ])
            .reverse()
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

      lots_of_messages_getter(
        message.guild.channels.resolve(config.male_chat),
        15000
      ).then((msgs) => {
        let stream = fs.createWriteStream('../pics_dump_list.txt')
        stream.once('open', function (fd) {
          msgs.forEach((m) => {
            stream.write(`[${Array.from(m)}],\n`)
          })
          stream.end()
          message.channel.send({
            files: [
              {
                attachment: '../pics_dump_list.txt',
                name: 'pics_dump_list.txt',
              },
            ],
          })
        })
        // msgs.forEach((m) => {
        //   console.log(m)
        // })
      })

      lots_of_messages_getter(
        message.guild.channels.resolve(config.female_chat),
        15000
      ).then((msgs) => {
        let stream = fs.createWriteStream('../pics_dump_list_f.txt')
        stream.once('open', function (fd) {
          msgs.forEach((m) => {
            stream.write(`[${Array.from(m)}],\n`)
          })
          stream.end()
          message.channel.send({
            files: [
              {
                attachment: '../pics_dump_list_f.txt',
                name: 'pics_dump_list_f.txt',
              },
            ],
          })
        })
      })

      lots_of_messages_getter(
        message.guild.channels.resolve(config.colour_chat),
        15000,
        true
      ).then((msgs) => {
        let stream = fs.createWriteStream('../pics_dump_list_fix.txt')
        stream.once('open', function (fd) {
          msgs.forEach((m) => {
            stream.write(`[${Array.from(m)}],\n`)
          })
          stream.end()
          message.channel.send({
            files: [
              {
                attachment: '../pics_dump_list_fix.txt',
                name: 'pics_dump_list_fix.txt',
              },
            ],
          })
        })
      })
    }
  }
})

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled rejection: ${err})`)
})

client.on('guildMemberAdd', (member) => {
  client.channels.fetch(config.main_chat).then((channel) => {
    channel.send(
      `Welcome to the AQCC server, ${member}. If you're here to help or mention any issues, @tag Droux!`
    )
  })
})

client.login(config.token)
