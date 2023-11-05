////Допустим, у нас есть магазин. В нашем магазине есть товары трех категорий:
//// продукты, электроника, одежда. У каждого товара есть цена, наименование, категория к которой он относится.
//// Важно, что после создания товара ни одно из его свойств не должно быть, доступно для изменения,
//// т.е. все поля должны быть private. Создать список товаров
public class Product {
   private Categories categories;
    private String name;
    private String brand;
    private double price;

    public Product(Categories categories, String name, String brand, double price) {
        this.categories = categories;
        this.name = name;
        this.brand = brand;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "categories=" + categories +
                ", name='" + name + '\'' +
                ", brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }

    public void setPrice(double price) {
        if (this.price >= 1) {
            this.price = price;
        }
    }

    public String getName() {
        return brand;
    }

    public double getPrice() {
        return price;
    }

}
