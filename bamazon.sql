DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price INT,
  stock_quantity INT,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("rice", "grocery", 5, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("chicken", "grocery", 10, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("baseball bat", "sporting goods", 300, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("football", "sporting goods", 30, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("t-shirt", "clothing", 25, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("shorts", "clothing", 25, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("iphone 10xr", "electronics", 1000, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("galaxy s10", "electronics", 1000, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("refrigerator", "home appliances", 1000, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("washer", "home appliances", 750, 25);

