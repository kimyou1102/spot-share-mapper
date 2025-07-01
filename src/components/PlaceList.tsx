
import React from 'react';
import { Place } from '../pages/Index';
import { MapPin } from 'lucide-react';

interface PlaceListProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
}

export const PlaceList: React.FC<PlaceListProps> = ({
  places,
  selectedPlace,
  onPlaceSelect
}) => {
  const getCategoryLabel = (category: string) => {
    const labels = {
      restaurant: '맛집',
      cafe: '카페',
      culture: '문화시설',
      shopping: '쇼핑',
      other: '기타'
    };
    return labels[category as keyof typeof labels] || labels.other;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      restaurant: 'bg-red-100 text-red-800',
      cafe: 'bg-blue-100 text-blue-800',
      culture: 'bg-purple-100 text-purple-800',
      shopping: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MapPin size={20} className="text-orange-500" />
          장소 목록 ({places.length})
        </h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {places.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>표시할 장소가 없습니다.</p>
            <p className="text-sm mt-1">카테고리 필터를 확인해보세요.</p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {places.map((place) => (
              <div
                key={place.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  selectedPlace?.id === place.id ? 'bg-orange-50 border border-orange-200' : 'bg-white border border-gray-100'
                }`}
                onClick={() => onPlaceSelect(place)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-800">{place.name}</h4>
                      {place.isFavorite && (
                        <span className="text-yellow-500">⭐</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{place.address}</p>
                    {place.comment && (
                      <p className="text-sm text-gray-700 mb-2 italic">"{place.comment}"</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(place.category)}`}>
                        {getCategoryLabel(place.category)}
                      </span>
                      <span className="text-xs text-gray-500">by {place.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
