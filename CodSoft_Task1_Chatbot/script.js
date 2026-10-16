const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");
const suggestions = document.getElementById("suggestions");
const clearButton = document.getElementById("clearChat");
const aboutButton = document.getElementById("aboutBot");
const helpButton = document.getElementById("helpButton");
const toast = document.getElementById("toast");

const rules = [
  { matches: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"], reply: () => "Hello! 👋 It’s great to chat with you. What would you like to know?" },
  { matches: ["your name", "who are you", "what are you"], reply: () => "I’m AmanBot, a rule-based chatbot created for CodSoft AI Internship Task 1." },
  { matches: ["how are you", "how are u"], reply: () => "I’m doing great, thanks for asking! 😊 How can I help you today?" },
  { matches: ["what can you do", "your features", "help me", "help"], reply: () => "I can respond to greetings, explain this project, share a programming fact, tell a joke, and chat about learning. Try asking: “What is Python?”" },
  { matches: ["python"], reply: () => "Python is a beginner-friendly, high-level programming language used in automation, web development, data science, and AI." },
  { matches: ["javascript", "java script"], reply: () => "JavaScript makes websites interactive. In this project, it reads your message, checks predefined rules, and displays the matching response." },
  { matches: ["html", "css"], reply: () => "HTML structures a web page, CSS styles it, and JavaScript adds behavior. Together, they power this website chatbot." },
  { matches: ["rule based", "rule-based", "how do you work", "how it works"], reply: () => "I use predefined keyword rules. Your message is converted to lowercase, checked against those rules, and answered with a matching response. I don’t learn from messages." },
  { matches: ["codsoft", "task 1", "task one"], reply: () => "CodSoft Task 1 is to build a chatbot that responds to user inputs using predefined rules, such as if-else logic or pattern matching." },
  { matches: ["joke", "make me laugh"], reply: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "Why did the developer go broke? Because they used up all their cache! 😄",
        "Why was the computer cold? It left its Windows open! 🪟"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  },
  { matches: ["study", "exam", "learning", "learn"], reply: () => "Try studying in 25-minute focus sessions, then take a 5-minute break. Small, consistent practice makes a big difference. 📚" },
  { matches: ["thank", "thanks"], reply: () => "You’re welcome! 😊 Feel free to ask me something else." },
  { matches: ["time"], reply: () => `Your device time is ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.` },
  { matches: ["date", "today"], reply: () => `Today is ${new Date().toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.` },
  { matches: ["bye", "goodbye", "see you"], reply: () => "Goodbye! 👋 Thanks for chatting with AmanBot. Have a wonderful day!" }
];

function getReply(message) {
  const cleaned = message.toLowerCase().replace(/[^\w\s'-]/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "Please type a message so I can respond.";
  const rule = rules.find(item => item.matches.some(keyword => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|\\b)${escaped}(\\b|$)`, "i").test(cleaned);
  }));
  return rule ? rule.reply() : "I’m not sure how to answer that yet. Try “help”, “tell me a joke”, or ask about Python, JavaScript, or this project.";
}

function currentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message-row ${sender === "user" ? "user-row" : "bot-row"}`;

  if (sender === "bot") {
    const avatar = document.createElement("div");
    avatar.className = "mini-avatar";
    avatar.textContent = "✦";
    row.appendChild(avatar);
  }

  const content = document.createElement("div");
  content.className = "message-content";
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  // textContent prevents user input from being interpreted as HTML.
  bubble.textContent = text;
  const time = document.createElement("time");
  time.textContent = currentTime();
  content.append(bubble, time);
  row.appendChild(content);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const row = document.createElement("div");
  row.className = "message-row bot-row";
  row.id = "typingIndicator";
  const avatar = document.createElement("div");
  avatar.className = "mini-avatar";
  avatar.textContent = "✦";
  const content = document.createElement("div");
  content.className = "message-content";
  const bubble = document.createElement("div");
  bubble.className = "message-bubble typing-bubble";
  bubble.innerHTML = "<span></span><span></span><span></span>";
  content.appendChild(bubble);
  row.append(avatar, content);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage(message) {
  const text = message.trim();
  if (!text) {
    input.focus();
    return;
  }
  addMessage(text, "user");
  input.value = "";
  suggestions.style.display = "none";
  showTyping();
  window.setTimeout(() => {
    document.getElementById("typingIndicator")?.remove();
    addMessage(getReply(text), "bot");
    input.focus();
  }, 450);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});

suggestions.addEventListener("click", event => {
  const button = event.target.closest("[data-message]");
  if (button) sendMessage(button.dataset.message);
});

clearButton.addEventListener("click", () => {
  messages.innerHTML = '<div class="day-divider"><span>NEW CHAT</span></div>';
  suggestions.style.display = "flex";
  addMessage("Chat cleared! 👋 What would you like to talk about?", "bot");
  showToast("Started a fresh conversation");
});

aboutButton.addEventListener("click", () => {
  addMessage("About AmanBot: This is a front-end, rule-based chatbot built with HTML, CSS, and vanilla JavaScript for CodSoft AI Internship Task 1. It does not use a server or external AI API.", "bot");
});

helpButton.addEventListener("click", () => {
  addMessage("Try these prompts: “Hello”, “What is your name?”, “What is Python?”, “Explain rule-based chatbot”, “Tell me a joke”, or “What can you do?”", "bot");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

input.addEventListener("keydown", event => {
  if (event.key === "Escape") input.value = "";
});
