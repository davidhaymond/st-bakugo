const fs = require('fs');

const USERS_PATTERN = /<@!?(\d{17,19})>/;

module.exports = {
    name: 'showcase',
    description: 'Retrieves or updates the "showcase anime" order',
    execute(message, args) {
        if (args.length) {
            message.channel.send("Don't you tell me what to do!!!!");
            const userIds = args
                .filter(arg => USERS_PATTERN.test(arg))
                .map(arg => USERS_PATTERN.exec(arg)[1]);
            fs.writeFileSync(process.env.ST_BAKUGO_STORE_PATH, JSON.stringify(userIds));
            setTimeout(() => message.channel.send("....eh whatever, I've updated the list."), 5000);
        }
        else {
            if (!fs.existsSync(process.env.ST_BAKUGO_STORE_PATH)) {
                message.channel.send("Baka! You haven't told me what the lineup is yet!");
            }
            else {
                const userIds = JSON.parse(fs.readFileSync(process.env.ST_BAKUGO_STORE_PATH));
                const users = userIds.map(id => message.client.users.cache.get(id));
                const list = users.reduce((acc, cur) => `${acc}, ${cur}`);
                message.channel.send(`The current order is: ${list}`);
            }
        }
    },
};
