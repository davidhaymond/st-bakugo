module.exports = {
    name: 'help',
    description: 'List some stuff',
    execute(message, args) {
        message.channel.send(`Oh, you thought I would actually _help_ the likes of you, ${message.author}?`);
        setTimeout(() => {
            message.channel.send('https://tenor.com/view/kaguya-kaguya-sama-how-cute-o-kawaii-koto-cute-gif-13499314');
        }, 2000);
    },
};
