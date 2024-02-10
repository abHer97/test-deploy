import { IProduct } from '../get-data';

export interface ProductTableProps {
  products: IProduct[];
  filterText: string;
  onlyInStock: boolean;
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <td colSpan={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {category}
      </td>
    </tr>
  );
}

function ProductRow({ product }: { product: IProduct }) {
  return (
    <tr>
      <td>
        <span style={{ color: product.stocked ? '' : 'red' }}>{product.name}</span>
      </td>
      <td>{product.price}</td>
    </tr>
  );
}

export function ProductTable({ products, filterText, onlyInStock }: ProductTableProps) {
  const rows: React.JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText)) return;
    if (onlyInStock && !product.stocked) return;

    if (product.category !== lastCategory) {
      lastCategory = product.category;

      rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
    }

    rows.push(<ProductRow key={product.name} product={product} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
