const STORAGE_KEY = "wanwan-picker-v6";
const CURRENT_USER_KEY = "wanwan-current-user";
const REMEMBERED_USER_KEY = "xw-remembered-user";
const HISTORY_LIMIT = 10;
const PLAN_BOOK_LIMIT = 12000;
const IDENTITY_PASSWORDS = {
  "080831": "wanwan",
  "050116": "jiaxin",
};
const USER_LABELS = {
  wanwan: "婉婉",
  jiaxin: "家鑫",
};
const PLAN_EDIT_PASSWORD = "050116";
const PLAN_GATE_SEQUENCE = ["敬", "请", "请", "期", "期", "待", "待"];
const HIDDEN_ENTRY_TIMEOUT = 1800;
const HIDDEN_ENTRY_PATTERN = ["mark", "mark", "mark", "text"];
const CLOUD_LOAD_ENDPOINT = "/api/load-state";
const CLOUD_SAVE_ENDPOINT = "/api/save-state";
const FLIGHT_REDIRECT_URL = "https://flying-chess.orange-trees.com/";
const RELATIONSHIP_START_DATE = "2025-08-31";
const LETTER_HISTORY_LIMIT = 20;
const NOTIFICATION_POLL_INTERVAL = 8000;
const CUSTOM_DIARY_MOOD_VALUE = "__custom";
const ANNOUNCEMENT_VERSION = "2026-06-27-plan-notice";
const ANNOUNCEMENT_TITLE = "小屋公告";
const ANNOUNCEMENT_CONTENT =
  "这次更新把通知和凭证操作收得更像手机：通知可以滑动删除，挨揍凭证可以左滑操作，申请和回复也会更清楚地提醒。";
const ANNOUNCEMENT_SEEN_PREFIX = "xw_announcement_seen";
const DAILY_TASKS = [
  "给李家鑫说一句“我想你了”，不许只发两个字糊弄过去。",
  "今天给婉婉留一句具体夸夸，要说清楚哪里可爱。",
  "互相发一张今天的小照片，让对方知道你此刻在哪里。",
  "睡前认真说一句晚安，再补一句明天也要喜欢我。",
  "今天选一个十分钟小约会：语音、视频、一起听歌都可以。",
  "给对方取一个今日限定昵称，晚上之前都要这样叫。",
  "把今天最想抱抱对方的瞬间写下来，存进小纸条。",
  "发一句“今天辛苦啦”，然后认真问问对方累不累。",
  "一起约定明天要完成的一件小事，越小越容易坚持。",
  "给对方发一条只能今晚看的撒娇消息。",
  "说一个今天让你想到对方的小细节。",
  "给彼此一个今日奖励：一句夸夸、一个拥抱承诺或一个小愿望。",
];
const DEFAULT_SECRET_LETTER = `给今晚的我们：
如果你点到了这里，说明你发现了这张藏起来的小纸条。

这里可以写给婉婉，也可以写给李家鑫。
可以认真一点，也可以害羞一点。
不用急着把所有话都说完，只要把此刻最想留下的心情放在这里就好。

愿今晚的抽卡不是为了分输赢，
而是让两个人都被认真看见、认真偏爱、认真照顾。

如果有一句话不好意思当面说，就先写在这里。
等某个合适的夜晚，再慢慢告诉对方。`;

const truthQuestions = [
  "真心话：第一次见到对方时，你的第一印象是什么？",
  "真心话：最近哪一个瞬间让你突然想起对方？",
  "真心话：对方做过哪件小事，让你一直记到现在？",
  "真心话：如果给对方换一个专属昵称，你会叫她什么？",
  "真心话：你最想和对方一起去哪里？",
  "真心话：你觉得你们之间谁更容易先认真？",
  "真心话：说出对方身上三个你欣赏的优点。",
  "真心话：哪一首歌最像你们现在的关系？",
  "真心话：你现在最想问对方什么？",
  "真心话：对方哪句话曾让你开心很久？",
  "真心话：你觉得对方什么时候最好看？",
  "真心话：用三个词形容你们现在的关系。",
  "真心话：你最期待下一次一起做什么？",
  "真心话：说一句一直想说但没有说出口的话。",
  "真心话：你最喜欢对方怎么称呼你？",
  "真心话：你觉得彼此最默契的一件事是什么？",
  "真心话：如果一起旅行三天，你最期待哪个环节？",
  "真心话：你最想保留两个人之间的哪一个习惯？",
  "真心话：对方身上哪个反差最吸引你？",
  "真心话：你有没有因为对方吃过一点醋？",
  "真心话：你觉得自己在对方面前和平时有什么不同？",
  "真心话：如果明天就能实现一个共同愿望，你选什么？",
  "真心话：你最想收到对方怎样的一份小礼物？",
  "真心话：哪一次聊天让你觉得彼此更靠近了？",
  "真心话：如果给今晚打分，你会打几分？为什么？",
  "真心话：你最想和对方一起培养什么爱好？",
  "真心话：你觉得对方最可爱的一个习惯是什么？",
  "真心话：你希望对方更了解你的哪一面？",
  "真心话：如果可以重播一个共同瞬间，你会选哪个？",
  "真心话：说一件你愿意认真为这段关系做的事。",
  "真心话：你小时候最糗的一件事是什么？",
  "真心话：异地时你最常做的解压方式是什么？",
  "真心话：你最想和我一起实现的旅行目的地是哪里？",
  "真心话：说说你最近做的一个关于我的梦。",
  "真心话：你最喜欢我哪一种撒娇的表现？",
  "真心话：如果我们同居，第一天你想怎么安排？",
  "真心话：你觉得我们之间最需要改进的地方是什么？",
  "真心话：描述你理想中我们的周末日常。",
  "真心话：你有因为我而偷偷流泪的经历吗？",
  "真心话：最让你感动的一句我对你说过的话是什么？",
  "真心话：你现在最想被我抱住多久？",
  "真心话：说说你对未来我们的家庭的想象。",
  "真心话：你最喜欢我穿什么样子的衣服？",
  "真心话：异地恋让你成长最大的地方是什么？",
  "真心话：你最想和我分享的一首歌或一部电影？",
];

const dareQuestions = [
  "大冒险：认真看着对方的眼睛十秒。",
  "大冒险：给对方取一个今晚限定的昵称。",
  "大冒险：选一首歌，把最想让对方听的一句念出来。",
  "大冒险：和对方拍一张今晚限定的合照。",
  "大冒险：模仿对方平时最可爱的一个小动作。",
  "大冒险：给对方写一句十个字以内的留言。",
  "大冒险：让对方决定你下一条朋友圈文案，但不强制发布。",
  "大冒险：说一句只有你们两个人懂的话。",
  "大冒险：互相夸对方一分钟，中间不许敷衍。",
  "大冒险：为对方挑一首专属歌曲并解释原因。",
  "大冒险：让对方在你的备忘录里留一句话。",
  "大冒险：一起完成一个比心，保持五秒。",
  "大冒险：答应对方一个力所能及的小愿望。",
  "大冒险：用最温柔的语气叫一次对方的名字。",
  "大冒险：各自说出下一次见面最想做的一件事。",
  "大冒险：给对方发一个只属于今晚的表情包。",
  "大冒险：用三个词现场夸奖对方。",
  "大冒险：一起选一张照片作为今晚的纪念。",
  "大冒险：为对方倒一杯水或拿一份小零食。",
  "大冒险：用一句电影台词形容你们现在的关系。",
  "大冒险：让对方挑一个姿势，一起拍张合照。",
  "大冒险：互相分享最近循环最多的一首歌。",
  "大冒险：闭眼听对方说一句悄悄话。",
  "大冒险：给对方三十秒时间随意提问，必须认真回答。",
  "大冒险：一起计划一次不超过半天的小约会。",
  "大冒险：把对方的昵称写在纸上并加一句评价。",
  "大冒险：分别说出对方今天最好看的一个细节。",
  "大冒险：一起做一个搞怪表情并拍下来。",
  "大冒险：让对方从你的歌单里收藏一首歌。",
  "大冒险：认真说一句“今天和你待在一起很开心”。",
  "大冒险：用可爱声音唱一首儿歌给我听。",
  "大冒险：发一张你今天吃过的饭的照片。",
  "大冒险：认真描述你今天的心情，用三句话。",
  "大冒险：去阳台（或窗边）对着空气说我想你。",
  "大冒险：用枕头做拥抱动作并录10秒。",
  "大冒险：现在说出一件你想和我一起做但还没做的日常小事。",
  "大冒险：发一段你最近最喜欢的音乐给我。",
  "大冒险：双手比心对着镜头保持10秒。",
  "大冒险：用搞笑语气讲一个冷笑话。",
  "大冒险：现在整理一下你的桌面并给我看。",
];

const circleTruthQuestions = [
  "真心话：你对 Spank 小圈最感兴趣的部分是什么？",
  "真心话：你更在意氛围、仪式感还是身体感受？",
  "真心话：哪些行为是你明确不接受的边界？",
  "真心话：你希望用什么安全词表示立即停止？",
  "真心话：你更喜欢轻松玩笑式还是认真规则式的氛围？",
  "真心话：你可以接受的力度范围是怎样的？",
  "真心话：哪些部位是明确不能碰的？",
  "真心话：你希望开始前确认哪些事情？",
  "真心话：你更喜欢口头鼓励、安静陪伴还是事后拥抱？",
  "真心话：什么表现会让你觉得被尊重和照顾？",
  "真心话：你希望暂停时用安全词还是手势？",
  "真心话：你觉得什么情况下应该立刻结束游戏？",
  "真心话：你愿意尝试的道具范围有哪些？",
  "真心话：你明确不愿意尝试的道具有哪些？",
  "真心话：你希望每轮结束后怎样确认状态？",
  "真心话：你更接受隔着衣物还是不涉及衣物变化的玩法？",
  "真心话：你希望游戏前是否约定次数上限？",
  "真心话：你希望由谁掌握节奏？也可以选择不玩。",
  "真心话：你对留下痕迹的接受程度是什么？",
  "真心话：你希望游戏结束后得到怎样的照顾？",
  "真心话：哪些话会让你不舒服，需要提前避开？",
  "真心话：你更愿意在怎样私密、安全的环境里尝试？",
  "真心话：如果中途改变主意，你希望对方如何回应？",
  "真心话：你希望开始前用几分钟重新确认边界？",
  "真心话：你认为一次舒服的小圈互动最重要的原则是什么？",
  "真心话：你是否愿意先从最轻的力度开始？",
  "真心话：你希望对方多久询问一次感受？",
  "真心话：哪些身体或情绪状态下你不适合参与？",
  "真心话：你希望如何区分玩笑、规则和真正的不满？",
  "真心话：说出今晚最需要对方记住的一条边界。",
  "真心话：你第一次幻想被spank是什么时候？当时在想什么？",
  "真心话：被打屁股时，你最喜欢哪种力度和节奏？",
  "真心话：如果你叫我‘主人’或‘哥哥’，你最想让我对你做什么spank相关的事？",
  "真心话：描述一次你自spank时最兴奋的感觉。",
  "真心话：你喜欢被spank前先被温柔抚摸屁股吗？为什么？",
  "真心话：幻想我作为主人/哥哥惩罚你时，你最期待的姿势是什么？",
  "真心话：被spank之后，你最想让我做什么来安抚你？",
  "真心话：你有偷偷练习过spank的姿势吗？哪一个？",
  "真心话：叫我‘主人’或‘哥哥’的时候，你心里是什么感觉？",
  "真心话：你最喜欢spank时被要求说的话或指令是什么？",
  "真心话：如果现在让我远程指挥你spank，你希望我下达什么指令？",
  "真心话：spank对你来说更多是疼还是舒服？具体说说。",
  "真心话：你幻想过我们一起玩spank游戏时，我会怎么夸你乖？",
  "真心话：跪着或趴着被spank，你更喜欢哪一种姿势？为什么？",
  "真心话：被打屁股红了之后，你最想让我看到或听到什么？",
  "真心话：你有因为想被spank而特别期待见面的时刻吗？",
  "真心话：作为我的小乖乖，你最想被‘主人/哥哥’怎么奖励spank？",
  "真心话：spank时最让你心动的称呼是什么？（主人/哥哥等）",
  "真心话：你喜欢spank过程中一直看着镜头，还是闭着眼睛感受？",
  "真心话：描述你最喜欢的一种spank后的温馨互动。",
  "真心话：如果你能选择spank的次数和力度，今晚你会选多少下？",
  "真心话：被spank时，你最想听我用什么语气说话？",
  "真心话：你有幻想过被主人/哥哥抱在腿上spank的场景吗？",
  "真心话：spank对你而言，代表的是什么感觉？（被宠爱、被掌控等）",
  "真心话：你最喜欢在什么姿势下被轻轻拍打屁股？",
  "真心话：如果我是哥哥，你希望我用什么方式开始spank？",
  "真心话：被spank后，你最想立刻告诉我什么感受？",
  "真心话：你喜欢spank时被要求数数的玩法吗？为什么？",
  "真心话：幻想我们异地玩spank时，你最期待我给你什么指令？",
  "真心话：你觉得被主人/哥哥spank，最能感受到我们之间联系的是哪一刻？",
  "真心话：被spank时你最在意的是我的语气还是力度？",
  "真心话：你喜欢被叫‘乖乖’还是‘小宝贝’这类称呼？",
  "真心话：幻想被主人/哥哥spank前，你最想先做什么准备？",
  "真心话：spank结束后你最想听我说什么话？",
  "真心话：你觉得spank能让我们之间的信任增加吗？为什么？",
  "真心话：你最喜欢在spank时被要求的姿势是哪一种？",
  "真心话：被轻轻打屁股时，你的身体会有什么反应？",
  "真心话：你希望我作为哥哥/主人怎么开始一次spank？",
  "真心话：spank对你来说最吸引人的部分是什么？",
  "真心话：你有幻想过spank后被我温柔抱着的场景吗？",
  "真心话：你最想尝试spank的次数是多少下？",
  "真心话：叫我‘主人’或‘哥哥’时，你会害羞到什么程度？",
  "真心话：你喜欢spank过程中被我夸‘乖’吗？",
  "真心话：描述一次你自己偷偷尝试spank的感觉。",
  "真心话：你希望spank在我们的关系里扮演什么角色？",
  "真心话：你现在最想让我远程给你什么指令？",
  "真心话：被spank红了之后，你想让我怎么检查？",
  "真心话：你最喜欢spank时数数的玩法还是被突然打？",
  "真心话：幻想我们视频spank时，你最期待哪个环节？",
  "真心话：你觉得被spank能缓解异地思念吗？",
  "真心话：你最想被spank的理由是什么？",
  "真心话：spank后你最想做的第一件事是什么？",
  "真心话：你对spank的接受程度是轻度还是中度？",
  "真心话：你喜欢spank时全程看着镜头吗？",
  "真心话：被我指挥spank时，你最紧张的是哪一刻？",
];

const circleDareQuestions = [
  "大冒险：一起约定一个安全词和一个暂停手势。",
  "大冒险：双方分别说出三条明确边界，确认后再决定是否继续。",
  "大冒险：用一到十分确认彼此可接受的力度上限。",
  "大冒险：先隔着衣物轻拍自己的手背，示范可接受的最轻力度。",
  "大冒险：约定本轮最多三次，任何一方都可以随时取消。",
  "大冒险：由接受方明确说出“可以开始”后，才进行一次最轻的隔衣轻拍。",
  "大冒险：完成一次状态确认：舒服、暂停或停止，三选一。",
  "大冒险：互相说明今天是否有不适、疲劳或不适合参与的情况。",
  "大冒险：共同列出禁止使用的词语和动作。",
  "大冒险：约定不留下明显痕迹，并确认双方都接受。",
  "大冒险：接受方选择是否进行一次隔衣轻拍，也可以直接跳过。",
  "大冒险：执行方先复述对方的边界，复述正确才可以继续。",
  "大冒险：双方确认当前环境私密、安全且不会被打扰。",
  "大冒险：设置一个两分钟计时，到时必须停下确认感受。",
  "大冒险：尝试一次最轻力度后，接受方给出一到十分的反馈。",
  "大冒险：由接受方决定下一步是继续、减轻、暂停还是结束。",
  "大冒险：结束本轮并进行一分钟安静陪伴。",
  "大冒险：给对方倒杯水，作为本轮结束后的照顾。",
  "大冒险：互相说一句“你可以随时说不”。",
  "大冒险：把今晚约定的安全词写进备忘录。",
  "大冒险：双方各说一个绝对不能越过的底线。",
  "大冒险：进行一次不接触身体的角色口令演练，任何人可喊停。",
  "大冒险：接受方选择一个舒服的姿势，但也可以选择跳过本轮。",
  "大冒险：双方同时用手势表示继续、暂停或结束，并尊重更保守的选择。",
  "大冒险：暂停所有玩法，认真询问对方此刻的身体和情绪感受。",
  "大冒险：约定本次不使用任何工具，只讨论彼此偏好。",
  "大冒险：进行一次事后复盘，各说一件舒服和一件需要调整的事。",
  "大冒险：明确约定安全词出现后不追问、不劝说，立即停止。",
  "大冒险：给彼此一个拥抱或保持舒适距离，由对方自行选择。",
  "大冒险：今晚跳过实践，只完成边界清单和下一次沟通约定。",
  "大冒险：用手在自己屁股上轻轻打10下，边打边叫我的名字。",
  "大冒险：跪在床上，对着镜头说‘请主人惩罚我’，然后自spank 8下。",
  "大冒险：把屁股对着摄像头，轻轻拍打并描述感觉。",
  "大冒险：用皮带或尺子在自己大腿上打5下，录视频给我看。",
  "大冒险：双手举过头顶，跪着自spank 10下并数出来。",
  "大冒险：穿上最薄的内裤，对着镜头用力spank自己屁股15秒。",
  "大冒险：叫我一声‘主人’，然后自spank 12下，每下都要说谢谢。",
  "大冒险：趴在床上，把屁股翘高，对着镜头被我‘虚拟惩罚’30秒。",
  "大冒险：录一段自己边spank边喘息的声音发给我。",
  "大冒险：跪姿，说三句服从的话，然后自spank 8下。",
  "大冒险：把自己的手绑在背后（可用丝巾），然后尝试自spank。",
  "大冒险：叫哥哥请求我下达spank指令。",
  "大冒险：用最乖的声音说‘我错了主人’，然后用力spank自己10下。",
  "大冒险：趴着连续spank 20秒的过程。",
  "大冒险：戴上项圈（或用丝巾代替），自spank 15下并叫我主人。",
  "大冒险：边摸自己边轻轻打屁股，边做边描述有多听话。",
  "大冒险：屁股对着镜头，左右摇晃后各打10下。",
  "大冒险：自spank到屁股微微发红，拍照片或视频证明。",
  "大冒险：用低声说‘请再惩罚我一次’，然后执行10下spank。",
  "大冒险：双手抱头，跪着接受‘远程惩罚’，自spank 12下。",
  "大冒险：边spank边说‘谢谢主人’。",
  "大冒险：用枕头压住自己，模拟被压着spank的样子并实际打。",
  "大冒险：设定一个服从指令，我说‘打’，你就自spank一下（重复10次）。",
  "大冒险：用最软的声音求饶，然后乖乖完成15下spank。",
  "大冒险：把屁股拍红后，对着镜头说‘这是主人留下的痕迹’。",
  "大冒险：跪在镜子前自spank，边打边看着自己说我是你的小奴隶。",
  "大冒险：轻轻自spank屁股5下，边打边说‘我好乖’。",
  "大冒险：跪在床上翘起屁股，等待我的指令10秒。",
  "大冒险：用手掌在屁股上画心形然后轻轻拍打。",
  "大冒险：趴着自spank 12下，每下之后亲吻手指。",
  "大冒险：戴上耳机假装听我指令，然后自spank 10下。",
  "大冒险：屁股对着镜头左右摇晃后各打8下。",
  "大冒险：说‘哥哥请惩罚我’然后执行15下轻spank。",
  "大冒险：用丝巾蒙住眼睛，自spank 10下并描述感觉。",
  "大冒险：跪姿双手背后，自spank并数出声。",
  "大冒险：录一段spank后轻轻揉屁股的视频。",
  "大冒险：对着镜头展示屁股说‘请主人检查’。",
  "大冒险：自spank到感觉微微热热，然后告诉我。",
  "大冒险：用最软的声音求‘再打一下’，然后执行。",
  "大冒险：趴在床上把屁股抬高，接受10下远程spank。",
  "大冒险：边自spank边轻声叫‘谢谢哥哥’。",
  "大冒险：现在脱掉外裤，只穿内裤自spank 20秒。",
  "大冒险：用手机定时，自spank 30秒不许停。",
  "大冒险：展示spank后的屁股颜色给我看。",
  "大冒险：跪着转圈自spank一圈。",
  "大冒险：假装我是主人，下达指令让我指挥你spank。",
  "大冒险：用最骚的声音描述你现在屁股的状态。",
  "大冒险：把摄像头对准屁股，慢慢拍打并扭腰。",
  "大冒险：自spank 8下后立刻说一句情话。",
  "大冒险：穿最薄的衣服自spank并展示痕迹。",
  "大冒险：双手举高跪姿，完成15下spank。",
  "大冒险：录一段spank时故意放慢动作的视频。",
  "大冒险：现在开始自spank，听我语音指令。",
  "大冒险：趴着用枕头压住腰部然后自spank。",
  "大冒险：自spank后对着镜头害羞地笑一笑。",
  "大冒险：完成一组spank后，乖乖说‘我听话了吗？’",
];

