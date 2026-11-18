import { QuestionViewModel } from "./dataType";

export class StartMode extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<form class="start">
            <label><input type="radio" name="filter" value="all">All</label>
            <label><input type="radio" name="filter" value="after-2015" checked>After 2015</label>
            <label><input type="radio" name="filter" value="this-year">This Year</label>
            <button type="button" id="start-button">Start</button>
        </form>`;
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
        this.innerHTML = `<div>
            <h2>${item.question}</h2>
            <p>...</p>
            <details><summary>Hint1</summary><div>${item.hint1}</div></details>
            <details><summary>Hint2</summary><div>${item.hint2}</div></details>
            <details><summary>Hint3</summary><div>${item.hint3}</div></details>
            <details><summary>Answer</summary><div>${item.answer}</div></details>
            <button type="button" id="prev" ${hasPrev?'':'disabled'}>Prev</button>
            <button type="button" id="next" ${hasNext?'':'disabled'}>Next</button>
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
