import React, { useState, useMemo } from 'react';
import { MemoForm } from './MemoForm';
import { MemoList } from './MemoList';
import { SearchBar } from './SearchBar';
import type { MemoItem, FilterState } from './types';

export const App: React.FC = () => {
  // 1. 状態管理（ステート）の定義
  // 最初にブラウザの保存領域（localStorage）を見に行き、データがあればそれを使い、なければ空にする
  const [memos, setMemos] = useState<MemoItem[]>(() => {
    const savedMemos = localStorage.getItem('memos-data');
    return savedMemos ? JSON.parse(savedMemos) : [];
  });

  // メモが追加されたりピン留めされたりして、memosの中身が変わるたびに自動でブラウザに保存する
  React.useEffect(() => {
    localStorage.setItem('memos-data', JSON.stringify(memos));
  }, [memos]);

  const [filters, setFilters] = useState<FilterState>({ keyword: '', selectedCategory: '' });

  // 2. メモの追加ロジック
  const handleAddMemo = (title: string, content: string, category: string, tags: string[]) => {
    const newMemo: MemoItem = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      tags,
      createdAt: new Date().toISOString(),
      isPinned: false
    };
    setMemos([newMemo, ...memos]);
  };

  // 3. ピン留めの切り替えロジック
  const handleTogglePin = (id: string) => {
    setMemos(memos.map(memo =>
      memo.id === id ? { ...memo, isPinned: !memo.isPinned } : memo
    ));
  }; // ⭕ ここで一回きれいに閉じました！

  // 3.5. メモの削除ロジック（ピン留め関数の外に独立させました）
  const handleDeleteMemo = (id: string) => {
    // ユーザーに確認を入れる（誤操作の防止：ポートフォリオ評価ポイント！）
    if (window.confirm('このメモを削除してもよろしいですか？')) {
      // 削除したいid「以外のもの」だけで新しい配列を作る
      setMemos(memos.filter(memo => memo.id !== id));
    }
  };

  // 4. データの絞り込みとソート
  const filteredAndSortedMemos = useMemo(() => {
    return memos
      .filter((memo) => {
        if (filters.selectedCategory && memo.category !== filters.selectedCategory) {
          return false;
        }
        if (filters.keyword) {
          const query = filters.keyword.toLowerCase();
          const matchTitle = memo.title.toLowerCase().includes(query);
          const matchContent = memo.content.toLowerCase().includes(query);
          const matchTags = memo.tags.some(tag => tag.toLowerCase().includes(query));
          return matchTitle || matchContent || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [memos, filters]);

  // 5. 画面の描画
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>備忘録マネージャー</h1>

      {/* 1. 入力フォーム */}
      <MemoForm onAdd={handleAddMemo} />

      {/* 2. 検索バー */}
      <SearchBar filters={filters} onFilterChange={setFilters} />

      <p style={{ color: '#666' }}>現在保存されているメモ: {memos.length} 件</p>

      {/* 3. メモ一覧（onDeleteMemo を追加して引き渡す） */}
      <MemoList
        memos={filteredAndSortedMemos}
        onTogglePin={handleTogglePin}
        onDeleteMemo={handleDeleteMemo}
      />
    </div>
  );
};

export default App;