/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }

        set productType(value) {
            this._productType = value;
        }

        get productType() {
            return this._productType;
        }

        set name(value) {
            this._name = value;
        }

        get name() {
            return this._name;
        }

        set price(value) {
            this._price = value;
        }

        get price() {
            return this._price;
        }
    }


    class ShoppingCart {
        constructor() {
            this._products = [];
        }

        get products() {
            return this._products;
        }

        add(product) {
            this.products.push(product);

            return this;
        }

        remove(product) {
            for (let i = 0; i < this.products.length; i += 1) {
                if (this.products[i].productType === product.productType &&
                    this.products[i].name === product.name &&
                    this.products[i].price === product.price) {
                    this.products.splice(i, 1);
                    return this;
                }
            }

            throw '';
            //return this;
        }

        showCost() {
            let sumOfAllProductsCost = 0;

            for (let i = 0; i < this.products.length; i += 1) {
                sumOfAllProductsCost += this.products[i].price;
            }

            return sumOfAllProductsCost;
        }

        showProductTypes() {
            let uniqueProductTypesCollection = [],
                isUnique = true;

            for (let i = 0; i < this.products.length; i += 1) {
                for (let j = 0; j < uniqueProductTypesCollection.length; j += 1) {
                    if (this.products[i].productType === uniqueProductTypesCollection[j]) {
                        isUnique = false;
                        break;
                    }
                }

                if (isUnique) {
                    uniqueProductTypesCollection.push(this.products[i].productType);
                }
                isUnique = true;
            }

            uniqueProductTypesCollection.sort();

            return uniqueProductTypesCollection;
        }

        getInfo() {
            let shoppingCardInfoObject = {
                    products: [],
                    totalPrice: this.showCost()
                },
                isUnique = true;

            for (let i = 0; i < this.products.length; i += 1) {
                for (let j = 0; j < shoppingCardInfoObject.products.length; j += 1) {
                    if (this.products[i].name === shoppingCardInfoObject.products[j].name) {
                        isUnique = false;
                        shoppingCardInfoObject.products[j].totalCost += this.products[i].price;
                        shoppingCardInfoObject.products[j].quantity +=1;
                        break;
                    }
                }

                if (isUnique) {
                    let infoObjectCreation = {
                        name: this.products[i].name,
                        totalCost: this.products[i].price,
                        quantity: 1
                    };
                    shoppingCardInfoObject.products.push(infoObjectCreation);
                }
                isUnique = true;
            }


            return shoppingCardInfoObject;
        }
    }

    //For testing purposes

    let testShoppingCart = new ShoppingCart(),
        productOne = new Product("milk", "vereya", 1.99),
        productTwo = new Product("cheese", "Elbi", 8.69);

    // testShoppingCart.remove(productTwo);
    console.log(testShoppingCart.showCost());

    testShoppingCart.add(productOne);
    testShoppingCart.add(productTwo);
    testShoppingCart.add(productTwo);
    testShoppingCart.add(productTwo);
    //testShoppingCart.add({productType: "Something", name: "Something", price: 5.00});
    console.log(testShoppingCart.products);
    testShoppingCart.remove(productTwo);
    console.log(testShoppingCart.products);

    // console.log(testShoppingCart.showCost());
    // console.log(testShoppingCart.showProductTypes());
    // console.log(testShoppingCart.getInfo());

    //end of tests delete for BG coder
    return {
        Product, ShoppingCart
    };
}

//remove function call for bg coder
solve();

module.exports = solve;