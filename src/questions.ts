import { M1Data, QuestionItem, QuestionViewModel } from "./dataType";

export class Questions {
    items: QuestionItem[] = [];
    data: M1Data;
    current = -1;

    constructor(data: M1Data) {
        this.data = data;
    }

    filter(filter: string): void {
        let filterYear = 0;
        switch (filter) {
            case 'after-2015':
                filterYear = 2015;
                break;
            case 'this-year':
                const keys = Object.keys(this.data.year)
                    .filter((key) => key.trim() !== "" && Number.isInteger(Number(key)))
                    .map(Number);
                filterYear = keys.length === 0 ? 0 : Math.max(...keys);
                break;
            case 'all':
            default:
                filterYear = 0;
        }
        this.items = this.createItems(filterYear);
        this.items = this.shuffle(this.items);
    }
    createItems(year: number): QuestionItem[] {
        const items: QuestionItem[] = [];
        this.data.name.forEach(combi => {
            if (combi.latest < year) {
                return;
            }
            const filter = combi.data.filter(rank => rank.year >= year);
            if (filter.length === 0) {
                return;
            }
            const rank = filter[Math.floor(Math.random() * filter.length)];
            const question = `${rank.copy}`;
            const hint1 = `${rank.year} - ${rank.rank}`;
            const sorted = [...combi.data].sort((a, b) => b.year - a.year);
            const hint2 = sorted.map(rank => `${rank.year} - ${rank.copy}`).join('<br/>');
            let hint3 = '1st round: ';
            const prev = this.data.year?.[rank.year]?.[rank.order - 2];
            if (prev !== undefined) {
                hint3 += `${rank.order-1}. ${prev} - `;
            }
            hint3 += `${rank.order}. ???`;
            const next = this.data.year?.[rank.year]?.[rank.order];
            if (next !== undefined) {
                hint3 += ` - ${rank.order+1}. ${next}`;
            }
            if (rank.final !== null) {
                hint3 += '<br/>Final: ';
                const prev = this.data.final?.[rank.year]?.[rank.final - 2];
                if (prev !== undefined) {
                    hint3 += `${rank.final-1}. ${prev} - `;
                }
                hint3 += `${rank.final}. ???`;
                const next = this.data.final?.[rank.year]?.[rank.final];
                if (next !== undefined) {
                    hint3 += ` - ${rank.final+1}. ${next}`;
                }
            }

            const answer = combi.name;
            const item: QuestionItem = {
                question,
                hint1,
                hint2,
                hint3,
                answer,
            }
            items.push(item);
        });
        return items;
    }
    shuffle(items: QuestionItem[]): QuestionItem[] {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    next(): QuestionViewModel {
        this.current += 1;
        const item = this.items[this.current];
        return {
            item: item,
            hasNext: this.current+1 < this.items.length,
            hasPrev: this.current > 0,
        };
    }
    prev(): QuestionViewModel {
        this.current -= 1;
        const item = this.items[this.current];
        return {
            item: item,
            hasNext: this.current+1 < this.items.length,
            hasPrev: this.current > 0,
        };
    }
}
