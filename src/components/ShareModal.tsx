
import React, { useState } from 'react';
import { Share, Link, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareLink: string;
  selectedArea: [[number, number], [number, number]] | null;
  placesCount: number;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareLink,
  selectedArea,
  placesCount
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast.success('링크가 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Share className="text-orange-500" size={24} />
              장소 공유하기
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-orange-700 mb-2">
                <MapPin size={18} />
                <span className="font-medium">선택된 영역 정보</span>
              </div>
              <p className="text-sm text-gray-600">
                총 <strong>{placesCount}개</strong>의 장소가 포함되어 있습니다.
              </p>
              {selectedArea && (
                <p className="text-xs text-gray-500 mt-1">
                  좌표: [{selectedArea[0][0].toFixed(4)}, {selectedArea[0][1].toFixed(4)}] ~ 
                  [{selectedArea[1][0].toFixed(4)}, {selectedArea[1][1].toFixed(4)}]
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                공유 링크
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"
                />
                <button
                  onClick={copyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600'
                  }`}
                >
                  <Link size={16} />
                  {copied ? '복사됨!' : '복사'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                copyLink();
                setTimeout(() => onClose(), 1000);
              }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200"
            >
              복사 후 닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
