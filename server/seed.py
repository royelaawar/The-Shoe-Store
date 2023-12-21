##standard library imports
from random import randint, choice
from datetime import datetime
import json

##Remote library imports
from faker import Faker


##local imports
from app import app
from models import db, User, Product, Comment, Order_Item, Order


product_names = [
    "Nike Air Force 1 Low",
    "Nike Air Max 270",
    "Nike Air Max 97",
    "Nike Dunk Low",
    "Nike Air Zoom Pegasus",
    "Nike Revolution 5",
    "Nike SB Dunk",
    "Nike Blazer Mid",
    "Nike Air VaporMax",
    "Nike Air Huarache",
    "Adidas UltraBoost",
    "Adidas Stan Smith",
    "Adidas NMD R1",
    "Adidas Gazelle",
    "Adidas Superstar",
    "Adidas ZX Flux",
    "Adidas Yeezy 500",
    "Adidas Samba",
    "Adidas Predator",
    "Adidas Terrex",
    "Jordan Retro 1",
    "Jordan Retro 4",
    "Jordan Retro 6",
    "Jordan Retro 11",
    "Jordan Air Jordan 1 Mid",
    "Jordan Mars 270",
    "Jordan Why Not Zer0.3",
    "Jordan Air Cadence",
    "Jordan Delta",
    "Jordan Air Latitude 720",
    "Puma Suede Classic",
    "Puma RS-X",
    "Puma Future Rider",
    "Puma Thunder Spectra",
    "Puma Cell Endura",
    "Puma Cali",
    "Puma Ignite",
    "Puma Tazon 6 FM",
    "Puma Fierce Core",
    "Puma BMW MMS Future Kart Cat",
    "Reebok Classic Leather",
    "Reebok Club C 85",
    "Reebok Nano",
    "Reebok Zig Kinetica",
    "Reebok Answer IV",
    "Reebok DMX Series 2K",
    "Reebok Floatride",
    "Reebok Freestyle Hi",
    "Reebok Legacy Lifter",
    "Reebok Royal Turbo Impulse",
    "Vans Old Skool",
    "Vans Sk8-Hi",
    "Vans Authentic",
    "Vans Era",
    "Vans Slip-On",
    "Vans Ultrarange",
    "Vans ComfyCush",
    "Vans Checkerboard",
    "Vans AVE Pro",
    "Vans Gilbert Crockett Pro",
    "Converse Chuck Taylor All Star",
    "Converse One Star",
    "Converse Pro Leather",
    "Converse Chuck 70",
    "Converse Jack Purcell",
    "Converse Run Star Hike",
    "Converse All Star Pro BB",
    "Converse El Distrito",
    "Converse ERX 260 Mid",
    "Converse Fastbreak",
    "ASICS Gel-Lyte III",
    "ASICS Gel-Kayano",
    "ASICS Gel-Nimbus",
    "ASICS GT-2000",
    "ASICS Gel-Quantum 360",
    "ASICS Gel-Venture",
    "ASICS Gel-Cumulus",
    "ASICS Gel-DS Trainer",
    "ASICS Gel-Kinsei",
    "ASICS Gel-Resolution",
    "Skechers D'Lites",
    "Skechers Go Walk",
    "Skechers Max Cushioning",
    "Skechers Summits",
    "Skechers Streetwear",
    "Skechers Arch Fit",
    "Skechers Flex Appeal",
    "Skechers Ultra Flex",
    "Skechers Relaxed Fit",
    "Skechers Uno",
    "Yeezy Boost 350",
    "Yeezy Boost 700",
    "Yeezy Boost 380",
    "Yeezy 500",
    "Yeezy Quantum",
    "Yeezy Desert Boot",
    "Yeezy Slide",
    "Yeezy Powerphase",
    "Yeezy Boost 750",
    "Yeezy Scuba",
    "Fila Disruptor II",
    "Fila Ray Tracer",
    "Fila Mindblower",
    "Fila Spaghetti",
    "Fila Original Fitness",
    "Fila Grant Hill",
    "Fila F-13",
    "Fila FX-100",
    "Fila Vulc 13",
    "Fila Memory Foam",
]


