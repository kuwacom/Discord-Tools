require('dotenv').config();

const channelId = ''; // メッセージ送信先チャンネルID

const reply = {
    enable: false, // リプライするか
    targetMessageId: '', // リプライ先メッセージID
};

const messageContent =
    "test"; // リプライメッセージ

const messageCount = 2; // メッセージ送信回数

const sendMessages = async () => {
    try {
        const ress = await Promise.all([...Array(messageCount)].map(() => {
            return fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': process.env.TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile_network_type: "unknown",
                    content: messageContent,
                    message_reference: reply.enable ? { message_id: reply.targetMessageId } : undefined,
                    tts: false,
                    flags: 0
                })
            });
        }));

        console.log(`Done send ${ress.length} Messages!`);
    } catch (error) {
        console.error('Error:', error);
    }
};
sendMessages();
