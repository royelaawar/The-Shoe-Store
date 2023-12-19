#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask_restful import Api, Resource
from flask import make_response, request, session


# Local imports
from models import User, Product, Comment, Order_Item, Order
from config import db, app, api



@app.route('/')
def home():
    return ''









    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
