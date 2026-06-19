const STORAGE_KEY = "wanwan-picker-v6";
const HISTORY_LIMIT = 10;
const ENTRANCE_PASSWORD = "080831";
const PLAN_EDIT_PASSWORD = "050116";
const PLAN_GATE_SEQUENCE = ["敬", "请", "请", "期", "期", "待", "待"];
const HIDDEN_ENTRY_TIMEOUT = 1800;
const HIDDEN_ENTRY_PATTERN = ["mark", "mark", "mark", "text"];
const CLOUD_LOAD_ENDPOINT = "/api/load-state";
const CLOUD_SAVE_ENDPOINT = "/api/save-state";
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

const FLIGHT_BOARD_SIZE = 40;
const FLIGHT_LAST_CELL = FLIGHT_BOARD_SIZE;
const FLIGHT_MAX_TAKEOFF_FAILURES = 5;

const flightCellCopy = {
  start: { short: "起", label: "起点" },
  finish: { short: "终", label: "终点" },
  punishment: { short: "罚", label: "惩罚格" },
  truth: { short: "真", label: "真心话" },
  dare: { short: "冒", label: "大冒险" },
  bonus: { short: "+", label: "前进格" },
  reverse: { short: "-", label: "后退格" },
  rest: { short: "歇", label: "休息格" },
  restart: { short: "回", label: "回起点" },
  trap: { short: "机", label: "机关格" },
  safe: { short: "安", label: "普通格" },
};

const flightPunishmentTools = [
  { name: "手掌", intensity: 2, ratio: 8 },
  { name: "尺子", intensity: 3, ratio: 8 },
  { name: "木板", intensity: 5, ratio: 8 },
  { name: "藤条", intensity: 7, ratio: 6 },
  { name: "戒尺", intensity: 5, ratio: 8 },
  { name: "皮拍", intensity: 6, ratio: 6 },
  { name: "发刷", intensity: 5, ratio: 5 },
  { name: "数据线", intensity: 8, ratio: 3 },
];

const flightBodyParts = [
  { name: "屁股", sensitivity: 10, ratio: 80 },
  { name: "大腿", sensitivity: 6, ratio: 8 },
  { name: "手心", sensitivity: 3, ratio: 6 },
  { name: "后背", sensitivity: 7, ratio: 4 },
  { name: "敏感处", sensitivity: 2, ratio: 2 },
];

const flightPunishmentPositions = [
  { name: "站立", ratio: 20, compatibleBodyParts: ["屁股", "大腿", "手心", "后背", "敏感处"] },
  { name: "手扶墙", ratio: 20, compatibleBodyParts: ["屁股", "大腿", "后背", "敏感处"] },
  { name: "趴在桌子上", ratio: 20, compatibleBodyParts: ["屁股", "大腿", "后背", "敏感处"] },
  { name: "手抓膝盖", ratio: 20, compatibleBodyParts: ["屁股", "大腿", "敏感处"] },
  { name: "跪趴", ratio: 20, compatibleBodyParts: ["屁股", "大腿", "后背", "敏感处"] },
];

const flightTrapActions = [
  { name: "晾一会儿机关", description: "保持约定姿势 5 分钟，安全词永远可以立刻停止。" },
  { name: "随机惩罚机关", description: "由对方在双方同意范围内选择工具、部位和姿势。" },
  { name: "状态确认机关", description: "暂停一回合，确认边界、情绪和是否继续。" },
];

const flightBoardConfig = {
  punishmentCells: 24,
  bonusCells: 3,
  reverseCells: 3,
  restCells: 2,
  restartCells: 3,
  trapCells: 3,
  totalCells: FLIGHT_BOARD_SIZE,
};

