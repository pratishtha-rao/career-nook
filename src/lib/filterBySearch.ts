export function filterBySearch<T>(
  items: T[],
  search: string,
  selector: (item: T) => string
) {
  if (!search.trim()) return items;

  const term = search.toLowerCase();

  return items.filter((item) =>
    selector(item).toLowerCase().includes(term)
  );
}