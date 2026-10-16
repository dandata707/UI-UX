import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  CheckCircle2,
  Circle,
  Trash2,
  Plus,
  Send,
  Filter,
  Check,
  Pin,
  Sparkles,
} from 'lucide-react';
import { CommentItem, ScreenId } from '../types/wireframe';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: CommentItem[];
  onAddComment: (comment: Omit<CommentItem, 'id' | 'timestamp'>) => void;
  onToggleResolve: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  selectedCommentId: string | null;
  onSelectComment: (comment: CommentItem) => void;
  pendingPin: { screenId: ScreenId; xPercent: number; yPercent: number } | null;
  onClearPendingPin: () => void;
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
  onToggleResolve,
  onDeleteComment,
  selectedCommentId,
  onSelectComment,
  pendingPin,
  onClearPendingPin,
}) => {
  const [activeTab, setActiveTab] = useState<ScreenId | 'all'>('all');
  const [author, setAuthor] = useState('GV / Bạn cùng nhóm');
  const [text, setText] = useState('');
  const [targetScreen, setTargetScreen] = useState<ScreenId>(
    pendingPin ? pendingPin.screenId : 'results'
  );

  React.useEffect(() => {
    if (pendingPin) {
      setTargetScreen(pendingPin.screenId);
    }
  }, [pendingPin]);

  if (!isOpen) return null;

  const screenNames: Record<ScreenId, string> = {
    search: 'MÀN 1 – TÌM XE',
    calendar: 'MÀN 1a – CHỌN THỜI GIAN',
    location: 'MÀN 1b – ĐIỂM GIAO NHẬN XE',
    results: 'MÀN 2 – DANH SÁCH KẾT QUẢ',
    'results-dropdown': 'MÀN 2a – DROPDOWN SẮP XẾP',
    detail: 'MÀN 3 – CHI TIẾT PHƯƠNG ÁN',
    'share-single': 'MÀN 3a – CHIA SẺ 1 XE',
    'compare-1': 'MÀN 4a – SO SÁNH 1 XE',
    'compare-2': 'MÀN 4b – SO SÁNH 2 XE',
    'compare-3': 'MÀN 4c – SO SÁNH 3 XE',
    share: 'MÀN 5 – CHIA SẺ BẢNG SO SÁNH',
    saved: 'MÀN 6 – ĐÃ LƯU',
  };

  const filteredComments =
    activeTab === 'all' ? comments : comments.filter((c) => c.screenId === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddComment({
      screenId: pendingPin ? pendingPin.screenId : targetScreen,
      xPercent: pendingPin ? pendingPin.xPercent : 50,
      yPercent: pendingPin ? pendingPin.yPercent : 40,
      author: author.trim() || 'Người góp ý',
      text: text.trim(),
      resolved: false,
    });

    setText('');
    onClearPendingPin();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 max-w-full bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <MessageSquare size={16} />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">Bình luận & Góp ý Wireframe</h2>
            <p className="text-[11px] text-slate-500">
              {comments.length} góp ý • {comments.filter((c) => c.resolved).length} đã xử lý
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Screen Filter Tabs */}
      <div className="p-2 border-b border-slate-100 flex gap-1 overflow-x-auto text-xs bg-slate-50/50">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          Tất cả ({comments.length})
        </button>
        {(
          [
            'search',
            'calendar',
            'location',
            'search-filled',
            'results',
            'results-dropdown',
            'detail',
            'share-single',
            'compare-1',
            'compare-3',
            'share',
            'saved',
          ] as ScreenId[]
        ).map((sId) => {
          const count = comments.filter((c) => c.screenId === sId).length;
          return (
            <button
              key={sId}
              type="button"
              onClick={() => setActiveTab(sId)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors cursor-pointer ${
                activeTab === sId
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {screenNames[sId].split(':')[0]} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Pending Pin Notice */}
      {pendingPin && (
        <div className="bg-amber-50 border-b border-amber-200 p-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-1.5 font-medium">
            <Pin size={13} className="text-amber-600" />
            <span>Đã ghim vị trí tại {screenNames[pendingPin.screenId]}</span>
          </div>
          <button
            onClick={onClearPendingPin}
            className="text-[11px] text-amber-700 underline hover:text-amber-900"
          >
            Hủy ghim
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredComments.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            <MessageSquare size={28} className="mx-auto mb-2 opacity-40" />
            <p>Chưa có bình luận nào ở mục này.</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Bật chế độ bình luận hoặc nhập form bên dưới để thêm góp ý.
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => {
            const isSelected = selectedCommentId === comment.id;
            return (
              <div
                key={comment.id}
                onClick={() => onSelectComment(comment)}
                className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/60 shadow-xs'
                    : comment.resolved
                    ? 'border-slate-200 bg-slate-50/80 opacity-75'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{comment.author}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {screenNames[comment.screenId].split(':')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleResolve(comment.id);
                      }}
                      className={`p-1 rounded text-[11px] flex items-center gap-1 cursor-pointer ${
                        comment.resolved
                          ? 'text-emerald-700 hover:text-emerald-800'
                          : 'text-slate-400 hover:text-emerald-600'
                      }`}
                      title={comment.resolved ? 'Đánh dấu chưa xử lý' : 'Đánh dấu đã xử lý'}
                    >
                      {comment.resolved ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <span className="text-[10px] font-medium">Đã xong</span>
                        </>
                      ) : (
                        <Circle size={13} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteComment(comment.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-red-600 cursor-pointer"
                      title="Xoá góp ý"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <p
                  className={`text-slate-700 leading-relaxed text-[11px] ${
                    comment.resolved ? 'line-through text-slate-400' : ''
                  }`}
                >
                  {comment.text}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-100">
                  <span>{comment.timestamp}</span>
                  <span className="text-amber-700 font-medium">
                    Vị trí: x{comment.xPercent}% y{comment.yPercent}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Comment Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
          <span>Thêm bình luận mới</span>
          <select
            value={pendingPin ? pendingPin.screenId : targetScreen}
            onChange={(e) => setTargetScreen(e.target.value as ScreenId)}
            className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 outline-none"
          >
            {(
              [
                'search',
                'location',
                'results',
                'detail',
                'compare-1',
                'compare-3',
                'share',
                'saved',
              ] as ScreenId[]
            ).map((sId) => (
              <option key={sId} value={sId}>
                {screenNames[sId]}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tên người góp ý (VD: GV Hướng Dẫn, Nhóm UX...)"
          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-800"
        />

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nội dung nhận xét về bố cục, Task Flow, chữ, hoặc nút bấm..."
            rows={2}
            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 outline-none focus:border-slate-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Send size={13} />
          <span>Gửi bình luận góp ý</span>
        </button>
      </form>
    </div>
  );
};
