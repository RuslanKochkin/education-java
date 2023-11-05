import { useEffect } from 'react';
import { loadProducts } from './productsSlice';
import { RootState } from '../../../app/store';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export default function Products(): JSX.Element {
	const products = useAppSelector(
		(state: RootState) => state.products.products
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadProducts());
		// загрузит в массив продукты при первом рендере
	}, []);
	return (
		<div>
			<h1>Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<p>{product.title}</p>
						<p>{product.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
