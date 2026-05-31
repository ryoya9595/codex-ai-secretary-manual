const PROMPT_TEXT = `あなたに、Codexで使える「AI秘書システム」を作ってもらいます。

目的:
Codexで開いているこの作業フォルダ内に、todo管理、アイデア保存、日報作成、作業ログ整理ができるAI秘書システムを構築してください。

重要:
- オリジナルスキルは「my-secretary」だけを作成してください。
- my-ai-news、my-blog-writer、my-sns-post など、追加のオリジナルスキルは作らないでください。
- todo管理、アイデア管理、日報、テンプレートなどの必要機能は、スキルを増やすのではなく、この作業フォルダ内のファイルとフォルダとして作成してください。
- いきなりファイルを書き換えず、まずヒアリングしてください。
- 書き込み前に、作成・更新するファイル一覧を提示して確認してください。
- APIキー、パスワード、クレジットカード情報、SSH鍵、.env ファイルなどの機密情報は読まない・表示しない・編集しないでください。

---

STEP 1: ヒアリング

私に以下を質問してください。

1. 何と呼ばれたいか
2. 普段の仕事・活動
3. AI秘書に任せたいこと
4. AI秘書の口調
5. todo / ideas / logs / templates / vault をこのフォルダ内に作ってよいか

保存先に迷う場合は、以下を提案してください。

company/secretary/
├── CODEX.md
├── todos/
├── ideas/
├── logs/
├── templates/
└── vault/

---

STEP 2: 作成する構成

ヒアリング後、以下の構成を作成してください。

AGENTS.md
company/secretary/CODEX.md
company/secretary/todos/
company/secretary/ideas/
company/secretary/logs/
company/secretary/templates/
company/secretary/vault/
company/secretary/templates/todo-template.md
company/secretary/templates/daily-log-template.md
company/secretary/templates/idea-template.md

さらに、Codexで呼び出せるAI秘書スキルを1つだけ作ってください。

作成するスキル: my-secretary

スキルの保存場所は、Codexが現在の環境で認識できる場所にしてください。
プロジェクト内スキルとして作成できる場合は、この作業フォルダ内に作成してください。
Codexの仕様上グローバルスキルとして ~/.codex/skills/ に置く必要がある場合は、my-secretary だけを作成してください。

---

STEP 3: AGENTS.md の内容

AGENTS.mdには、以下を含めてください。

- 日本語で対応する
- 返答は簡潔・フランク・実用優先
- 作業ログを残す
- 機密ファイルを読まない
- 削除・上書き・権限変更は事前確認
- AI秘書のデータは company/secretary/ に保存する

---

STEP 4: company/secretary/CODEX.md の内容

CODEX.mdには、AI秘書の運用ルールを書いてください。

含める内容:
- ユーザーの呼び方 / 仕事・活動 / AI秘書に任せたいこと
- todo / ideas / logs / vault の保存先
- 返答スタイル
- セキュリティルール

---

STEP 5: my-secretary スキルの内容

役割:
あなたはユーザー専属の実務秘書です。todo整理、アイデア保存、日報作成、スケジュール提案、作業ログ整理を行います。

最初に読むファイル:
1. AGENTS.md
2. company/secretary/CODEX.md

できること:
- 今日のtodoを作成・更新する
- todoを high / medium / low で整理する
- 雑なアイデアを ideas/ に保存する
- 1日の完了事項、残タスク、気づきを logs/ にまとめる
- todoをもとに今日の時間割を提案する
- 必要に応じて templates/ のテンプレートを使う

返答スタイル:
- 日本語 / 簡潔 / フランク / 実用優先
- 書き込み後は、どこに何を保存したかを伝える
- 迷った時は確認質問を1つだけする

セキュリティ（絶対に読まない・表示しない・編集しない）:
- .env / .env.*
- id_rsa / id_ed25519 / .pem / .key
- credentials.json / secrets.json
- .aws/ / .ssh/
- APIキー、パスワード、クレジットカード情報を含むファイル
危険な操作、削除、上書き、権限変更は必ず確認してから行う。

---

STEP 6: 動作確認

最後に、以下を報告してください。

1. 作成・更新したファイル一覧
2. 作成したフォルダ一覧
3. my-secretary の呼び出し方
4. 最初に試す例
5. 注意点`;

const promptBody = document.querySelector("#promptBody");
const copyButton = document.querySelector("#copyPromptButton");

promptBody.textContent = PROMPT_TEXT;

copyButton.addEventListener("click", async () => {
  let ok = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(PROMPT_TEXT);
      ok = true;
    }
  } catch {
    ok = false;
  }
  if (!ok) {
    const range = document.createRange();
    range.selectNodeContents(promptBody);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    sel.removeAllRanges();
  }
  copyButton.textContent = ok ? "コピーしました" : "手動でコピーしてください";
  copyButton.classList.toggle("copied", ok);
  setTimeout(() => {
    copyButton.textContent = "コピー";
    copyButton.classList.remove("copied");
  }, 2000);
});
