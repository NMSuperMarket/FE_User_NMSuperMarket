import api from '@/services/api'
import { resolveMediaUrl } from '@/services/media'

function normalizeCategory(category = {}) {
  return {
    ...category,
    image_url: category.image_url ?? resolveMediaUrl(category.image),
  }
}

export async function getCategories() {
  const response = await api.get('/categories')
  const payload = response.data
  const categories = Array.isArray(payload) ? payload : payload?.data ?? []

  return categories.map(normalizeCategory)
}
