require('dotenv').config();

const reply = {
    enable: (process.env.ENABLE_REPLY == 'true' ? true : false), // リプライするか
    targetMessageId: process.env.REPLY_TARGET_MESSAGE_ID, // リプライ先メッセージID
};

const messageCount = 2; // メッセージ送信回数

const sendMessages = async (message) => {
    return fetch(`https://discord.com/api/v9/channels/${process.env.TARGET_CHANNEL_ID}/messages`, {
        method: 'POST',
        headers: {
            'Authorization': process.env.TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mobile_network_type: "unknown",
            content: message,
            message_reference: reply.enable ? { message_id: reply.targetMessageId } : undefined,
            tts: (process.env.ENABLE_TTS == 'true' ? true : false),
            flags: 0
        })
    });
};

(async () => {
    try {
        const ress = await Promise.all([...Array(messageCount)].map(() => {
            return sendMessages(process.env.MESSAGE_CONTENTS);
        }));
        console.log(`Done send ${ress.length} Messages!`);
    } catch (error) {
        console.error('Error:', error);
    }
})();