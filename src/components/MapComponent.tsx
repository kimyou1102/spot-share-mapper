
import React, { useRef, useState, useCallback } from 'react';
import { Place } from '../pages/Index';

interface MapComponentProps {
  places: Place[];
  selectedPlace: Place | null;
  onAreaSelect: (bounds: [[number, number], [number, number]]) => void;
  onPlaceSelect: (place: Place) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  places,
  selectedPlace,
  onAreaSelect,
  onPlaceSelect
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentSelection, setCurrentSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      restaurant: '#ef4444', // red
      cafe: '#3b82f6', // blue  
      culture: '#8b5cf6', // purple
      shopping: '#10b981', // green
      other: '#6b7280' // gray
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      restaurant: '🍽️',
      cafe: '☕',
      culture: '🎭',
      shopping: '🛍️',
      other: '📍'
    };
    return icons[category as keyof typeof icons] || icons.other;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsSelecting(true);
    setStartPoint({ x, y });
    setCurrentSelection({ x, y, width: 0, height: 0 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !startPoint || !mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const width = Math.abs(currentX - startPoint.x);
    const height = Math.abs(currentY - startPoint.y);
    const x = Math.min(startPoint.x, currentX);
    const y = Math.min(startPoint.y, currentY);
    
    setCurrentSelection({ x, y, width, height });
  }, [isSelecting, startPoint]);

  const handleMouseUp = useCallback(() => {
    if (!isSelecting || !currentSelection || currentSelection.width < 20 || currentSelection.height < 20) {
      setIsSelecting(false);
      setStartPoint(null);
      setCurrentSelection(null);
      return;
    }
    
    // Convert pixel coordinates to mock lat/lng bounds
    const bounds: [[number, number], [number, number]] = [
      [127.0 + (currentSelection.x / 800) * 0.1, 37.5 - (currentSelection.y / 600) * 0.1],
      [127.0 + ((currentSelection.x + currentSelection.width) / 800) * 0.1, 37.5 - ((currentSelection.y + currentSelection.height) / 600) * 0.1]
    ];
    
    onAreaSelect(bounds);
    setIsSelecting(false);
    setStartPoint(null);
  }, [isSelecting, currentSelection, onAreaSelect]);

  return (
    <div 
      ref={mapRef}
      className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      {/* Area Selection */}
      {currentSelection && (
        <div
          className="absolute border-2 border-orange-500 bg-orange-200 bg-opacity-30 pointer-events-none"
          style={{
            left: currentSelection.x,
            top: currentSelection.y,
            width: currentSelection.width,
            height: currentSelection.height,
          }}
        />
      )}

      {/* Place Markers */}
      {places.map((place, index) => (
        <div
          key={place.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
            selectedPlace?.id === place.id ? 'scale-125 z-20' : 'z-10'
          }`}
          style={{
            left: `${20 + (index % 4) * 20}%`,
            top: `${30 + Math.floor(index / 4) * 25}%`,
          }}
          onClick={() => onPlaceSelect(place)}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white"
            style={{ backgroundColor: getCategoryColor(place.category) }}
          >
            <span className="text-xs">{getCategoryIcon(place.category)}</span>
          </div>
          {place.isFavorite && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">⭐</span>
            </div>
          )}
          
          {selectedPlace?.id === place.id && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 w-64 z-30">
              <h3 className="font-semibold text-gray-800 mb-1">{place.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{place.address}</p>
              {place.comment && (
                <p className="text-sm text-gray-700 mb-2">"{place.comment}"</p>
              )}
              <p className="text-xs text-gray-500">by {place.author}</p>
            </div>
          )}
        </div>
      ))}

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-md">
        <p className="text-sm text-gray-700">
          <strong>드래그</strong>하여 영역을 선택하세요
        </p>
        <p className="text-xs text-gray-500 mt-1">
          마커를 클릭하면 상세 정보를 볼 수 있습니다
        </p>
      </div>
    </div>
  );
};
