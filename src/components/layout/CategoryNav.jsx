import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import { List } from 'lucide-react';

export default function CategoryNav() {
  const { categories } = useProductStore();

  return (
    <div className="bg-surface border-b border-border shadow-sm hidden md:block">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-6 overflow-x-auto py-3">
          <li>
            <Link to="/products" className="flex items-center gap-2 font-bold text-green-700 hover:text-green-600 border-r pr-6 border-gray-300">
              <List size={20} />
              <span>Tất cả danh mục</span>
            </Link>
          </li>
          {categories.slice(0, 10).map((cat) => (
            <li key={cat.id}>
              <Link 
                to={`/categories/${cat.slug}`} 
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap transition-colors"
              >
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