const shameTruthQuestions = [
  "真心话：说出一个你听到会立刻脸红的称呼。",
  "真心话：你最怕对方当面夸你哪一点？",
  "真心话：如果今晚必须撒娇十秒，你会怎么开头？",
  "真心话：对方哪种眼神会让你不敢直视？",
  "真心话：你最不好意思承认自己喜欢对方哪一点？",
  "真心话：如果要对方叫你一个限定昵称，你想听什么？",
  "真心话：你有没有偷偷回看过你们的聊天记录？",
  "真心话：哪句话从对方嘴里说出来，你会装作没听见其实很开心？",
  "真心话：你最容易被对方哪种小动作拿捏？",
  "真心话：如果对方说“乖一点”，你第一反应是什么？",
  "真心话：你最想让对方知道但又不好意思说的偏好是什么？",
  "真心话：你觉得自己害羞时最明显的表现是什么？",
  "真心话：如果今晚有一个脸红排行榜，你觉得谁会赢？",
  "真心话：说出你觉得对方最会让人心软的地方。",
  "真心话：你更怕被对方认真盯着看，还是被认真夸？",
  "真心话：有没有一句称呼你嘴上嫌弃但心里喜欢？",
  "真心话：你希望对方用什么方式哄你？",
  "真心话：说一个你觉得自己很嘴硬的瞬间。",
  "真心话：如果给对方一个“今日限定特权”，你会给什么？",
  "真心话：说一件你愿意为对方放下面子的小事。",
  "真心话：你最怕对方用哪种语气叫你的名字？",
  "真心话：如果要承认一次“我想你了”，你会选什么时候说？",
  "真心话：你最不擅长隐藏的情绪是什么？",
  "真心话：对方做什么会让你立刻变乖一点？",
  "真心话：你希望对方发现你哪个嘴硬的小习惯？",
  "真心话：你有没有一句话想听对方再说一次？",
  "真心话：如果要给今晚写一句标题，你会写什么？",
  "真心话：你觉得自己最容易被哪种温柔打败？",
  "真心话：说出一个让你心里偷偷加分的细节。",
  "真心话：如果对方现在认真夸你，你希望她夸哪一点？",
  "真心话：你现在最想对我做什么色色的事？详细描述。",
  "真心话：描述你上次自慰时幻想的对象和场景。",
  "真心话：你最敏感的身体部位是哪里？想让我怎么碰？",
  "真心话：如果现在能瞬间出现在我面前，你第一件事会做什么？",
  "真心话：你现在穿什么内衣？拍照片证明。",
  "真心话：你最喜欢什么姿势？为什么？",
  "真心话：告诉我你最想尝试的羞耻玩法（角色扮演、道具等）。",
];

const shameDareQuestions = [
  "大冒险：用最小声的语气叫一次对方的限定昵称。",
  "大冒险：认真夸对方十秒，不能笑场。",
  "大冒险：把“我刚刚有点害羞”完整说出来。",
  "大冒险：让对方给你取一个今晚限定的羞耻昵称。",
  "大冒险：对着对方说一句“我承认，我有点被你拿捏了”。",
  "大冒险：用备忘录写一句不敢直接说的话给对方看。",
  "大冒险：让对方选择一个词，你用这个词夸她。",
  "大冒险：和对方对视五秒，然后说“别看了”。",
  "大冒险：模仿自己害羞时的反应。",
  "大冒险：把对方的昵称念三遍，第三遍要更认真。",
  "大冒险：给对方发一个最符合你现在心情的表情。",
  "大冒险：说一句“婉婉今天有点犯规”。",
  "大冒险：让对方问你一个小问题，必须立刻回答。",
  "大冒险：用一句话承认对方今晚赢了。",
  "大冒险：对方说一句夸你的话，你只能回答“收到”。",
  "大冒险：把“我不是害羞，我是热”念出来。",
  "大冒险：让对方决定你下一轮叫她什么。",
  "大冒险：用三秒钟摆一个你觉得最乖的表情。",
  "大冒险：说一句“李家鑫/婉婉不许笑我”。",
  "大冒险：给对方一个今晚专属称号，并解释原因。",
  "大冒险：用一句话承认“我刚才有点嘴硬”。",
  "大冒险：让对方挑一个你今晚必须使用三次的称呼。",
  "大冒险：认真说一次“好吧，我认输”。",
  "大冒险：把一句害羞的话写下来，让对方读。",
  "大冒险：对方说“乖”，你只能回答“知道了”。",
  "大冒险：用十秒钟解释为什么对方今天有点犯规。",
  "大冒险：选一个你觉得最害羞的昵称，今晚保留一轮。",
  "大冒险：让对方决定你现在要不要喝水冷静一下。",
  "大冒险：认真夸对方一个你平时不好意思夸的地方。",
  "大冒险：把“我没有脸红”说三遍，不能笑场。",
  "大冒险：立刻脱掉上衣，只穿内衣/内裤给我看30秒。",
  "大冒险：用最骚的声音叫我一声“老公/老婆”并说我想你。",
  "大冒险：去镜子前摆出最诱惑的姿势，拍视频发给我。",
  "大冒险：现在摸自己最敏感的部位，边摸边描述感觉给我听。",
  "大冒险：脱掉裤子，只穿内裤/内衣做10个深蹲。",
  "大冒险：用舌头舔嘴唇，做出很色情的表情，录10秒视频。",
  "大冒险：打开摄像头，给我看你现在穿什么（或不穿什么）。",
  "大冒险：假装我们在做爱，用声音和动作表演3分钟。",
  "大冒险：拍一张你下面（隔着内裤也行）的照片发给我。",
  "大冒险：用手指含在嘴里吸吮，边吸边看着镜头叫我名字。",
  "大冒险：去洗手间，对着镜子自摸30秒并录下来。",
  "大冒险：穿我最喜欢的那件衣服（或不穿），跳一段性感的舞。",
  "大冒险：现在大声说三句很色的话夸我。",
  "大冒险：把摄像头对准胸部/下面，慢慢抚摸给我看。",
  "大冒险：用枕头或抱枕假装是我，骑在上面磨蹭并叫我的名字。",
  "大冒险：脱光上半身，用手遮住关键部位，只露给镜头看10秒。",
  "大冒险：录一段你自慰时的声音发给我（不用露脸）。",
  "大冒险：摆出后入式姿势对着镜头扭腰30秒。",
  "大冒险：现在立刻发一张你全裸的照片（可只发局部）。",
  "大冒险：用冰块（或冷水）在身上敏感部位滑过，边做边描述。",
  "大冒险：穿情趣内衣（或随便一件性感衣服）给我走秀。",
  "大冒险：跪在床上，抬头看着镜头说“我是你的小骚货”。",
  "大冒险：录一段你高潮边缘的喘息和呻吟。",
  "大冒险：把腿张开对着镜头，慢慢摸大腿内侧。",
  "大冒险：假装我在视频里操你，用声音和动作配合。",
  "大冒险：去阳台或窗边（安全前提），做个暴露的动作。",
  "大冒险：用手机录下你现在下面湿润/硬起来的样子。",
  "大冒险：边看着我的照片边自慰30秒，录声音或视频。",
  "大冒险：穿高跟鞋（或裸体）在房间里走一圈给我看。",
  "大冒险：现在立刻开始自慰，直到快高潮时停下，然后告诉我感觉。",
];

const funnyCaptions = {
  truth: [
    "说真话，婉婉会听得很认真",
    "不许用“还好吧”糊弄过去",
    "李家鑫准备好被追问了吗？",
    "这一题要认真，不许绕圈",
    "答案可以短，但不能假",
  ],
  dare: [
    "大冒险不是大逞强，做不到就撒娇跳过",
    "婉婉不许耍赖，李家鑫也不许赖账",
    "完成这张，今晚加一分",
    "别装镇定，大家都看见了",
    "这张卡已经替你们起哄了",
  ],
  custom: [
    "自定义卡最危险，因为都是你们自己写的",
    "写都写了，抽到就别装不认识",
    "这张卡有点像你们的小暗号",
    "可以跳过，但要给一个好理由",
    "今晚的规则，由你们自己补完",
  ],
};

const mergedTruthQuestions = mergeUniqueCards(truthQuestions, [
  ...circleTruthQuestions,
  ...shameTruthQuestions,
]);
const mergedDareQuestions = mergeUniqueCards(dareQuestions, [
  ...circleDareQuestions,
  ...shameDareQuestions,
]);

const decks = {
  truth: {
    title: "真心话题库",
    description: "真心话已融合原本的专属题库，没有标准答案，但要认真回答。",
    options: [...mergedTruthQuestions],
  },
  dare: {
    title: "大冒险题库",
    description: "大冒险已融合原本的专属题库，做不到可以直接跳过。",
    options: [...mergedDareQuestions],
  },
  custom: {
    title: "自定义题库",
    description: "输入自定义题目时，可用“真心话：”或“大冒险：”作为开头。",
    options: ["大冒险：说‘主人，婉婉知道错了，请主人惩罚婉婉吧’。",
"大冒险：说‘哥哥，我今天不乖，请哥哥惩罚我’。",
"大冒险：乖乖说‘主人，小乖知道错了，请惩罚小乖’。",
"大冒险：说‘哥哥主人，我错了，请你教训我’。",
"大冒险：说‘主人，婉婉不听话了，请主人惩罚我’。",
"大冒险：跪着说‘哥哥，我知道错了，请哥哥惩罚我’。",
"大冒险：说‘主人，小宝贝今天犯错了，请惩罚小宝贝’。",
"大冒险：说‘哥哥主人，请惩罚你的小乖乖’。",
"大冒险：轻声说‘主人，我不乖，请主人好好教训我’。",
"大冒险：说‘婉婉知道错了，请主人惩罚婉婉’。",
"大冒险：说‘哥哥，我错了，请哥哥惩罚我’。",
"大冒险：乖乖说‘主人，小乖错了，请惩罚我’。",
"大冒险：说‘主人，请惩罚你的小宝贝’。",
"大冒险：说‘哥哥主人，我今天不听话，请惩罚我’。",
"大冒险：说‘婉婉不乖，请主人教训婉婉’。",
"大冒险：跪着说‘主人，我知道错了，请你惩罚我’。",
"大冒险：说‘哥哥，请惩罚你的小乖乖’。",
"大冒险：轻声说‘主人，宝贝错了，请主人惩罚宝贝’。",
"大冒险：说‘哥哥主人，小乖知道错了，请惩罚小乖’。",
"大冒险：说‘主人，我不听话了，请主人好好教训我’。",
"大冒险：说‘婉婉今天犯错了，请哥哥惩罚婉婉’。",
"大冒险：乖乖说‘主人，请惩罚你的小乖乖’。",
"大冒险：说‘哥哥，我错了，请哥哥教训我’。",
"大冒险：说‘主人，婉婉知道错了，请惩罚婉婉吧’。",
"大冒险：说‘哥哥主人，请惩罚我这个不乖的小宝贝’。",
"大冒险：跪着说‘主人，小乖不听话，请惩罚小乖’。",
"大冒险：说‘婉婉错了，请主人惩罚我’。",
"大冒险：轻声说‘哥哥，我知道错了，请哥哥惩罚我’。",
"大冒险：说‘主人，请教训你的小乖乖’。",
"大冒险：说‘哥哥主人，宝贝今天不乖，请惩罚宝贝’。",
"大冒险：说‘主人，我错了，请主人惩罚我’。",
"大冒险：乖乖说‘哥哥，请惩罚你的小宝贝’。",
"大冒险：说‘婉婉不乖，请哥哥好好教训婉婉’。",
"大冒险：说‘主人，小乖知道错了，请惩罚小乖’。",
"大冒险：跪着说‘哥哥主人，我不听话，请惩罚我’。",
"大冒险：说‘主人，请惩罚你的小婉婉’。",
"大冒险：说‘哥哥，我今天犯错了，请哥哥惩罚我’。",
"大冒险：轻声说‘主人，婉婉错了，请主人教训我’。",
"大冒险：说‘哥哥主人，请惩罚我不乖的小乖乖’。",
"大冒险：说‘婉婉知道错了，请哥哥惩罚婉婉’。",
"大冒险：说‘主人，小宝贝不听话，请惩罚小宝贝’。",
"大冒险：乖乖说‘哥哥，我错了，请哥哥教训我’。",
"大冒险：说‘主人，请惩罚你的小乖’。",
"大冒险：说‘哥哥主人，婉婉不乖，请惩罚婉婉’。",
"大冒险：跪着说‘主人，我知道错了，请主人惩罚我’。",
"大冒险：说‘哥哥，请教训你的小宝贝’。",
"大冒险：轻声说‘主人，小乖今天犯错了，请惩罚小乖’。",
"大冒险：说‘婉婉错了，请主人好好惩罚婉婉’。",
"大冒险：说‘哥哥主人，我不乖，请惩罚我’。",
"大冒险：说‘主人，请惩罚你的小乖乖’。",
"大冒险：乖乖说‘哥哥，宝贝知道错了，请惩罚宝贝’。",
"大冒险：说‘主人，婉婉不听话，请主人教训婉婉’。",
"大冒险：说‘哥哥，我错了，请哥哥惩罚我’。",
"大冒险：跪着说‘主人，请惩罚你的小宝贝’。",
"大冒险：说‘婉婉知道错了，请哥哥惩罚婉婉’。",
"大冒险：轻声说‘主人，我今天不乖，请主人惩罚我’。",
"大冒险：说‘哥哥主人，小乖错了，请惩罚小乖’。",
"大冒险：说‘主人，请教训你的小乖乖’。",
"大冒险：说‘哥哥，请惩罚我不听话的小宝贝’。",
"大冒险：说‘婉婉不乖，请主人惩罚婉婉’。",
"大冒险：乖乖说‘主人，宝贝错了，请惩罚宝贝’。",
"大冒险：说‘哥哥主人，我知道错了，请惩罚我’。",
"大冒险：跪着说‘主人，小乖不乖，请惩罚小乖’。",
"大冒险：说‘哥哥，请惩罚你的小乖乖’。",
"大冒险：轻声说‘主人，婉婉犯错了，请惩罚婉婉’。",
"大冒险：说‘主人，我不听话了，请主人教训我’。",
"大冒险：说‘哥哥主人，请惩罚你的小婉婉’。",
"大冒险：说‘婉婉知道错了，请哥哥惩罚我’。",
"大冒险：说‘主人，小宝贝今天不乖，请惩罚小宝贝’。",
"大冒险：乖乖说‘哥哥，我错了，请哥哥惩罚我’。",
"大冒险：跪着说‘主人，请惩罚你的小乖’。",
"大冒险：说‘哥哥主人，婉婉不乖，请惩罚婉婉’。",
"大冒险：轻声说‘主人，我知道错了，请主人惩罚我’。",
"大冒险：说‘婉婉错了，请哥哥教训婉婉’。",
"大冒险：说‘主人，请惩罚你的小乖乖’。",
"大冒险：说‘哥哥，我不乖，请哥哥惩罚我’。",
"大冒险：说‘主人，小乖知道错了，请惩罚小乖’。",
"大冒险：跪着说‘哥哥主人，请惩罚我不听话的宝贝’。",
"大冒险：说‘婉婉今天犯错了，请主人惩罚婉婉’。",
"大冒险：乖乖说‘主人，请教训你的小宝贝’。",
"大冒险：说‘哥哥，请惩罚你的小乖乖’。",
"大冒险：轻声说‘主人，宝贝不乖，请惩罚宝贝’。",
"大冒险：说‘主人，我错了，请主人惩罚我’。"],
  },
};

const playerCopy = {
  李家鑫: {
    recipient: "TO 李家鑫",
    ready: "这次轮到李家鑫了",
    button: "替婉婉抽一张",
    result: "可以完成，也可以直接跳过",
  },
  婉婉: {
    recipient: "TO 婉婉",
    ready: "婉婉准备好了吗？",
    button: "替婉婉抽一张",
    result: "可以完成，也可以直接跳过",
  },
  一起: {
    recipient: "TO 我们",
    ready: "这一张一起完成",
    button: "替婉婉抽一张",
    result: "双方同意才继续",
  },
};

