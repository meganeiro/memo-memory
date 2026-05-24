// メモ1件あたりのデータ構造の定義
export interface MemoItem {
  id: string;          // 一意のID
  title: string;       // タイトル
  content: string;     // 本文
  category: string;     // カテゴリ
  tags: string[];      // 検索用タグの配列
  createdAt: string;   // 作成日時
  isPinned: boolean;   // ピン留めフラグ
}

// 検索・絞り込みのための状態（ステート）の型定義
export interface FilterState {
  keyword: string;     // 検索窓に入力された文字列
  selectedCategory: string; // 選択されているカテゴリ（"" の場合はすべて）
}