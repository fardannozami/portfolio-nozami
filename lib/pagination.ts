export function paginate<T>(
  items: T[],
  pageParam: string | string[] | undefined,
  pageSize: number = 10
) {
  // Ambil page dari query
  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam
  const requestedPage = Number(rawPage) || 1

  // Hitung total halaman
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  // Clamp page (biar ga keluar range)
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages)

  // Hitung offset
  const start = (currentPage - 1) * pageSize
  const paged = items.slice(start, start + pageSize)

  return {
    paged,
    currentPage,
    totalPages,
    pageSize,
    totalItems: items.length,
  }
}