brand_names = [i.split(" ")[0] for i in product_names]

sneaker_types = [
    "Running Shoes",
    "Basketball Shoes",
    "Cross Trainers",
    "Tennis Shoes",
    "Walking Shoes",
    "Skateboarding Shoes",
    "Soccer Shoes",
    "Gym and Training Shoes",
    "Casual Sneakers",
    "Slip-Ons",
    "High Tops",
    "Low Tops",
    "Limited Editions",
    "Retro Sneakers",
    "Luxury Sneakers",
    "Trail Running Shoes",
    "Eco-Friendly Sneakers",
    "Dance Sneakers",
    "Espadrille Sneakers",
    "Minimalist Sneakers",
]

male_shoe_sizes = [i for i in range(6, 16)]
female_shoe_sizes = [i for i in range(4, 13)]


if __name__ == "__main__":
    fake = Faker()

    def generate_fake_password():
        return fake.password(
            length=12, special_chars=True, digits=True, upper_case=True, lower_case=True
        )

    def generate_fake_birthday():
        birthday = fake.profile()["birthdate"]
        birthday_formatted = f"{birthday.day}-{birthday.month}-{birthday.year}"
        return birthday_formatted

    with app.app_context():
        print("deleting old entries")
        User.query.delete()
        Product.query.delete()
        Comment.query.delete()
        Order_Item.query.delete()
        Order.query.delete()

        print("seeding new database")

        users_list = []
        for _ in range(100):
            u = User(
                name=fake.name(),
                user_name=fake.profile()["username"],
                d_o_b=generate_fake_birthday()
                
            )
            u.password_hash = generate_fake_password()
            users_list.append(u)
        print(u)
        db.session.add_all(users_list)
        db.session.commit()
        print("seeded users")

        products_list = []
        used_shoe_names = set()
        for _ in range(20):
            shoe_choice = choice(product_names)
            shoe_brand = shoe_choice.split(" ")[0]
            shoe_name_split = shoe_choice.split(" ")[1::]
            shoe_name = " ".join(shoe_name_split)

            used_shoe_names.add(shoe_name)

            while shoe_name in used_shoe_names:
                shoe_name += " "
            branded_shoe = shoe_brand + " " + shoe_name
            size_list = []
            for i in range (randint(1, 10)):
                    size = randint(4, 16)
                    size_list.append(size)
            
            p = Product(
                name=shoe_name,
                brand_name=shoe_brand,
                category=choice(sneaker_types),
                description=fake.text(max_nb_chars=30),
                price=(randint(400, 3500)) / 10.0,
                meta="None",
                sizes_in_stock=str(size_list),
                picture='https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/082/754/093/original/1081516_01.jpg.jpeg?action=crop&width=900'
            )
        
            products_list.append(p)
        print(p)

        db.session.add_all(products_list)
        db.session.commit()
        print("seeded products")

        comments_list = []
        for _ in range(200):
            c = Comment(content=fake.sentence(), rating=randint(1, 5))
            c.product = choice(products_list)
            c.user = choice(users_list)
            comments_list.append(c)
        db.session.add_all(comments_list)
        db.session.commit()
        print("seeded comments")
        
        orders_list = []
        for _ in range(50):
            user = choice(users_list)
            o = Order(address=fake.address(), gifted=False, user=user)
            
            # o['order_items']
            orders_list.append(o)
        db.session.add_all(orders_list)
        db.session.commit()
        print("seeded orders")

        order_items_list = []
        for _ in range(150):
            order = choice(orders_list)
            product = choice(products_list)
            price = product.price
            quantity = randint(1,3)
            oi = Order_Item(quantity=quantity, order=order, product=product, total_price = (price * quantity))
            order_items_list.append(oi)
        db.session.add_all(order_items_list)
        db.session.commit()
        print("seeded order items")

    print("done seeding...")