import { useState } from 'react';
import { ProductTable } from './components/product-table';
import { SearchBar } from './components/search-bar';
import { IProduct } from './get-data';
import { useNetworkState } from '../hooks/use-network-state';

export function FilterableTable({ products }: { products: IProduct[] }) {
  const [filterValue, setFilterValue] = useState<string>('');
  const [inStock, setInStock] = useState<boolean>(false);
  useNetworkState();

  return (
    <>
      <SearchBar
        filterValue={filterValue}
        onChangeFilterValue={setFilterValue}
        inStock={inStock}
        onChangeInStock={setInStock}
      />
      <ProductTable products={products} filterText={filterValue} onlyInStock={inStock} />
    </>
  );
}
