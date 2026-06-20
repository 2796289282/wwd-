const STORAGE_KEY = "wanwan-picker-v6";
const HISTORY_LIMIT = 10;
const PLAN_BOOK_LIMIT = 12000;
const ENTRANCE_PASSWORD = "080831";
const PLAN_EDIT_PASSWORD = "050116";
const PLAN_GATE_SEQUENCE = ["敬", "请", "请", "期", "期", "待", "待"];
const HIDDEN_ENTRY_TIMEOUT = 1800;
const HIDDEN_ENTRY_PATTERN = ["mark", "mark", "mark", "text"];
const CLOUD_LOAD_ENDPOINT = "/api/load-state";
const CLOUD_SAVE_ENDPOINT = "/api/save-state";
const FLIGHT_REDIRECT_URL = "https://flying-chess.orange-trees.com/";
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
    options: [],
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
  planGateModal: document.querySelector("#plan-gate-modal"),
  closePlanGateButton: document.querySelector("#close-plan-gate-button"),
  planGateButtons: [...document.querySelectorAll("[data-plan-word]")],
  planGateUnlocked: document.querySelector("#plan-gate-unlocked"),
  enterPlanButton: document.querySelector("#enter-plan-button"),
  planDocumentEntryButton: document.querySelector("#plan-document-entry-button"),
  planDocumentView: document.querySelector("#plan-document-view"),
  planEditorPanel: document.querySelector("#plan-editor-panel"),
  planInput: document.querySelector("#plan-input"),
  planNoteForm: document.querySelector("#plan-note-form"),
  planNoteInput: document.querySelector("#plan-note-input"),
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
  diaryImageInput: document.querySelector("#diary-image-input"),
  diaryFormError: document.querySelector("#diary-form-error"),
  diaryDetailMeta: document.querySelector("#diary-detail-meta"),
  diaryDetailTitle: document.querySelector("#diary-detail-title"),
  diaryDetailBody: document.querySelector("#diary-detail-body"),
  diaryDetailTags: document.querySelector("#diary-detail-tags"),
  diaryFavoriteButton: document.querySelector("#diary-favorite-button"),
  diaryEditButton: document.querySelector("#diary-edit-button"),
  diaryDeleteButton: document.querySelector("#diary-delete-button"),
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
let isPicking = false;
let toastTimer;
let hiddenTapTimer;
let hiddenTapSequence = [];
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
let planDocumentOpen = false;
let siteDialogResolver = null;
let browserHistoryReady = false;
let editingDiaryId = null;
let activeDiaryId = null;

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
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations?.()
      .then((registrations) => registrations.forEach((registration) => registration.unregister()))
      .catch(() => {});
  }
  if ("caches" in window) {
    caches.keys()
      .then((keys) => keys.filter((key) => key.startsWith("wanwan-picker-")))
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {});
  }
}

