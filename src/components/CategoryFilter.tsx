
import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  onChange: (categories: string[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onChange
}) => {
  const allCategories = [
    { id: 'restaurant', label: '맛집', icon: '🍽️', color: 'border-red-200 text-red-700' },
    { id: 'cafe', label: '카페', icon: '☕', color: 'border-blue-200 text-blue-700' },
    { id: 'culture', label: '문화시설', icon: '🎭', color: 'border-purple-200 text-purple-700' },
    { id: 'shopping', label: '쇼핑', icon: '🛍️', color: 'border-green-200 text-green-700' },
    { id: 'other', label: '기타', icon: '📍', color: 'border-gray-200 text-gray-700' }
  ];

  const toggleCategory = (categoryId: string) => {
    if (categories.includes(categoryId)) {
      onChange(categories.filter(id => id !== categoryId));
    } else {
      onChange([...categories, categoryId]);
    }
  };

  const toggleAll = () => {
    if (categories.length === allCategories.length) {
      onChange([]);
    } else {
      onChange(allCategories.map(cat => cat.id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter size={20} className="text-orange-500" />
            카테고리 필터
          </h3>
          <button
            onClick={toggleAll}
            className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
          >
            {categories.length === allCategories.length ? '전체 해제' : '전체 선택'}
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {allCategories.map((category) => (
          <label
            key={category.id}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
              categories.includes(category.id)
                ? `${category.color} bg-opacity-10 border-opacity-50`
                : 'border-gray-200 text-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={categories.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
              className="sr-only"
            />
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.label}</span>
            <div className={`ml-auto w-4 h-4 rounded border-2 flex items-center justify-center ${
              categories.includes(category.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
            }`}>
              {categories.includes(category.id) && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
