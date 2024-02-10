export function SearchBar({
  filterValue,
  inStock,
  onChangeFilterValue,
  onChangeInStock,
}: {
  filterValue: string;
  onChangeFilterValue(value: string): void;
  inStock: boolean;
  onChangeInStock(value: boolean): void;
}) {
  return (
    <form>
      <input
        type='search'
        placeholder='Type to search'
        value={filterValue}
        onChange={(e) => onChangeFilterValue(e.target.value)}
      />
      <label>
        Only products in stock
        <input
          type='checkbox'
          checked={inStock}
          onChange={(e) => onChangeInStock(e.target.checked)}
        />
      </label>
    </form>
  );
}
