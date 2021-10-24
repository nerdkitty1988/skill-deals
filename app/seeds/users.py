from app.models import db, User
from faker import Faker
from app.api.route_helpers import get_coordinates

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():

    for i in range(20):
        address_beg = fake.address()
        address_list = address_beg.split(' ')
        coords = get_coordinates(address_list[-1])
        db.session.add(
            User(
                username=fake.first_name() + str(fake.pyint()),
                public_email=fake.ascii_safe_email(),
                email=fake.ascii_safe_email(),
                password=fake.pystr(),
                range=fake.pyint(min_value=10, max_value=1000),
                address=address_beg,
                lat=coords[0],
                lon=coords[1],
                profile_pic=fake.image_url()
            )
        )
    address_beg2 = fake.address()
    address_list2 = address_beg.split(' ')
    coords2 = get_coordinates(address_list2[-1])
    demo = User(
        username='Demo',
        public_email='demo@aa.io',
        email='demo@aa.io',
        password='password',
        range=100,
        address=address_beg2,
        lat=coords2[0],
        lon=coords[1],
        profile_pic=fake.image_url()
    )

    db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
