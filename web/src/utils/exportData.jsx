const explore_data = {
    "category": {
        "formQuestions": [
            {
                "id": 0,
                "type": "TEXT",
                "title": "年齡",
                "description": ""
            },
            {
                "id": 1,
                "type": "SELECT",
                "title": "性別",
                "description": "",
                "options": [
                    "男",
                    "女",
                    "其他"
                ]
            },
            {
                "id": 2,
                "type": "TEXT",
                "title": "持續時間",
                "description": "這個症狀/疼痛持續多久了？頻率大概如何？"
            },
            {
                "id": 3,
                "type": "TEXT",
                "title": "部位",
                "description": "確切來說是哪邊在痛/哪邊受傷了？"
            },
            {
                "id": 4,
                "type": "TEXT",
                "title": "補充說明",
                "description": "有什麼想要補充說明的嗎？"
            },
            {
                "id": 5,
                "type": "MULTISELECT",
                "title": "你是哪裡不舒服呢？",
                "description": "選擇不舒服的部位。若有多個部位不適，請全部選擇",
                "options": [
                    {
                        "text": "全身症狀",
                        "description": "全身都不舒服，不知道是哪裡有問題",
                        "pageTitle": "描述不舒服的情況",
                        "subQuestionIds": [
                            2,
                            4
                        ]
                    },
                    {
                        "text": "常見症狀",
                        "description": "這些是大家常有的症狀，可以先點這個",
                        "pageTitle": "描述不舒服的情況",
                        "subQuestionIds": [
                            6
                        ]
                    }
                ]
            },
            {
                "id": 6,
                "type": "MULTISELECT",
                "title": "這些是常見的症狀",
                "description": "你哪裡不舒服？",
                "options": [
                    {
                        "text": "發燒",
                        "description": "頭熱熱的",
                        "pageTitle": "發燒",
                        "subQuestionIds": [
                            2,
                            7,
                            11,
                            4
                        ]
                    },
                    {
                        "text": "頭痛",
                        "description": "頭很不舒服",
                        "pageTitle": "頭痛",
                        "subQuestionIds": [
                            2,
                            12,
                            4
                        ]
                    },
                    {
                        "text": "胸悶胸痛",
                        "description": "胸悶胸痛，喘不過氣來的感覺",
                        "pageTitle": "胸悶胸痛",
                        "subQuestionIds": [
                            2,
                            13,
                            4
                        ]
                    },
                    {
                        "text": "腹痛",
                        "description": "肚子很痛",
                        "pageTitle": "腹痛",
                        "subQuestionIds": [
                            2,
                            3,
                            14,
                            4
                        ]
                    },
                    {
                        "text": "扭到",
                        "description": "腳踝、肩膀之類的扭到了",
                        "pageTitle": "發燒",
                        "subQuestionIds": [
                            2,
                            3,
                            15,
                            4
                        ]
                    },
                    {
                        "text": "拉傷",
                        "description": "拉到、腰閃到",
                        "pageTitle": "拉傷",
                        "subQuestionIds": [
                            2,
                            3,
                            16,
                            4
                        ]
                    }
                ]
            },
            {
                "id": 7,
                "type": "TEXT",
                "title": "有打疫苗嗎？",
                "description": "有的話請填疫苗種類"
            },
            {
                "id": 10,
                "type": "MULTISELECT",
                "title": "全身症狀",
                "description": "全身都不舒服，不知道是哪裡有問題",
                "options": [
                    "全身無力",
                    "全身發燒",
                    "全身發冷",
                    "全身發熱",
                    "全身發抖",
                    "全身發痛",
                    "全身發癢",
                    "全身發紅",
                    "全身發黑",
                    "全身發腫"
                ]
            },
            {
                "id": 11,
                "type": "MULTISELECT",
                "title": "發燒",
                "description": "發燒有伴隨下列這些症狀嗎？",
                "options": [
                    "頭暈",
                    "喉嚨痛",
                    "咳嗽",
                    "流鼻水",
                    "體重減輕",
                    "頭暈",
                    "皮膚發炎、口腔潰瘍"
                ]
            },
            {
                "id": 12,
                "type": "MULTISELECT",
                "title": "頭痛",
                "description": "你知道是哪裡痛嗎？怎麼痛？",
                "options": [
                    "前額",
                    "側面",
                    "後腦",
                    "全頭",
                    "我也不知道，他就是整個都在痛",
                    "我也有暈眩",
                    "血管在漲縮、放射性疼痛",
                    "嘔吐、肢體無力",
                    "高血壓、面色潮紅、胸悶、肢體無力",
                    "偏頭痛"
                ]
            },
            {
                "id": 13,
                "type": "MULTISELECT",
                "title": "胸悶胸痛",
                "description": "你知道是哪裡痛嗎？怎麼痛？",
                "options": [
                    "胸悶",
                    "胸痛",
                    "喘不過氣來",
                    "心悸",
                    "胸口壓迫感",
                    "左肩放射性疼痛",
                    "有受過外傷",
                    "很像被針刺到的劇痛",
                    "都不太符合",
                    "我也有咳嗽、喉嚨痛"
                ]
            },
            {
                "id": 14,
                "type": "MULTISELECT",
                "title": "肚子痛",
                "description": "你知道是哪裡痛嗎？怎麼痛？",
                "options": [
                    "左上腹",
                    "右上腹",
                    "左下腹",
                    "右下腹",
                    "我也不知道，他就是整個都在痛啊啊啊",
                    "絞痛",
                    "我也有拉肚子"
                ]
            },
            {
                "id": 15,
                "type": "MULTISELECT",
                "title": "扭到",
                "description": "扭到之後，受傷的部位有下面這些情況嗎？",
                "options": [
                    "無法施力",
                    "碰一下就痛",
                    "腫起來",
                    "奇怪的聲響",
                    "麻木、感覺變差",
                    "同一個部位反覆受傷"
                ]
            },
            {
                "id": 16,
                "type": "MULTISELECT",
                "title": "拉傷",
                "description": "拉到之後，受傷的部位有下面這些情況嗎？",
                "options": [
                    "無法施力",
                    "碰一下就痛",
                    "腫起來",
                    "奇怪的聲響",
                    "麻木、感覺變差",
                    "同一個部位反覆受傷"
                ]
            }
        ],
        "initialPage": {
            "description": "<INIT>",
            "pageTitle": "來吧寶貝",
            "subQuestionIds": [
                0,
                1,
                6
            ]
        }
    }
}

export{explore_data};