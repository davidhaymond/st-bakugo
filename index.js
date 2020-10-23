const fs = require('fs');
const Discord = require('discord.js');

const prefix = '*';

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply("I can't execute that command inside DMs!");
    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}! The shame of St. Bakugo be upon you.`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    }
    catch (err) {
        console.error(err);
        message.reply('Something went wrong! What have you done with my quirk?!');
    }
});

client.login(process.env.ST_BAKUGO_BOT_TOKEN);