const elements = {
  appContent: document.querySelector("#app-content"),
  entranceGate: document.querySelector("#entrance-gate"),
  entranceForm: document.querySelector("#entrance-form"),
  entrancePassword: document.querySelector("#entrance-password"),
  entranceError: document.querySelector("#entrance-error"),
  footer: document.querySelector("footer"),
  brand: document.querySelector(".brand"),
  brandMark: document.querySelector("#brand-mark"),
  brandText: document.querySelector("#brand-text"),
  introLetterButton: document.querySelector("#intro-letter-button"),
  announcementButton: document.querySelector("#announcement-button"),
  notificationButton: document.querySelector("#notification-button"),
  togetherDays: document.querySelector("#together-days"),
  moodDateLabel: document.querySelector("#mood-date-label"),
  jiaxinMoodValue: document.querySelector("#jiaxin-mood-value"),
  wanwanMoodValue: document.querySelector("#wanwan-mood-value"),
  moodButtons: [...document.querySelectorAll("[data-mood-owner]")],
  dailyTaskText: document.querySelector("#daily-task-text"),
  dailyTaskDate: document.querySelector("#daily-task-date"),
  dailyTaskHint: document.querySelector("#daily-task-hint"),
  sendReconcileButton: document.querySelector("#send-reconcile-button"),
  recentLetterCard: document.querySelector("#recent-letter-card"),
  recentLetterPreview: document.querySelector("#recent-letter-preview"),
  recentLetterMeta: document.querySelector("#recent-letter-meta"),
  notificationBadges: [...document.querySelectorAll("[data-notification-badge]")],
  introSection: document.querySelector(".intro"),
  startButton: document.querySelector("#start-game-button"),
  gameFlow: document.querySelector("#game-flow"),
  modeStep: document.querySelector("#mode-step"),
  specialStep: document.querySelector("#special-step"),
  playStep: document.querySelector("#play-step"),
  letterStep: document.querySelector("#letter-step"),
  planStep: document.querySelector("#plan-step"),
  diaryStep: document.querySelector("#diary-step"),
  openSpecialStepButton: document.querySelector("#open-special-step-button"),
  openPlanButton: document.querySelector("#open-plan-button"),
  openFlightButton: document.querySelector("#open-flight-button"),
  openDiaryButton: document.querySelector("#open-diary-button"),
  modeLetterButton: document.querySelector("#mode-letter-button"),
  specialBoundaryPanel: document.querySelector("#special-boundary-panel"),
  confirmBoundaryButton: document.querySelector("#confirm-boundary-button"),
  specialLockPanel: document.querySelector("#special-lock-panel"),
  specialContent: document.querySelector("#special-content"),
  specialPasswordForm: document.querySelector("#special-password-form"),
  specialPasswordInput: document.querySelector("#special-password-input"),
  specialPasswordHint: document.querySelector("#special-password-hint"),
  backToIntroButton: document.querySelector("#back-to-intro-button"),
  backToModeFromSpecialButton: document.querySelector(
    "#back-to-mode-from-special-button",
  ),
  backToModeButton: document.querySelector("#back-to-mode-button"),
  backFromLetterButton: document.querySelector("#back-from-letter-button"),
  backFromPlanButton: document.querySelector("#back-from-plan-button"),
  backFromDiaryButton: document.querySelector("#back-from-diary-button"),
  letterInput: document.querySelector("#letter-input"),
  letterCount: document.querySelector("#letter-count"),
  saveLetterButton: document.querySelector("#save-letter-button"),
  toggleLetterVisibilityButton: document.querySelector("#toggle-letter-visibility-button"),
  letterHistoryList: document.querySelector("#letter-history-list"),
  letterHistoryEmpty: document.querySelector("#letter-history-empty"),
  planGateModal: document.querySelector("#plan-gate-modal"),
  closePlanGateButton: document.querySelector("#close-plan-gate-button"),
  planGateButtons: [...document.querySelectorAll("[data-plan-word]")],
  planGateUnlocked: document.querySelector("#plan-gate-unlocked"),
  enterPlanButton: document.querySelector("#enter-plan-button"),
  planDocumentEntryButton: document.querySelector("#plan-document-entry-button"),
  planDocumentActions: document.querySelector(".plan-document-actions"),
  planInfoModal: document.querySelector("#plan-info-modal"),
  planInfoTitle: document.querySelector("#plan-info-title"),
  planInfoContent: document.querySelector("#plan-info-content"),
  planNoteEditModal: document.querySelector("#plan-note-edit-modal"),
  planNoteEditForm: document.querySelector("#plan-note-edit-form"),
  planNoteEditText: document.querySelector("#plan-note-edit-text"),
  planNoteEditQuantity: document.querySelector("#plan-note-edit-quantity"),
  planNoteEditError: document.querySelector("#plan-note-edit-error"),
  planEditorPanel: document.querySelector("#plan-editor-panel"),
  planInput: document.querySelector("#plan-input"),
  planNoteForm: document.querySelector("#plan-note-form"),
  planNoteInput: document.querySelector("#plan-note-input"),
  planNoteQuantityInput: document.querySelector("#plan-note-quantity-input"),
  planNotesTotal: document.querySelector("#plan-notes-total"),
  planRequestsEntryButton: document.querySelector("#plan-requests-entry-button"),
  planRequestsCount: document.querySelector("#plan-requests-count"),
  planNotesList: document.querySelector("#plan-notes-list"),
  planNotesEmpty: document.querySelector("#plan-notes-empty"),
  planCount: document.querySelector("#plan-count"),
  editPlanButton: document.querySelector("#edit-plan-button"),
  savePlanButton: document.querySelector("#save-plan-button"),
  siteDialog: document.querySelector("#site-dialog"),
  siteDialogForm: document.querySelector("#site-dialog-form"),
  siteDialogTitle: document.querySelector("#site-dialog-title"),
  siteDialogMessage: document.querySelector("#site-dialog-message"),
  siteDialogLabel: document.querySelector("#site-dialog-label"),
  siteDialogInput: document.querySelector("#site-dialog-input"),
  siteDialogCancel: document.querySelector("#site-dialog-cancel"),
  siteDialogConfirm: document.querySelector("#site-dialog-confirm"),
  notificationModal: document.querySelector("#notification-modal"),
  notificationTitle: document.querySelector("#notification-title"),
  notificationSummary: document.querySelector("#notification-summary"),
  notificationList: document.querySelector("#notification-list"),
  clearNotificationsButton: document.querySelector("#clear-notifications-button"),
  form: document.querySelector("#option-form"),
  input: document.querySelector("#option-input"),
  templateButtons: [...document.querySelectorAll(".template-button")],
  list: document.querySelector("#option-list"),
  emptyState: document.querySelector("#empty-state"),
  count: document.querySelector("#option-count"),
  restoreButton: document.querySelector("#restore-button"),
  clearButton: document.querySelector("#clear-button"),
  pickButton: document.querySelector("#pick-button"),
  resetRoundButton: document.querySelector("#reset-round-button"),
  pickerCard: document.querySelector("#picker-card"),
  deckPanel: document.querySelector("#deck-panel"),
  toggleDeckButton: document.querySelector("#toggle-deck-button"),
  deckPreviewTitle: document.querySelector("#deck-preview-title"),
  deckPreviewSubtitle: document.querySelector("#deck-preview-subtitle"),
  resultStage: document.querySelector("#result-stage"),
  resultKicker: document.querySelector("#result-kicker"),
  resultText: document.querySelector("#result-text"),
  resultCaption: document.querySelector("#result-caption"),
  resultTypeTag: document.querySelector("#result-type-tag"),
  ticketRecipient: document.querySelector("#ticket-recipient"),
  skipCardButton: document.querySelector("#skip-card-button"),
  resultBackModeButton: document.querySelector("#result-back-mode-button"),
  historyList: document.querySelector("#history-list"),
  historyEmpty: document.querySelector("#history-empty"),
  clearHistoryButton: document.querySelector("#clear-history-button"),
  newDiaryButton: document.querySelector("#new-diary-button"),
  diaryTitle: document.querySelector("#diary-title"),
  diaryList: document.querySelector("#diary-list"),
  diaryEmpty: document.querySelector("#diary-empty"),
  diaryCount: document.querySelector("#diary-count"),
  diaryFilterButtons: [...document.querySelectorAll(".diary-filter button")],
  diaryDateForm: document.querySelector("#diary-date-form"),
  diaryDateInput: document.querySelector("#diary-date-input"),
  diaryDateClearButton: document.querySelector("#diary-date-clear-button"),
  diaryEditorModal: document.querySelector("#diary-editor-modal"),
  diaryDetailModal: document.querySelector("#diary-detail-modal"),
  diaryForm: document.querySelector("#diary-form"),
  diaryEditorTitle: document.querySelector("#diary-editor-title"),
  diaryTitleInput: document.querySelector("#diary-title-input"),
  diaryBodyInput: document.querySelector("#diary-body-input"),
  diaryAuthorInput: document.querySelector("#diary-author-input"),
  diaryMoodInput: document.querySelector("#diary-mood-input"),
  diaryMoodCustomInput: document.querySelector("#diary-mood-custom-input"),
  diaryAuthorChoiceButtons: [...document.querySelectorAll("[data-diary-author-value]")],
  diaryMoodChoiceButtons: [...document.querySelectorAll("[data-diary-mood-value]")],
  diaryImageInput: document.querySelector("#diary-image-input"),
  diaryFormError: document.querySelector("#diary-form-error"),
  diaryDetailMeta: document.querySelector("#diary-detail-meta"),
  diaryDetailTitle: document.querySelector("#diary-detail-title"),
  diaryDetailBody: document.querySelector("#diary-detail-body"),
  diaryDetailTags: document.querySelector("#diary-detail-tags"),
  diaryFavoriteButton: document.querySelector("#diary-favorite-button"),
  diaryEditButton: document.querySelector("#diary-edit-button"),
  diaryDeleteButton: document.querySelector("#diary-delete-button"),
  diaryCommentsCount: document.querySelector("#diary-comments-count"),
  diaryCommentsList: document.querySelector("#diary-comments-list"),
  diaryCommentsEmpty: document.querySelector("#diary-comments-empty"),
  diaryCommentForm: document.querySelector("#diary-comment-form"),
  diaryCommentInput: document.querySelector("#diary-comment-input"),
  letterPrompt: document.querySelector("#letter-prompt"),
  openLetterPromptButton: document.querySelector("#open-letter-prompt-button"),
  deckTitle: document.querySelector("#deck-title"),
  deckDescription: document.querySelector("#deck-description"),
  modeButtons: [...document.querySelectorAll(".mode-button[data-mode]")],
  playerButtons: [...document.querySelectorAll(".player-switch button")],
  drawButtons: [...document.querySelectorAll(".draw-switch button")],
  toast: document.querySelector("#toast"),
};

let state = loadState();
let currentUser = rememberedUser();
let isPicking = false;
let toastTimer;
let hiddenTapTimer;
let hiddenTapSequence = [];
let brandLoginTapTimer;
let brandLoginTapCount = 0;
let letterReturnStep = "intro";
let cloudReady = false;
let lastSavedCloudPayload = "";
let siteUnlocked = false;
let specialBoundaryConfirmed = false;
let specialUnlocked = false;
let letterHidden = false;
let planReturnStep = "special";
let diaryReturnStep = "special";
let planGateIndex = 0;
let planEditable = false;
let planRequestMode = false;
let planDocumentOpen = false;
let planRequestsOpen = false;
let siteDialogResolver = null;
let browserHistoryReady = false;
let editingDiaryId = null;
let activeDiaryId = null;
let editingDiaryCommentId = null;
let editingPlanNoteId = null;
let notificationPollTimer = null;
let knownUnreadNotificationIds = new Set();
let suppressNextModalPop = false;

const stepTargets = {
  intro: () => elements.introSection,
  mode: () => elements.modeStep,
  special: () => elements.specialStep,
  play: () => elements.playStep,
  letter: () => elements.letterStep,
  plan: () => elements.planStep,
  diary: () => elements.diaryStep,
};

function cleanupLegacyPwa() {
  if ("caches" in window) {
    caches.keys()
      .then((keys) => keys.filter((key) => key.startsWith("wanwan-picker-")))
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {});
  }
}

function registerPwa() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("service worker register failed.", error);
    });
  });
}

function createDefaultState() {
  return {
    mode: "truth",
    player: "婉婉",
    drawType: "all",
    currentStep: "intro",
    isDeckOpen: false,
    secretLetter: DEFAULT_SECRET_LETTER,
    letterHistory: [],
    todayMoods: {
      date: getTodayKey(),
      jiaxin: "",
      wanwan: "",
    },
    planBook: "",
    planNotes: [],
    diaryFilter: "month",
    diaryDate: "",
    diaryEntries: [],
    notifications: [],
    customDecks: {
      truth: [...decks.truth.options],
      dare: [...decks.dare.options],
      custom: [],
    },
    history: [],
    usedCardIds: [],
    currentCard: null,
  };
}

function loadState() {
  const fallback = createDefaultState();
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !stored.customDecks) return fallback;
    return {
      ...fallback,
      customDecks: { ...fallback.customDecks, ...stored.customDecks },
      history: Array.isArray(stored.history) ? stored.history : [],
      usedCardIds: normalizeUsedCardIds(
        stored.usedCardIds || stored.drawnCards,
        fallback.mode,
      ),
      secretLetter:
        typeof stored.secretLetter === "string" && stored.secretLetter.trim()
          ? stored.secretLetter
          : fallback.secretLetter,
      letterHistory: normalizeLetterHistory(stored.letterHistory),
      todayMoods: normalizeTodayMoods(stored.todayMoods),
      planBook: typeof stored.planBook === "string" ? stored.planBook : "",
      planNotes: normalizePlanNotes(stored.planNotes),
      diaryFilter: typeof stored.diaryFilter === "string" ? stored.diaryFilter : fallback.diaryFilter,
      diaryDate: typeof stored.diaryDate === "string" ? stored.diaryDate : "",
      diaryEntries: normalizeDiaryEntries(stored.diaryEntries),
      notifications: normalizeNotifications(stored.notifications),
      currentCard: null,
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  // 只把真正需要跨设备/刷新保留的内容写入本地缓存。
  // 入口解锁、当前步骤、玩法选择、专区解锁都保持为本次打开的临时状态。
  const persistentState = {
    customDecks: state.customDecks,
    secretLetter: state.secretLetter,
    letterHistory: state.letterHistory,
    todayMoods: state.todayMoods,
    planBook: state.planBook,
    planNotes: state.planNotes,
    diaryFilter: state.diaryFilter,
    diaryDate: state.diaryDate,
    diaryEntries: state.diaryEntries,
    notifications: state.notifications,
    history: state.history,
    usedCardIds: state.usedCardIds,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
}

function resetVolatileFlow() {
  state.mode = "truth";
  state.player = "婉婉";
  state.drawType = "all";
  state.currentStep = "intro";
  state.isDeckOpen = false;
  state.currentCard = null;
  specialBoundaryConfirmed = false;
  specialUnlocked = false;
  letterReturnStep = "intro";
  letterHidden = false;
  planReturnStep = "special";
  diaryReturnStep = "special";
  planGateIndex = 0;
  planEditable = false;
}

function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatShortDate(dateKey = getTodayKey()) {
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function relationshipDays() {
  const start = new Date(`${RELATIONSHIP_START_DATE}T00:00:00`);
  const today = new Date(`${getTodayKey()}T00:00:00`);
  const diff = today - start;
  return Math.max(1, Math.floor(diff / 86400000) + 1);
}

function dailyTaskForToday() {
  const key = getTodayKey();
  const seed = key.replace(/-/g, "").split("").reduce((sum, char) => sum + Number(char), 0);
  return DAILY_TASKS[seed % DAILY_TASKS.length];
}

function normalizeTodayMoods(value) {
  const today = getTodayKey();
  if (!value || typeof value !== "object" || value.date !== today) {
    return { date: today, jiaxin: "", wanwan: "" };
  }
  return {
    date: today,
    jiaxin: typeof value.jiaxin === "string" ? value.jiaxin : "",
    wanwan: typeof value.wanwan === "string" ? value.wanwan : "",
  };
}

function normalizeLetterHistory(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => {
      if (typeof item === "string") {
        return {
          id: `letter-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          text: item.trim(),
          time: new Date().toISOString(),
        };
      }
      if (!item || typeof item !== "object") return null;
      const text = typeof item.text === "string" ? item.text.trim() : "";
      if (!text) return null;
      const time =
        typeof item.time === "string" && !Number.isNaN(Date.parse(item.time))
          ? item.time
          : new Date().toISOString();
      return {
        id:
          typeof item.id === "string" && item.id
            ? item.id
            : `letter-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text,
        time,
      };
    })
    .filter(Boolean)
    .filter((item) => {
      const key = `${item.text}|${item.time}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, LETTER_HISTORY_LIMIT);
}

function mergeLetterHistory(primary = [], secondary = []) {
  return normalizeLetterHistory([...normalizeLetterHistory(primary), ...normalizeLetterHistory(secondary)]);
}

function letterExcerpt(text, max = 46) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max)}...` : value;
}

function normalizeUser(value) {
  return value === "wanwan" || value === "jiaxin" ? value : "";
}

function rememberedUser() {
  return normalizeUser(localStorage.getItem(REMEMBERED_USER_KEY)) ||
    normalizeUser(localStorage.getItem(CURRENT_USER_KEY));
}

function rememberUser(user) {
  const safeUser = normalizeUser(user);
  if (!safeUser) return;
  localStorage.setItem(CURRENT_USER_KEY, safeUser);
  localStorage.setItem(REMEMBERED_USER_KEY, safeUser);
}

function forgetRememberedUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(REMEMBERED_USER_KEY);
}

function otherUser(user = currentUser) {
  if (user === "wanwan") return "jiaxin";
  if (user === "jiaxin") return "wanwan";
  return "";
}

function notificationStorageKey(prefix, user = currentUser) {
  const safeUser = user === "wanwan" || user === "jiaxin" ? user : "guest";
  return `${prefix}_${safeUser}`;
}

function readNotificationIdList(storage, key) {
  try {
    const value = JSON.parse(storage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((id) => typeof id === "string" && id) : [];
  } catch {
    return [];
  }
}

function writeNotificationIdList(storage, key, ids) {
  storage.setItem(key, JSON.stringify([...new Set((ids || []).filter(Boolean))]));
}

function getDismissedNotificationIds(user = currentUser) {
  return readNotificationIdList(localStorage, notificationStorageKey("xw_dismissed_notifications", user));
}

function setDismissedNotificationIds(user, ids) {
  writeNotificationIdList(localStorage, notificationStorageKey("xw_dismissed_notifications", user), ids);
}

function dismissNotifications(user, notificationIds = []) {
  if (!user || !notificationIds.length) return;
  const merged = new Set([...getDismissedNotificationIds(user), ...notificationIds]);
  setDismissedNotificationIds(user, [...merged]);
  renderNotifications();
}

function getToastedNotificationIds(user = currentUser) {
  return readNotificationIdList(sessionStorage, notificationStorageKey("xw_toasted_notifications", user));
}

function setToastedNotificationIds(user, ids) {
  writeNotificationIdList(sessionStorage, notificationStorageKey("xw_toasted_notifications", user), ids);
}

function markNotificationToasted(user, notificationIds = []) {
  if (!user || !notificationIds.length) return;
  const merged = new Set([...getToastedNotificationIds(user), ...notificationIds]);
  setToastedNotificationIds(user, [...merged]);
}

function notificationStableId(item) {
  if (typeof item.id === "string" && item.id) return item.id;
  const type = typeof item.type === "string" && item.type ? item.type : "notice";
  const fromUser = item.fromUser === "wanwan" || item.fromUser === "jiaxin" ? item.fromUser : "unknown";
  const toUser = item.toUser === "wanwan" || item.toUser === "jiaxin" ? item.toUser : "unknown";
  const relatedId = typeof item.relatedId === "string" && item.relatedId ? item.relatedId : "";
  const createdAt =
    typeof item.createdAt === "string" && !Number.isNaN(Date.parse(item.createdAt))
      ? item.createdAt
      : typeof item.time === "string" && !Number.isNaN(Date.parse(item.time))
        ? item.time
        : "no-time";
  return `${notificationGroup(type)}-${type}-${fromUser}-${toUser}-${relatedId || createdAt}`;
}

function normalizeNotifications(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const fromUser = item.fromUser === "wanwan" || item.fromUser === "jiaxin" ? item.fromUser : "";
      const toUser = item.toUser === "wanwan" || item.toUser === "jiaxin" ? item.toUser : "";
      const type = typeof item.type === "string" && item.type ? item.type : "general";
      if (!fromUser || !toUser) return null;
      const createdAt =
        typeof item.createdAt === "string" && !Number.isNaN(Date.parse(item.createdAt))
          ? item.createdAt
          : new Date().toISOString();
      return {
        id: notificationStableId({ ...item, fromUser, toUser, type, createdAt }),
        fromUser,
        toUser,
        type,
        title: typeof item.title === "string" ? item.title : "新的提醒",
        content: typeof item.content === "string" ? item.content : "",
        relatedId: typeof item.relatedId === "string" ? item.relatedId : "",
        isRead: Boolean(item.isRead),
        createdAt,
      };
    })
    .filter(Boolean)
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 80);
}

function mergeNotifications(primary = [], secondary = []) {
  const map = new Map();
  [...normalizeNotifications(secondary), ...normalizeNotifications(primary)].forEach((notice) => {
    map.set(notice.id, { ...(map.get(notice.id) || {}), ...notice });
  });
  return [...map.values()]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 80);
}

