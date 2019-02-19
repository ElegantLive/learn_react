const chat = {
    chat_id: String,
    from: String,
    content: String,
    to: String,
    create_time:Number,
    is_read:Boolean
};

const user = {
    user: String,
    pwd: String,
    type: String,
    avatar: String,
    desc: String,
    title: String,
    company: String,
    money: String
};

export default {
    chat,
    user,
};