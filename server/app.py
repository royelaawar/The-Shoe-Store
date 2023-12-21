#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify 
from flask_bcrypt import Bcrypt
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
#from marshmallow import fields

# Local imports
from models import db, User, Product, Comment, Order_Item, Order
from config import app, api, bcrypt

## url prefix for flask endpoints
URL_PREFIX = '/api'

## HELPER FUNCTIONS ## 
## get id of current user, if applicable
def current_user():
    current_user = session["user_id"]
    if current_user:
        return User.query.filter(User.id == current_user).first()


##serialization rules for to_dicts to work (if you get recursion errors just modify these)##
product_rules = ("-comments","-users","-order_items","-meta")
order_rules = ("-users","-order_items","-user")


## USER SESSION ENDPOINTS ##
## session—sign up user
@app.post(URL_PREFIX + '/users')
def create_user():
    try:
        data = request.json
        hashed_password = bcrypt.generate_password_hash(data.get("password")).decode('utf-8')
        new_user = User(name=data.get("name"), user_name=data.get("user_name"), password=hashed_password, d_o_b=data.get("d_o_b"))
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return new_user.serialize_user(), 201
    except Exception as e:
        return { 'error': f"{e}" }, 400
        
## session — log in user
@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    user = User.query.filter(User.user_name == data.get("user_name")).first()
    if user and bcrypt.check_password_hash(user.password, data.get("password")):
        session["user_id"] = user.id
        return user.serialize_user(), 201
    else:
        return { "message": "Invalid username/password!" }, 401

## session — maintain currently logged in user's session on reload/navigation
@app.get(URL_PREFIX + '/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return user.serialize_user(), 200
    else:
        return { "message": "Woops! No user is currently logged in!" }, 401

## session - logout user    
@app.delete(URL_PREFIX + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204




## ENDPOINTS: BASIC DB VIEWS/ROUTES ##
@app.route(URL_PREFIX + '/')
def home():
    return  "The-Shoe-Store API Index"

## Product Views ## 
@app.get(URL_PREFIX + '/products')
def get_products():
    products = [p.to_dict(rules = product_rules) for p in Product.query.all()]
    if not products:
        return {"error":"couldn't find any products!!"}, 404
    return make_response(products,201)

@app.get(URL_PREFIX + '/products/<int:id>')
def get_product_by_id(id):
    product = db.session.get(Product,id)
    return make_response(product.to_dict(rules = product_rules), 201)

@app.patch(URL_PREFIX + '/products/<int:id>')
def patch_product(id):
    product = db.session.get(Product,id)
    if not product:
        return {"error":f"couldn't find product with id {id}"}, 404
    data = request.json
    try:
        for key in data:
            setattr(product, key, data[key])
        db.session.add(product)
        db.session.commit()
        return make_response(product.to_dict(rules = product_rules), 201)
    except:
        return {"error": f"Could not update product with id {id}"}, 404
    
    
## Order Views ##
@app.get(URL_PREFIX + '/orders')
def get_orders():
    orders = [o.to_dict(rules=order_rules) for o in Order.query.all()]
    if not orders:
        return {"error":"couldn't find any orders!"}, 404
    return make_response(orders, 201)

@app.get(URL_PREFIX + '/orders/<int:id>')
def get_order_by_id(id):
    order = db.session.get(Order,id)
    if not order:
        return {"error":f"couldn't find order with id {id}"}, 404
    return make_response(order.to_dict(), 201)

@app.patch(URL_PREFIX + '/orders/<int:id>')
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

## User Views ## 
@app.get(URL_PREFIX + '/users')
def get_users():
    users = User.query.all()
    user_dict = [serialize_user(user) for user in users]
    return jsonify(user_dict),201

@app.get(URL_PREFIX + '/users/<int:id>')
def get_user_by_id(id):
    users = db.session.get(User,id)
    return jsonify(serialize_user(users),201)



# catches errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404


@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)