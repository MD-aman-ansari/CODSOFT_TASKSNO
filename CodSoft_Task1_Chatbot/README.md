# AmanBot — CodSoft AI Internship Task 1

A responsive, website-based **rule-based chatbot** built with HTML, CSS, and vanilla JavaScript.

## Features

- Modern responsive chat interface
- Predefined keyword rules and responses
- Greeting, programming, study, joke, date/time, and help responses
- Suggested prompt chips
- Typing indicator, timestamps, clear-chat button, and help button
- Safe message rendering using `textContent`
- No backend, API key, or paid service required

## Project structure

```text
CodSoft_Task1_Chatbot/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Install [Visual Studio Code](https://code.visualstudio.com/) and a browser.
2. Open this folder in VS Code.
3. Open `index.html` in your browser, or install the **Live Server** extension and choose **Open with Live Server**.
4. Try messages such as `hello`, `what is Python`, `tell me a joke`, `what can you do`, and `bye`.

No package installation is required.

## How the rule-based logic works

1. The user types a message.
2. JavaScript normalizes the text to lowercase and removes extra punctuation/spacing.
3. The chatbot searches its predefined keyword rules.
4. It returns the first matching response or a fallback message if no rule matches.

This is a rule-based demo, not a generative AI chatbot.

## Test checklist

- [ ] `Hello` and `hello` both receive a greeting.
- [ ] `What is Python?` returns the Python explanation.
- [ ] `Tell me a joke` returns one joke.
- [ ] An unknown question returns the fallback response.
- [ ] Empty input does not add a message.
- [ ] `bye` receives a goodbye response.
- [ ] Clear-chat button starts a fresh conversation.
- [ ] Layout works on a narrow/mobile screen.

## Deploy with GitHub Pages

1. Create a GitHub repository named `CODSOFT_TASKSNO` (or the exact repository name specified in your internship instructions).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish the site. The URL appears on the Pages settings screen.
7. Open the published URL and test the chatbot again.

## Suggested LinkedIn demo

Record a short screen video showing:
- the initial chatbot screen,
- at least three different prompts,
- an unknown prompt and the fallback response,
- the mobile/responsive view if possible.

Add your GitHub repository link and use `#codsoft` in the post, as requested in the internship brief.
