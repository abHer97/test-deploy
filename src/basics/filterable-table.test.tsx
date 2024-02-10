import '@testing-library/jest-dom';
import { cleanup, render, screen, Screen } from '@testing-library/react';

import { FilterableTable } from './filterable-table';

describe('filterableTable component', () => {
  const PRODUCTS = [
    { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
    { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
    { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
    { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
    { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
    { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
  ];
  const TOTAL_CATEGORIES = 2;
  function setup() {
    return render(<FilterableTable products={PRODUCTS} />);
  }

  function getInputSearch(screen: Screen) {
    return screen.findByPlaceholderText('Type to search');
  }
  function getCheckboxStock(screen: Screen) {
    return screen.findByLabelText('Only products in stock');
  }
  function getTable(screen: Screen) {
    return screen.getByRole('table');
  }

  afterEach(() => {
    cleanup();
  });

  describe('searchBar component', () => {
    test('should render the input search with no text', async () => {
      setup();

      const inputSearch = await getInputSearch(screen);

      expect(inputSearch).toBeInTheDocument();
      expect(inputSearch).toHaveTextContent('');
    });

    test('should render a checkbox to toggle products in stock', async () => {
      setup();

      const checkBoxStock = await getCheckboxStock(screen);

      expect(checkBoxStock).toBeInTheDocument();
    });
  });

  describe('productTable component', () => {
    test('should render a table with given products', async () => {
      setup();

      const table = await getTable(screen);
      const tableBody = table.children[1];

      expect(table).toBeInTheDocument();
      expect(tableBody.children.length).toBe(PRODUCTS.length + TOTAL_CATEGORIES);
    });
  });
});
