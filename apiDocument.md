//Page 1

# List of Categories

https://edurekaamazon.herokuapp.com/categories

# List of Fashion Category

https://edurekaamazon.herokuapp.com/fashion

# List of Mobile Category

https://edurekaamazon.herokuapp.com/mobile

# List of Gaming Category

https://edurekaamazon.herokuapp.com/gaming

# List of Books Category

https://edurekaamazon.herokuapp.com/books

# List of Health Category

https://edurekaamazon.herokuapp.com/health

//Page 2

# List of Prducts wrt Best Seller

https://edurekaamazon.herokuapp.com/products?bestseller_id=1

# List of Prducts wrt Price

https://edurekaamazon.herokuapp.com/filter/1?lPrice=200&hPrice=5000

# Sort on basis of cost

https://edurekaamazon.herokuapp.com/filter/1?sort=1

//Page 3

# Details of the products

https://edurekaamazon.herokuapp.com/details/40

//Page 4

# Item Details (POST)

https://edurekaamazon.herokuapp.com/placeOrder
{
"orderId": "2",
"name": "Mayank",
"email": "mayanksingh@gmail.com",
"address": "Hno 23, Dayalbagh, Agra",
"phone": 768768686,
"price": 124,
"product_id": [
6,
34,
23
]
},
{
"orderId": "3",
"name": "Ritu",
"email": "rituagrawal@gmail.com",
"address": "Hno 23, Dayalbagh, Agra",
"phone": 8755544552,
"price": 344,
"menuItem": [
12,
25,
21
]
},
{
"orderId": "4",
"name": "Anish",
"email": "Anish@gmail.com",
"address": "Hno 23, Dayalbagh, Agra",
"phone": 97876733,
"cost": 431,
"menuItem": [
34,
26,
17
]
}

# Place Order (POST)

https://edurekaamazon.herokuapp.com/Item
http://localhost:2500/Item

{
"product_id": [5,6,7]
}

//Page 5

# List of orders

https://edurekaamazon.herokuapp.com/orders

# List of order wrt to email

https://edurekaamazon.herokuapp.com/orders?email=Anish@gmail.com

# Update order Details (PUT)

> https://edurekaamazon.herokuapp.com/updateOrder/1
> {

    "status" : "delivered",
    "bank_name": "SBI",
    "date": "21/10/2022"

}
