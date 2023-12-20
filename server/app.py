#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask_restful import Api, Resource
from flask import Flask, make_response, request, session, jsonify 
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate



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
        'picture': product.picture
    }

def serialize_order(order):
    return {
        'id': order.id,
        'address': order.address,
        'gifted': order.gifted,
        'user_id': order.user_id
        
    }

def serialize_user(user):
    return {
        'id': user.id,
        'name': user.name,
        'user_name': user.user_name,
        'password': user.password,
        'd_o_b': user.d_o_b
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

@app.patch('/products/<int:id>')
def patch_product(id):
    product = db.session.get(Product,id)
    patch_data = request.json

    try:
        for key in patch_data:
            setattr(product, key, patch_data[key])

        db.session.add(product)
        db.session.commit()
        return jsonify(serialize_product(product),201)
    except:
        return {"error": "Could not update item"},404
    
       

@app.get('/orders')
def get_orders():
    orders = Order.query.all()
    order_dict = [serialize_order(order) for order in orders]
    return jsonify(order_dict),201

@app.get('/orders/<int:id>')
def get_order_by_id(id):
    order = db.session.get(Order,id)
    return jsonify(serialize_order(order),201)

@app.patch('/orders/<int:id>')
def patch_order(id):
    orders = db.session.get(Order,id)
    patch_data = request.json

    try:
        for key in patch_data:
            setattr(orders, key, patch_data[key])

        db.session.add(orders)
        db.session.commit()
        return jsonify(serialize_order(orders),201)
    except:
        return {"error": "Could not update item"},404


@app.get('/users')
def get_users():
    users = User.query.all()
    user_dict = [serialize_user(user) for user in users]
    return jsonify(user_dict),201

@app.get('/users/<int:id>')
def get_user_by_id(id):
    users = db.session.get(User,id)
    return jsonify(serialize_user(users),201)


    
if __name__ == '__main__':
    app.run(port=5555, debug=True)