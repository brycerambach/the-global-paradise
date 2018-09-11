const Discord = require('discord.js');
const prefix = "."
const { Client, Attachment } = require('discord.js');


// Create an instance of a Discord client
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  if (message.content === prefix + 'ping') {
    message.channel.send('pong');
  }
});

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === prefix + 'avatar') {
    // Send the user's avatar URL
    message.channel.send(message.author.avatarURL);
  }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === prefix + 'rip') {
        // Create the attachment using Attachment
        const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban('Optional reason that will display in the audit logs').then(() => {
          message.channel.send(`Successfully banned ${user.tag}`);
        }).catch(err => {
          message.channel.send('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'help')) {
    message.channel.send('**__TGP Bot Commands:__**\n.help - Displays a list of the bots commands.\n**__Moderation:__**\n.kick - Kicks a user.\n.ban - Bans a user.\n**__Custom Commands__**\n.bryce');
  }
});

client.login('proccess.env.BOT_TOKEN');
