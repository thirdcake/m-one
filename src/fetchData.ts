export async function fetchData() {
    let data = null;
    try {
        const response = await fetch('/dist/m1.json');

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