function unreadNotifications() {
  if (!currentUser) return [];
  const dismissed = new Set(getDismissedNotificationIds(currentUser));
  return normalizeNotifications(state.notifications).filter(
    (notice) => notice.toUser === currentUser && !notice.isRead && !dismissed.has(notice.id),
  );
}

function notificationGroup(type) {
  if (type.startsWith("letter")) return "letter";
  if (type.startsWith("diary")) return "diary";
  if (type.startsWith("plan")) return "plan";
  if (type.startsWith("draw")) return "draw";
  if (type.startsWith("mood")) return "mood";
  if (type.startsWith("reconcile")) return "reconcile";
  return "general";
}

function addNotification({ type, title, content, relatedId = "" }) {
  const toUser = otherUser();
  if (!currentUser || !toUser || toUser === currentUser) return null;
  const createdAt = new Date().toISOString();
  const notice = {
    fromUser: currentUser,
    toUser,
    type,
    title,
    content,
    relatedId,
    isRead: false,
    createdAt,
  };
  notice.id = notificationStableId(notice);
  state.notifications = normalizeNotifications([notice, ...state.notifications]);
  return notice;
}

function markNotificationRead(id) {
  let changed = false;
  state.notifications = normalizeNotifications(state.notifications).map((notice) => {
    if (notice.id !== id || notice.isRead) return notice;
    changed = true;
    return { ...notice, isRead: true };
  });
  if (changed) {
    saveState();
    renderNotifications();
    void saveCloudState({ silent: true });
  }
}

function normalizeDeckMap(value) {
  const fallback = createDefaultState().customDecks;
  const incoming = value && typeof value === "object" ? value : {};
  const legacySpecialCards = [
    ...(Array.isArray(incoming.mixed) ? incoming.mixed : []),
    ...(Array.isArray(incoming.shame) ? incoming.shame : []),
  ];
  const legacyTruthCards = legacySpecialCards.filter((card) => optionType(card) === "truth");
  const legacyDareCards = legacySpecialCards.filter((card) => optionType(card) === "dare");

  return {
    truth: mergeUniqueCards(fallback.truth, [
      ...(Array.isArray(incoming.truth) ? incoming.truth : []),
      ...legacyTruthCards,
    ]),
    dare: mergeUniqueCards(fallback.dare, [
      ...(Array.isArray(incoming.dare) ? incoming.dare : []),
      ...legacyDareCards,
    ]),
    custom: Array.isArray(incoming.custom) ? [...incoming.custom] : [...fallback.custom],
  };
}

function normalizePlanNotes(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          return {
            id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            text: item.trim(),
            quantity: 0,
            time: new Date().toISOString(),
          };
        }
        if (!item || typeof item !== "object") return null;
        const text = typeof item.text === "string" ? item.text.trim() : "";
        if (!text) return null;
        return {
          id: typeof item.id === "string" && item.id ? item.id : `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          text,
          quantity: normalizePlanNoteQuantity(item.quantity),
          time: typeof item.time === "string" ? item.time : new Date().toISOString(),
          settled: Boolean(item.settled),
        };
      })
      .filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [
      {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: value.trim(),
        quantity: 0,
        time: new Date().toISOString(),
        settled: false,
      },
    ];
  }
  return [];
}

function normalizePlanNoteQuantity(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.min(9999, Math.floor(number));
}

function planNotesTotal(notes = state.planNotes) {
  return normalizePlanNotes(notes).reduce((sum, note) => sum + normalizePlanNoteQuantity(note.quantity), 0);
}

function diaryCommentAuthor(value) {
  if (value === "wanwan" || value === "婉婉" || value === "ta") return "wanwan";
  if (value === "jiaxin" || value === "家鑫" || value === "me") return "jiaxin";
  return "";
}

function normalizeDiaryComments(value, diaryId = "") {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const content = typeof item.content === "string"
        ? item.content.trim()
        : typeof item.text === "string"
          ? item.text.trim()
          : "";
      if (!content) return null;
      const createdAt =
        typeof item.createdAt === "string" && !Number.isNaN(Date.parse(item.createdAt))
          ? item.createdAt
          : typeof item.time === "string" && !Number.isNaN(Date.parse(item.time))
            ? item.time
            : new Date().toISOString();
      const author = diaryCommentAuthor(item.author || item.fromUser);
      return {
        id:
          typeof item.id === "string" && item.id
            ? item.id
            : `comment-${diaryId || "diary"}-${createdAt}`,
        diaryId: typeof item.diaryId === "string" && item.diaryId ? item.diaryId : diaryId,
        author,
        nickname: typeof item.nickname === "string" ? item.nickname : USER_LABELS[author] || "",
        content,
        createdAt,
      };
    })
    .filter(Boolean)
    .filter((comment) => {
      const key = comment.id || `${comment.diaryId}-${comment.author}-${comment.createdAt}-${comment.content}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function normalizeDiaryEntries(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const title = typeof item.title === "string" ? item.title.trim() : "";
      const body = typeof item.body === "string" ? item.body.trim() : "";
      if (!title || !body) return null;
      const createdAt =
        typeof item.createdAt === "string" && !Number.isNaN(Date.parse(item.createdAt))
          ? item.createdAt
          : new Date().toISOString();
      const id =
        typeof item.id === "string" && item.id
          ? item.id
          : `diary-${createdAt}-${title}`;
      const rawComments = Array.isArray(item.comments)
        ? item.comments
        : Array.isArray(item.replies)
          ? item.replies
          : Array.isArray(item.responses)
            ? item.responses
            : Array.isArray(item.diaryComments)
              ? item.diaryComments
              : [];
      const comments = normalizeDiaryComments(rawComments, id);
      return {
        id,
        title,
        body,
        author: item.author === "ta" ? "ta" : "me",
        mood: typeof item.mood === "string" ? item.mood : "",
        image: typeof item.image === "string" ? item.image : "",
        favorite: Boolean(item.favorite),
        createdAt,
        updatedAt:
          typeof item.updatedAt === "string" && !Number.isNaN(Date.parse(item.updatedAt))
            ? item.updatedAt
            : createdAt,
        ...(comments.length ? { comments } : {}),
      };
    })
    .filter(Boolean);
}

