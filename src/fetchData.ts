import { M1Data } from "./dataType";

export async function fetchData(url_string: string | undefined): Promise<M1Data|null> {
    if (!url_string) {
        return null;
    }
    let url;
    try {
        url = new URL(url_string, location.href);
    } catch {
        console.error('invalid url:', url_string);
        return null;
    }
    if (!['http:', 'https:'].includes(url.protocol)) {
        return null;
    }
    if (url.origin !== window.location.origin) {
        return null;
    }
    try {
        const response = await fetch(url, {
            credentials: 'same-origin',
        });

        // レスポンスが正常かチェック
        if (!response.ok) {
          throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }

        // JSONとしてパース
        const parsed: unknown = await response.json();
        return parsed as M1Data;

    } catch (error) {
        console.error('データの取得に失敗しました:', error);
    }
    return null;
}
