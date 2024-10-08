const question = [
    {
        id: 0,
        type: "TEXT",
        hasSubpage: false,
        title: "年齡",
        description: "年齡是一個人幾歲",
    },
    {
        id: 1,
        type: "MULTISELECT",
        hasSubpage: true,
        title: "症狀",
        description: "症狀是你的身體發生什麼事",
        options: [
            {
                text: "太甲了",
                description: "如何太甲",
                title: "如何太甲",
                subQuestions: [2, 3],
            },
            {
                text: "中暑",
                description: "中暑情形",
                title: "中暑情形",
                subQuestions: [2, 3],
            },
        ],
    },
    {
        id: 6,
        type: "SELECT",
        hasSubpage: false,
        title: "疼痛模式",
        description: "疼痛模式是你有多痛",
        options: ["好痛", "好爽"],
    },
];
const validHash = /^[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15}\Z$/;

export { question, validHash };
export default question;