function mergeDiaryEntries(primary = [], secondary = []) {
  const merged = new Map();
  normalizeDiaryEntries(secondary).forEach((entry) => {
    merged.set(entry.id, entry);
  });
  normalizeDiaryEntries(primary).forEach((entry) => {
    const existing = merged.get(entry.id);
    const comments = normalizeDiaryComments(
      [
        ...(existing?.comments || []),
        ...(entry.comments || []),
      ],
      entry.id,
    );
    merged.set(entry.id, {
      ...(existing || {}),
      ...entry,
      ...(comments.length ? { comments } : {}),
    });
  });
  return [...merged.values()]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function mergeUniqueCards(primary = [], secondary = []) {
  const seen = new Set();
  return [...primary, ...secondary].filter((card) => {
    if (typeof card !== "string") return false;
    const normalized = card.trim().toLocaleLowerCase();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function cardKey(mode, option) {
  return `${mode}::${String(option).trim().toLocaleLowerCase()}`;
}

function normalizeUsedCardIds(value = [], mode = "mixed") {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim())
    .map((item) => (item.includes("::") ? item : cardKey(mode, item)))
    .filter((item) => {
      if (seen.has(item)) return false;
      seen.add(item);
      return true;
    });
}

// Cloud sync boundary: the UI still uses the existing state shape, and this
// function converts it to the JSON document stored in Supabase app_state.data.
function cloudDataFromState() {
  const now = new Date().toISOString();
  return {
    customCards: [...state.customDecks.custom],
    drawnCards: [...state.usedCardIds],
    remainingCards: state.customDecks,
    letter: state.secretLetter || DEFAULT_SECRET_LETTER,
    letterHistory: normalizeLetterHistory(state.letterHistory),
    todayMoods: normalizeTodayMoods(state.todayMoods),
    planBook: state.planBook || "",
    planNotes: normalizePlanNotes(state.planNotes),
    diaryFilter: state.diaryFilter || "month",
    diaryDate: state.diaryDate || "",
    diaryEntries: normalizeDiaryEntries(state.diaryEntries),
    notifications: normalizeNotifications(state.notifications),
    history: state.history,
    updatedAt: now,
  };
}

// Restore the Supabase JSON document back into the existing page state without
// changing the current layout, buttons, animations, or rendering functions.
function applyCloudData(data) {
  if (!data || typeof data !== "object") return;
  const fallback = createDefaultState();

  state = {
    ...fallback,
    ...state,
    secretLetter:
      typeof data.letter === "string" && data.letter.trim()
        ? data.letter
        : state.secretLetter || fallback.secretLetter,
    letterHistory: mergeLetterHistory(data.letterHistory, state.letterHistory),
    todayMoods: normalizeTodayMoods(data.todayMoods || state.todayMoods),
    planBook: typeof data.planBook === "string" ? data.planBook : state.planBook || "",
    planNotes: normalizePlanNotes(data.planNotes || state.planNotes),
    diaryEntries: mergeDiaryEntries(data.diaryEntries, state.diaryEntries),
    diaryFilter:
      data.diaryFilter === "date"
        ? "date"
        : typeof data.diaryFilter === "string" && data.diaryFilter !== "memory"
          ? data.diaryFilter
          : state.diaryFilter || "month",
    diaryDate: typeof data.diaryDate === "string" ? data.diaryDate : state.diaryDate || "",
    notifications: mergeNotifications(data.notifications, state.notifications),
    customDecks: normalizeDeckMap(data.remainingCards || data.customDecks),
    history: Array.isArray(data.history) ? data.history : state.history,
    usedCardIds: normalizeUsedCardIds(
      data.drawnCards || data.usedCardIds || state.usedCardIds,
      fallback.mode,
    ),
    mode: fallback.mode,
    player: fallback.player,
    drawType: fallback.drawType,
    currentStep: fallback.currentStep,
    isDeckOpen: false,
    currentCard: null,
  };

  if (Array.isArray(data.customCards)) {
    state.customDecks.custom = mergeUniqueCards(
      state.customDecks.custom,
      data.customCards,
    );
  }
}

function applyCloudDataPreservingFlow(data) {
  const volatileState = {
    mode: state.mode,
    player: state.player,
    drawType: state.drawType,
    currentStep: state.currentStep,
    isDeckOpen: state.isDeckOpen,
    currentCard: state.currentCard,
  };
  applyCloudData(data);
  state = { ...state, ...volatileState };
}

function isCloudStateEmpty(data) {
  if (!data || typeof data !== "object") return true;
  const hasRemainingCards =
    data.remainingCards &&
    Object.values(data.remainingCards).some((items) => Array.isArray(items) && items.length);
  return (
    !hasRemainingCards &&
    !data.letter &&
    !(Array.isArray(data.letterHistory) && data.letterHistory.length) &&
    !data.planBook &&
    !(Array.isArray(data.planNotes) && data.planNotes.length) &&
    !(Array.isArray(data.diaryEntries) && data.diaryEntries.length) &&
    !(Array.isArray(data.notifications) && data.notifications.length) &&
    !(Array.isArray(data.history) && data.history.length) &&
    !(Array.isArray(data.drawnCards) && data.drawnCards.length)
  );
}

function mergeLocalStateIntoCloud(localState) {
  if (!localState || !localState.customDecks) return false;
  const before = JSON.stringify(state);
  const localDecks = normalizeDeckMap(localState.customDecks);

  Object.keys(state.customDecks).forEach((mode) => {
    state.customDecks[mode] = mergeUniqueCards(state.customDecks[mode], localDecks[mode]);
  });

  if (!state.secretLetter || state.secretLetter === DEFAULT_SECRET_LETTER) {
    state.secretLetter = localState.secretLetter || state.secretLetter;
  }
  state.letterHistory = mergeLetterHistory(state.letterHistory, localState.letterHistory);
  state.todayMoods = normalizeTodayMoods(state.todayMoods.jiaxin || state.todayMoods.wanwan
    ? state.todayMoods
    : localState.todayMoods);

  if (!state.planBook && typeof localState.planBook === "string") {
    state.planBook = localState.planBook;
  }
  if (!state.planNotes.length && localState.planNotes) {
    state.planNotes = normalizePlanNotes(localState.planNotes);
  }
  if (!state.diaryEntries.length && localState.diaryEntries) {
    state.diaryEntries = mergeDiaryEntries(state.diaryEntries, localState.diaryEntries);
  }
  state.notifications = mergeNotifications(state.notifications, localState.notifications);

  const historyKeys = new Set(
    state.history.map((entry) => `${entry.value}|${entry.player}|${entry.time}`),
  );
  const localHistory = Array.isArray(localState.history) ? localState.history : [];
  localHistory.forEach((entry) => {
    const key = `${entry.value}|${entry.player}|${entry.time}`;
    if (!historyKeys.has(key)) {
      state.history.push(entry);
      historyKeys.add(key);
    }
  });
  state.history = state.history.slice(0, HISTORY_LIMIT);
  state.usedCardIds = normalizeUsedCardIds([
    ...state.usedCardIds,
    ...(Array.isArray(localState.usedCardIds) ? localState.usedCardIds : []),
  ], localState.mode || state.mode);

  return before !== JSON.stringify(state);
}

async function loadCloudState() {
  try {
    const response = await fetch(CLOUD_LOAD_ENDPOINT, { cache: "no-store" });
    if (!response.ok) throw new Error(`Cloud load failed: ${response.status}`);
    const payload = await response.json();
    const data = payload.data || {};
    if (!isCloudStateEmpty(data)) {
      applyCloudData(data);
    }
    cloudReady = true;
    return data;
  } catch (error) {
    console.error("loadCloudState failed, using local cache.", error);
    cloudReady = false;
    return null;
  }
}

async function saveCloudState({ silent = false } = {}) {
  saveState();
  const data = cloudDataFromState();
  const serialized = JSON.stringify(data);
  if (serialized === lastSavedCloudPayload && cloudReady) return;

  try {
    const response = await fetch(CLOUD_SAVE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: serialized,
    });
    if (!response.ok) throw new Error(`Cloud save failed: ${response.status}`);
    lastSavedCloudPayload = serialized;
    cloudReady = true;
    if (!silent) showToast("已同步");
  } catch (error) {
    cloudReady = false;
    console.error("saveCloudState failed, state kept in localStorage.", error);
    if (!silent) showToast("已保存到本地，云同步失败");
  }
}

// First-run migration: if the browser already has old localStorage data, push
// it to the cloud when the cloud row is still empty.
async function migrateLocalStorageToCloud(cloudData) {
  let localState = null;
  try {
    localState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    localState = null;
  }

  if (!localState || !localState.customDecks) return;

  if (isCloudStateEmpty(cloudData)) {
    saveState();
    await saveCloudState({ silent: true });
    return;
  }

  const localCustom = Array.isArray(localState.customDecks.custom)
    ? localState.customDecks.custom
    : [];
  const mergedCustom = mergeUniqueCards(state.customDecks.custom, localCustom);
  let changed = mergedCustom.length !== state.customDecks.custom.length;
  if (changed) {
    state.customDecks.custom = mergedCustom;
  }
  if (!state.planBook && typeof localState.planBook === "string" && localState.planBook) {
    state.planBook = localState.planBook;
    changed = true;
  }
  const mergedLetterHistory = mergeLetterHistory(state.letterHistory, localState.letterHistory);
  if (mergedLetterHistory.length !== state.letterHistory.length) {
    state.letterHistory = mergedLetterHistory;
    changed = true;
  }
  if (
    (!state.todayMoods?.jiaxin && !state.todayMoods?.wanwan) &&
    localState.todayMoods
  ) {
    state.todayMoods = normalizeTodayMoods(localState.todayMoods);
    changed = true;
  }
  if (!state.planNotes.length && localState.planNotes) {
    state.planNotes = normalizePlanNotes(localState.planNotes);
    changed = true;
  }
  const mergedDiaryEntries = mergeDiaryEntries(state.diaryEntries, localState.diaryEntries);
  if (mergedDiaryEntries.length !== state.diaryEntries.length) {
    state.diaryEntries = mergedDiaryEntries;
    changed = true;
  }
  const mergedNotifications = mergeNotifications(state.notifications, localState.notifications);
  if (mergedNotifications.length !== state.notifications.length) {
    state.notifications = mergedNotifications;
    changed = true;
  }
  if (
    state.planBook &&
    (!cloudData || typeof cloudData.planBook !== "string" || !cloudData.planBook)
  ) {
    changed = true;
  }
  if (
    state.planNotes.length &&
    (!cloudData || !Array.isArray(cloudData.planNotes) || !cloudData.planNotes.length)
  ) {
    changed = true;
  }
  if (
    state.letterHistory.length &&
    (!cloudData || !Array.isArray(cloudData.letterHistory) || !cloudData.letterHistory.length)
  ) {
    changed = true;
  }
  if (
    state.diaryEntries.length &&
    (!cloudData || !Array.isArray(cloudData.diaryEntries) || !cloudData.diaryEntries.length)
  ) {
    changed = true;
  }
  if (
    state.notifications.length &&
    (!cloudData || !Array.isArray(cloudData.notifications) || !cloudData.notifications.length)
  ) {
    changed = true;
  }
  if (changed) {
    saveState();
    await saveCloudState({ silent: true });
  }
}

function renderFromState() {
  renderEntranceGate();
  renderHomeDashboard();
  renderControls();
  renderPlayer();
  renderHistory();
  renderFlow();
  renderDeckPanel();
  renderPlan();
  renderDiary();
  renderNotifications();
}

function renderEntranceGate() {
  elements.entranceGate.hidden = siteUnlocked;
  elements.appContent.hidden = !siteUnlocked;
  if (!siteUnlocked) {
    elements.entranceError.hidden = true;
  }
}

function renderHomeDashboard() {
  const moods = normalizeTodayMoods(state.todayMoods);
  state.todayMoods = moods;
  elements.togetherDays.textContent = `第 ${relationshipDays()} 天`;
  elements.moodDateLabel.textContent = formatShortDate(moods.date);
  elements.jiaxinMoodValue.textContent = moods.jiaxin || "还没选择";
  elements.wanwanMoodValue.textContent = moods.wanwan || "还没选择";
  elements.moodButtons.forEach((button) => {
    const owner = button.dataset.moodOwner;
    button.classList.toggle("active", moods[owner] === button.dataset.mood);
  });

  elements.dailyTaskText.textContent = dailyTaskForToday();
  elements.dailyTaskDate.textContent = `${formatShortDate()} 今日限定`;
  elements.dailyTaskHint.textContent = "做完以后，记得给对方一个认真回应。";

  const latestLetter = normalizeLetterHistory(state.letterHistory)[0];
  const hasUnreadLetter = unreadNotifications().some((notice) => notificationGroup(notice.type) === "letter");
  elements.recentLetterPreview.textContent =
    hasUnreadLetter ? "有新的小纸条" : "还没有新的小纸条";
  if (elements.recentLetterMeta) {
    elements.recentLetterMeta.textContent = latestLetter
      ? letterExcerpt(latestLetter.text, 34) || "给对方留一句悄悄话"
      : "给对方留一句悄悄话";
  }
}

function notificationDisplayTitle(notice) {
  const source = USER_LABELS[notice.fromUser] || "对方";
  const group = notificationGroup(notice.type);
  if (notice.type === "plan-change-request") return "重要：婉婉申请取消或变更凭证";
  if (notice.type === "plan-change-response") return "李家鑫回复了你的凭证申请";
  if (group === "letter") return `${source}给你留了小纸条`;
  if (notice.type.includes("comment") || notice.type.includes("reply")) return `${source}回应了你的日记`;
  if (group === "diary") return `${source}写了新的日记`;
  if (notice.type.includes("login")) return `${source}刚刚回到了小屋`;
  return notice.title || "新的提醒";
}

function notificationDisplayContent(notice) {
  if (notice.type.includes("login")) return "刚刚";
  if (notificationGroup(notice.type) === "letter" && !notice.content) {
    return "有一封悄悄话等你看";
  }
  if (notificationGroup(notice.type) === "diary" && !notice.content) {
    return "有一篇新的小日记";
  }
  return notice.content || "打开看看吧。";
}

function renderNotifications() {
  state.notifications = normalizeNotifications(state.notifications);
  const unread = unreadNotifications();
  const counts = unread.reduce((acc, notice) => {
    const group = notificationGroup(notice.type);
    acc[group] = (acc[group] || 0) + 1;
    acc.all = (acc.all || 0) + 1;
    return acc;
  }, {});

  elements.notificationBadges.forEach((badge) => {
    const group = badge.dataset.notificationBadge;
    const count = counts[group] || 0;
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.hidden = count === 0;
  });

  elements.notificationTitle.textContent = "通知";
  elements.notificationSummary.textContent = unread.length
    ? `你有 ${unread.length > 99 ? "99+" : unread.length} 条新通知`
    : "有新的小纸条、日记或回应时，会悄悄出现在这里。";

  if (!unread.length) {
    const empty = document.createElement("div");
    empty.className = "notification-empty";
    const title = document.createElement("strong");
    title.textContent = "现在没有新通知";
    const copy = document.createElement("span");
    copy.textContent = "有新的小纸条、日记或回应时，会悄悄出现在这里。";
    empty.append(title, copy);
    elements.notificationList.replaceChildren(empty);
    return;
  }

  elements.notificationList.replaceChildren(
    ...unread.map((notice) => {
      const row = document.createElement("div");
      row.className = "notification-swipe-row";
      row.dataset.notificationSwipeId = notice.id;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "notification-item";
      if (notice.type.includes("request")) button.classList.add("important");
      button.dataset.notificationId = notice.id;

      const icon = document.createElement("span");
      icon.className = "notification-icon";
      const group = notificationGroup(notice.type);
      icon.textContent =
        notice.type.includes("request") ? "!" :
        group === "letter" ? "💌" :
        notice.type.includes("comment") || notice.type.includes("reply") ? "💬" :
        group === "diary" ? "📖" :
        notice.type.includes("login") ? "🏠" :
        "🔔";

      const body = document.createElement("span");
      body.className = "notification-copy";

      const title = document.createElement("strong");
      title.textContent = notificationDisplayTitle(notice);

      const content = document.createElement("span");
      content.textContent = letterExcerpt(notificationDisplayContent(notice), 40);

      const meta = document.createElement("small");
      meta.textContent = `${USER_LABELS[notice.fromUser] || "对方"} · ${new Intl.DateTimeFormat("zh-CN", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(notice.createdAt))}`;

      body.append(title, content, meta);
      button.append(icon, body);
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "notification-delete-button";
      deleteButton.dataset.deleteNotification = notice.id;
      deleteButton.tabIndex = -1;
      deleteButton.setAttribute("aria-hidden", "true");
      deleteButton.textContent = "删除";

      row.append(deleteButton, button);
      return row;
    }),
  );
}

function pushModalHistory(type) {
  if (!browserHistoryReady || window.history.state?.wanwanModal === type) return;
  window.history.pushState({ ...(window.history.state || {}), wanwanModal: type }, "");
}

function removeModalHistory(type) {
  if (!browserHistoryReady || window.history.state?.wanwanModal !== type) return;
  suppressNextModalPop = true;
  window.history.back();
}

function closeVisibleModalFromHistory() {
  if (!elements.siteDialog.hidden) {
    closeSiteDialog({ confirmed: false, value: "" }, { fromHistory: true });
    return true;
  }
  if (!elements.notificationModal.hidden) {
    closeNotificationModal({ fromHistory: true });
    return true;
  }
  if (!elements.diaryEditorModal.hidden) {
    closeDiaryEditor({ fromHistory: true });
    return true;
  }
  if (!elements.diaryDetailModal.hidden) {
    closeDiaryDetail({ fromHistory: true });
    return true;
  }
  if (!elements.planGateModal.hidden) {
    closePlanGate({ fromHistory: true });
    return true;
  }
  if (!elements.planInfoModal.hidden) {
    closePlanInfoModal({ fromHistory: true });
    return true;
  }
  if (!elements.planNoteEditModal.hidden) {
    closePlanNoteEditModal({ fromHistory: true });
    return true;
  }
  return false;
}

function updateModalOpenState() {
  document.body.classList.toggle(
    "modal-open",
    !elements.siteDialog.hidden ||
      !elements.notificationModal.hidden ||
      !elements.diaryEditorModal.hidden ||
      !elements.diaryDetailModal.hidden ||
      !elements.planGateModal.hidden ||
      !elements.planInfoModal.hidden ||
      !elements.planNoteEditModal.hidden,
  );
}

function showNotificationModal({ fromHistory = false } = {}) {
  renderNotifications();
  elements.notificationModal.hidden = false;
  updateModalOpenState();
  if (!fromHistory) pushModalHistory("notification");
}

function closeNotificationModal({ fromHistory = false } = {}) {
  elements.notificationModal.hidden = true;
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("notification");
}

function announcementSeenKey(user = currentUser) {
  const safeUser = user === "wanwan" || user === "jiaxin" ? user : "guest";
  return `${ANNOUNCEMENT_SEEN_PREFIX}_${ANNOUNCEMENT_VERSION}_${safeUser}`;
}

function hasSeenAnnouncement(user = currentUser) {
  return localStorage.getItem(announcementSeenKey(user)) === "1";
}

function markAnnouncementSeen(user = currentUser) {
  localStorage.setItem(announcementSeenKey(user), "1");
}

async function showAnnouncement({ auto = false } = {}) {
  if (auto && hasSeenAnnouncement()) return;
  await openSiteDialog({
    title: ANNOUNCEMENT_TITLE,
    message: ANNOUNCEMENT_CONTENT,
    confirmText: "知道了",
    cancelText: "关闭",
  });
  markAnnouncementSeen();
}

function navigateForNotification(notice) {
  const group = notificationGroup(notice.type);
  closeNotificationModal();
  dismissNotifications(currentUser, [notice.id]);
  if (group === "letter") {
    unlockLetterStep();
  } else if (group === "diary") {
    diaryReturnStep = state.currentStep === "diary" ? "special" : state.currentStep;
    openStep("diary");
    if (notice.relatedId) {
      window.setTimeout(() => openDiaryDetail(notice.relatedId), 120);
    }
  } else if (group === "plan") {
    unlockPlanStep();
  } else if (group === "draw") {
    openStep("play");
  } else {
    openStep("intro");
  }
}

function notificationLoginPopupKey(user = currentUser) {
  return notificationStorageKey("xw_login_notification_popup", user);
}

function maybeShowUnreadNotificationPopup({ popup = false } = {}) {
  const unread = unreadNotifications();
  if (!unread.length) return;
  const toasted = new Set(getToastedNotificationIds(currentUser));
  const newIds = unread.map((notice) => notice.id).filter((id) => !toasted.has(id));
  knownUnreadNotificationIds = new Set(unread.map((notice) => notice.id));
  if (popup) {
    const signature = unread.map((notice) => notice.id).sort().join("|");
    if (sessionStorage.getItem(notificationLoginPopupKey()) !== signature) {
      sessionStorage.setItem(notificationLoginPopupKey(), signature);
      markNotificationToasted(currentUser, unread.map((notice) => notice.id));
      showNotificationModal();
      return;
    }
  }
  if (newIds.length) {
    showToast(`你有 ${unread.length > 99 ? "99+" : unread.length} 条新通知`);
    markNotificationToasted(currentUser, newIds);
  }
}

async function showLoginPopups() {
  await showAnnouncement({ auto: true });
  maybeShowUnreadNotificationPopup({ popup: true });
}

function clampSwipe(value, min = -96, max = 96) {
  return Math.max(min, Math.min(max, value));
}

function setSwipeOffset(row, value) {
  row.style.setProperty("--swipe-x", `${Math.round(value)}px`);
  const isSwiped = Math.abs(value) > 4;
  row.classList.toggle("is-swiped", isSwiped);
  row.querySelectorAll(".notification-delete-button").forEach((button) => {
    button.tabIndex = isSwiped ? 0 : -1;
    button.setAttribute("aria-hidden", isSwiped ? "false" : "true");
  });
  row.querySelectorAll(".plan-note-menu").forEach((menu) => {
    menu.setAttribute("aria-hidden", isSwiped ? "false" : "true");
    menu.querySelectorAll("button").forEach((button) => {
      button.tabIndex = isSwiped ? 0 : -1;
    });
  });
}

function resetSiblingSwipes(container, currentRow) {
  container.querySelectorAll(".is-swiped").forEach((row) => {
    if (row !== currentRow) setSwipeOffset(row, 0);
  });
}

function wireSwipeList(container, {
  rowSelector,
  surfaceSelector,
  actionOffset = -88,
  dismissThreshold = 132,
  onDismiss = null,
} = {}) {
  if (!container) return;
  let active = null;

  container.addEventListener("pointerdown", (event) => {
    if (event.button && event.button !== 0) return;
    const surface = event.target.closest(surfaceSelector);
    if (!surface || event.target.closest("input, textarea, select")) return;
    const row = surface.closest(rowSelector);
    if (!row) return;
    resetSiblingSwipes(container, row);
    active = {
      row,
      surface,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      pointerId: event.pointerId,
    };
    surface.setPointerCapture?.(event.pointerId);
  });

  container.addEventListener("pointermove", (event) => {
    if (!active || event.pointerId !== active.pointerId) return;
    const dx = event.clientX - active.startX;
    const dy = event.clientY - active.startY;
    if (!active.dragging && Math.abs(dx) < 8) return;
    if (!active.dragging && Math.abs(dy) > Math.abs(dx)) {
      active = null;
      return;
    }
    active.dragging = true;
    event.preventDefault();
    const value = clampSwipe(dx, actionOffset * 1.55, Math.abs(actionOffset) * 1.55);
    setSwipeOffset(active.row, value);
  });

  const finish = (event) => {
    if (!active || event.pointerId !== active.pointerId) return;
    const dx = event.clientX - active.startX;
    const row = active.row;
    const didDrag = active.dragging;
    active.surface.releasePointerCapture?.(event.pointerId);
    active = null;
    if (!didDrag) return;
    row.dataset.swipedClickGuard = "1";
    window.setTimeout(() => {
      delete row.dataset.swipedClickGuard;
    }, 180);
    if (onDismiss && Math.abs(dx) >= dismissThreshold) {
      onDismiss(row);
      return;
    }
    setSwipeOffset(row, dx < -36 ? actionOffset : 0);
  };

  container.addEventListener("pointerup", finish);
  container.addEventListener("pointercancel", finish);
}

async function pollNotifications() {
  if (!siteUnlocked || !currentUser) return;
  try {
    const response = await fetch(CLOUD_LOAD_ENDPOINT, { cache: "no-store" });
    if (!response.ok) throw new Error(`Cloud load failed: ${response.status}`);
    const payload = await response.json();
    applyCloudDataPreservingFlow(payload.data || {});
    saveState();
    renderNotifications();
    maybeShowUnreadNotificationPopup();
  } catch (error) {
    console.error("pollNotifications failed.", error);
  }
}

function startNotificationPolling() {
  window.clearInterval(notificationPollTimer);
  if (!currentUser) return;
  notificationPollTimer = window.setInterval(pollNotifications, NOTIFICATION_POLL_INTERVAL);
}

function currentOptions() {
  return state.customDecks[state.mode];
}

function optionType(option) {
  if (option.startsWith("真心话：")) return "truth";
  if (option.startsWith("大冒险：")) return "dare";
  return "all";
}

function optionTypeLabel(option) {
  const type = optionType(option);
  if (type === "truth") return "真心话";
  if (type === "dare") return "大冒险";
  return decks[state.mode]?.title || "抽卡";
}

function drawTemplateText(template) {
  const templates = {
    温柔一点: "真心话：说一句今晚最想认真告诉对方的温柔话。",
    搞笑一点: "大冒险：用最夸张的语气夸对方十秒，不能笑场。",
    害羞一点: "真心话：说一个你嘴上不承认、心里会偷偷开心的称呼。",
    大胆一点: "大冒险：认真看着对方，说一句今晚只对她说的话。",
    只给婉婉: "真心话：婉婉今晚最想被怎么哄？",
    只给小裴: "大冒险：叫一次“小裴同学”，再补一句不许耍赖。",
  };
  return templates[template] || "";
}

function filteredOptions() {
  const options = currentOptions();
  if (state.drawType === "all") return options;
  return options.filter((option) => optionType(option) === state.drawType);
}

function availableOptions() {
  const used = new Set(state.usedCardIds || []);
  return filteredOptions().filter((option) => !used.has(cardKey(state.mode, option)));
}

function createOptionItem(option, index) {
  const item = document.createElement("li");
  item.className = "option-item";

  const number = document.createElement("span");
  number.className = "option-number";
  number.textContent = String(index + 1).padStart(2, "0");

  const name = document.createElement("span");
  name.className = "option-name";
  name.textContent = option;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-option";
  deleteButton.type = "button";
  deleteButton.dataset.option = option;
  deleteButton.setAttribute("aria-label", `删除 ${option}`);
  deleteButton.textContent = "×";

  item.append(number, name, deleteButton);
  return item;
}

function renderOptions() {
  const options = filteredOptions();
  const available = availableOptions();
  const total = currentOptions().length;
  elements.list.replaceChildren(
    ...options.map((option, index) => createOptionItem(option, index)),
  );
  elements.emptyState.hidden = options.length > 0;
  elements.list.hidden = options.length === 0;
  elements.count.textContent =
    options.length === total ? `${total} 道题` : `${options.length} / ${total} 道`;
  elements.pickButton.disabled = available.length === 0 || isPicking;
  elements.deckTitle.textContent = decks[state.mode].title;
  elements.deckDescription.textContent = decks[state.mode].description;
  elements.deckPreviewTitle.textContent = decks[state.mode].title;
  elements.deckPreviewSubtitle.textContent =
    state.drawType === "all"
      ? `本轮剩余 ${available.length} / ${options.length} 张可抽`
      : `当前筛选本轮剩余 ${available.length} / ${options.length} 张`;
}

function renderControls() {
  document.body.dataset.theme = state.mode;
  elements.modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });
  elements.playerButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.player === state.player);
  });
  elements.drawButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.drawType === state.drawType);
  });
  renderOptions();
  renderDeckPanel();
}

function renderPlayer() {
  const copy = playerCopy[state.player];
  elements.ticketRecipient.textContent = copy.recipient;
  elements.resultKicker.textContent = copy.ready;
  elements.resultTypeTag.textContent = "等待抽卡";
  elements.pickButton.querySelector(".button-label").textContent = copy.button;
}

function renderSpecialAccess() {
  elements.specialBoundaryPanel.hidden = true;
  elements.specialLockPanel.hidden = true;
  elements.specialContent.hidden = false;
  elements.specialPasswordHint.hidden = true;
  elements.specialPasswordInput.value = "";
}

function renderLetter() {
  const content = state.secretLetter || DEFAULT_SECRET_LETTER;
  elements.letterInput.value = content;
  elements.letterCount.textContent = `${content.length} / 1200`;
  elements.letterInput.classList.toggle("letter-hidden", letterHidden);
  elements.toggleLetterVisibilityButton.textContent = letterHidden ? "显示内容" : "隐藏内容";
  renderLetterHistory();
}

function renderLetterHistory() {
  const letters = normalizeLetterHistory(state.letterHistory);
  state.letterHistory = letters;
  elements.letterHistoryList.replaceChildren(
    ...letters.map((letter, index) => {
      const item = document.createElement("li");
      item.className = "letter-history-item";

      const meta = document.createElement("span");
      meta.className = "letter-history-meta";
      meta.textContent = `小纸条 ${String(index + 1).padStart(2, "0")} · ${new Intl.DateTimeFormat("zh-CN", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(letter.time))}`;

      const text = document.createElement("p");
      text.textContent = letterExcerpt(letter.text, 88);

      item.append(meta, text);
      return item;
    }),
  );
  elements.letterHistoryList.hidden = letters.length === 0;
  elements.letterHistoryEmpty.hidden = letters.length > 0;
}

function renderPlan() {
  if (currentUser !== "wanwan") planRequestMode = false;
  elements.planInput.value = state.planBook || "";
  elements.planCount.textContent = `${elements.planInput.value.length} / ${PLAN_BOOK_LIMIT}`;
  elements.planInput.readOnly = !planEditable;
  elements.planInput.classList.toggle("is-editing", planEditable);
  elements.planEditorPanel.hidden = !planEditable;
  elements.planDocumentEntryButton.setAttribute("aria-expanded", "false");
  elements.planDocumentEntryButton.classList.remove("is-open");
  elements.editPlanButton.hidden = planEditable || currentUser === "wanwan";
  elements.editPlanButton.textContent = "✎";
  elements.editPlanButton.setAttribute("aria-label", "修改婉婉挨揍计划书");
  elements.editPlanButton.title = "修改计划书";
  elements.savePlanButton.hidden = !planEditable;
  elements.savePlanButton.textContent = "✓";
  elements.savePlanButton.setAttribute("aria-label", "保存婉婉挨揍计划书");
  elements.savePlanButton.title = "保存计划书";
  if (elements.planDocumentActions) {
    elements.planDocumentActions.hidden = currentUser === "wanwan" && !planEditable;
  }
  renderPlanRequests();
  renderPlanNotes();
}

function planRequestRecords() {
  const notices = normalizeNotifications(state.notifications);
  const responses = new Map(
    notices
      .filter((notice) => notice.type === "plan-change-response" && notice.relatedId)
      .map((notice) => [notice.relatedId, notice]),
  );
  return notices
    .filter((notice) => notice.type === "plan-change-request")
    .map((request) => ({
      request,
      response: responses.get(request.relatedId) || null,
    }))
    .sort((a, b) => new Date(b.request.createdAt) - new Date(a.request.createdAt));
}

function renderPlanRequests() {
  const records = planRequestRecords();
  if (elements.planRequestsCount) {
    elements.planRequestsCount.textContent = `${records.length} 条`;
  }
  if (elements.planRequestsEntryButton) {
    elements.planRequestsEntryButton.setAttribute("aria-expanded", "false");
    elements.planRequestsEntryButton.classList.remove("is-open");
  }
}

function createPlanRequestItem({ request, response }) {
      const item = document.createElement("li");
      item.className = `plan-request-item${response ? " answered" : ""}`;

      const head = document.createElement("div");
      head.className = "plan-request-head";
      const title = document.createElement("strong");
      title.textContent = response ? "已回复" : "待李家鑫回复";
      const time = document.createElement("time");
      time.dateTime = request.createdAt;
      time.textContent = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(request.createdAt));
      head.append(title, time);

      const content = document.createElement("p");
      content.textContent = request.content;
      item.append(head, content);

      if (response) {
        const reply = document.createElement("p");
        reply.className = "plan-request-reply";
        reply.textContent = response.content;
        item.append(reply);
      } else if (currentUser === "jiaxin") {
        const actions = document.createElement("div");
        actions.className = "plan-request-actions";
        const approveButton = document.createElement("button");
        approveButton.type = "button";
        approveButton.dataset.planRequestResponse = request.id;
        approveButton.dataset.planRequestDecision = "approved";
        approveButton.textContent = "同意申请";
        const rejectButton = document.createElement("button");
        rejectButton.type = "button";
        rejectButton.dataset.planRequestResponse = request.id;
        rejectButton.dataset.planRequestDecision = "rejected";
        rejectButton.textContent = "不同意";
        actions.append(approveButton, rejectButton);
        item.append(actions);
      }

      return item;
}

