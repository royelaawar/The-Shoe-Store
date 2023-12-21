#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify 
from flask_restful import Resource


# Local imports
from models import db, User, Product, Comment, Order_Item, Order
from config import app, api

## url prefix for flask endpoints
URL_PREFIX = '/api'

## HELPER FUNCTIONS ## 
## get id of current user, if applicable
def current_user():
    current_user = session["user_id"]
    if current_user:
        return User.query.filter(User.id == current_user).first()


##serialization rules for to_dicts to work (if you get recursion errors just modify these) ##
product_rules = ("-comments","-order_items","-meta")
order_rules = ("-order_items","-user")
user_rules = ("-comments","-orders")
comment_rules = ("-user","-product")


## USER SESSION ENDPOINTS ##
## session — sign up user
@app.post(URL_PREFIX + '/users')
def create_user():
    try:
        data = request.json
        new_user = User(
            name=data.get("name"), 
            user_name=data.get("user_name"), 
            d_o_b=data.get("d_o_b")
            )
        new_user.password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(rules = user_rules), 201)
    except Exception as e:
        return { 'error': f"{e}" }, 400
        
## session — log in user
@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    user_name = data.get('user_name')
    password = data.get('password')
    user = User.query.filter(User.user_name == user_name).first()
    if user:
        if user.authenticate(password):
            session["user_id"] = user.id
            return make_response(user.to_dict(rules=user_rules), 201)
    else:
        return { "message": "Invalid username/password!" }, 401

## user session — maintain currently logged in user's session on reload/navigation
@app.get(URL_PREFIX + '/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return make_response(user.to_dict(rules=user_rules), 200)
    else:
        return { "message": "No user is currently logged in!" }, 401
    
## user session - logout user    
@app.delete(URL_PREFIX + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204

## user session - post comment
@app.post(URL_PREFIX + '/comments')
def post_comment():
    try:
        data = request.json
        new_comment = Comment(**data)
        new_comment.user = current_user()
        db.session.add(new_comment)
        db.session.commit()
        return make_response(new_comment.to_dict(), 201)
    except Exception as e:
        return make_response({'error': f"{str(e)}"} , 400)


## MODEL ENDPOINTS: BASIC DB ROUTES (get/patch/post) ##
@app.route(URL_PREFIX + '/')
def home():
    return  "The-Shoe-Store API Index"

## PRODUCT rts ## 
@app.get(URL_PREFIX + '/products')
def get_products():
    products = [p.to_dict(rules = product_rules) for p in Product.query.all()]
    return make_response(products,201)

@app.get(URL_PREFIX + '/products/<int:id>')
def get_product_by_id(id):
    product = db.session.get(Product,id)
    if not product:
        return {"error":f"couldn't find product with id {id}"}, 404
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
    except Exception as e:
        return {"error": f"Could not update product with id {id}; {str(e)}"}, 404
    
    
## ORDER rts ##
@app.get(URL_PREFIX + '/orders')
def get_orders():
    orders = [o.to_dict(rules=order_rules) for o in Order.query.all()]
    return make_response(orders, 201)

@app.get(URL_PREFIX + '/orders/<int:id>')
def get_order_by_id(id):
    order = db.session.get(Order,id)
    if not order:
        return {"error":f"couldn't find order with id {id}"}, 404
    return make_response(order.to_dict(rules = order_rules), 201)

@app.patch(URL_PREFIX + '/orders/<int:id>')
def patch_order(id):
    order = db.session.get(Order,id)
    if not order:
        return {"error":f"couldn't find order with id {id}"}, 404
    data = request.json
    try:
        for key in data:
            setattr(order, key, data[key])
        db.session.add(order)
        db.session.commit()
        return make_response(order.to_dict(rules = order_rules), 201)
    except Exception as e:
        return {"error": f"Could not update order with id {id}; {str(e)}"},404

## USER rts ## 
@app.get(URL_PREFIX + '/users')
def get_users():
    users = [u.to_dict(rules=user_rules) for u in User.query.all()]
    return make_response(users, 201)

@app.get(URL_PREFIX + '/users/<int:id>')
def get_user_by_id(id):
    user = db.session.get(User,id)
    if not user:
        return {"error":f"couldn't find user with id {id}"}, 404
    return make_response(user.to_dict(rules = user_rules), 201)

## comment rts
@app.get(URL_PREFIX + '/comments')
def get_comments():
    comments = [c.to_dict(rules = comment_rules) for c in Comment.query.all()]
    return make_response(comments,201)

## error handlers: catch errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404

@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)