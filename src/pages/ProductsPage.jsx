import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CategoryNav from '../components/layout/CategoryNav';
import ProductCard from '../components/customer/ProductCard';
import { useProductStore } from '../store/productStore';
import client from '../api/client';
import {
  Search, SlidersHorizontal, ChevronLeft, ChevronRight,
  LayoutGrid, List, X, Tag, Flame, Star, ArrowUpDown,
  ChevronDown
} from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá: Thấp → Cao' },
  { value: 'price_desc', label: 'Giá: Cao → Thấp' },
  { value: 'name_asc', label: 'Tên: A → Z' },
];

const PRICE_RANGES = [
  { label: 'Tất cả mức giá', min: null, max: null },
  { label: 'Dưới 50.000đ', min: 0, max: 50000 },
  { label: '50.000 – 150.000đ', min: 50000, max: 150000 },
  { label: '150.000 – 500.000đ', min: 150000, max: 500000 },
  { label: 'Trên 500.000đ', min: 500000, max: null },
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { categories, fetchCategories } = useProductStore();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(0); // index of PRICE_RANGES
  const [showSale, setShowSale] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [page, setPage] = useState(1);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const PER_PAGE = 20;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = { per_page: PER_PAGE, page };
      if (selectedCategory) params.category_id = selectedCategory;
      if (search) params.search = search;
      if (showSale) params.flash_sale = true;

      const res = await client.get('/products', { params });
      let data = res.data?.data?.data || res.data?.data || [];
      const totalCount = res.data?.data?.total || data.length;

      // Client-side price filter
      const range = PRICE_RANGES[priceRange];
      if (range.min !== null || range.max !== null) {
        data = data.filter(p => {
          const effectivePrice = p.sale_price || p.price;
          if (range.min !== null && effectivePrice < range.min) return false;
          if (range.max !== null && effectivePrice > range.max) return false;
          return true;
        });
      }

      // Client-side sort
      data = [...data].sort((a, b) => {
        const priceA = a.sale_price || a.price;
        const priceB = b.sale_price || b.price;
        if (sortBy === 'price_asc') return priceA - priceB;
        if (sortBy === 'price_desc') return priceB - priceA;
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name, 'vi');
        return b.id - a.id; // newest
      });

      setProducts(data);
      setTotal(totalCount);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, search, sortBy, priceRange, showSale, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId === selectedCategory ? '' : catId);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSortBy('newest');
    setPriceRange(0);
    setShowSale(false);
    setPage(1);
  };

  const hasActiveFilters = search || selectedCategory || priceRange !== 0 || showSale || sortBy !== 'newest';
  const totalPages = Math.ceil(total / PER_PAGE);
  const selectedCategoryName = categories.find(c => String(c.id) === String(selectedCategory))?.name;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CategoryNav />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {selectedCategoryName ? `📦 ${selectedCategoryName}` : '🛒 Tất cả sản phẩm'}
              </h1>
              <p className="text-green-100 mt-1 text-sm">
                {isLoading ? 'Đang tải...' : `Tìm thấy ${products.length} sản phẩm`}
              </p>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex w-full md:w-auto md:min-w-[360px]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-l-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95"
                />
                {search && (
                  <button type="button" onClick={() => { setSearch(''); setPage(1); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>
              <button type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 rounded-r-xl font-semibold text-sm transition-colors">
                Tìm
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-green-600" /> Bộ lọc
                </span>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                    <X size={12} /> Xóa lọc
                  </button>
                )}
              </div>

              {/* Quick filters */}
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Nổi bật</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={showSale} onChange={e => { setShowSale(e.target.checked); setPage(1); }}
                      className="rounded text-green-600 focus:ring-green-500" />
                    <span className="text-sm text-gray-700 group-hover:text-green-700 flex items-center gap-1.5">
                      <Flame size={15} className="text-orange-500" /> Đang giảm giá
                    </span>
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Danh mục</p>
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1 custom-scroll">
                  <button
                    onClick={() => { setSelectedCategory(''); setPage(1); }}
                    className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors font-medium ${!selectedCategory ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    Tất cả danh mục
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(String(cat.id))}
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${String(selectedCategory) === String(cat.id) ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="px-5 py-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Mức giá</p>
                <div className="flex flex-col gap-1.5">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => { setPriceRange(i); setPage(1); }}
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${priceRange === i ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {priceRange === i && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />}
                      <span className={priceRange !== i ? 'ml-3.5' : ''}>{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              {/* Mobile filter button */}
              <button onClick={() => setShowFilterPanel(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:border-green-500 transition-colors">
                <SlidersHorizontal size={16} /> Bộ lọc
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-green-500" />}
              </button>

              {/* Active filter chips */}
              <div className="flex flex-wrap gap-2 flex-1">
                {selectedCategoryName && (
                  <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                    <Tag size={12} /> {selectedCategoryName}
                    <button onClick={() => { setSelectedCategory(''); setPage(1); }}><X size={12} /></button>
                  </span>
                )}
                {showSale && (
                  <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-200">
                    <Flame size={12} /> Flash sale
                    <button onClick={() => { setShowSale(false); setPage(1); }}><X size={12} /></button>
                  </span>
                )}
                {priceRange !== 0 && (
                  <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
                    {PRICE_RANGES[priceRange].label}
                    <button onClick={() => { setPriceRange(0); setPage(1); }}><X size={12} /></button>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 ml-auto">
                {/* Sort */}
                <div className="relative">
                  <button onClick={() => setShowSortDropdown(v => !v)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:border-green-500 transition-colors">
                    <ArrowUpDown size={15} />
                    {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                    <ChevronDown size={15} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-1 z-30 bg-white rounded-xl shadow-lg border border-gray-100 w-48 overflow-hidden">
                      {SORT_OPTIONS.map(opt => (
                        <button key={opt.value}
                          onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); setPage(1); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${sortBy === opt.value ? 'text-green-700 font-semibold bg-green-50' : 'text-gray-700'}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* View mode */}
                <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <LayoutGrid size={18} />
                  </button>
                  <button onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid / List */}
            {isLoading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-5`}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-8 bg-gray-100 rounded-lg mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-6 max-w-xs">Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc của bạn.</p>
                <button onClick={resetFilters}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Xóa bộ lọc
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              /* List view */
              <div className="flex flex-col gap-3">
                {products.map(p => {
                  const hasSale = p.sale_price && p.sale_price < p.price;
                  return (
                    <div key={p.id}
                      onClick={() => navigate(`/products/${p.id}`)}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-5 p-4 group">
                      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
                        {hasSale && (
                          <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                            -{Math.round((1 - p.sale_price / p.price) * 100)}%
                          </span>
                        )}
                        <img src={p.thumbnail || '/placeholder.png'} alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-2 text-sm md:text-base">{p.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{p.category?.name}</p>
                        <div className="mt-2 flex items-baseline gap-3">
                          <span className="text-green-600 font-bold text-lg">
                            {(hasSale ? p.sale_price : p.price).toLocaleString('vi-VN')}đ
                          </span>
                          {hasSale && (
                            <span className="text-gray-400 text-sm line-through">{p.price.toLocaleString('vi-VN')}đ</span>
                          )}
                          <span className="text-gray-400 text-xs">/{p.unit}</span>
                        </div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        className="shrink-0 self-center px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors hidden sm:block">
                        Thêm vào giỏ
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl border border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white">
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) pageNum = i + 1;
                  else if (page <= 4) pageNum = i + 1;
                  else if (page >= totalPages - 3) pageNum = totalPages - 6 + i;
                  else pageNum = page - 3 + i;
                  return (
                    <button key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors border ${page === pageNum
                        ? 'bg-green-600 text-white border-green-600 shadow-sm'
                        : 'border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600 bg-white'}`}>
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl border border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      {showFilterPanel && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowFilterPanel(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span className="font-bold text-gray-800 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-green-600" /> Bộ lọc
              </span>
              <button onClick={() => setShowFilterPanel(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Nổi bật</p>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={showSale} onChange={e => { setShowSale(e.target.checked); setPage(1); }}
                    className="rounded text-green-600" />
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">
                    <Flame size={15} className="text-orange-500" /> Đang giảm giá
                  </span>
                </label>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Danh mục</p>
                <div className="flex flex-col gap-1">
                  <button onClick={() => { setSelectedCategory(''); setPage(1); }}
                    className={`text-left text-sm px-3 py-2 rounded-lg ${!selectedCategory ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    Tất cả danh mục
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => { handleCategorySelect(String(cat.id)); setShowFilterPanel(false); }}
                      className={`text-left text-sm px-3 py-2 rounded-lg ${String(selectedCategory) === String(cat.id) ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Mức giá</p>
                <div className="flex flex-col gap-1.5">
                  {PRICE_RANGES.map((range, i) => (
                    <button key={i} onClick={() => { setPriceRange(i); setPage(1); }}
                      className={`text-left text-sm px-3 py-2 rounded-lg ${priceRange === i ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t flex gap-3">
              <button onClick={() => { resetFilters(); setShowFilterPanel(false); }}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Xóa lọc
              </button>
              <button onClick={() => setShowFilterPanel(false)}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700">
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close sort dropdown on outside click */}
      {showSortDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setShowSortDropdown(false)} />
      )}

      <Footer />
    </div>
  );
}
