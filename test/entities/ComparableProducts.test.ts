import {ComparableProduct} from '@src/entities/impl/ComparableProduct';

let comparableProduct = new ComparableProduct(1, 'Lenovo Laptop', 'computers', 3620.59);

describe('Test Comparable Product methods', ()=> {
    test('Should validate toString method', () => {
        const text = 'Product id=1, product name=Lenovo Laptop, category name=computers, price=3620.59';
        expect(comparableProduct.toString()).toContain(text);
    });

    test('Should validate getId method', () => {
        expect(comparableProduct.getId()).toEqual(1);
    });

    test('Should validate getCategoryName method', () => {
        expect(comparableProduct.getCategoryName()).toBe('computers');
    });
})