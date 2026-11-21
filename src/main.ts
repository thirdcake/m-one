import { fetchData } from "./fetchData";
import { M1Data } from "./dataType";
import { StartMode, QuizMode } from "./view";
import { Questions } from "./questions";

customElements.define('start-mode', StartMode);
customElements.define('quiz-mode', QuizMode);


async function main() {
    // wrapper DOM
    const app = document.querySelector('div#app') as HTMLDivElement;
    if (!app) {
        console.error('dom is null');
        return;
    }
    // append views
    const startMode = document.createElement('start-mode') as StartMode;
    const quizMode = document.createElement('quiz-mode') as QuizMode;
    app.appendChild(startMode);
    app.appendChild(quizMode);

    // fetch Data
    const data = await fetchData(app.dataset.fetchurl) as M1Data|null;
    if (data === null) {
        startMode.errorMode('Data is null');
        console.error('data is null.');
        return;
    }
    const questions = new Questions(data);
    startMode.selectMode();

    // button click event
    app.addEventListener('click', event => {
        const target = event.target as HTMLElement | undefined;
        if (!target) {
            return;
        }
        const button = target.closest('button') as HTMLButtonElement | undefined;
        if (!button) {
            return;
        }
        switch (button.value) {
            case 'all':
            case 'after-2015':
            case 'this-year':
                startMode.closeDialog();
                questions.filter(button.value);
                quizMode.render(questions.next());
                break;
            case 'next':
                quizMode.render(questions.next());
                break;
            case 'prev':
                quizMode.render(questions.prev());
                break;
            default:
                // do nothing.
        }
    });
}

main();
