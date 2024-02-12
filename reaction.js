require('dotenv').config();

const emojiList = require(process.env.EMOJI_LIST_FILE);

const addEmoji = async (emojiId) => {
    return fetch(
        `https://discord.com/api/v9/channels/${process.env.TARGET_CHANNEL_ID}/messages/${process.env.REACTION_TARGET_MESSAGE_ID}/reactions/emoji%3A${emojiId}/%40me` +
        (process.env.ENABLE_SUPER_REACTION == 'true' ? '?type=1' : '')
        , {
            method: 'PUT',
            headers: {
                'Authorization': process.env.TOKEN,
            }
        });
};

const removeEmoji = async (emojiId) => {
    return fetch(
        `https://discord.com/api/v9/channels/${process.env.TARGET_CHANNEL_ID}/messages/${process.env.REACTION_TARGET_MESSAGE_ID}/reactions/emoji%3A${emojiId}/%40me` +
        (process.env.ENABLE_SUPER_REACTION == 'true' ? '?type=1' : '')
        , {
            method: 'DELETE',
            headers: {
                'Authorization': process.env.TOKEN,
            }
        });
};

(async () => {
    try {
        // const ress = await Promise.all(emojiList.map((emoji) => {
        //     const emojiId = emoji.split(':')[1];
        //     if (process.env.REACTION_MODE == 'ADD') {
        //         console.debug('ADD Reaction: ' + emojiId);
        //         return addEmoji(emojiId);
        //     } else {
        //         return removeEmoji(emojiId);
        //     }
        // }));

        const ress = [];
        for (const emoji of emojiList) {
            const emojiId = emoji.split(':')[1];
            if (process.env.REACTION_MODE === 'ADD') {
                console.debug('ADD Reaction: ' + emojiId);
                ress.push(await addEmoji(emojiId));
            } else {
                ress.push(await removeEmoji(emojiId));
            }
        }

        // ress.forEach((res) => {
        //     console.log()
        // });
        console.log(`Done send ${ress.length} Messages!`);
    } catch (error) {
        console.error('Error:', error);
    }
})();