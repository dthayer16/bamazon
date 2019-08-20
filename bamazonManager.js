const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select from the list of menu options below",
            choices: ["View Sales Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "optionMenu"
        }
    ]).then(function (answer) {
        switch (answer.optionMenu) {
            case ("View Sales Products"):
                viewProducts();
                break;
            case ("View Low Inventory"):
                lowInventory();
                break;
            case ("Add to Inventory"):
                addInventory();
                break;
            case ("Add New Product"):
                addProduct();
                break;
            case ("Exit"):
                console.log("Thank you!")
                connection.end();
        }
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 50", function (err, data) {
        if (err) throw err;
        if (data.length === 0) {
            console.log("No inventory items below 50!");
            start();
        } else {
            console.table(data);
            start();
        }
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // Log all products in a table format
        console.table(results);

        inquirer.prompt([
            {
                type: "number",
                message: "Please enter the [item_id] of the product you would like to add inventory to:",
                name: "inventory_id"
            },
            {
                type: "number",
                message: "How much of this item needs to be added?",
                name: "inventory_quantity"
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;

                let chosenItem;

                for (i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.inventory_id) {
                        chosenItem = results[i]
                    }
                }
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (chosenItem.stock_quantity + parseInt(answer.inventory_quantity))
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(`${res.affectedRows} products updated!\n`);
                    },
                    console.log(`The new total inventory for ${chosenItem.product_name} is ${(chosenItem.stock_quantity + parseInt(answer.inventory_quantity))}.`)
                );
                start();
            })
        })
    })
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What product would you like to add to the inventory list?",
            name: "item_add"
        },
        {
            type: "input",
            message: "What is department is this item in?",
            name: "item_dept"
        },
        {
            type: "input",
            message: "What is the price for this item?",
            name: "item_price"
        },
        {
            type: "number",
            message: "What is the quantity available for this item?",
            name: "item_quantity"
        }
    ]).then(function (answer) {
        console.log("Adding new product...\n");
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.item_add,
                department_name: answer.item_dept,
                price: answer.item_price,
                stock_quantity: answer.item_quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(`${res.affectedRows} item added!\n`);
            }
        );
        viewProducts();
        start();
    })
}

function viewProducts() {
    console.log("INVENTORY LIST.....\n")
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // Log all products in a table format
        console.table(results);
        start();
    })
}