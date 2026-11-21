import { QuestionViewModel } from "./dataType";

export class StartMode extends HTMLElement {
    private dialog!: HTMLDialogElement;
    connectedCallback() {
        this.innerHTML = '<dialog class="start"><article class="start__inner"><p class="start__text">読み込み中...</p></article></dialog>';
        this.dialog = this.querySelector('dialog') as HTMLDialogElement;
        this.dialog.showModal();
    }
    errorMode(message: string): void {
        this.dialog.innerHTML = `<article class="start__inner"><p class="start__text">${ message }</p></article>`;
    }
    selectMode(): void {
        this.dialog.innerHTML = `<article class="start__inner">
        <h2 class="start__title">M-1 クイズ</h2>
        <p class="start__text">クイズの対象年度を選んでください。</p>
        <button type="button" class="start__button" value="all">全期間</button>
        <button type="button" class="start__button" value="after-2015">2015年以降</button>
        <button type="button" class="start__button" value="this-year">直近年</button>
        </article>`;
    }
    closeDialog(): void {
        this.dialog.close();
    }
}

export class QuizMode extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div class="message__normal">Select Button</div>';
    }
    render(data: QuestionViewModel|null) {
        if (!data) {
            this.innerHTML = '<div class="message__error">Error!</div>';
            return;
        }
        const { item, hasNext, hasPrev } = data;
        this.innerHTML = `<div class="question">
            <h2 class="question__h2">「${item.question}」</h2>
            <p class="question__text">このキャッチコピーの芸人は誰？</p>
            <details class="question__hint"><summary class="question__hint-title secondary" role="button">ヒント1: 出場年度と順位</summary><div class="question__hint-body">${item.hint1}</div></details>
            <details class="question__hint"><summary class="question__hint-title secondary" role="button">ヒント2: 出場履歴とキャッチコピー</summary><div class="question__hint-body">${item.hint2}</div></details>
            <details class="question__hint"><summary class="question__hint-title secondary" role="button">ヒント3: 前後の出番</summary><div class="question__hint-body">${item.hint3}</div></details>
            <hr>
            <details class="question__answer"><summary class="question__answer-title" role="button">答え:</summary><div class="question__answer-body">${item.answer}</div></details>
            <p class="question__text">次の問題：</p>
            <div class="question__nav">
            <button class="question__nav-button" type="button" value="prev" ${hasPrev?'':'disabled'}>Prev</button>
            <button class="question__nav-button" type="button" value="next" ${hasNext?'':'disabled'}>Next</button>
            </div>
        </div>`;
    }
}
