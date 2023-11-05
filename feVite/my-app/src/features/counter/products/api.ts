// GET - метод для получения данных
// внутри треугольных скобок пишем то, что по факту приходит с бэка
// функция возвращает промис - это не ошибка
// мы будем с этим промисом работать и в зависимости от его состояния
// будут разные сценарии действие
// fullfiled - удовлетворен - со значением
// rejected - отвергнут - с ошибкой

import Product from "./types/Products";

// pending - ожидается - пока еще не определился fullfiled | rejected
export async function getAll(): Promise<Product[]> {
	const res = await fetch('https://fakestoreapi.com/products');
	return res.json();
}