#standard library imports 
import re
##remote library imports
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from uuid import uuid4
##local imports
from config import db, bcrypt

def get_uuid():
    return uuid4().hex


##USER##
class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'
    serialize_rules = ('-orders.user', '-comments.user')
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False) 
    user_name = db.Column(db.String(), nullable = False, unique = True) 
    password = db.Column(db.String, nullable = False)
    d_o_b = db.Column(db.String)

    
    products = association_proxy('orders','order_items.product_id')
    #relationships
    orders = db.relationship('Order', back_populates = 'user')
    comments = db.relationship('Comment', back_populates = 'user', cascade = 'all, delete-orphan')


    def __repr__(self):
        return f'<User {self.id}/{self.name}/{self.user_name}/{self.password}/{self.d_o_b}>'

##COMMENT##
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments_table'
    serialize_rules = ('-user.comments', '-product.comments')
    
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String, nullable = False)
    rating = db.Column(db.Integer, nullable = True)


    product_id = db.Column(db.Integer, db.ForeignKey('products_table.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable = False)
    
    #relationships
    user = db.relationship('User', back_populates = 'comments')
    product = db.relationship('Product', back_populates = 'comments')

    def __repr__(self):
        return f'<Comment {self.id}/{self.content}/{self.rating}>'
    
##PRODUCT##    
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products_table'
    serialize_rules = ('-comments.product', '-order_items.product')
    
    id = db.Column(db.Integer, primary_key = True)
    ##product details
    name = db.Column(db.String, nullable = False, unique = False)
    brand_name = db.Column(db.String, nullable = False) 
    category = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    meta = db.Column(db.String, nullable = True, default = None)
    picture = db.Column(db.String, nullable = False)
    
    
    
    ##availability
    sizes_in_stock = db.Column(db.String, nullable = False)
    in_stock = db.Column(db.Boolean, nullable = False, default = True)
    discounted = db.Column(db.Boolean, nullable = False, default = False)
    

    #relationships
    comments = db.relationship('Comment', back_populates = 'product', cascade = 'all, delete-orphan')
    order_items = db.relationship('Order_Item', back_populates = 'product')

    
    def __repr__(self):
        return f'<Product {self.id}/{self.name}/{self.brand_name}/{self.category}/{self.description}/{self.price}>'
    

    
##ORDER_ITEM##    
class Order_Item(db.Model, SerializerMixin):
    __tablename__ = 'order_item_table'
    serialize_rules = ('-order.order_items', '-product.order_items')

    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer, nullable = False)
    product_id = db.Column(db.Integer, db.ForeignKey('products_table.id'), nullable = False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders_table.id'), nullable=False) 
    total_price = db.Column(db.Float, nullable = False)

    #relationships
    price = association_proxy('product', 'price')
    order = db.relationship('Order', back_populates = 'order_items')
    product = db.relationship('Product', back_populates = 'order_items')   
    
 

    def item_total_price(self):
        total = self.price * self.quantity
        return total
    
    def __repr__(self):
        return f'<Order_Item {self.id}/{self.quantity}/{self.price}>'
    

##ORDER##
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders_table'
    serialize_rules = ('-user.orders','-order_items.order')
    id = db.Column(db.Integer, primary_key = True)
    address = db.Column(db.String, nullable = False)
    gifted = db.Column(db.Boolean, nullable = True, default = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable = False)
    ##price/quantity
    
    #proxies
    #user_name = association_proxy('user', 'name')
    discounted = association_proxy('order_items', 'product.discounted')

    #relationships
    user = db.relationship('User', back_populates = 'orders')
    order_items = db.relationship('Order_Item', back_populates = 'order', cascade = 'all, delete-orphan')
    

    
    def __repr__(self):
        return f'<Order {self.id}/{self.user_id}>'