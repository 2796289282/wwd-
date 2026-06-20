const CLOUD_BASE = "https://peiwanjie.pages.dev";
const LOAD_URL = `${CLOUD_BASE}/api/load-state`;
const SAVE_URL = `${CLOUD_BASE}/api/save-state`;
const ENTRANCE_PASSWORD = "080831";
const PLAN_EDIT_PASSWORD = "050116";
const planDocument = require("../../data/plan-document");

const defaultTruth = [
  "真心话：第一次见到对方时，你的第一印象是什么？",
  "真心话：最近哪一个瞬间让你突然想起对方？",
  "真心话：对方做过哪件小事，让你一直记到现在？",
  "真心话：如果给对方换一个专属昵称，你会叫她什么？",
  "真心话：说出对方身上三个你欣赏的优点。",
  "真心话：哪一次聊天让你觉得彼此更靠近了？",
  "真心话：你希望对方更了解你的哪一面？",
  "真心话：说一句一直想说但没有说出口的话。",
  "真心话：如果给今晚写一句标题，你会写什么？",
  "真心话：说一件你愿意认真为这段关系做的事。"
];

const defaultDare = [
  "大冒险：认真看着对方的眼睛十秒。",
  "大冒险：给对方取一个今晚限定的昵称。",
  "大冒险：选一首歌，把最想让对方听的一句念出来。",
  "大冒险：和对方拍一张今晚限定的合照。",
  "大冒险：用三个词现场夸奖对方。",
  "大冒险：闭眼听对方说一句悄悄话。",
  "大冒险：一起计划一次不超过半天的小约会。",
  "大冒险：认真说一句“今天和你待在一起很开心”。",
  "大冒险：互相说一句“你可以随时说不”。",
  "大冒险：给彼此一个拥抱或保持舒适距离，由对方自行选择。"
];

const defaultLetter = `给今晚的我们：
这里可以写给婉婉，也可以写给李家鑫。
可以认真一点，也可以害羞一点。
不用急着把所有话都说完，只要把此刻最想留下的心情放在这里就好。`;

function uniq(list) {
  return Array.from(new Set((list || []).filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())));
}

function modeOf(card) {
  if (card.startsWith("大冒险")) return "dare";
  return "truth";
}

function labelOf(mode) {
  if (mode === "dare") return "大冒险";
  if (mode === "truth") return "真心话";
  return "混合";
}

function buildInitialState(data = {}) {
  const remaining = data.remainingCards && typeof data.remainingCards === "object" ? data.remainingCards : {};
  const customCards = Array.isArray(data.customCards) ? data.customCards : [];
  const legacyCustom = Array.isArray(remaining.custom) ? remaining.custom : [];

  return {
    truth: uniq([...(Array.isArray(remaining.truth) ? remaining.truth : []), ...defaultTruth]),
    dare: uniq([...(Array.isArray(remaining.dare) ? remaining.dare : []), ...defaultDare]),
    custom: uniq([...customCards, ...legacyCustom]),
    drawnCards: Array.isArray(data.drawnCards) ? data.drawnCards : [],
    history: Array.isArray(data.history) ? data.history.slice(0, 20) : [],
    letter: typeof data.letter === "string" && data.letter ? data.letter : defaultLetter,
    planBook: typeof data.planBook === "string" ? data.planBook : "",
    planNotes: normalizeNotes(data.planNotes),
  };
}

