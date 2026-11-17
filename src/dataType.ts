type YearData = Record<string, string[]>
type FinalData = Record<string, string[]>
type RankData = {
    copy: string,
    final: number|null,
    order: number,
    rank: number,
    year: number,
}

type NameData = {
    name: string,
    latest: number,
    data: RankData[],
}

export type M1Data = {
    year: YearData,
    final: FinalData,
    name: NameData[],
}