function renderPlanRequestList(container) {
  const records = planRequestRecords();
  if (!records.length) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "还没有申请记录。";
    container.replaceChildren(empty);
    return;
  }
  const list = document.createElement("ul");
  list.className = "plan-requests-list";
  list.replaceChildren(...records.map(createPlanRequestItem));
  container.replaceChildren(list);
}

function showPlanInfoModal(title, renderContent) {
  elements.planInfoTitle.textContent = title;
  elements.planInfoContent.replaceChildren();
  renderContent(elements.planInfoContent);
  elements.planInfoModal.hidden = false;
  updateModalOpenState();
  pushModalHistory("plan-info");
}

function closePlanInfoModal({ fromHistory = false } = {}) {
  elements.planInfoModal.hidden = true;
  elements.planInfoContent.replaceChildren();
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("plan-info");
}

function showPlanDocumentModal() {
  showPlanInfoModal("婉婉挨揍计划书", (container) => {
    const wrap = document.createElement("div");
    wrap.className = "plan-document-view in-modal";
    wrap.innerHTML = window.PLAN_DOCUMENT_HTML || "<p>计划书还没有内容。</p>";
    container.append(wrap);
  });
}

function showPlanRequestsModal() {
  showPlanInfoModal("申请变更记录", renderPlanRequestList);
}

function renderPlanNotes() {
  const notes = normalizePlanNotes(state.planNotes);
  state.planNotes = notes;
  if (elements.planNotesTotal) {
    elements.planNotesTotal.textContent = String(planNotesTotal(notes));
  }
  elements.planNotesList.replaceChildren(
    ...notes.map((note) => {
      const item = document.createElement("li");
      item.className = "plan-note-item";
      item.classList.toggle("is-settled", Boolean(note.settled));
      item.dataset.noteId = note.id;

      const text = document.createElement(planEditable ? "input" : "span");
      text.className = planEditable ? "plan-note-edit-input" : "plan-note-text";
      if (planEditable) {
        text.type = "text";
        text.value = note.text;
        text.maxLength = 180;
        text.placeholder = "清空这条并保存即可删除";
        text.dataset.noteEditInput = note.id;
      } else {
        text.textContent = note.text;
      }

      const quantity = document.createElement(planEditable ? "input" : "span");
      quantity.className = planEditable ? "plan-note-quantity-input" : "plan-note-quantity";
      if (planEditable) {
        quantity.type = "number";
        quantity.min = "0";
        quantity.max = "9999";
        quantity.step = "1";
        quantity.inputMode = "numeric";
        quantity.value = String(normalizePlanNoteQuantity(note.quantity));
        quantity.setAttribute("aria-label", "挨揍数量");
        quantity.dataset.noteQuantityInput = note.id;
      } else {
        quantity.textContent = `数量 ${normalizePlanNoteQuantity(note.quantity)}`;
      }

      const time = document.createElement("time");
      time.className = "plan-note-time";
      time.dateTime = note.time;
      time.textContent = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(note.time));

      if (planEditable) {
        const pinButton = document.createElement("button");
        pinButton.className = "plan-note-pin-button";
        pinButton.type = "button";
        pinButton.dataset.pinNote = note.id;
        pinButton.textContent = "置顶";
        item.append(text, quantity, time, pinButton);
      } else {
        item.classList.add("is-swipeable");
        const menu = document.createElement("div");
        menu.className = "plan-note-menu";
        menu.setAttribute("aria-hidden", "true");
        if (currentUser === "jiaxin") {
          const editButton = document.createElement("button");
          editButton.className = "plan-note-menu-pill";
          editButton.type = "button";
          editButton.dataset.editNote = note.id;
          editButton.textContent = "修改";
          const settleButton = document.createElement("button");
          settleButton.className = "plan-note-menu-pill settle";
          settleButton.type = "button";
          settleButton.dataset.settleNote = note.id;
          settleButton.textContent = note.settled ? "取消结算" : "已结算";
          menu.append(editButton, settleButton);
        } else {
          const requestButton = document.createElement("button");
          requestButton.className = "plan-note-menu-pill";
          requestButton.type = "button";
          requestButton.dataset.requestNote = note.id;
          requestButton.textContent = "申请变更";
          menu.append(requestButton);
        }
        menu.querySelectorAll("button").forEach((button) => {
          button.tabIndex = -1;
        });

        const surface = document.createElement("div");
        surface.className = "plan-note-surface";
        surface.append(text, quantity, time);
        item.append(menu, surface);
      }
      return item;
    }),
  );
  elements.planNotesEmpty.hidden = notes.length > 0;
}

function diaryMonthTitle(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", { month: "long" }).format(date);
}

function formatDiaryDate(value) {
  const date = new Date(value);
  return {
    week: new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(date),
    day: `${date.getMonth() + 1}-${date.getDate()}`,
    monthDay: `${date.getMonth() + 1}月${date.getDate()}日`,
    time: new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date),
  };
}

function diaryAuthorLabel(author) {
  if (author === "ta") return "婉婉写的";
  return "家鑫写的";
}

function diarySummary(body) {
  const text = String(body || "").replace(/\s+/g, " ").trim();
  return text.length > 58 ? `${text.slice(0, 58)}...` : text;
}

function diaryUnreadNotificationIds(entryId) {
  return unreadNotifications()
    .filter((notice) => notificationGroup(notice.type) === "diary" && (!notice.relatedId || notice.relatedId === entryId))
    .map((notice) => notice.id);
}

function renderDiaryComments(entry) {
  if (!elements.diaryCommentsList) return;
  const comments = normalizeDiaryComments(entry?.comments, entry?.id);
  elements.diaryCommentsCount.textContent = `${comments.length} 条回应`;
  elements.diaryCommentsEmpty.hidden = comments.length > 0;
  elements.diaryCommentsList.replaceChildren(
    ...comments.map((comment) => {
      const item = document.createElement("article");
      item.className = "diary-comment-item";

      const avatar = document.createElement("span");
      avatar.className = "diary-comment-avatar";
      avatar.textContent = comment.author === "wanwan" ? "婉" : "鑫";

      const body = document.createElement("div");
      const head = document.createElement("p");
      head.className = "diary-comment-headline";
      const author = document.createElement("strong");
      author.textContent = comment.nickname || USER_LABELS[comment.author] || "家鑫";
      const actions = document.createElement("span");
      actions.className = "diary-comment-actions";
      const time = document.createElement("small");
      const dateInfo = formatDiaryDate(comment.createdAt);
      time.textContent = `${dateInfo.monthDay} ${dateInfo.time}`;
      const editButton = document.createElement("button");
      editButton.className = "diary-comment-edit-button";
      editButton.type = "button";
      editButton.dataset.diaryCommentId = comment.id;
      editButton.textContent = editingDiaryCommentId === comment.id ? "取消编辑" : "编辑";
      actions.append(time, editButton);
      head.append(author, actions);

      const content = document.createElement("p");
      content.className = "diary-comment-content";
      content.textContent = comment.content;
      const heart = document.createElement("i");
      heart.textContent = "♡";
      body.append(head, content, heart);
      item.append(avatar, body);
      return item;
    }),
  );
}

function diaryCommentSubmitButton() {
  return elements.diaryCommentForm?.querySelector("button[type='submit']");
}

function resetDiaryCommentEditor({ clearInput = true } = {}) {
  editingDiaryCommentId = null;
  if (clearInput && elements.diaryCommentInput) {
    elements.diaryCommentInput.value = "";
  }
  const submitButton = diaryCommentSubmitButton();
  if (submitButton) submitButton.textContent = "发送回应";
}

function startEditingDiaryComment(commentId) {
  if (!activeDiaryId || !commentId) return;
  const entry = state.diaryEntries.find((item) => item.id === activeDiaryId);
  if (editingDiaryCommentId === commentId) {
    resetDiaryCommentEditor();
    if (entry) renderDiaryComments(entry);
    return;
  }
  const comments = normalizeDiaryComments(entry?.comments, entry?.id);
  const comment = comments.find((item) => item.id === commentId);
  if (!entry || !comment) return;
  editingDiaryCommentId = comment.id;
  elements.diaryCommentInput.value = comment.content;
  const submitButton = diaryCommentSubmitButton();
  if (submitButton) submitButton.textContent = "保存回应";
  renderDiaryComments(entry);
  window.setTimeout(() => elements.diaryCommentInput.focus(), 0);
}

function filteredDiaryEntries() {
  const now = new Date();
  const filter = state.diaryFilter || "month";
  return normalizeDiaryEntries(state.diaryEntries)
    .filter((entry) => {
      const date = new Date(entry.createdAt);
      const entryDate = date.toISOString().slice(0, 10);
      if (filter === "date") return Boolean(state.diaryDate) && entryDate === state.diaryDate;
      if (filter === "month") {
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      }
      if (filter === "favorite") return entry.favorite;
      if (filter === "me") return entry.author === "me";
      if (filter === "ta") return entry.author === "ta";
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createDiaryItem(entry, index) {
  const item = document.createElement("button");
  item.className = `diary-item diary-author-${entry.author}`;
  item.type = "button";
  item.dataset.diaryId = entry.id;
  item.style.setProperty("--delay", `${Math.min(index * 45, 240)}ms`);

  const dateInfo = formatDiaryDate(entry.createdAt);
  const dateBlock = document.createElement("span");
  dateBlock.className = "diary-date-block";
  dateBlock.innerHTML = `<small>${dateInfo.week}</small><strong>${dateInfo.day}</strong>`;

  const card = document.createElement("span");
  card.className = "diary-card";

  const top = document.createElement("span");
  top.className = "diary-card-top";
  const title = document.createElement("strong");
  title.textContent = entry.title || dateInfo.monthDay;
  const time = document.createElement("small");
  time.textContent = dateInfo.time;
  top.append(title, time);

  const summary = document.createElement("span");
  summary.className = "diary-card-summary";
  summary.textContent = diarySummary(entry.body) || "这一天被好好收起来了。";

  const meta = document.createElement("span");
  meta.className = "diary-card-meta";
  [diaryAuthorLabel(entry.author), entry.mood, entry.favorite ? "已收藏" : ""]
    .filter(Boolean)
    .forEach((text) => {
      const tag = document.createElement("em");
      tag.textContent = text;
      meta.append(tag);
    });
  const commentCount = normalizeDiaryComments(entry.comments, entry.id).length;
  if (commentCount) {
    const tag = document.createElement("em");
    tag.className = "diary-reply-count";
    tag.textContent = `${commentCount} 条小回应`;
    meta.append(tag);
  }
  if (diaryUnreadNotificationIds(entry.id).length) {
    const tag = document.createElement("em");
    tag.className = "diary-new-reply";
    tag.textContent = "新回应";
    meta.append(tag);
  }

  card.append(top, summary, meta);
  item.append(dateBlock, card);
  return item;
}

function renderDiary() {
  if (!elements.diaryList) return;
  state.diaryEntries = normalizeDiaryEntries(state.diaryEntries);
  elements.diaryTitle.textContent =
    state.diaryFilter === "date" && state.diaryDate
      ? `${Number(state.diaryDate.slice(5, 7))}月${Number(state.diaryDate.slice(8, 10))}日`
      : diaryMonthTitle();
  elements.diaryDateInput.value = state.diaryDate || "";
  elements.diaryDateForm.hidden = state.diaryFilter !== "date";
  elements.diaryDateClearButton.hidden = state.diaryFilter !== "date" || !state.diaryDate;
  elements.diaryFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.diaryFilter === (state.diaryFilter || "month"));
  });
  const entries = filteredDiaryEntries();
  elements.diaryList.replaceChildren(...entries.map(createDiaryItem));
  elements.diaryList.hidden = entries.length === 0;
  elements.diaryEmpty.hidden = entries.length > 0;
  elements.diaryCount.textContent = `${entries.length} 个记录`;
}

function diaryMoodOptions() {
  return [...(elements.diaryMoodInput?.options || [])]
    .map((option) => option.value)
    .filter((value) => value && value !== CUSTOM_DIARY_MOOD_VALUE);
}