function createDefaultState() {
  return {
    mode: "truth",
    player: "婉婉",
    drawType: "all",
    currentStep: "intro",
    isDeckOpen: false,
    secretLetter: DEFAULT_SECRET_LETTER,
    planBook: "",
    planNotes: [],
    diaryFilter: "month",
    diaryDate: "",
    diaryEntries: [],
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
      planBook: typeof stored.planBook === "string" ? stored.planBook : "",
      planNotes: normalizePlanNotes(stored.planNotes),
      diaryFilter: typeof stored.diaryFilter === "string" ? stored.diaryFilter : fallback.diaryFilter,
      diaryDate: typeof stored.diaryDate === "string" ? stored.diaryDate : "",
      diaryEntries: normalizeDiaryEntries(stored.diaryEntries),
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
    planBook: state.planBook,
    planNotes: state.planNotes,
    diaryFilter: state.diaryFilter,
    diaryDate: state.diaryDate,
    diaryEntries: state.diaryEntries,
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
            time: new Date().toISOString(),
          };
        }
        if (!item || typeof item !== "object") return null;
        const text = typeof item.text === "string" ? item.text.trim() : "";
        if (!text) return null;
        return {
          id: typeof item.id === "string" && item.id ? item.id : `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          text,
          time: typeof item.time === "string" ? item.time : new Date().toISOString(),
        };
      })
      .filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [
      {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: value.trim(),
        time: new Date().toISOString(),
      },
    ];
  }
  return [];
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
      return {
        id:
          typeof item.id === "string" && item.id
            ? item.id
            : `diary-${Date.now()}-${Math.random().toString(36).slice(2)}`,
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
      };
    })
    .filter(Boolean);
}

function mergeDiaryEntries(primary = [], secondary = []) {
  const seen = new Set();
  return [...normalizeDiaryEntries(primary), ...normalizeDiaryEntries(secondary)]
    .filter((entry) => {
      if (seen.has(entry.id)) return false;
      seen.add(entry.id);
      return true;
    })
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
    planBook: state.planBook || "",
    planNotes: normalizePlanNotes(state.planNotes),
    diaryFilter: state.diaryFilter || "month",
    diaryDate: state.diaryDate || "",
    diaryEntries: normalizeDiaryEntries(state.diaryEntries),
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

function isCloudStateEmpty(data) {
  if (!data || typeof data !== "object") return true;
  const hasRemainingCards =
    data.remainingCards &&
    Object.values(data.remainingCards).some((items) => Array.isArray(items) && items.length);
  return (
    !hasRemainingCards &&
    !data.letter &&
    !data.planBook &&
    !(Array.isArray(data.planNotes) && data.planNotes.length) &&
    !(Array.isArray(data.diaryEntries) && data.diaryEntries.length) &&
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

  if (!state.planBook && typeof localState.planBook === "string") {
    state.planBook = localState.planBook;
  }
  if (!state.planNotes.length && localState.planNotes) {
    state.planNotes = normalizePlanNotes(localState.planNotes);
  }
  if (!state.diaryEntries.length && localState.diaryEntries) {
    state.diaryEntries = mergeDiaryEntries(state.diaryEntries, localState.diaryEntries);
  }

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
  if (!state.planNotes.length && localState.planNotes) {
    state.planNotes = normalizePlanNotes(localState.planNotes);
    changed = true;
  }
  const mergedDiaryEntries = mergeDiaryEntries(state.diaryEntries, localState.diaryEntries);
  if (mergedDiaryEntries.length !== state.diaryEntries.length) {
    state.diaryEntries = mergedDiaryEntries;
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
    state.diaryEntries.length &&
    (!cloudData || !Array.isArray(cloudData.diaryEntries) || !cloudData.diaryEntries.length)
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
  renderControls();
  renderPlayer();
  renderHistory();
  renderFlow();
  renderDeckPanel();
  renderPlan();
  renderDiary();
}

function renderEntranceGate() {
  elements.entranceGate.hidden = siteUnlocked;
  elements.appContent.hidden = !siteUnlocked;
  if (!siteUnlocked) {
    elements.entranceError.hidden = true;
  }
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
}

function renderPlan() {
  elements.planInput.value = state.planBook || "";
  elements.planCount.textContent = `${elements.planInput.value.length} / ${PLAN_BOOK_LIMIT}`;
  elements.planInput.readOnly = !planEditable;
  elements.planInput.classList.toggle("is-editing", planEditable);
  elements.planEditorPanel.hidden = !planEditable;
  elements.planDocumentView.hidden = !planDocumentOpen || planEditable;
  elements.planDocumentEntryButton.setAttribute("aria-expanded", String(planDocumentOpen));
  elements.planDocumentEntryButton.classList.toggle("is-open", planDocumentOpen);
  if (!elements.planDocumentView.innerHTML && window.PLAN_DOCUMENT_HTML) {
    elements.planDocumentView.innerHTML = window.PLAN_DOCUMENT_HTML;
  }
  elements.editPlanButton.hidden = planEditable;
  elements.savePlanButton.hidden = !planEditable;
  renderPlanNotes();
}

function renderPlanNotes() {
  const notes = normalizePlanNotes(state.planNotes);
  state.planNotes = notes;
  elements.planNotesList.replaceChildren(
    ...notes.map((note) => {
      const item = document.createElement("li");
      item.className = "plan-note-item";
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
        item.append(text, time, pinButton);
      } else {
        item.append(text, time);
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

function openDiaryEditor(entry = null) {
  editingDiaryId = entry?.id || null;
  elements.diaryEditorTitle.textContent = entry ? "编辑这篇小日记" : "写一篇小日记";
  elements.diaryTitleInput.value = entry?.title || "";
  elements.diaryBodyInput.value = entry?.body || "";
  elements.diaryAuthorInput.value = entry?.author || "me";
  elements.diaryMoodInput.value = entry?.mood || "";
  elements.diaryImageInput.value = entry?.image || "";
  elements.diaryFormError.hidden = true;
  elements.diaryEditorModal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => elements.diaryTitleInput.focus(), 80);
}

function closeDiaryEditor() {
  elements.diaryEditorModal.hidden = true;
  editingDiaryId = null;
  document.body.classList.remove("modal-open");
}

function openDiaryDetail(id) {
  const entry = state.diaryEntries.find((item) => item.id === id);
  if (!entry) return;
  activeDiaryId = id;
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
  elements.diaryFavoriteButton.textContent = entry.favorite ? "取消收藏" : "收藏";
  elements.diaryDetailModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeDiaryDetail() {
  elements.diaryDetailModal.hidden = true;
  activeDiaryId = null;
  document.body.classList.remove("modal-open");
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
  const payload = {
    title,
    body,
    author: elements.diaryAuthorInput.value,
    mood: elements.diaryMoodInput.value,
    image: elements.diaryImageInput.value.trim(),
    updatedAt: now,
  };

  if (editingDiaryId) {
    const index = state.diaryEntries.findIndex((entry) => entry.id === editingDiaryId);
    if (index !== -1) {
      state.diaryEntries[index] = { ...state.diaryEntries[index], ...payload };
    }
  } else {
    state.diaryEntries.unshift({
      id: `diary-${Date.now()}-${secureRandomIndex(100000)}`,
      createdAt: now,
      favorite: false,
      ...payload,
    });
  }

  saveState();
  renderDiary();
  closeDiaryEditor();
  showToast("日记已保存");
  void saveCloudState();
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

function closeSiteDialog(result) {
  if (!siteDialogResolver) return;
  const resolver = siteDialogResolver;
  siteDialogResolver = null;
  elements.siteDialog.hidden = true;
  elements.siteDialogInput.value = "";
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
  state.secretLetter = elements.letterInput.value.trim() || DEFAULT_SECRET_LETTER;
  saveState();
  renderLetter();
  showToast("已收好。下次打开还在这里。");
  void saveCloudState();
}

function openPlanGate() {
  planGateIndex = 0;
  elements.planGateModal.hidden = false;
  elements.planGateUnlocked.hidden = true;
}

function closePlanGate() {
  planGateIndex = 0;
  elements.planGateModal.hidden = true;
  elements.planGateUnlocked.hidden = true;
}

function unlockPlanStep() {
  planReturnStep = state.currentStep === "plan" ? "special" : state.currentStep;
  closePlanGate();
  planEditable = false;
  planDocumentOpen = false;
  openStep("plan");
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
  const password = await requestPasswordInSiteDialog("修改计划书");
  if (password !== PLAN_EDIT_PASSWORD) {
    if (password !== null) showToast("密码不对");
    return;
  }
  planEditable = true;
  planDocumentOpen = false;
  renderPlan();
  elements.planInput.focus();
}

function addPlanNote(text) {
  const value = text.trim();
  if (!value) {
    showToast("先写一条记录吧");
    return;
  }
  state.planNotes.unshift({
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: value,
    time: new Date().toISOString(),
  });
  elements.planNoteInput.value = "";
  saveState();
  renderPlan();
  showToast("已添加");
  void saveCloudState();
}

function savePlan() {
  state.planBook = elements.planInput.value.trim();
  if (planEditable) {
    state.planNotes = [...elements.planNotesList.querySelectorAll("[data-note-edit-input]")]
      .map((input) => {
        const note = state.planNotes.find((item) => item.id === input.dataset.noteEditInput);
        const nextText = input.value.trim();
        if (!note || !nextText) return null;
        return {
          ...note,
          text: nextText,
          time: nextText === note.text ? note.time : new Date().toISOString(),
        };
      })
      .filter(Boolean);
  }
  planEditable = false;
  planDocumentOpen = true;
  saveState();
  renderPlan();
  showToast("已保存");
  void saveCloudState();
}

function unlockEntrance() {
  siteUnlocked = true;
  resetVolatileFlow();
  renderFromState();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.entranceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (elements.entrancePassword.value.trim() !== ENTRANCE_PASSWORD) {
    elements.entranceError.hidden = false;
    elements.entrancePassword.focus();
    elements.entrancePassword.select();
    return;
  }
  elements.entrancePassword.value = "";
  unlockEntrance();
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
  handleHiddenEntryTap("text");
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
elements.openDiaryButton.addEventListener("click", () => {
  diaryReturnStep = state.currentStep === "diary" ? "special" : state.currentStep;
  openStep("diary");
});

elements.closePlanGateButton.addEventListener("click", closePlanGate);

elements.enterPlanButton.addEventListener("click", unlockPlanStep);

elements.planGateModal.addEventListener("click", (event) => {
  if (event.target === elements.planGateModal) closePlanGate();
});

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
  planDocumentOpen = false;
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
  planDocumentOpen = !planDocumentOpen;
  planEditable = false;
  renderPlan();
  if (planDocumentOpen) {
    elements.planDocumentView.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

elements.editPlanButton.addEventListener("click", unlockPlanEditing);
elements.savePlanButton.addEventListener("click", savePlan);

elements.planNoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addPlanNote(elements.planNoteInput.value);
});

elements.planNotesList.addEventListener("click", (event) => {
  const pinButton = event.target.closest("[data-pin-note]");
  if (!pinButton || !planEditable) return;
  const item = pinButton.closest(".plan-note-item");
  if (!item || item === elements.planNotesList.firstElementChild) return;
  elements.planNotesList.prepend(item);
  showToast("保存后置顶生效");
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
  const step = event.state?.wanwanStep;
  if (!step || !stepTargets[step]) return;
  planEditable = false;
  planDocumentOpen = false;
  openStep(step, { pushHistory: false });
});

async function initApp() {
  cleanupLegacyPwa();
  const cloudData = await loadCloudState();
  await migrateLocalStorageToCloud(cloudData);
  resetVolatileFlow();
  saveState();
  renderFromState();
  browserHistoryReady = true;
  syncBrowserHistory(state.currentStep, { replace: true });
}

void initApp();
