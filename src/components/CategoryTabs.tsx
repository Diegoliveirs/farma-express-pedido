
const categories = [
  { id: 'medicamentos', name: 'Medicamentos', emoji: '💊' },
  { id: 'vitaminas', name: 'Vitaminas', emoji: '🌿' },
  { id: 'cuidado', name: 'Cuidado Pessoal', emoji: '✨' },
  { id: 'higiene', name: 'Higiene', emoji: '🧼' },
  { id: 'bebe', name: 'Bebê', emoji: '👶' },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-5 gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 active:scale-95'
                }`}
              >
                <span className="text-2xl mb-1">{category.emoji}</span>
                <span className="text-xs font-medium text-center leading-tight">
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