function updateDiaryChoiceControls() {
  elements.diaryAuthorChoiceButtons.forEach((button) => {
    const active = button.dataset.diaryAuthorValue === elements.diaryAuthorInput.value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  elements.diaryMoodChoiceButtons.forEach((button) => {
    const active = button.dataset.diaryMoodValue === elements.diaryMoodInput.value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateDiaryMoodCustomVisibility() {
  if (!elements.diaryMoodInput || !elements.diaryMoodCustomInput) return;
  const isCustom = elements.diaryMoodInput.value === CUSTOM_DIARY_MOOD_VALUE;
  elements.diaryMoodCustomInput.hidden = !isCustom;
  if (!isCustom) {
    elements.diaryMoodCustomInput.value = "";
    updateDiaryChoiceControls();
    return;
  }
  updateDiaryChoiceControls();
  window.setTimeout(() => elements.diaryMoodCustomInput.focus(), 0);
}

function setDiaryMoodValue(value = "") {
  if (!elements.diaryMoodInput) return;
  const mood = String(value || "").trim();
  if (!mood || diaryMoodOptions().includes(mood)) {
    elements.diaryMoodInput.value = mood;
    if (elements.diaryMoodCustomInput) {
      elements.diaryMoodCustomInput.hidden = true;
      elements.diaryMoodCustomInput.value = "";
    }
    updateDiaryChoiceControls();
    return;
  }
  elements.diaryMoodInput.value = CUSTOM_DIARY_MOOD_VALUE;
  if (elements.diaryMoodCustomInput) {
    elements.diaryMoodCustomInput.hidden = false;
    elements.diaryMoodCustomInput.value = mood;
  }
  updateDiaryChoiceControls();
}

function selectedDiaryMood() {
  if (!elements.diaryMoodInput) return "";
  if (elements.diaryMoodInput.value !== CUSTOM_DIARY_MOOD_VALUE) {
    return elements.diaryMoodInput.value;
  }
  return (elements.diaryMoodCustomInput?.value || "").trim();
}

function openDiaryEditor(entry = null) {
  editingDiaryId = entry?.id || null;
  elements.diaryEditorTitle.textContent = entry ? "编辑这篇小日记" : "写一篇小日记";
  elements.diaryTitleInput.value = entry?.title || "";
  elements.diaryBodyInput.value = entry?.body || "";
  elements.diaryAuthorInput.value = entry?.author || (currentUser === "wanwan" ? "ta" : "me");
  setDiaryMoodValue(entry?.mood || "");
  updateDiaryChoiceControls();
  elements.diaryImageInput.value = entry?.image || "";
  elements.diaryFormError.hidden = true;
  elements.diaryEditorModal.hidden = false;
  updateModalOpenState();
  pushModalHistory("diary-editor");
  window.setTimeout(() => elements.diaryTitleInput.focus(), 80);
}

function closeDiaryEditor({ fromHistory = false } = {}) {
  elements.diaryEditorModal.hidden = true;
  editingDiaryId = null;
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("diary-editor");
}

function openDiaryDetail(id) {
  const entry = state.diaryEntries.find((item) => item.id === id);
  if (!entry) return;
  activeDiaryId = id;
  resetDiaryCommentEditor();
  const dateInfo = formatDiaryDate(entry.createdAt);
  elements.diaryDetailMeta.textContent = `${diaryAuthorLabel(entry.author)} · ${dateInfo.monthDay} ${dateInfo.time}`;
  elements.diaryDetailTitle.textContent = entry.title || dateInfo.monthDay;
  elements.diaryDetailBody.textContent = entry.body;
  elements.diaryDetailTags.replaceChildren(
    ...[entry.mood, entry.image ? "有图片备注" : "", entry.favorite ? "已收藏" : ""]
      .filter(Boolean)
      .map((text) => {
        const tag = document.createElement("span");
        tag.textContent = text;
        return tag;
      }),
  );
  renderDiaryComments(entry);
  const dismissedDiaryIds = diaryUnreadNotificationIds(entry.id);
  dismissNotifications(currentUser, dismissedDiaryIds);
  if (dismissedDiaryIds.length) renderDiary();
  elements.diaryFavoriteButton.textContent = entry.favorite ? "取消收藏" : "收藏";
  elements.diaryDetailModal.hidden = false;
  updateModalOpenState();
  pushModalHistory("diary-detail");
}

function closeDiaryDetail({ fromHistory = false } = {}) {
  elements.diaryDetailModal.hidden = true;
  activeDiaryId = null;
  resetDiaryCommentEditor();
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("diary-detail");
}

function saveDiaryFromForm(event) {
  event.preventDefault();
  const title = elements.diaryTitleInput.value.trim();
  const body = elements.diaryBodyInput.value.trim();
  if (!title || !body) {
    elements.diaryFormError.textContent = "标题和正文都要写一点。";
    elements.diaryFormError.hidden = false;
    return;
  }

  const now = new Date().toISOString();
  const isEditing = Boolean(editingDiaryId);
  let relatedId = editingDiaryId;
  const payload = {
    title,
    body,
    author: elements.diaryAuthorInput.value,
    mood: selectedDiaryMood(),
    image: elements.diaryImageInput.value.trim(),
    updatedAt: now,
  };

  if (editingDiaryId) {
    const index = state.diaryEntries.findIndex((entry) => entry.id === editingDiaryId);
    if (index !== -1) {
      state.diaryEntries[index] = { ...state.diaryEntries[index], ...payload };
    }
  } else {
    relatedId = `diary-${Date.now()}-${secureRandomIndex(100000)}`;
    state.diaryEntries.unshift({
      id: relatedId,
      createdAt: now,
      favorite: false,
      comments: [],
      ...payload,
    });
  }
  addNotification({
    type: isEditing ? "diary-updated" : "diary-created",
    title: isEditing ? "日记被悄悄更新啦" : "有人写了一篇新日记",
    content: title,
    relatedId,
  });

  saveState();
  renderDiary();
  closeDiaryEditor();
  showToast("日记已保存");
  void saveCloudState();
}

function saveDiaryComment(event) {
  event.preventDefault();
  const content = elements.diaryCommentInput.value.trim();
  if (!content) {
    showToast("先写一句想说的话吧。");
    return;
  }
  if (!activeDiaryId) return;
  state.diaryEntries = normalizeDiaryEntries(state.diaryEntries);
  const entry = state.diaryEntries.find((item) => item.id === activeDiaryId);
  if (!entry) return;
  const author = currentUser === "wanwan" ? "wanwan" : "jiaxin";
  if (editingDiaryCommentId) {
    const comments = normalizeDiaryComments(entry.comments, entry.id);
    const index = comments.findIndex((comment) => comment.id === editingDiaryCommentId);
    if (index === -1) {
      resetDiaryCommentEditor();
      showToast("这条小回应暂时没找到");
      return;
    }
    comments[index] = {
      ...comments[index],
      content,
    };
    entry.comments = normalizeDiaryComments(comments, entry.id);
    entry.updatedAt = new Date().toISOString();
    saveState();
    renderDiary();
    renderDiaryComments(entry);
    resetDiaryCommentEditor();
    showToast("小回应已更新");
    void saveCloudState({ silent: true });
    return;
  }
  const comment = {
    id: `comment-${Date.now()}-${secureRandomIndex(100000)}`,
    diaryId: entry.id,
    author,
    nickname: USER_LABELS[author] || (author === "wanwan" ? "婉婉" : "家鑫"),
    content,
    createdAt: new Date().toISOString(),
  };
  entry.comments = normalizeDiaryComments([...(entry.comments || []), comment], entry.id);
  entry.updatedAt = new Date().toISOString();
  addNotification({
    type: "diary-commented",
    title: "日记收到一条小回应",
    content: letterExcerpt(content, 52),
    relatedId: entry.id,
  });
  saveState();
  renderDiary();
  renderDiaryComments(entry);
  elements.diaryCommentInput.value = "";
  showToast("小回应已送到这篇日记里");
  void saveCloudState({ silent: true });
}

function editActiveDiary() {
  const entry = state.diaryEntries.find((item) => item.id === activeDiaryId);
  if (!entry) return;
  closeDiaryDetail();
  openDiaryEditor(entry);
}

function toggleActiveDiaryFavorite() {
  const entry = state.diaryEntries.find((item) => item.id === activeDiaryId);
  if (!entry) return;
  entry.favorite = !entry.favorite;
  entry.updatedAt = new Date().toISOString();
  saveState();
  renderDiary();
  openDiaryDetail(entry.id);
  void saveCloudState({ silent: true });
}

async function deleteActiveDiary() {
  const entry = state.diaryEntries.find((item) => item.id === activeDiaryId);
  if (!entry) return;
  const confirmed = await confirmInSiteDialog("确定要删除这篇日记吗？删除后不能恢复。", "删除日记");
  if (!confirmed) return;
  state.diaryEntries = state.diaryEntries.filter((item) => item.id !== activeDiaryId);
  saveState();
  renderDiary();
  closeDiaryDetail();
  showToast("日记已删除");
  void saveCloudState();
}

function renderFlow() {
  const inIntro = state.currentStep === "intro";
  const inMode = state.currentStep === "mode";
  const inSpecial = state.currentStep === "special";
  const inPlay = state.currentStep === "play";
  const inLetter = state.currentStep === "letter";
  const inPlan = state.currentStep === "plan";
  const inDiary = state.currentStep === "diary";

  document.body.dataset.currentStep = state.currentStep;
  elements.introSection.hidden = !inIntro;
  elements.gameFlow.hidden = inIntro;
  elements.modeStep.hidden = !inMode;
  elements.specialStep.hidden = !inSpecial;
  elements.playStep.hidden = !inPlay;
  elements.letterStep.hidden = !inLetter;
  elements.planStep.hidden = !inPlan;
  elements.diaryStep.hidden = !inDiary;
  elements.footer.hidden = !inIntro;
  renderSpecialAccess();
  renderLetter();
  renderPlan();
  renderDiary();
}

function renderDeckPanel() {
  const deckOpen = state.isDeckOpen;
  elements.deckPanel.hidden = !deckOpen;
  elements.toggleDeckButton.setAttribute("aria-expanded", String(deckOpen));
  elements.toggleDeckButton.textContent = deckOpen ? "收起题库" : "查看题库";
  elements.pickerCard.classList.toggle("deck-collapsed", !deckOpen);
}

function syncBrowserHistory(step, { replace = false } = {}) {
  if (!browserHistoryReady) return;
  const payload = { wanwanStep: step };
  const title = document.title;
  if (replace) {
    window.history.replaceState(payload, title);
    return;
  }
  if (window.history.state?.wanwanStep === step) return;
  window.history.pushState(payload, title);
}

function scrollToStep(step) {
  const target = stepTargets[step]?.();
  if (target && !target.hidden) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openStep(step, { pushHistory = true, replaceHistory = false } = {}) {
  state.currentStep = step;
  renderFlow();
  if (pushHistory) {
    syncBrowserHistory(step, { replace: replaceHistory });
  }
  scrollToStep(step);
}

function replaceStep(step) {
  openStep(step, { replaceHistory: true });
}

function backToStep(fallbackStep) {
  if (browserHistoryReady && window.history.state?.wanwanStep && window.history.length > 1) {
    window.history.back();
    return;
  }
  replaceStep(fallbackStep);
}

function resetHiddenEntrySequence() {
  window.clearTimeout(hiddenTapTimer);
  hiddenTapSequence = [];
}

function resetBrandLoginTaps() {
  window.clearTimeout(brandLoginTapTimer);
  brandLoginTapCount = 0;
}

function returnToEntranceGate() {
  resetBrandLoginTaps();
  window.clearInterval(notificationPollTimer);
  currentUser = "";
  forgetRememberedUser();
  siteUnlocked = false;
  resetVolatileFlow();
  renderFromState();
  elements.entrancePassword.value = "";
  window.setTimeout(() => elements.entrancePassword.focus(), 0);
  showToast("已回到登录界面");
}

function unlockLetterStep() {
  letterReturnStep =
    state.currentStep === "intro" || state.currentStep === "letter"
      ? "intro"
      : state.currentStep;
  resetHiddenEntrySequence();
  showToast("隐藏入口已打开");
  openStep("letter");
}

function handleHiddenEntryTap(token) {
  hiddenTapSequence.push(token);
  window.clearTimeout(hiddenTapTimer);

  const isValidSoFar = HIDDEN_ENTRY_PATTERN.every((expected, index) => {
    const current = hiddenTapSequence[index];
    return current === undefined || current === expected;
  });

  if (!isValidSoFar) {
    hiddenTapSequence = token === HIDDEN_ENTRY_PATTERN[0] ? [token] : [];
  }

  if (hiddenTapSequence.length === HIDDEN_ENTRY_PATTERN.length) {
    unlockLetterStep();
    return;
  }

  hiddenTapTimer = window.setTimeout(resetHiddenEntrySequence, HIDDEN_ENTRY_TIMEOUT);
}

function randomCaption() {
  const lines = funnyCaptions[state.mode] || funnyCaptions.custom;
  return lines[secureRandomIndex(lines.length)];
}

function renderHistory() {
  const visibleHistory = state.history.slice(0, HISTORY_LIMIT);
  elements.historyList.replaceChildren(
    ...visibleHistory.map((entry, index) => {
      const item = document.createElement("li");
      item.className = "history-item";
      const meta = document.createElement("span");
      meta.className = "history-meta";
      meta.textContent = `第 ${index + 1} 张｜${
        entry.player === "一起" ? "我们一起" : entry.player
      }｜${optionTypeLabel(entry.value)}`;
      const player = document.createElement("span");
      player.className = "history-player";
      player.textContent =
        entry.player === "一起" ? "我们一起" : `${entry.player}的卡`;
      const value = document.createElement("span");
      value.className = "history-result";
      value.textContent = entry.value;
      const time = document.createElement("span");
      time.className = "history-time";
      time.textContent = new Intl.DateTimeFormat("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(entry.time));
      item.append(meta, player, value, time);
      return item;
    }),
  );
  const hasHistory = state.history.length > 0;
  elements.historyList.hidden = !hasHistory;
  elements.historyEmpty.hidden = hasHistory;
  elements.clearHistoryButton.hidden = !hasHistory;
  elements.letterPrompt.hidden = state.history.length < 3;
}

function parseOptions(value) {
  return value
    .split(/[\n,，、;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function addOptions(rawValue) {
  const incoming = parseOptions(rawValue);
  if (!incoming.length) {
    showToast("先写下一道题吧");
    return;
  }
  const options = currentOptions();
  const existing = new Set(options.map((item) => item.toLocaleLowerCase()));
  const unique = incoming.filter((item) => {
    const normalized = item.toLocaleLowerCase();
    if (existing.has(normalized)) return false;
    existing.add(normalized);
    return true;
  });
  options.push(...unique);
  saveState();
  renderOptions();
  elements.input.value = "";
  showToast(`已加入 ${unique.length} 道题`);
  void saveCloudState();
}

function secureRandomIndex(length) {
  if (length <= 1) return 0;
  if (window.crypto?.getRandomValues) {
    const max = Math.floor(0x100000000 / length) * length;
    const values = new Uint32Array(1);
    do window.crypto.getRandomValues(values);
    while (values[0] >= max);
    return values[0] % length;
  }
  return Math.floor(Math.random() * length);
}

function delay(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function pickRandomOption() {
  const pool = availableOptions();
  if (isPicking || !pool.length) {
    if (!pool.length) showToast("本轮已经抽完啦，点“重置本轮抽卡”可以重新开始");
    return;
  }

  isPicking = true;
  elements.pickButton.disabled = true;
  elements.pickButton.querySelector(".button-label").textContent = "正在抽取...";
  elements.resultStage.classList.remove("has-result");
  elements.resultStage.classList.add("is-picking");

  const startTime = performance.now();
  let interval = 65;
  while (performance.now() - startTime < 1000) {
    elements.resultText.textContent = pool[secureRandomIndex(pool.length)];
    await delay(interval);
    interval = Math.min(interval + 10, 140);
  }

  const result = pool[secureRandomIndex(pool.length)];
  const resultKey = cardKey(state.mode, result);
  if (!state.usedCardIds.includes(resultKey)) {
    state.usedCardIds.push(resultKey);
  }
  state.currentCard = {
    value: result,
    player: state.player,
    mode: state.mode,
    time: new Date().toISOString(),
  };

  state.history.unshift({
    value: result,
    player: state.player,
    mode: state.mode,
    time: new Date().toISOString(),
  });
  addNotification({
    type: "draw-card",
    title: "刚刚抽了一张卡",
    content: `${state.player}抽到：${letterExcerpt(result, 42)}`,
    relatedId: resultKey,
  });
  state.history = state.history.slice(0, HISTORY_LIMIT);
  saveState();

  elements.resultStage.classList.remove("is-picking");
  void elements.resultStage.offsetWidth;
  elements.resultStage.classList.add("has-result");
  elements.resultKicker.textContent =
    state.player === "一起" ? "这一张属于我们" : `这一张属于${state.player}`;
  elements.resultText.textContent = result;
  elements.resultTypeTag.textContent = optionTypeLabel(result);
  isPicking = false;
  const remainingCount = availableOptions().length;
  elements.resultCaption.textContent = `已加入今晚抽过的卡，还剩 ${remainingCount} 张。`;
  elements.pickButton.querySelector(".button-label").textContent = "下一张";
  renderOptions();
  renderHistory();
  void saveCloudState({ silent: true });
}

function resetResult() {
  const copy = playerCopy[state.player];
  state.currentCard = null;
  elements.resultStage.classList.remove("is-picking", "has-result");
  elements.ticketRecipient.textContent = copy.recipient;
  elements.resultTypeTag.textContent = "等待抽卡";
  elements.resultKicker.textContent = copy.ready;
  elements.resultText.textContent = "点击下方按钮";
  elements.resultCaption.textContent = "任何一张都可以跳过";
  elements.resultCaption.textContent = randomCaption();
  elements.pickButton.querySelector(".button-label").textContent = copy.button;
}

function skipCurrentCard() {
  if (isPicking) return;
  state.currentCard = null;
  resetResult();
  showToast("没关系，可以跳过、换一张，或者回到常规玩法。");
}

async function resetDrawRound() {
  if (isPicking) return;
  const confirmed = await confirmInSiteDialog(
    "题库和自定义题都会保留，只清空本轮已抽状态。",
    "重置本轮抽卡",
  );
  if (!confirmed) {
    return;
  }
  state.usedCardIds = [];
  state.history = [];
  state.currentCard = null;
  saveState();
  resetResult();
  renderOptions();
  renderHistory();
  showToast("本轮抽卡已重置，题库都还在");
  void saveCloudState();
}

function restoreDefaultDeck() {
  const defaults = decks[state.mode].options;
  const current = currentOptions();
  state.customDecks[state.mode] = mergeUniqueCards(defaults, current);
  state.usedCardIds = state.usedCardIds.filter((id) => !id.startsWith(`${state.mode}::`));
  saveState();
  renderOptions();
  resetResult();
  showToast("默认题库已恢复，自定义题已保留");
  void saveCloudState();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function closeSiteDialog(result, { fromHistory = false } = {}) {
  if (!siteDialogResolver) return;
  const resolver = siteDialogResolver;
  siteDialogResolver = null;
  elements.siteDialog.hidden = true;
  elements.siteDialogInput.value = "";
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("site-dialog");
  resolver(result);
}

function openSiteDialog({
  title = "确认一下",
  message = "",
  confirmText = "确定",
  cancelText = "取消",
  input = false,
  inputType = "text",
  placeholder = "",
  defaultValue = "",
} = {}) {
  elements.siteDialogTitle.textContent = title;
  elements.siteDialogMessage.textContent = message;
  elements.siteDialogConfirm.textContent = confirmText;
  elements.siteDialogCancel.textContent = cancelText;
  elements.siteDialogInput.hidden = !input;
  elements.siteDialogInput.type = inputType;
  elements.siteDialogInput.placeholder = placeholder;
  elements.siteDialogInput.value = defaultValue;
  elements.siteDialog.hidden = false;
  updateModalOpenState();
  pushModalHistory("site-dialog");
  if (input) {
    window.setTimeout(() => {
      elements.siteDialogInput.focus();
      elements.siteDialogInput.select();
    }, 0);
  }
  return new Promise((resolve) => {
    siteDialogResolver = resolve;
  });
}

async function confirmInSiteDialog(message, title = "确认一下") {
  const result = await openSiteDialog({
    title,
    message,
    confirmText: "确定",
    cancelText: "取消",
  });
  return Boolean(result?.confirmed);
}

async function requestPasswordInSiteDialog(title = "输入密码") {
  const result = await openSiteDialog({
    title,
    message: "",
    input: true,
    inputType: "password",
    placeholder: "输入密码",
    confirmText: "确定",
    cancelText: "取消",
  });
  return result?.confirmed ? result.value : null;
}

async function requestTextInSiteDialog(title, defaultValue = "") {
  const result = await openSiteDialog({
    title,
    input: true,
    inputType: "text",
    placeholder: "写下记录",
    defaultValue,
    confirmText: "保存",
    cancelText: "取消",
  });
  return result?.confirmed ? result.value.trim() : null;
}

function saveLetter() {
  const nextLetter = elements.letterInput.value.trim() || DEFAULT_SECRET_LETTER;
  const previousLatest = normalizeLetterHistory(state.letterHistory)[0]?.text || "";
  state.secretLetter = nextLetter;
  if (nextLetter && nextLetter !== previousLatest) {
    const letterId = `letter-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    state.letterHistory = normalizeLetterHistory([
      {
        id: letterId,
        text: nextLetter,
        time: new Date().toISOString(),
      },
      ...state.letterHistory,
    ]);
    addNotification({
      type: "letter-saved",
      title: "你收到一张新的小纸条",
      content: letterExcerpt(nextLetter, 52),
      relatedId: letterId,
    });
  }
  saveState();
  renderLetter();
  renderHomeDashboard();
  showToast("已收好。下次打开还在这里。");
  void saveCloudState();
}

function openPlanGate({ fromHistory = false } = {}) {
  planGateIndex = 0;
  elements.planGateModal.hidden = false;
  elements.planGateUnlocked.hidden = true;
  updateModalOpenState();
  if (!fromHistory) pushModalHistory("plan-gate");
}

function closePlanGate({ fromHistory = false } = {}) {
  planGateIndex = 0;
  elements.planGateModal.hidden = true;
  elements.planGateUnlocked.hidden = true;
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("plan-gate");
}

function unlockPlanStep() {
  planReturnStep = state.currentStep === "plan" ? "special" : state.currentStep;
  closePlanGate();
  planEditable = false;
  planRequestMode = false;
  planDocumentOpen = false;
  openStep("plan");
}

function handleBrandTextLoginTap() {
  brandLoginTapCount += 1;
  window.clearTimeout(brandLoginTapTimer);
  if (brandLoginTapCount >= 3) {
    returnToEntranceGate();
    return;
  }
  brandLoginTapTimer = window.setTimeout(resetBrandLoginTaps, 900);
}

function handlePlanGateClick(word, button) {
  if (word !== PLAN_GATE_SEQUENCE[planGateIndex]) {
    planGateIndex = word === PLAN_GATE_SEQUENCE[0] ? 1 : 0;
    return;
  }
  planGateIndex += 1;
  if (planGateIndex === PLAN_GATE_SEQUENCE.length) {
    elements.planGateUnlocked.hidden = false;
  }
}

async function unlockPlanEditing() {
  if (currentUser === "wanwan") {
    planRequestMode = !planRequestMode;
    planEditable = false;
    planDocumentOpen = false;
    renderPlan();
    return;
  }
  planEditable = true;
  planDocumentOpen = false;
  renderPlan();
  elements.planInput.focus();
}

async function requestPlanNoteChange(noteId) {
  const notes = normalizePlanNotes(state.planNotes);
  if (!notes.length) {
    showToast("现在还没有可申请变更的凭证");
    return;
  }
  const note = notes.find((item) => item.id === noteId);
  if (!note) {
    showToast("没有找到这条凭证");
    return;
  }
  const reason = await openSiteDialog({
    title: "申请理由",
    message: `凭证：${note.text}\n数量：${normalizePlanNoteQuantity(note.quantity)}`,
    input: true,
    inputType: "text",
    placeholder: "写明想取消或变更的原因",
    confirmText: "提交申请",
    cancelText: "取消",
  });
  const reasonText = reason?.confirmed ? reason.value.trim() : "";
  if (!reasonText) {
    if (reason?.confirmed) showToast("需要写一下申请理由");
    return;
  }
  const requestId = `plan-request-${note.id}-${Date.now()}`;
  addNotification({
    type: "plan-change-request",
    title: "重要：婉婉申请取消或变更凭证",
    content: `凭证：${note.text}（数量 ${normalizePlanNoteQuantity(note.quantity)}）\n理由：${reasonText}`,
    relatedId: requestId,
  });
  saveState();
  planRequestMode = false;
  renderPlan();
  renderNotifications();
  showToast("申请已发给李家鑫");
  void saveCloudState();
}

async function editPlanNote(noteId) {
  if (currentUser !== "jiaxin") return;
  const notes = normalizePlanNotes(state.planNotes);
  const note = notes.find((item) => item.id === noteId);
  if (!note) {
    showToast("没有找到这条凭证");
    return;
  }
  openPlanNoteEditModal(note);
}

function openPlanNoteEditModal(note) {
  editingPlanNoteId = note.id;
  elements.planNoteEditText.value = note.text;
  elements.planNoteEditQuantity.value = String(normalizePlanNoteQuantity(note.quantity));
  elements.planNoteEditError.hidden = true;
  elements.planNoteEditModal.hidden = false;
  updateModalOpenState();
  pushModalHistory("plan-note-edit");
  window.setTimeout(() => {
    elements.planNoteEditText.focus();
    elements.planNoteEditText.select();
  }, 80);
}

function closePlanNoteEditModal({ fromHistory = false } = {}) {
  elements.planNoteEditModal.hidden = true;
  editingPlanNoteId = null;
  elements.planNoteEditText.value = "";
  elements.planNoteEditQuantity.value = "";
  elements.planNoteEditError.hidden = true;
  updateModalOpenState();
  if (!fromHistory) removeModalHistory("plan-note-edit");
}

function savePlanNoteEdit(event) {
  event.preventDefault();
  if (currentUser !== "jiaxin" || !editingPlanNoteId) return;
  const notes = normalizePlanNotes(state.planNotes);
  const note = notes.find((item) => item.id === editingPlanNoteId);
  if (!note) {
    elements.planNoteEditError.textContent = "没有找到这条凭证";
    elements.planNoteEditError.hidden = false;
    return;
  }
  const nextText = elements.planNoteEditText.value.trim();
  if (!nextText) {
    elements.planNoteEditError.textContent = "凭证内容不能为空";
    elements.planNoteEditError.hidden = false;
    return;
  }
  const nextQuantity = normalizePlanNoteQuantity(elements.planNoteEditQuantity.value);
  state.planNotes = notes.map((item) =>
    item.id === editingPlanNoteId
      ? {
          ...item,
          text: nextText,
          quantity: nextQuantity,
          time:
            nextText === item.text && nextQuantity === normalizePlanNoteQuantity(item.quantity)
              ? item.time
              : new Date().toISOString(),
        }
      : item,
  );
  saveState();
  renderPlan();
  closePlanNoteEditModal();
  showToast("这条凭证已修改");
  void saveCloudState();
}

function togglePlanNoteSettled(noteId) {
  if (currentUser !== "jiaxin") return;
  let changed = false;
  state.planNotes = normalizePlanNotes(state.planNotes).map((note) => {
    if (note.id !== noteId) return note;
    changed = true;
    return {
      ...note,
      settled: !note.settled,
      time: new Date().toISOString(),
    };
  });
  if (!changed) {
    showToast("没有找到这条凭证");
    return;
  }
  saveState();
  renderPlan();
  showToast("凭证状态已更新");
  void saveCloudState();
}

async function respondToPlanRequest(requestId, decision) {
  const request = normalizeNotifications(state.notifications).find((notice) => notice.id === requestId);
  if (!request || request.type !== "plan-change-request") {
    showToast("没有找到这条申请");
    return;
  }
  const reply = await openSiteDialog({
    title: decision === "approved" ? "同意申请" : "不同意申请",
    message: request.content,
    input: true,
    inputType: "text",
    placeholder: "写一句回复给婉婉",
    confirmText: "发送回复",
    cancelText: "取消",
  });
  const replyText = reply?.confirmed ? reply.value.trim() : "";
  if (!replyText) {
    if (reply?.confirmed) showToast("需要写一下回复");
    return;
  }
  addNotification({
    type: "plan-change-response",
    title: "李家鑫回复了你的凭证申请",
    content: `${decision === "approved" ? "已同意" : "未同意"}：${replyText}`,
    relatedId: request.relatedId,
  });
  markNotificationRead(request.id);
  saveState();
  renderPlan();
  renderNotifications();
  showToast("已回复婉婉");
  void saveCloudState();
}

function addPlanNote(text, quantity = 1) {
  const value = text.trim();
  if (!value) {
    showToast("先写一条记录吧");
    return;
  }
  const normalizedQuantity = normalizePlanNoteQuantity(quantity);
  const noteId = `note-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  state.planNotes.unshift({
    id: noteId,
    text: value,
    quantity: normalizedQuantity,
    time: new Date().toISOString(),
    settled: false,
  });
  addNotification({
    type: "plan-note-added",
    title: "计划书多了一条新记录",
    content: letterExcerpt(value, 52),
    relatedId: noteId,
  });
  elements.planNoteInput.value = "";
  if (elements.planNoteQuantityInput) elements.planNoteQuantityInput.value = "1";
  saveState();
  renderPlan();
  showToast("已添加");
  void saveCloudState();
}

function savePlan() {
  state.planBook = elements.planInput.value.trim();
  const wasEditing = planEditable;
  if (planEditable) {
    const quantityInputs = new Map(
      [...elements.planNotesList.querySelectorAll("[data-note-quantity-input]")]
        .map((input) => [input.dataset.noteQuantityInput, input]),
    );
    state.planNotes = [...elements.planNotesList.querySelectorAll("[data-note-edit-input]")]
      .map((input) => {
        const note = state.planNotes.find((item) => item.id === input.dataset.noteEditInput);
        const nextText = input.value.trim();
        if (!note || !nextText) return null;
        const quantityInput = quantityInputs.get(note.id);
        const nextQuantity = normalizePlanNoteQuantity(quantityInput?.value);
        return {
          ...note,
          text: nextText,
          quantity: nextQuantity,
          time: nextText === note.text && nextQuantity === normalizePlanNoteQuantity(note.quantity)
            ? note.time
            : new Date().toISOString(),
        };
      })
      .filter(Boolean);
  }
  planEditable = false;
  planDocumentOpen = false;
  if (wasEditing) {
    addNotification({
      type: "plan-completed",
      title: "神秘小计划更新好了",
      content: "计划书被认真保存了一次，快去看看。",
      relatedId: "plan",
    });
  }
  saveState();
  renderPlan();
  showToast("已保存");
  void saveCloudState();
}

function sendReconcileRequest() {
  addNotification({
    type: "reconcile-request",
    title: "有人想和好啦",
    content: `${USER_LABELS[currentUser] || "对方"}递来一张和好小纸条，想被认真抱抱。`,
    relatedId: "reconcile",
  });
  saveState();
  renderNotifications();
  showToast("和好请求已送到对方的小屋");
  void saveCloudState();
}

function unlockEntrance(user, { silent = false, deferPopups = false } = {}) {
  currentUser = user || currentUser;
  if (currentUser) rememberUser(currentUser);
  siteUnlocked = true;
  resetVolatileFlow();
  renderFromState();
  knownUnreadNotificationIds = new Set(unreadNotifications().map((notice) => notice.id));
  if (!deferPopups) {
    window.setTimeout(() => {
      void showLoginPopups();
    }, 180);
  }
  startNotificationPolling();
  if (!silent) showToast(`${USER_LABELS[currentUser] || "你"}回家啦`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.entranceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = IDENTITY_PASSWORDS[elements.entrancePassword.value.trim()];
  if (!user) {
    elements.entranceError.hidden = false;
    elements.entrancePassword.focus();
    elements.entrancePassword.select();
    return;
  }
  elements.entrancePassword.value = "";
  unlockEntrance(user);
});

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  addOptions(elements.input.value);
});

elements.templateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = drawTemplateText(button.dataset.template);
    if (!text) return;
    const spacer = elements.input.value.trim() ? "\n" : "";
    elements.input.value = `${elements.input.value}${spacer}${text}`;
    elements.input.focus();
  });
});

elements.startButton.addEventListener("click", () => {
  openStep("mode");
});

elements.brand.addEventListener("click", (event) => {
  event.preventDefault();
});

elements.brandMark.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  handleHiddenEntryTap("mark");
});

elements.brandText.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  handleBrandTextLoginTap();
  handleHiddenEntryTap("text");
});

elements.introLetterButton.addEventListener("click", () => {
  dismissNotifications(
    currentUser,
    unreadNotifications().filter((notice) => notificationGroup(notice.type) === "letter").map((notice) => notice.id),
  );
  unlockLetterStep();
});

elements.recentLetterCard.addEventListener("click", () => {
  dismissNotifications(
    currentUser,
    unreadNotifications().filter((notice) => notificationGroup(notice.type) === "letter").map((notice) => notice.id),
  );
  unlockLetterStep();
});

elements.sendReconcileButton.addEventListener("click", sendReconcileRequest);

elements.moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const owner = button.dataset.moodOwner;
    if (!owner) return;
    state.todayMoods = normalizeTodayMoods(state.todayMoods);
    state.todayMoods[owner] = button.dataset.mood || "";
    addNotification({
      type: "mood-updated",
      title: "今日心情更新啦",
      content: `${USER_LABELS[currentUser] || "对方"}今天的心情是：${button.dataset.mood || "悄悄的"}`,
      relatedId: owner,
    });
    saveState();
    renderHomeDashboard();
    showToast("今日心情已同步");
    void saveCloudState({ silent: true });
  });
});

