//Допустим, у нас есть магазин. В нашем магазине есть товары трех категорий: продукты, электроника, одежда.
// У каждого товара есть цена, наименование категория к которой он относится.
// Важно, что после создания товара ни одно из его свойств не должно быть, доступно для изменения,
// т.е. все поля должны быть private. Создать список товаров

//Реализуйте в Main метод, который получает список товаров и формирует Map<String,Double>
// где ключ – наименование товара, значение – цена. Подсказка: видимо вам понадобятся гетеры.

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

//Реализовать в классе Товар возможность изменения цены.
// При этом система не должна давать возможность поставить отрицательную цену или 0
//Видимо, понадобится сеттер. **НЕОБЯЗАТЕЛЬНОЕ.Добавить возможность вести истории изменения цены у товара.
public class Main {
    public static void main(String[] args) {
        Product[] products ={
                new Product(Categories.ELECTRONICS, "TV", "Samsung", 25000.00),
                new Product(Categories.FOOD, "Ice cream", "Gamburg", 2.40 ),
                new Product(Categories.CLOTH, "Underpants", "Nike", 5.50)
        };
        System.out.println(list(products));
    }
    public static Map<String,Double> list (Product[] p1){
        Map<String, Double> list = new HashMap<>();
        for (Product product : p1 ){
           list.put(product.getName(), product.getPrice());
        }
        return list;
    }
}

//        Person[] people = {
//                new Person("Ruslan", "Ivanov", 40 ),
//                new Person("Ruslan", "Petrov", 45 ),
//                new Person("Gadya", "lilia", 30 ),
//        };
//        HashMap<String, Person> lNameToPersonMap = new HashMap<>();
//        for (Person person: people){
//            lNameToPersonMap.put(person.lName, person);
//        }
//        System.out.println(lNameToPersonMap);
//        Person person = lNameToPersonMap.get("Ivanov");
//        System.out.println(person);
//        //-------------------------------
//    }
//}