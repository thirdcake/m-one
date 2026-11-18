import { fetchData } from "./fetchData";
import { M1Data } from "./dataType";
import { StartMode, QuizMode } from "./view";
import { Questions } from "./questions";

customElements.define('start-mode', StartMode);
customElements.define('quiz-mode', QuizMode);

async function main() {
    const app = document.querySelector('div#app') as HTMLDivElement;
    const message = document.querySelector('div#message-text') as HTMLDivElement;
    if (!app || !message) {
        console.error('dom is null');
        return;
    }
    const data = await fetchData() as M1Data|null;
    if (data === null) {
        message.textContent = 'Data is null...';
        console.error('data is null.');
        return;
    }
    const questions = new Questions(data);
    const startMode = document.createElement('start-mode') as StartMode;
    const quizMode = document.createElement('quiz-mode') as QuizMode;
    message.remove();
    app.appendChild(startMode);
    startMode.addEventListener('clickStart', event => {
        const value = (event as CustomEvent<{ value: string }>).detail.value;
        startMode.remove();
        questions.filter(value);
        app.appendChild(quizMode);
        const first = questions.next();
        quizMode.render(first);
    });
    quizMode.addEventListener('clickNext', event => {
        const next = questions.next();
        quizMode.render(next);
    });
    quizMode.addEventListener('clickPrev', event => {
        const prev = questions.prev();
        quizMode.render(prev);
    });
}

main();