elements.notificationList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-notification]");
  if (deleteButton) {
    dismissNotifications(currentUser, [deleteButton.dataset.deleteNotification]);
    showToast("通知已删除");
    return;
  }
  const item = event.target.closest("[data-notification-id]");
  if (!item) return;
  const row = item.closest(".notification-swipe-row");
  if (row?.dataset.swipedClickGuard) return;
  const notice = state.notifications.find((entry) => entry.id === item.dataset.notificationId);
  if (notice) navigateForNotification(notice);
});

wireSwipeList(elements.notificationList, {
  rowSelector: ".notification-swipe-row",
  surfaceSelector: ".notification-item",
  actionOffset: -92,
  dismissThreshold: 140,
  onDismiss: (row) => {
    const id = row.dataset.notificationSwipeId;
    if (!id) return;
    dismissNotifications(currentUser, [id]);
    showToast("通知已删除");
  },
});

elements.notificationButton?.addEventListener("click", showNotificationModal);
elements.announcementButton?.addEventListener("click", () => {
  void showAnnouncement();
});

elements.clearNotificationsButton?.addEventListener("click", () => {
  const ids = unreadNotifications().map((notice) => notice.id);
  dismissNotifications(currentUser, ids);
  showToast(ids.length ? "通知已清除" : "现在没有新通知");
});

document.querySelectorAll("[data-close-notifications]").forEach((button) => {
  button.addEventListener("click", closeNotificationModal);
});

elements.backToIntroButton.addEventListener("click", () => {
  backToStep("intro");
});

elements.openSpecialStepButton.addEventListener("click", () => {
  specialBoundaryConfirmed = true;
  specialUnlocked = true;
  openStep("special");
});

elements.openPlanButton.addEventListener("click", unlockPlanStep);
elements.openFlightButton.addEventListener("click", () => {
  window.location.href = FLIGHT_REDIRECT_URL;
});
elements.modeLetterButton?.addEventListener("click", () => {
  dismissNotifications(
    currentUser,
    unreadNotifications().filter((notice) => notificationGroup(notice.type) === "letter").map((notice) => notice.id),
  );
  letterReturnStep = "mode";
  openStep("letter");
});
elements.openDiaryButton.addEventListener("click", () => {
  diaryReturnStep = state.currentStep === "diary" ? "special" : state.currentStep;
  openStep("diary");
});

elements.closePlanGateButton.addEventListener("click", closePlanGate);

elements.enterPlanButton.addEventListener("click", unlockPlanStep);

elements.planGateModal.addEventListener("click", (event) => {
  if (event.target === elements.planGateModal) closePlanGate();
});

document.querySelectorAll("[data-close-plan-info]").forEach((button) => {
  button.addEventListener("click", () => closePlanInfoModal());
});

document.querySelectorAll("[data-close-plan-note-edit]").forEach((button) => {
  button.addEventListener("click", () => closePlanNoteEditModal());
});

elements.planNoteEditForm?.addEventListener("submit", savePlanNoteEdit);

elements.planGateButtons.forEach((button) => {
  button.addEventListener("click", () => handlePlanGateClick(button.dataset.planWord, button));
});

elements.backToModeFromSpecialButton.addEventListener("click", () => {
  backToStep("mode");
});

elements.backToModeButton.addEventListener("click", () => {
  backToStep("mode");
});

elements.resultBackModeButton.addEventListener("click", () => {
  backToStep("mode");
});

elements.backFromLetterButton.addEventListener("click", () => {
  backToStep(letterReturnStep);
});

elements.backFromPlanButton.addEventListener("click", () => {
  planEditable = false;
  planRequestMode = false;
  planDocumentOpen = false;
  planRequestsOpen = false;
  renderPlan();
  backToStep(planReturnStep);
});

elements.backFromDiaryButton.addEventListener("click", () => {
  backToStep(diaryReturnStep);
});

elements.letterInput.addEventListener("input", () => {
  elements.letterCount.textContent = `${elements.letterInput.value.length} / 1200`;
});

elements.planInput.addEventListener("input", () => {
  elements.planCount.textContent = `${elements.planInput.value.length} / ${PLAN_BOOK_LIMIT}`;
});

elements.planDocumentEntryButton.addEventListener("click", () => {
  showPlanDocumentModal();
  planEditable = false;
  planRequestMode = false;
  renderPlan();
});

elements.planRequestsEntryButton?.addEventListener("click", () => {
  showPlanRequestsModal();
});

elements.editPlanButton.addEventListener("click", unlockPlanEditing);
elements.savePlanButton.addEventListener("click", savePlan);

elements.planNoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addPlanNote(elements.planNoteInput.value, elements.planNoteQuantityInput?.value || 1);
});

elements.planNotesList.addEventListener("click", (event) => {
  const requestButton = event.target.closest("[data-request-note]");
  if (requestButton) {
    void requestPlanNoteChange(requestButton.dataset.requestNote);
    return;
  }
  const editNoteButton = event.target.closest("[data-edit-note]");
  if (editNoteButton) {
    void editPlanNote(editNoteButton.dataset.editNote);
    return;
  }
  const settleNoteButton = event.target.closest("[data-settle-note]");
  if (settleNoteButton) {
    togglePlanNoteSettled(settleNoteButton.dataset.settleNote);
    return;
  }
  const pinButton = event.target.closest("[data-pin-note]");
  if (!pinButton || !planEditable) return;
  const item = pinButton.closest(".plan-note-item");
  if (!item || item === elements.planNotesList.firstElementChild) return;
  elements.planNotesList.prepend(item);
  showToast("保存后置顶生效");
});

wireSwipeList(elements.planNotesList, {
  rowSelector: ".plan-note-item",
  surfaceSelector: ".plan-note-surface",
  actionOffset: -154,
  dismissThreshold: 9999,
});

elements.planInfoContent?.addEventListener("click", (event) => {
  const responseButton = event.target.closest("[data-plan-request-response]");
  if (!responseButton || currentUser !== "jiaxin") return;
  void respondToPlanRequest(
    responseButton.dataset.planRequestResponse,
    responseButton.dataset.planRequestDecision,
  );
});

elements.siteDialogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  closeSiteDialog({
    confirmed: true,
    value: elements.siteDialogInput.hidden ? "" : elements.siteDialogInput.value,
  });
});

elements.siteDialogCancel.addEventListener("click", () => {
  closeSiteDialog({ confirmed: false, value: "" });
});

elements.siteDialogConfirm.addEventListener("click", () => {
  closeSiteDialog({
    confirmed: true,
    value: elements.siteDialogInput.hidden ? "" : elements.siteDialogInput.value,
  });
});

elements.siteDialog.addEventListener("click", (event) => {
  if (event.target === elements.siteDialog) {
    closeSiteDialog({ confirmed: false, value: "" });
  }
});

elements.toggleLetterVisibilityButton.addEventListener("click", () => {
  letterHidden = !letterHidden;
  renderLetter();
});

elements.saveLetterButton.addEventListener("click", saveLetter);

elements.newDiaryButton.addEventListener("click", () => openDiaryEditor());

elements.diaryFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.diaryFilter === "date") {
      state.diaryFilter = "date";
      renderDiary();
      window.setTimeout(() => elements.diaryDateInput.focus(), 0);
      return;
    }
    state.diaryFilter = button.dataset.diaryFilter;
    state.diaryDate = "";
    saveState();
    renderDiary();
    void saveCloudState({ silent: true });
  });
});

elements.diaryDateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = elements.diaryDateInput.value;
  if (!value) {
    showToast("先选择一个日期");
    return;
  }
  state.diaryFilter = "date";
  state.diaryDate = value;
  saveState();
  renderDiary();
  void saveCloudState({ silent: true });
});

elements.diaryDateClearButton.addEventListener("click", () => {
  state.diaryFilter = "month";
  state.diaryDate = "";
  saveState();
  renderDiary();
  void saveCloudState({ silent: true });
});

elements.diaryList.addEventListener("click", (event) => {
  const item = event.target.closest(".diary-item");
  if (!item) return;
  openDiaryDetail(item.dataset.diaryId);
});

elements.diaryForm.addEventListener("submit", saveDiaryFromForm);
elements.diaryCommentForm?.addEventListener("submit", saveDiaryComment);
elements.diaryMoodInput?.addEventListener("change", updateDiaryMoodCustomVisibility);
elements.diaryAuthorChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    elements.diaryAuthorInput.value = button.dataset.diaryAuthorValue || "me";
    updateDiaryChoiceControls();
  });
});
elements.diaryMoodChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    elements.diaryMoodInput.value = button.dataset.diaryMoodValue || "";
    updateDiaryMoodCustomVisibility();
  });
});
elements.diaryCommentsList?.addEventListener("click", (event) => {
  const button = event.target.closest(".diary-comment-edit-button");
  if (!button) return;
  startEditingDiaryComment(button.dataset.diaryCommentId);
});

document.querySelectorAll("[data-close-diary-editor]").forEach((button) => {
  button.addEventListener("click", closeDiaryEditor);
});

document.querySelectorAll("[data-close-diary-detail]").forEach((button) => {
  button.addEventListener("click", closeDiaryDetail);
});

elements.diaryEditButton.addEventListener("click", editActiveDiary);
elements.diaryFavoriteButton.addEventListener("click", toggleActiveDiaryFavorite);
elements.diaryDeleteButton.addEventListener("click", deleteActiveDiary);

elements.list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-option");
  if (!button || isPicking) return;
  const options = currentOptions();
  const index = options.indexOf(button.dataset.option);
  if (index !== -1) options.splice(index, 1);
  saveState();
  renderOptions();
  void saveCloudState({ silent: true });
});

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPicking) return;
    state.mode = button.dataset.mode;
    state.isDeckOpen = false;
    renderControls();
    resetResult();
    openStep("play");
  });
});

elements.playerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPicking) return;
    state.player = button.dataset.player;
    renderControls();
    resetResult();
  });
});

elements.drawButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPicking) return;
    state.drawType = button.dataset.drawType;
    renderControls();
    resetResult();
  });
});

elements.restoreButton.addEventListener("click", () => {
  restoreDefaultDeck();
});

elements.toggleDeckButton.addEventListener("click", () => {
  state.isDeckOpen = !state.isDeckOpen;
  renderDeckPanel();
});

elements.clearButton.addEventListener("click", async () => {
  const confirmed = await confirmInSiteDialog(
    "这个操作会删除当前题库里的题目。",
    "清空当前题库",
  );
  if (!confirmed) {
    return;
  }
  state.customDecks[state.mode] = [];
  state.usedCardIds = state.usedCardIds.filter((id) => !id.startsWith(`${state.mode}::`));
  saveState();
  renderOptions();
  resetResult();
  void saveCloudState();
});

elements.pickButton.addEventListener("click", pickRandomOption);
elements.skipCardButton.addEventListener("click", skipCurrentCard);
elements.resetRoundButton.addEventListener("click", resetDrawRound);
elements.clearHistoryButton.addEventListener("click", async () => {
  const confirmed = await confirmInSiteDialog("题库不会被删除。", "清除抽卡记录");
  if (!confirmed) {
    return;
  }
  state.history = [];
  saveState();
  renderHistory();
  void saveCloudState();
});

elements.openLetterPromptButton.addEventListener("click", () => {
  unlockLetterStep();
});

window.addEventListener("popstate", (event) => {
  if (suppressNextModalPop) {
    suppressNextModalPop = false;
    return;
  }
  if (closeVisibleModalFromHistory()) return;
  const step = event.state?.wanwanStep;
  if (!step || !stepTargets[step]) return;
  planEditable = false;
  planDocumentOpen = false;
  openStep(step, { pushHistory: false });
});

async function initApp() {
  cleanupLegacyPwa();
  registerPwa();
  const savedUser = rememberedUser();
  if (savedUser) {
    unlockEntrance(savedUser, { silent: true, deferPopups: true });
  }
  const cloudData = await loadCloudState();
  await migrateLocalStorageToCloud(cloudData);
  resetVolatileFlow();
  saveState();
  currentUser = rememberedUser();
  if (currentUser) {
    unlockEntrance(currentUser, { silent: true });
  } else {
    renderFromState();
  }
  browserHistoryReady = true;
  syncBrowserHistory(state.currentStep, { replace: true });
}

void initApp();
