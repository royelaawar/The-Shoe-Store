#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask_restful import Api, Resource
from flask import make_response, request, session, jsonify 


# Local imports
from models import User, Product, Comment, Order_Item, Order
from config import db, app, api



@app.route('/')
def home():
    return  "This is the index"

def serialize_product(product):
    return {
        'id': product.id,
        'name': product.name,
        'brand_name': product.brand_name,
        'category': product.category,
        'description': product.description,
        'price': product.price,
        # Add other fields as needed
    }

def serialize_order(order):
    return {
        'id': order.id,
        'address': order.address,
        'gifted': order.gifted,
        'user_id': order.user_id,
        # Add other fields as needed
    }


@app.get('/products')
def get_products():
    products = Product.query.all()
    product_dict = [serialize_product(product) for product in products]
    return jsonify(product_dict), 201

@app.get('/products/<int:id>')
def get_product_by_id(id):
    product = db.session.get(Product,id)
    return jsonify(serialize_product(product),201)

@app.get('/orders')
def get_orders():
    orders = Order.query.all()
    order_dict = [serialize_order(order) for order in orders]
    return jsonify(order_dict),201














    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
