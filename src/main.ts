import { fetchData } from "./fetchData";
import { M1Data } from "./dataType";
import { shuffle } from "./shuffle";

async function main() {
    const data = await fetchData() as M1Data|null;
    if (data === null) {
        console.error('data is null.');
        return;
    }
    const questions = shuffle(data);
}

main();
