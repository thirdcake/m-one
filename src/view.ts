import { QuestionViewModel } from "./dataType";

export class StartMode extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="start">
        <h2 class="start__title">対象年度を選んでください</h2>
        <div class="start__labels">
            <label class="start__label"><input class="start__radio" type="radio" name="filter" value="all">全期間</label>
            <label class="start__label"><input class="start__radio" type="radio" name="filter" value="after-2015" checked>2015年以降</label>
            <label class="start__label"><input class="start__radio" type="radio" name="filter" value="this-year">直近年</label>
            <button class="start__button" type="button" id="start-button">スタート</button>
        </div>
        </div>`;
        const startButton = this.querySelector('button#start-button') as HTMLButtonElement;

        startButton?.addEventListener('click', () => {
            const checked = this.querySelector('input[name="filter"]:checked') as HTMLInputElement | null;

            if (!checked) return;

            this.dispatchEvent(new CustomEvent('clickStart', {
                detail: { value: checked.value },
                bubbles: true,
                cancelable: true,
            }));

        });
    }
}

export class QuizMode extends HTMLElement {
    render(data: QuestionViewModel) {
        const { item, hasNext, hasPrev } = data;
        this.innerHTML = `<div class="question">
            <h2 class="question__title">「${item.question}」</h2>
            <p class="question__text">このキャッチコピーの芸人は誰？</p>
            <details class="question__hint"><summary class="question__hint-title">Hint1: 出場年度と順位</summary><div class="question__hint-body">${item.hint1}</div></details>
            <details class="question__hint"><summary class="question__hint-title">Hint2: 出場履歴とキャッチコピー</summary><div class="question__hint-body">${item.hint2}</div></details>
            <details class="question__hint"><summary class="question__hint-title">Hint3: 前後の出番</summary><div class="question__hint-body">${item.hint3}</div></details>
            <details class="question__answer"><summary class="question__answer-title">Answer</summary><div class="question__answer-body">${item.answer}</div></details>
            <div class="question__nav">
            <button class="question__nav-button" type="button" id="prev" ${hasPrev?'':'disabled'}>Prev</button>
            <button class="question__nav-button" type="button" id="next" ${hasNext?'':'disabled'}>Next</button>
            </div>
        </div>`;
        const prevButton = this.querySelector('button#prev') as HTMLButtonElement;
        prevButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('clickPrev', {
                bubbles: true,
                cancelable: true,
            }));
        });
        const nextButton = this.querySelector('button#next') as HTMLButtonElement;
        nextButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('clickNext', {
                bubbles: true,
                cancelable: true,
            }));
        });
    }
}
