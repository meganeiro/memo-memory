import React from 'react';
import type { FilterState } from './types'; // 型をインポート

// 親（App.tsx）から受け取るデータと関数の型定義
interface SearchBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onFilterChange }) => {

  // キーワードが入力された時の処理
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,         // 今のカテゴリ状態をキープしながら
      keyword: e.target.value // キーワードだけを更新
    });
  };

  // カテゴリが選択された時の処理
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,                 // 今のキーワード状態をキープしながら
      selectedCategory: e.target.value // カテゴリだけを更新
    });
  };

  return (
    <div style={{
      border: '1px solid #0070f3',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#f0f7ff' // フォームと区別しやすいように薄い青に
    }}>
      <h3 style={{ marginTop: 0, color: '#0070f3' }}>🔍 メモを検索・絞り込み</h3>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {/* キーワード検索入力欄 */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label htmlFor="search-keyword" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
            キーワード (タイトル・本文・タグ):
          </label>
          <input
            id="search-keyword"
            type="text"
            value={filters.keyword}
            onChange={handleKeywordChange}
            placeholder="探したい文字を入力..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* カテゴリ絞り込みセレクトボックス */}
        <div style={{ width: '150px' }}>
          <label htmlFor="search-category" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
            カテゴリ:
          </label>
          <select
            id="search-category"
            value={filters.selectedCategory}
            onChange={handleCategoryChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '38px' }}
          >
            <option value="">すべて表示</option>
            <option value="料理">料理</option>
            <option value="技術メモ">技術メモ</option>
            <option value="その他">その他</option>
          </select>
        </div>
      </div>
    </div>
  );
};