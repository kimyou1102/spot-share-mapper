
import React, { useState, useCallback } from 'react';
import { MapComponent } from '../components/MapComponent';
import { PlaceList } from '../components/PlaceList';
import { CategoryFilter } from '../components/CategoryFilter';
import { ShareModal } from '../components/ShareModal';
import { Header } from '../components/Header';
import { toast } from 'sonner';
import { Share, MapPin } from 'lucide-react';

export interface Place {
  id: string;
  name: string;
  category: 'restaurant' | 'cafe' | 'culture' | 'shopping' | 'other';
  coordinates: [number, number];
  address: string;
  author: string;
  comment?: string;
  isFavorite?: boolean;
}

const Index = () => {
  const [places] = useState<Place[]>([
    {
      id: '1',
      name: '스타벅스 강남점',
      category: 'cafe',
      coordinates: [127.0276, 37.4979],
      address: '서울 강남구 테헤란로',
      author: '김민수',
      comment: '조용하고 넓어서 작업하기 좋아요!',
      isFavorite: true
    },
    {
      id: '2',
      name: '교보문고 강남점',
      category: 'culture',
      coordinates: [127.0286, 37.4989],
      address: '서울 강남구 강남대로',
      author: '이지은',
      comment: '새로운 책을 찾기 좋은 곳',
    },
    {
      id: '3',
      name: '미정국수 0410',
      category: 'restaurant',
      coordinates: [127.0256, 37.4969],
      address: '서울 강남구 논현로',
      author: '박철수',
      comment: '진짜 맛있는 국수집! 꼭 가보세요',
      isFavorite: true
    },
    {
      id: '4',
      name: '코엑스몰',
      category: 'shopping',
      coordinates: [127.0590, 37.5125],
      address: '서울 강남구 영동대로',
      author: '정미영',
      comment: '쇼핑하기 좋은 곳',
    }
  ]);

  const [selectedArea, setSelectedArea] = useState<{
    bounds: [[number, number], [number, number]] | null;
  }>({ bounds: null });
  
  const [activeCategories, setActiveCategories] = useState<string[]>([
    'restaurant', 'cafe', 'culture', 'shopping', 'other'
  ]);
  
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const filteredPlaces = places.filter(place => 
    activeCategories.includes(place.category)
  );

  const handleAreaSelect = useCallback((bounds: [[number, number], [number, number]]) => {
    setSelectedArea({ bounds });
    toast.success('영역이 선택되었습니다!');
  }, []);

  const handlePlaceSelect = useCallback((place: Place) => {
    setSelectedPlace(place);
  }, []);

  const handleShare = () => {
    if (!selectedArea.bounds) {
      toast.error('먼저 지도에서 영역을 선택해주세요!');
      return;
    }
    setShowShareModal(true);
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      bounds: JSON.stringify(selectedArea.bounds),
      categories: activeCategories.join(','),
      places: JSON.stringify(filteredPlaces.map(p => p.id))
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <MapPin className="text-orange-500" />
            우리의 장소 공유하기
          </h1>
          <p className="text-gray-600">지도에서 영역을 선택하고 친구들과 좋은 장소를 공유해보세요!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">지도에서 영역 선택</h2>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Share size={18} />
                  공유하기
                </button>
              </div>
              <div className="h-96 lg:h-[500px]">
                <MapComponent
                  places={filteredPlaces}
                  selectedPlace={selectedPlace}
                  onAreaSelect={handleAreaSelect}
                  onPlaceSelect={handlePlaceSelect}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CategoryFilter
              categories={activeCategories}
              onChange={setActiveCategories}
            />
            <PlaceList
              places={filteredPlaces}
              selectedPlace={selectedPlace}
              onPlaceSelect={handlePlaceSelect}
            />
          </div>
        </div>
      </main>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareLink={generateShareLink()}
        selectedArea={selectedArea.bounds}
        placesCount={filteredPlaces.length}
      />
    </div>
  );
};

export default Index;
