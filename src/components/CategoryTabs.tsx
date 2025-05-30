
import { Pill, Heart, Sparkles, Baby, Droplets } from 'lucide-react';

const categories = [
  { id: 'medicamentos', name: 'Medicamentos', icon: Pill },
  { id: 'vitaminas', name: 'Vitaminas', icon: Heart },
  { id: 'cuidado', name: 'Cuidado Pessoal', icon: Sparkles },
  { id: 'higiene', name: 'Higiene', icon: Droplets },
  { id: 'bebe', name: 'Bebê', icon: Baby },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex flex-col items-center min-w-[80px] py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
