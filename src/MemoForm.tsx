import React, { useState } from 'react';

// 親（App.tsx）から受け取る関数の型定義
interface MemoFormProps {
  onAdd: (title: string, content: string, category: string, tags: string[]) => void;
}

export const MemoForm: React.FC<MemoFormProps> = ({ onAdd }) => {
  // 1. 入力フォーム専用のステート（状態）
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('その他'); // 初期値
  const [tagInput, setTagInput] = useState('');      // カンマ区切りの文字列として入力してもらう

  // 2. 送信ボタンが押された時のアルゴリズム
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 予期せぬ画面リロードを防ぐ
    setTitle('');
    setContent('');
    setCategory('その他');
    setTagInput('');

    // タイトルか本文が空っぽなら何もしない（ガード処理）
    if (!title.trim() || !content.trim()) {
      alert('タイトルと本文を入力してください');
      return;
    }

    // タグの文字列を配列に変換する処理
    // 例: "下味冷凍, 時短" -> ["下味冷凍", "時短"]
    const tagsArray = tagInput
      .split(',') // カンマで区切る
      .map(tag => tag.trim()) // 前後の余計な空白を消す
      .filter(tag => tag !== ''); // 空っぽの要素は除外する

    // 親コンポーネント（App.tsx）にデータを渡して登録してもらう
    onAdd(title, content, category, tagsArray);

    // 次の入力のためにフォームを空っぽにする（初期化）
    setTitle('');
    setContent('');
    setCategory('その他');
    setTagInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0 }}>新しいメモを追加</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          placeholder="例：豚肉の下味冷凍レシピ"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>本文:</label>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '80px' }}
          placeholder="例：醤油大さじ2、みりん大さじ1、生姜すりおろし..."
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="category-select" style={{ display: 'block', fontWeight: 'bold' }}>カテゴリ:</label>
        <select id="category-select" onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', width: '100%' }}>
          <option value="料理">料理</option>
          <option value="技術メモ">技術メモ</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>タグ (カンマ区切り):</label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          placeholder="例：下味冷凍, 時短, 豚肉"
        />
      </div>


    <div style={{ marginBottom: '10px'}}>
      <button type="submit" style={{ padding: '10px 15px', margin:'0px 10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        メモを保存
      </button>

      <button
        type="button"
        style={{ padding: '10px 15px', margin:'0px 10px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        onClick={() => {
          setTitle('');
          setContent('');
          setCategory('その他');
          setTagInput('');
        }}>
        クリア
      </button>
    </div>
    </form>
  );
};