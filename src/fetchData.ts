export async function fetchData(url: string) {
    let data = null;
    try {
        const response = await fetch(url);

        // レスポンスが正常かチェック
        if (!response.ok) {
          throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }

        // JSONとしてパース
        data = await response.json();

    } catch (error) {
        console.error('データの取得に失敗しました:', error);
    }
    return data;
}