function normalizeNotes(notes) {
  return (Array.isArray(notes) ? notes : []).map((item, index) => ({
    id: item.id || `note-${Date.now()}-${index}`,
    text: item.text || "",
    time: item.time || new Date().toISOString(),
    timeText: formatTime(item.time || new Date().toISOString())
  })).filter((item) => item.text);
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

Page({
  data: {
    view: "gate",
    scrollTop: 0,
    syncStatus: "正在同步...",
    toastText: "",
    entrancePassword: "",
    entranceError: false,
    mode: "both",
    player: "婉婉",
    randomHint: "不许耍赖，抽到就算数。",
    drawLoadingText: "",
    isDrawing: false,
    currentCard: "",
    currentModeLabel: "",
    deckTitle: "真心话题库",
    showBank: false,
    newCardText: "",
    newNoteText: "",
    passwordModal: false,
    passwordValue: "",
    planEditing: false,
    planDocumentOpen: false,
    letterHidden: false,
    letterReturnView: "intro",
    truth: defaultTruth,
    dare: defaultDare,
    custom: [],
    drawnCards: [],
    history: [],
    letter: defaultLetter,
    planBook: "",
    planNotes: [],
    planDocument,
    availableCards: [],
    availableCount: defaultTruth.length + defaultDare.length
  },

  onLoad() {
    this.loadCloudState();
  },

  onUnload() {
    clearTimeout(this.drawTimer);
    clearTimeout(this.toastTimer);
  },

  switchView(view, extra = {}) {
    this.setData({
      ...extra,
      view,
      scrollTop: this.data.scrollTop === 0 ? 1 : 0
    });
    wx.nextTick(() => {
      this.setData({ scrollTop: 0 });
    });
  },

  onEntranceInput(event) {
    this.setData({ entrancePassword: event.detail.value, entranceError: false });
  },

  checkEntrance() {
    if ((this.data.entrancePassword || "").trim() !== ENTRANCE_PASSWORD) {
      this.setData({ entranceError: true });
      return;
    }
    this.switchView("intro", { entrancePassword: "", entranceError: false });
  },

  goIntro() {
    this.switchView("intro", { planEditing: false, showBank: false });
  },

  goMode() {
    this.switchView("mode", { planEditing: false, showBank: false });
    this.updateDeckTitle();
  },

  goSpecial() {
    this.switchView("special", { planEditing: false, planDocumentOpen: false });
  },

  goHome() {
    this.goIntro();
  },

  goDraw() {
    this.switchView("play");
    this.updateAvailableCount();
  },

  goPlan() {
    this.switchView("plan", { planEditing: false, planDocumentOpen: false });
  },

  openLetter() {
    this.switchView("letter", { letterReturnView: this.data.view, letterHidden: false });
  },

  openLetterFromPlay() {
    this.switchView("letter", { letterReturnView: "play", letterHidden: false });
  },

  backFromLetter() {
    this.switchView(this.data.letterReturnView || "intro", { letterHidden: false });
  },

  chooseModeAndPlay(event) {
    const mode = event.currentTarget.dataset.mode || "both";
    this.switchView("play", { mode });
    this.updateDeckTitle();
    this.updateAvailableCount();
  },

  setMode(event) {
    this.setData({ mode: event.currentTarget.dataset.mode });
    this.updateDeckTitle();
    this.updateAvailableCount();
  },

  setPlayer(event) {
    this.setData({ player: event.currentTarget.dataset.player });
  },

  toggleBank() {
    this.setData({ showBank: !this.data.showBank });
  },

  updateDeckTitle() {
    const titleMap = {
      truth: "真心话题库",
      dare: "大冒险题库",
      both: "混合题库"
    };
    this.setData({ deckTitle: titleMap[this.data.mode] || "混合题库" });
  },

  fillTemplate(event) {
    const template = event.currentTarget.dataset.template;
    const textMap = {
      "温柔一点": "真心话：说一件今晚让你觉得被认真对待的小事。",
      "搞笑一点": "大冒险：模仿自己害羞时嘴硬的样子十秒。",
      "害羞一点": "真心话：说一句你不好意思当面说但想让对方知道的话。",
      "大胆一点": "大冒险：认真看着对方，说一句今晚限定的偏爱。"
    };
    this.setData({ newCardText: textMap[template] || "" });
  },

  onNewCardInput(event) {
    this.setData({ newCardText: event.detail.value });
  },

  onLetterInput(event) {
    this.setData({ letter: event.detail.value });
  },

  onPlanInput(event) {
    this.setData({ planBook: event.detail.value });
  },

  onNoteInput(event) {
    this.setData({ newNoteText: event.detail.value });
  },

  onNoteEditInput(event) {
    const id = event.currentTarget.dataset.id;
    const value = event.detail.value;
    const notes = this.data.planNotes.map((item) => item.id === id ? { ...item, text: value } : item);
    this.setData({ planNotes: notes });
  },

  onPasswordInput(event) {
    this.setData({ passwordValue: event.detail.value });
  },

  loadCloudState() {
    wx.request({
      url: LOAD_URL,
      method: "GET",
      success: (res) => {
        const state = buildInitialState(res.data && res.data.data);
        this.setData({
          ...state,
          syncStatus: "已同步"
        });
        this.updateDeckTitle();
        this.updateAvailableCount();
      },
      fail: () => {
        const local = wx.getStorageSync("wanwan-mini-state") || {};
        const state = buildInitialState(local);
        this.setData({
          ...state,
          syncStatus: "离线模式"
        });
        this.updateDeckTitle();
        this.updateAvailableCount();
      }
    });
  },

  saveCloudState(showToast = true) {
    const payload = {
      customCards: this.data.custom,
      drawnCards: this.data.drawnCards,
      remainingCards: {
        truth: this.data.truth,
        dare: this.data.dare,
        custom: this.data.custom
      },
      letter: this.data.letter,
      planBook: this.data.planBook,
      planNotes: this.data.planNotes.map((item) => ({ id: item.id, text: item.text, time: item.time })),
      history: this.data.history,
      updatedAt: new Date().toISOString()
    };

    wx.setStorageSync("wanwan-mini-state", payload);
    this.setData({ syncStatus: "同步中..." });
    wx.request({
      url: SAVE_URL,
      method: "POST",
      data: payload,
      success: () => {
        this.setData({ syncStatus: "已同步" });
        if (showToast) this.showToast("已同步");
      },
      fail: () => {
        this.setData({ syncStatus: "本地已保存" });
        if (showToast) this.showToast("网络不稳，已先存本地");
      }
    });
  },

  allCardsForCurrentMode() {
    const customTruth = this.data.custom.filter((item) => modeOf(item) === "truth");
    const customDare = this.data.custom.filter((item) => modeOf(item) === "dare");
    if (this.data.mode === "truth") return uniq([...this.data.truth, ...customTruth]);
    if (this.data.mode === "dare") return uniq([...this.data.dare, ...customDare]);
    return uniq([...this.data.truth, ...this.data.dare, ...this.data.custom]);
  },

  updateAvailableCount() {
    const pool = this.allCardsForCurrentMode();
    const available = pool.filter((card) => !this.data.drawnCards.includes(`${modeOf(card)}::${card}`));
    this.setData({ availableCount: available.length, availableCards: available });
  },

  drawCard() {
    if (this.data.isDrawing) return;
    const pool = this.allCardsForCurrentMode();
    let available = pool.filter((card) => !this.data.drawnCards.includes(`${modeOf(card)}::${card}`));
    if (!available.length) {
      this.showToast("本轮抽完啦，先重置本轮");
      return;
    }

    const card = available[Math.floor(Math.random() * available.length)];
    const mode = modeOf(card);
    const key = `${mode}::${card}`;
    const historyItem = {
      value: card,
      player: this.data.player,
      mode,
      modeLabel: labelOf(mode),
      time: new Date().toISOString()
    };

    this.setData({
      isDrawing: true,
      currentCard: "",
      currentModeLabel: "抽卡中",
      drawLoadingText: "正在替婉婉认真挑一张...",
      randomHint: "先深呼吸一下，今晚会温柔地偏向你。"
    });

    clearTimeout(this.drawTimer);
    this.drawTimer = setTimeout(() => {
      const valueHints = [
        "这张是今晚给婉婉的小小偏爱，要认真收好。",
        "抽到啦，不急着回答，先被认真看见一会儿。",
        "这一张算数，但婉婉可以慢慢来。",
        "李家鑫负责抽卡，婉婉负责被好好对待。",
        "今晚不赶时间，答案和心情都可以慢慢说。"
      ];
      this.setData({
        isDrawing: false,
        drawLoadingText: "",
        currentCard: card,
        currentModeLabel: labelOf(mode),
        drawnCards: [...this.data.drawnCards, key],
        history: [historyItem, ...this.data.history].slice(0, 20),
        randomHint: valueHints[Math.floor(Math.random() * valueHints.length)]
      });
      this.updateAvailableCount();
      this.saveCloudState(false);
      this.showToast("抽到啦，婉婉要认真收好");
    }, 680);
  },

  resetRound() {
    this.setData({
      drawnCards: [],
      currentCard: "",
      currentModeLabel: "",
      history: []
    });
    this.updateAvailableCount();
    this.saveCloudState(false);
    this.showToast("本轮已重置");
  },

  skipCard() {
    if (!this.data.currentCard) {
      this.showToast("还没抽卡呢");
      return;
    }
    this.setData({
      currentCard: "",
      currentModeLabel: "",
      randomHint: "这一张先放过你，下一张可不一定。"
    });
  },

  clearHistory() {
    this.setData({ history: [] });
    this.saveCloudState();
  },

  addCustomCard() {
    const text = (this.data.newCardText || "").trim();
    if (!text) {
      this.showToast("先写一条题目");
      return;
    }
    const normalized = text.startsWith("真心话") || text.startsWith("大冒险")
      ? text
      : `真心话：${text}`;
    this.setData({
      custom: uniq([normalized, ...this.data.custom]),
      newCardText: ""
    });
    this.updateAvailableCount();
    this.saveCloudState();
  },

  clearCurrentBank() {
    wx.showModal({
      title: "确认清空",
      content: "确定要清空当前题库吗？这个操作会删除当前题库里的题目。",
      confirmText: "清空",
      confirmColor: "#ff6b81",
      success: (res) => {
        if (!res.confirm) return;
        if (this.data.mode === "dare") this.setData({ dare: [], custom: this.data.custom.filter((item) => modeOf(item) !== "dare") });
        else if (this.data.mode === "truth") this.setData({ truth: [], custom: this.data.custom.filter((item) => modeOf(item) !== "truth") });
        else this.setData({ truth: [], dare: [], custom: [] });
        this.resetRound();
      }
    });
  },

  saveLetter() {
    this.saveCloudState();
  },

  toggleLetterVisibility() {
    this.setData({ letterHidden: !this.data.letterHidden });
  },

  requestPlanEdit() {
    if (this.data.planEditing) {
      this.setData({ planEditing: false });
      return;
    }
    this.setData({ passwordModal: true, passwordValue: "" });
  },

  closePasswordModal() {
    this.setData({ passwordModal: false, passwordValue: "" });
  },

  confirmPassword() {
    if (this.data.passwordValue !== PLAN_EDIT_PASSWORD) {
      this.showToast("密码不对哦");
      return;
    }
    this.setData({ passwordModal: false, passwordValue: "", planEditing: true });
    this.showToast("可以修改啦");
  },

  savePlan() {
    const notes = this.data.planNotes
      .map((item) => ({ ...item, text: (item.text || "").trim() }))
      .filter((item) => item.text);
    this.setData({ planNotes: notes, planEditing: false });
    this.saveCloudState();
  },

  togglePlanDocument() {
    this.setData({ planDocumentOpen: !this.data.planDocumentOpen });
  },

  openFlight() {
    this.showToast("飞行棋入口已保留，小程序版暂不支持外链打开");
  },

  addNote() {
    const text = (this.data.newNoteText || "").trim();
    if (!text) {
      this.showToast("先写一条记录");
      return;
    }
    const now = new Date().toISOString();
    const note = {
      id: `note-${Date.now()}`,
      text,
      time: now,
      timeText: formatTime(now)
    };
    this.setData({
      planNotes: [note, ...this.data.planNotes],
      newNoteText: ""
    });
    this.saveCloudState();
  },

  pinNote(event) {
    const id = event.currentTarget.dataset.id;
    const notes = [...this.data.planNotes];
    const index = notes.findIndex((item) => item.id === id);
    if (index <= 0) return;
    const [item] = notes.splice(index, 1);
    notes.unshift(item);
    this.setData({ planNotes: notes });
    this.saveCloudState();
  },

  showToast(text) {
    this.setData({ toastText: text });
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.setData({ toastText: "" }), 1800);
  }
});