const flightModeConfigs = {
  dare: {
    title: "大冒险飞行棋",
    description: "行动任务为主。掷到 6 才能起飞，先到终点的人赢。",
    taskKind: "dare",
    punishmentStyle: "task",
    taskPools: {
      dare: mergedDareQuestions,
      default: mergedDareQuestions,
    },
  },
  truth: {
    title: "真心话飞行棋",
    description: "回答问题为主。答案可以短，但不许糊弄过去。",
    taskKind: "truth",
    punishmentStyle: "task",
    taskPools: {
      truth: mergedTruthQuestions,
      default: mergedTruthQuestions,
    },
  },
  mixed: {
    title: "真心话 & 大冒险混合版",
    description: "推荐默认模式。真心话和大冒险会出现在同一张棋盘上。",
    taskKind: "mixed",
    punishmentStyle: "task",
    taskPools: {
      truth: mergedTruthQuestions,
      dare: mergedDareQuestions,
      default: [...mergedTruthQuestions, ...mergedDareQuestions],
    },
  },
  circle: {
    title: "小圈专属飞行棋",
    description: "导入惩罚飞行棋玩法：起飞、反弹、机关、回起点和惩罚格都会出现。安全词永远最大。",
    taskKind: "circle",
    punishmentStyle: "punishment",
    taskPools: {
      truth: circleTruthQuestions,
      dare: circleDareQuestions,
      default: [...circleTruthQuestions, ...circleDareQuestions],
    },
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
  installAppButton: document.querySelector("#install-app-button"),
  brand: document.querySelector(".brand"),
  brandMark: document.querySelector("#brand-mark"),
  brandText: document.querySelector("#brand-text"),
  introSection: document.querySelector(".intro"),
  startButton: document.querySelector("#start-game-button"),
  gameFlow: document.querySelector("#game-flow"),
  modeStep: document.querySelector("#mode-step"),
  specialStep: document.querySelector("#special-step"),
  flightModeStep: document.querySelector("#flight-mode-step"),
  flightGameStep: document.querySelector("#flight-game-step"),
  playStep: document.querySelector("#play-step"),
  letterStep: document.querySelector("#letter-step"),
  planStep: document.querySelector("#plan-step"),
  openSpecialStepButton: document.querySelector("#open-special-step-button"),
  openPlanButton: document.querySelector("#open-plan-button"),
  openFlightButton: document.querySelector("#open-flight-button"),
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
  backFromFlightModeButton: document.querySelector("#back-from-flight-mode-button"),
  backFromFlightGameButton: document.querySelector("#back-from-flight-game-button"),
  flightModeButtons: [...document.querySelectorAll("[data-flight-mode]")],
  flightRoomBadge: document.querySelector("#flight-room-badge"),
  flightGameTitle: document.querySelector("#flight-game-title"),
  flightGameDescription: document.querySelector("#flight-game-description"),
  flightPlayerStatus: document.querySelector("#flight-player-status"),
  flightBoard: document.querySelector("#flight-board"),
  flightTurnLabel: document.querySelector("#flight-turn-label"),
  flightDiceValue: document.querySelector("#flight-dice-value"),
  flightRollButton: document.querySelector("#flight-roll-button"),
  flightTaskType: document.querySelector("#flight-task-type"),
  flightTaskTitle: document.querySelector("#flight-task-title"),
  flightTaskText: document.querySelector("#flight-task-text"),
  flightCompleteButton: document.querySelector("#flight-complete-button"),
  flightSkipButton: document.querySelector("#flight-skip-button"),
  flightResetButton: document.querySelector("#flight-reset-button"),
  backToModeButton: document.querySelector("#back-to-mode-button"),
  backFromLetterButton: document.querySelector("#back-from-letter-button"),
  backFromPlanButton: document.querySelector("#back-from-plan-button"),
  letterInput: document.querySelector("#letter-input"),
  letterCount: document.querySelector("#letter-count"),
  saveLetterButton: document.querySelector("#save-letter-button"),
  toggleLetterVisibilityButton: document.querySelector("#toggle-letter-visibility-button"),
  planGateModal: document.querySelector("#plan-gate-modal"),
  closePlanGateButton: document.querySelector("#close-plan-gate-button"),
  planGateButtons: [...document.querySelectorAll("[data-plan-word]")],
  planGateUnlocked: document.querySelector("#plan-gate-unlocked"),
  enterPlanButton: document.querySelector("#enter-plan-button"),
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
let planGateIndex = 0;
let planEditable = false;
let siteDialogResolver = null;
let deferredInstallPrompt = null;

function createDefaultFlightState(mode = "mixed") {
  const safeMode = flightModeConfigs[mode] ? mode : "mixed";
  return {
    mode: safeMode,
    players: [
      { id: "ljx", name: "李家鑫", marker: "鑫", position: 0, hasTakenOff: false, failedTakeoffAttempts: 0, restTurns: 0, isWinner: false },
      { id: "ww", name: "婉婉", marker: "婉", position: 0, hasTakenOff: false, failedTakeoffAttempts: 0, restTurns: 0, isWinner: false },
    ],
    currentTurn: 1,
    positions: [0, 0],
    roomId: "local-" + Date.now().toString(36),
    onlineMode: false,
    dice: null,
    board: createFlightBoard(safeMode),
    currentTask: null,
    awaitingTask: false,
    winner: null,
    turnCount: 0,
    lastEffect: null,
  };
}

function normalizeFlightPlayer(player, fallback, index) {
  const rawPosition = Number(player?.position ?? player?.cell ?? fallback.position ?? 0);
  const normalizedPosition = Number.isFinite(rawPosition)
    ? Math.max(0, Math.min(FLIGHT_LAST_CELL, Math.round(rawPosition)))
    : fallback.position;
  return {
    id: typeof player?.id === "string" ? player.id : fallback.id,
    name: typeof player?.name === "string" && player.name ? player.name : fallback.name,
    marker: typeof player?.marker === "string" && player.marker ? player.marker : fallback.marker,
    position: normalizedPosition,
    hasTakenOff: Boolean(player?.hasTakenOff || normalizedPosition > 0),
    failedTakeoffAttempts: Number.isInteger(player?.failedTakeoffAttempts) ? Math.max(0, player.failedTakeoffAttempts) : 0,
    restTurns: Number.isInteger(player?.restTurns) ? Math.max(0, player.restTurns) : 0,
    isWinner: Boolean(player?.isWinner),
    color: typeof player?.color === "string" ? player.color : index === 0 ? "#7dd3fc" : "#ff8fc7",
  };
}

function normalizeFlightBoard(value, mode = "mixed") {
  if (!Array.isArray(value) || value.length !== FLIGHT_BOARD_SIZE) {
    return createFlightBoard(mode);
  }
  const fallback = createFlightBoard(mode);
  return fallback.map((fallbackCell, index) => {
    const incoming = value[index];
    if (!incoming || typeof incoming !== "object") return fallbackCell;
    const effect = incoming.effect && typeof incoming.effect === "object" ? incoming.effect : fallbackCell.effect;
    return {
      ...fallbackCell,
      ...incoming,
      id: index + 1,
      position: index + 1,
      type: incoming.type || fallbackCell.type,
      effect,
    };
  });
}

function normalizeFlightState(value) {
  const fallback = createDefaultFlightState(value?.mode || "mixed");
  if (!value || typeof value !== "object") return fallback;
  const players = Array.isArray(value.players) && value.players.length >= 2
    ? value.players.slice(0, 2).map((player, index) => normalizeFlightPlayer(player, fallback.players[index], index))
    : fallback.players;
  const legacyPositions = Array.isArray(value.positions) ? value.positions : [];
  legacyPositions.forEach((position, index) => {
    if (!players[index]) return;
    const numeric = Number(position);
    if (Number.isFinite(numeric)) {
      players[index].position = Math.max(0, Math.min(FLIGHT_LAST_CELL, Math.round(numeric)));
      players[index].hasTakenOff = players[index].hasTakenOff || players[index].position > 0;
    }
  });
  const positions = players.map((player) => player.position);
  const winner = Number.isInteger(value.winner) && value.winner >= 0 && value.winner < players.length
    ? value.winner
    : null;
  players.forEach((player, index) => {
    player.isWinner = index === winner;
  });
  const mode = flightModeConfigs[value.mode] ? value.mode : fallback.mode;
  return {
    ...fallback,
    ...value,
    mode,
    players,
    positions,
    board: normalizeFlightBoard(value.board, mode),
    currentTurn: Number.isInteger(value.currentTurn) && value.currentTurn >= 0
      ? value.currentTurn % players.length
      : fallback.currentTurn,
    roomId: typeof value.roomId === "string" && value.roomId ? value.roomId : fallback.roomId,
    onlineMode: Boolean(value.onlineMode),
    dice: Number.isInteger(value.dice) ? value.dice : null,
    currentTask: value.currentTask && typeof value.currentTask === "object" ? value.currentTask : null,
    awaitingTask: Boolean(value.awaitingTask),
    winner,
    turnCount: Number.isInteger(value.turnCount) ? value.turnCount : 0,
    lastEffect: value.lastEffect && typeof value.lastEffect === "object" ? value.lastEffect : null,
  };
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
    customDecks: {
      truth: [...decks.truth.options],
      dare: [...decks.dare.options],
      custom: [],
    },
    history: [],
    usedCardIds: [],
    currentCard: null,
    flight: createDefaultFlightState(),
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
      flight: normalizeFlightState(stored.flight),
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
    flight: state.flight,
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
    history: state.history,
    updatedAt: now,
    app: {
      flight: normalizeFlightState(state.flight),
    },
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
    customDecks: normalizeDeckMap(data.remainingCards || data.customDecks),
    history: Array.isArray(data.history) ? data.history : state.history,
    flight: normalizeFlightState(data.app?.flight || state.flight),
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
  const canEnterSpecial = specialBoundaryConfirmed || specialUnlocked;
  elements.specialBoundaryPanel.hidden = canEnterSpecial;
  elements.specialLockPanel.hidden = true;
  elements.specialContent.hidden = !canEnterSpecial;
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
  elements.planCount.textContent = `${elements.planInput.value.length} / 3000`;
  elements.planInput.readOnly = !planEditable;
  elements.planInput.classList.toggle("is-editing", planEditable);
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

function flightConfig() {
  return flightModeConfigs[state.flight?.mode] || flightModeConfigs.mixed;
}

function weightedFlightChoice(items, weightKey = "ratio") {
  const available = items.filter((item) => Number(item?.[weightKey]) > 0);
  const pool = available.length ? available : items;
  const total = pool.reduce((sum, item) => sum + Math.max(0, Number(item[weightKey]) || 0), 0);
  if (!pool.length) return null;
  if (total <= 0) return pool[secureRandomIndex(pool.length)];
  let cursor = secureRandomIndex(total) + 1;
  for (const item of pool) {
    cursor -= Math.max(0, Number(item[weightKey]) || 0);
    if (cursor <= 0) return item;
  }
  return pool[pool.length - 1];
}

function shuffleFlightItems(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = secureRandomIndex(index + 1);
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function createFlightPunishmentAction(prefix = "Punishment") {
  let bodyPart = weightedFlightChoice(flightBodyParts);
  const toolCandidates = flightPunishmentTools.filter((tool) => tool.intensity <= bodyPart.sensitivity);
  const tool = weightedFlightChoice(toolCandidates.length ? toolCandidates : flightPunishmentTools);
  const compatiblePositions = flightPunishmentPositions.filter((position) => {
    return !position.compatibleBodyParts?.length || position.compatibleBodyParts.includes(bodyPart.name);
  });
  const position = weightedFlightChoice(compatiblePositions.length ? compatiblePositions : flightPunishmentPositions);
  if (tool.intensity > bodyPart.sensitivity) {
    bodyPart = flightBodyParts[0];
  }
  const strikeSteps = [10, 15, 20, 25, 30];
  const strikes = strikeSteps[secureRandomIndex(strikeSteps.length)];
  return {
    tool,
    bodyPart,
    position,
    strikes,
    description: prefix + "：" + tool.name + " / " + bodyPart.name + " / " + strikes + " 下，姿势：" + position.name + "。安全词永远最大。",
  };
}

function flightConfigForMode(mode) {
  return flightModeConfigs[mode] || flightModeConfigs.mixed;
}

function createFlightBoard(mode = "mixed") {
  const config = flightConfigForMode(mode);
  const totalCells = FLIGHT_BOARD_SIZE;
  const board = Array.from({ length: totalCells }, (_, index) => ({
    id: index + 1,
    position: index + 1,
    type: "safe",
    effect: { type: "move", value: 0, description: "普通格" },
  }));
  board[0] = { id: 1, position: 1, type: "start", effect: { type: "move", value: 0, description: "起点" } };
  board[totalCells - 1] = { id: totalCells, position: totalCells, type: "finish", effect: { type: "move", value: 0, description: "终点" } };

  const availablePositions = shuffleFlightItems(Array.from({ length: totalCells - 2 }, (_, index) => index + 2));
  let cursor = 0;
  const takePositions = (count) => availablePositions.slice(cursor, cursor += count);
  const punishmentCount = config.punishmentStyle === "punishment" ? flightBoardConfig.punishmentCells : 20;

  takePositions(punishmentCount).forEach((position) => {
    const taskType = config.taskKind === "truth" ? "truth" : config.taskKind === "dare" ? "dare" : "punishment";
    board[position - 1] = {
      id: position,
      position,
      type: taskType === "truth" ? "truth" : taskType === "dare" ? "dare" : "punishment",
      effect: {
        type: "punishment",
        value: 0,
        description: taskType === "truth" ? "真心话任务" : taskType === "dare" ? "大冒险任务" : createFlightPunishmentAction().description,
      },
    };
  });

  takePositions(flightBoardConfig.bonusCells).forEach((position) => {
    const value = secureRandomIndex(2) === 0 ? 2 : 3;
    board[position - 1] = { id: position, position, type: "bonus", effect: { type: "move", value, description: "前进 " + value + " 步" } };
  });

  takePositions(flightBoardConfig.reverseCells).forEach((position) => {
    const value = secureRandomIndex(2) === 0 ? 2 : 3;
    board[position - 1] = { id: position, position, type: "reverse", effect: { type: "reverse", value, description: "后退 " + value + " 步" } };
  });

  takePositions(flightBoardConfig.restCells).forEach((position) => {
    board[position - 1] = { id: position, position, type: "rest", effect: { type: "rest", value: 1, description: "休息一回合" } };
  });

  takePositions(flightBoardConfig.restartCells).forEach((position) => {
    board[position - 1] = { id: position, position, type: "restart", effect: { type: "restart", value: 0, description: "回到起点" } };
  });

  takePositions(flightBoardConfig.trapCells).forEach((position) => {
    const trap = flightTrapActions[secureRandomIndex(flightTrapActions.length)];
    board[position - 1] = { id: position, position, type: "trap", effect: { type: "trap", value: 0, description: trap.name + ": " + trap.description } };
  });

  if (config.taskKind === "mixed") {
    board.forEach((cell) => {
      if (cell.type !== "punishment") return;
      const taskType = secureRandomIndex(2) === 0 ? "truth" : "dare";
      cell.type = taskType;
      cell.effect.description = taskType === "truth" ? "真心话任务" : "大冒险任务";
    });
  }
  return board;
}

function flightTaskPool(type) {
  const config = flightConfig();
  return config.taskPools[type] || config.taskPools.default || [];
}

function randomFlightTask(type) {
  const pool = flightTaskPool(type);
  if (!pool.length) return "这一格先放过你们，认真看对方三秒就算过。";
  return pool[secureRandomIndex(pool.length)];
}

function flightCellAt(position) {
  return state.flight.board.find((cell) => cell.position === position) || null;
}

function bounceFlightPosition(position) {
  if (position <= FLIGHT_LAST_CELL) return { position, overflow: 0 };
  const overflow = position - FLIGHT_LAST_CELL;
  return { position: Math.max(1, FLIGHT_LAST_CELL - overflow), overflow };
}

function taskTypeForCell(cell) {
  const config = flightConfig();
  if (cell?.type === "truth") return "truth";
  if (cell?.type === "dare") return "dare";
  if (config.taskKind === "truth") return "truth";
  if (config.taskKind === "dare") return "dare";
  if (config.taskKind === "circle") return "punishment";
  return secureRandomIndex(2) === 0 ? "truth" : "dare";
}

function createFlightTaskFromCell(player, dice, startPosition, cell, effectText = "") {
  const config = flightConfig();
  const taskType = taskTypeForCell(cell);
  const copy = flightCellCopy[cell?.type] || flightCellCopy.safe;
  let text = effectText ? effectText + "\n" : "";
  if (taskType === "punishment") {
    const punishment = cell?.effect?.punishment || createFlightPunishmentAction(copy.label);
    text += cell?.effect?.description && cell.effect.description.includes(":") ? cell.effect.description : punishment.description;
    return { type: copy.label, title: player.name + " 落在" + copy.label, text, cell: cell?.position || startPosition, dice, effect: effectText, finished: false, punishment };
  }
  const typeCopy = flightCellCopy[taskType] || copy;
  text += randomFlightTask(taskType);
  if (config.punishmentStyle === "punishment" && cell?.type === "trap") {
    text = (effectText ? effectText + "\n" : "") + cell.effect.description;
  }
  return { type: typeCopy.label, title: player.name + " 落在" + typeCopy.label, text, cell: cell?.position || startPosition, dice, effect: effectText, finished: false };
}

function applyFlightCellEffect(player, dice, cell) {
  if (!cell?.effect) return { position: player.position, text: "" };
  const effect = cell.effect;
  let text = effect.description || "";
  let nextPosition = player.position;
  if (effect.type === "move" && effect.value > 0) {
    const bounced = bounceFlightPosition(player.position + effect.value);
    nextPosition = bounced.position;
    text = "前进 " + effect.value + " 步，到第 " + nextPosition + " 格。";
    if (bounced.overflow) text += " 超过终点后反弹 " + bounced.overflow + " 格。";
  }
  if (effect.type === "reverse") {
    nextPosition = Math.max(1, player.position - Math.max(1, effect.value || 1));
    text = "后退 " + Math.max(1, effect.value || 1) + " 步，到第 " + nextPosition + " 格。";
  }
  if (effect.type === "rest") {
    player.restTurns = Math.max(player.restTurns || 0, effect.value || 1);
    text = "休息一回合。下次轮到你会自动跳过。";
  }
  if (effect.type === "restart") {
    nextPosition = 1;
    text = "触发回起点，回到第 1 格。";
  }
  if (effect.type === "trap") text = effect.description;
  player.position = nextPosition;
  return { position: nextPosition, text };
}

function renderFlightModeSelection() {
  elements.flightModeButtons.forEach((button) => button.classList.toggle("active", button.dataset.flightMode === state.flight.mode));
}

function renderFlightPlayerStatus() {
  const { players, currentTurn, winner } = state.flight;
  elements.flightPlayerStatus.replaceChildren(...players.map((player, index) => {
    const card = document.createElement("article");
    card.className = "flight-player-card";
    card.classList.toggle("active", index === currentTurn && winner === null);
    card.classList.toggle("winner", index === winner);
    const marker = document.createElement("span");
    marker.className = "flight-player-marker";
    marker.textContent = player.marker;
    const name = document.createElement("strong");
    name.textContent = player.name;
    const position = document.createElement("small");
    if (index === winner) position.textContent = "已到终点";
    else if (!player.hasTakenOff && player.position === 0) position.textContent = "待起飞 " + (player.failedTakeoffAttempts || 0) + "/" + FLIGHT_MAX_TAKEOFF_FAILURES;
    else if (player.restTurns > 0) position.textContent = "第 " + player.position + " 格 · 休息中";
    else position.textContent = "第 " + player.position + " 格";
    card.append(marker, name, position);
    return card;
  }));
}

function renderFlightBoard() {
  const { players } = state.flight;
  const cells = state.flight.board.map((cell) => {
    const copy = flightCellCopy[cell.type] || flightCellCopy.safe;
    const item = document.createElement("li");
    item.className = "flight-cell flight-cell-" + cell.type;
    item.dataset.cellType = cell.type;
    const number = document.createElement("span");
    number.className = "flight-cell-number";
    number.textContent = cell.position === 1 ? "START" : cell.position === FLIGHT_LAST_CELL ? "FINISH" : String(cell.position);
    const label = document.createElement("strong");
    label.textContent = copy.short;
    const desc = document.createElement("small");
    desc.className = "flight-cell-desc";
    desc.textContent = copy.label;
    const markers = document.createElement("div");
    markers.className = "flight-cell-markers";
    players.forEach((player, playerIndex) => {
      const markerPosition = player.position === 0 ? 1 : player.position;
      if (markerPosition !== cell.position) return;
      const marker = document.createElement("span");
      marker.className = "flight-piece flight-piece-" + playerIndex;
      marker.textContent = player.marker;
      markers.append(marker);
    });
    item.append(number, label, desc, markers);
    return item;
  });
  elements.flightBoard.replaceChildren(...cells);
}

function renderFlightTask() {
  const { currentTask, currentTurn, players, dice, awaitingTask, winner } = state.flight;
  const currentPlayer = players[currentTurn];
  elements.flightTurnLabel.textContent = winner === null ? "轮到 " + currentPlayer.name : players[winner].name + " 赢啦";
  elements.flightDiceValue.textContent = dice || "?";
  elements.flightRollButton.disabled = awaitingTask || winner !== null;
  elements.flightCompleteButton.disabled = !awaitingTask || winner !== null;
  elements.flightSkipButton.disabled = !awaitingTask || winner !== null;
  if (!currentTask) {
    elements.flightTaskType.textContent = "等待起飞";
    elements.flightTaskTitle.textContent = "掷到 6 才能起飞";
    elements.flightTaskText.textContent = "两个人同屏轮流玩。连续 " + FLIGHT_MAX_TAKEOFF_FAILURES + " 次没起飞，会自动起飞。";
    return;
  }
  elements.flightTaskType.textContent = currentTask.type;
  elements.flightTaskTitle.textContent = currentTask.title;
  elements.flightTaskText.textContent = currentTask.text;
}

function renderFlightGame() {
  state.flight = normalizeFlightState(state.flight);
  const config = flightConfig();
  elements.flightGameTitle.textContent = config.title;
  elements.flightGameDescription.textContent = config.description;
  elements.flightRoomBadge.textContent = state.flight.onlineMode ? "ROOM " + state.flight.roomId : "LOCAL";
  renderFlightModeSelection();
  renderFlightPlayerStatus();
  renderFlightBoard();
  renderFlightTask();
}

function resetFlightGame(mode = state.flight.mode) {
  state.flight = createDefaultFlightState(mode);
  saveState();
  renderFlightGame();
}

function openFlightModeStep() {
  renderFlightModeSelection();
  openStep("flight-mode");
}

function startFlightGame(mode) {
  resetFlightGame(mode);
  openStep("flight-game");
}

function advanceFlightTurn() {
  const players = state.flight.players;
  state.flight.positions = players.map((player) => player.position);
  state.flight.currentTurn = (state.flight.currentTurn + 1) % players.length;
}

function rollFlightDice() {
  state.flight = normalizeFlightState(state.flight);
  if (state.flight.awaitingTask) {
    showToast("先完成当前任务，再交给下一位");
    return;
  }
  if (state.flight.winner !== null) {
    showToast("这一局已经到终点啦，可以重开一局");
    return;
  }
  const player = state.flight.players[state.flight.currentTurn];
  if (player.restTurns > 0) {
    player.restTurns -= 1;
    state.flight.currentTask = { type: "休息回合", title: player.name + "休息一回合", text: "这一回合自动跳过。", cell: player.position, dice: null, finished: true };
    advanceFlightTurn();
    saveState();
    renderFlightGame();
    return;
  }
  const dice = secureRandomIndex(6) + 1;
  const startPosition = player.position;
  state.flight.dice = dice;
  state.flight.turnCount += 1;
  if (!player.hasTakenOff && player.position === 0) {
    if (dice === 6 || player.failedTakeoffAttempts + 1 >= FLIGHT_MAX_TAKEOFF_FAILURES) {
      const forced = dice !== 6;
      player.hasTakenOff = true;
      player.failedTakeoffAttempts = 0;
      player.position = 1;
      state.flight.currentTask = { type: forced ? "自动起飞" : "起飞成功", title: player.name + (forced ? "被推上跑道" : "起飞成功"), text: forced ? "连续失败次数已满，自动起飞到第 1 格。" : "掷到 6，起飞到第 1 格。", cell: 1, dice, finished: false };
    } else {
      player.failedTakeoffAttempts = (player.failedTakeoffAttempts || 0) + 1;
      const punishment = createFlightPunishmentAction("未起飞惩罚");
      state.flight.currentTask = { type: "未起飞", title: player.name + "还没起飞", text: "掷出 " + dice + " 点，没到 6。\n" + punishment.description, cell: 0, dice, punishment, finished: false };
    }
    state.flight.awaitingTask = true;
    state.flight.positions = state.flight.players.map((item) => item.position);
    saveState();
    renderFlightGame();
    return;
  }
  const bounced = bounceFlightPosition(player.position + dice);
  player.position = bounced.position;
  let effectText = bounced.overflow ? "超过终点后反弹到第 " + bounced.position + " 格。" : "";
  if (player.position >= FLIGHT_LAST_CELL) {
    player.position = FLIGHT_LAST_CELL;
    player.isWinner = true;
    state.flight.winner = state.flight.currentTurn;
    state.flight.currentTask = { type: "抵达终点", title: player.name + "到终点啦", text: player.name + "赢下这一局。", cell: FLIGHT_LAST_CELL, dice, finished: true };
    state.flight.awaitingTask = false;
    state.flight.positions = state.flight.players.map((item) => item.position);
    saveState();
    renderFlightGame();
    return;
  }
  let landedCell = flightCellAt(player.position);
  const effectResult = applyFlightCellEffect(player, dice, landedCell);
  if (effectResult.text) effectText = effectText ? effectText + "\n" + effectResult.text : effectResult.text;
  landedCell = flightCellAt(player.position) || landedCell;
  if (player.position >= FLIGHT_LAST_CELL) {
    player.position = FLIGHT_LAST_CELL;
    player.isWinner = true;
    state.flight.winner = state.flight.currentTurn;
    state.flight.currentTask = { type: "抵达终点", title: player.name + "到终点啦", text: (effectText ? effectText + "\n" : "") + "游戏结束。", cell: FLIGHT_LAST_CELL, dice, finished: true };
    state.flight.awaitingTask = false;
  } else {
    state.flight.currentTask = createFlightTaskFromCell(player, dice, startPosition, landedCell, effectText);
    state.flight.awaitingTask = true;
  }
  state.flight.positions = state.flight.players.map((item) => item.position);
  saveState();
  renderFlightGame();
}

function finishFlightTurn(skipped = false) {
  if (!state.flight.awaitingTask) return;
  state.flight.awaitingTask = false;
  const currentPlayer = state.flight.players[state.flight.currentTurn];
  state.flight.currentTask = { type: skipped ? "已跳过" : "已完成", title: skipped ? "这一格先跳过" : "任务完成", text: skipped ? "轮到下一位继续。" : "很好，下一位继续。", cell: currentPlayer.position, dice: state.flight.dice, skipped };
  if (state.flight.winner === null) advanceFlightTurn();
  saveState();
  renderFlightGame();
}

function renderFlow() {
  const inIntro = state.currentStep === "intro";
  const inMode = state.currentStep === "mode";
  const inSpecial = state.currentStep === "special";
  const inFlightMode = state.currentStep === "flight-mode";
  const inFlightGame = state.currentStep === "flight-game";
  const inPlay = state.currentStep === "play";
  const inLetter = state.currentStep === "letter";
  const inPlan = state.currentStep === "plan";

  document.body.dataset.currentStep = state.currentStep;
  elements.introSection.hidden = !inIntro;
  elements.gameFlow.hidden = inIntro;
  elements.modeStep.hidden = !inMode;
  elements.specialStep.hidden = !inSpecial;
  elements.flightModeStep.hidden = !inFlightMode;
  elements.flightGameStep.hidden = !inFlightGame;
  elements.playStep.hidden = !inPlay;
  elements.letterStep.hidden = !inLetter;
  elements.planStep.hidden = !inPlan;
  elements.footer.hidden = !inIntro;
  renderSpecialAccess();
  renderLetter();
  renderPlan();
  renderFlightModeSelection();
  renderFlightGame();
}

function renderDeckPanel() {
  const deckOpen = state.isDeckOpen;
  elements.deckPanel.hidden = !deckOpen;
  elements.toggleDeckButton.setAttribute("aria-expanded", String(deckOpen));
  elements.toggleDeckButton.textContent = deckOpen ? "收起题库" : "查看题库";
  elements.pickerCard.classList.toggle("deck-collapsed", !deckOpen);
}

function openStep(step) {
  state.currentStep = step;
  renderFlow();
  if (step === "mode") {
    elements.modeStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (step === "special") {
    elements.specialStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (step === "flight-mode") {
    elements.flightModeStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (step === "flight-game") {
    elements.flightGameStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (step === "play") {
    elements.playStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (step === "letter") {
    elements.letterStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (step === "plan") {
    elements.planStep.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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

function isAppInstalled() {
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

function renderInstallButton() {
  if (!elements.installAppButton) return;
  elements.installAppButton.hidden = !deferredInstallPrompt || isAppInstalled();
}

function registerPwa() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("service worker registration failed", error);
      });
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    renderInstallButton();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    renderInstallButton();
    showToast("已安装到本地");
  });
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

elements.installAppButton?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    showToast("如果没有弹出安装按钮，可以用浏览器菜单里的“添加到主屏幕”");
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice.catch(() => null);
  deferredInstallPrompt = null;
  renderInstallButton();
});

elements.backToIntroButton.addEventListener("click", () => {
  openStep("intro");
});

elements.openSpecialStepButton.addEventListener("click", () => {
  specialBoundaryConfirmed = false;
  specialUnlocked = false;
  openStep("special");
});

elements.openPlanButton.addEventListener("click", openPlanGate);
elements.openFlightButton.addEventListener("click", openFlightModeStep);

elements.closePlanGateButton.addEventListener("click", closePlanGate);

elements.enterPlanButton.addEventListener("click", unlockPlanStep);

elements.planGateModal.addEventListener("click", (event) => {
  if (event.target === elements.planGateModal) closePlanGate();
});

elements.planGateButtons.forEach((button) => {
  button.addEventListener("click", () => handlePlanGateClick(button.dataset.planWord, button));
});

elements.confirmBoundaryButton.addEventListener("click", () => {
  specialBoundaryConfirmed = true;
  specialUnlocked = true;
  renderSpecialAccess();
  showToast("独立专区已打开");
});

elements.backToModeFromSpecialButton.addEventListener("click", () => {
  openStep("mode");
});

elements.backFromFlightModeButton.addEventListener("click", () => {
  openStep("special");
});

elements.backFromFlightGameButton.addEventListener("click", () => {
  openStep("flight-mode");
});

elements.flightModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    startFlightGame(button.dataset.flightMode);
  });
});

elements.flightRollButton.addEventListener("click", rollFlightDice);

elements.flightCompleteButton.addEventListener("click", () => {
  finishFlightTurn(false);
});

elements.flightSkipButton.addEventListener("click", () => {
  finishFlightTurn(true);
});

elements.flightResetButton.addEventListener("click", () => {
  resetFlightGame(state.flight.mode);
  showToast("飞行棋已重开");
});

elements.backToModeButton.addEventListener("click", () => {
  openStep("mode");
});

elements.resultBackModeButton.addEventListener("click", () => {
  openStep("mode");
});

elements.backFromLetterButton.addEventListener("click", () => {
  openStep(letterReturnStep);
});

elements.backFromPlanButton.addEventListener("click", () => {
  planEditable = false;
  renderPlan();
  openStep(planReturnStep);
});

elements.letterInput.addEventListener("input", () => {
  elements.letterCount.textContent = `${elements.letterInput.value.length} / 1200`;
});

elements.planInput.addEventListener("input", () => {
  elements.planCount.textContent = `${elements.planInput.value.length} / 3000`;
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

async function initApp() {
  registerPwa();
  const cloudData = await loadCloudState();
  await migrateLocalStorageToCloud(cloudData);
  resetVolatileFlow();
  saveState();
  renderFromState();
}

void initApp();
