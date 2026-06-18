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
];

const funnyCaptions = {
  mixed: [
    "婉婉不许耍赖，李家鑫也不许偷偷加码",
    "先确认边界，再开始今晚的小圈仪式",
    "安全词永远最大，谁喊停谁就是规则",
    "乖一点，也要清醒一点",
    "抽到这张，先问一句：还舒服吗？",
  ],
  shame: [
    "婉婉不许装淡定",
    "李家鑫别笑，轮到你也一样",
    "脸红不算输，嘴硬才算",
    "这张卡很轻，但很会让人害羞",
    "读出来，别只在心里承认",
  ],
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

const decks = {
  mixed: {
    title: "小圈专属题库",
    description:
      "仅限成年人双方自愿。先确认边界与安全词，任何一方都可随时拒绝或停止。",
    options: [...circleTruthQuestions, ...circleDareQuestions],
  },
  shame: {
    title: "羞耻版题库",
    description: "害羞、嘴硬、限定称呼和轻微社死。所有内容都可以跳过。",
    options: [...shameTruthQuestions, ...shameDareQuestions],
  },
  truth: {
    title: "真心话题库",
    description: "30 道真心话，没有标准答案，但要认真回答。",
    options: [...truthQuestions],
  },
  dare: {
    title: "大冒险题库",
    description: "30 道轻松大冒险，做不到可以直接跳过。",
    options: [...dareQuestions],
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
  openSpecialStepButton: document.querySelector("#open-special-step-button"),
  openPlanButton: document.querySelector("#open-plan-button"),
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

function createDefaultState() {
  return {
    mode: "mixed",
    player: "婉婉",
    drawType: "all",
    currentStep: "intro",
    isDeckOpen: false,
    secretLetter: DEFAULT_SECRET_LETTER,
    planBook: "",
    planNotes: [],
    customDecks: {
      mixed: [...decks.mixed.options],
      shame: [...decks.shame.options],
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
    history: state.history,
    usedCardIds: state.usedCardIds,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
}

function resetVolatileFlow() {
  state.mode = "mixed";
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
  return Object.fromEntries(
    Object.keys(fallback).map((mode) => [
      mode,
      Array.isArray(incoming[mode]) ? [...incoming[mode]] : [...fallback[mode]],
    ]),
  );
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

function renderFlow() {
  const inIntro = state.currentStep === "intro";
  const inMode = state.currentStep === "mode";
  const inSpecial = state.currentStep === "special";
  const inPlay = state.currentStep === "play";
  const inLetter = state.currentStep === "letter";
  const inPlan = state.currentStep === "plan";

  document.body.dataset.currentStep = state.currentStep;
  elements.introSection.hidden = !inIntro;
  elements.gameFlow.hidden = inIntro;
  elements.modeStep.hidden = !inMode;
  elements.specialStep.hidden = !inSpecial;
  elements.playStep.hidden = !inPlay;
  elements.letterStep.hidden = !inLetter;
  elements.planStep.hidden = !inPlan;
  elements.footer.hidden = !inIntro;
  renderSpecialAccess();
  renderLetter();
  renderPlan();
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

elements.backToIntroButton.addEventListener("click", () => {
  openStep("intro");
});

elements.openSpecialStepButton.addEventListener("click", () => {
  specialBoundaryConfirmed = false;
  specialUnlocked = false;
  openStep("special");
});

elements.openPlanButton.addEventListener("click", openPlanGate);

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
  const cloudData = await loadCloudState();
  await migrateLocalStorageToCloud(cloudData);
  resetVolatileFlow();
  saveState();
  renderFromState();
}

void initApp();
