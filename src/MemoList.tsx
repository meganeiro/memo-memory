import React from 'react';
import type { MemoItem } from './types'; // 型をインポート

// 親（App.tsx）から受け取るデータの型定義（★ここに関数を追加しました）
interface MemoListProps {
  memos: MemoItem[];
  onTogglePin: (id: string) => void;
  onDeleteMemo: (id: string) => void; // ⭕ 追加されたパーツ
}

// 受け取り側（★ここにも onDeleteMemo を追加しました）
export const MemoList: React.FC<MemoListProps> = ({ memos, onTogglePin, onDeleteMemo }) => {

  // もしメモが1件もない場合の表示
  if (memos.length === 0) {
    return (
      <p style={{ color: '#999', textAlign: 'center', marginTop: '30px' }}>
        保存されたメモはまだありません。上のフォームから追加してください。
      </p>
    );
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '5px' }}>メモ一覧</h3>

      {/* メモの配列をループ処理して1件ずつカードとして表示 */}
      {memos.map((memo) => (
        <div
          key={memo.id}
          style={{
            border: memo.isPinned ? '2px solid #ffca28' : '1px solid #e0e0e0',
            backgroundColor: memo.isPinned ? '#fffde7' : '#fff',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '15px',
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {/* ピン留めボタン */}
          <button
            onClick={() => onTogglePin(memo.id)}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
            title={memo.isPinned ? "ピン留めを解除" : "最上部にピン留め"}
          >
            {memo.isPinned ? '📌' : '📍'}
          </button>

          {/* ★ここを追加：削除（ゴミ箱）ボタン */}
          <button
            onClick={() => onDeleteMemo(memo.id)} // クリックされたら親の削除関数を実行
            style={{
              position: 'absolute',
              top: '45px', // ピン留めボタンの少し下に配置
              right: '15px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
            title="メモを削除"
          >
            🗑️
          </button>

          {/* タイトルとカテゴリ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              fontSize: '12px',
              backgroundColor: '#e0e0e0',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {memo.category}
            </span>
            <h4 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{memo.title}</h4>
          </div>

          {/* 本文 */}
          <p style={{ whiteSpace: 'pre-wrap', margin: '0 0 10px 0', color: '#333' }}>
            {memo.content}
          </p>

          {/* タグの一覧 */}
          {memo.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {memo.tags.map((tag, index) => (
                <span key={index} style={{ fontSize: '12px', color: '#0070f3', backgroundColor: '#e6f0ff', padding: '2px 8px', borderRadius: '12px' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 作成日時 */}
          <div style={{ fontSize: '11px', color: '#999', textAlign: 'right', marginTop: '10px' }}>
            {new Date(memo.createdAt).toLocaleString('ja-JP')}
          </div>
        </div>
      ))}
    </div>
  );
};