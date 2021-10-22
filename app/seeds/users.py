from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', public_email='demo@aa.io', email='demo@aa.io', password='password', city='Wallis', state='TX', zipcode='77485', lat=29.634144, lon=-96.063934, profile_pic='https://image.shutterstock.com/image-photo/handsome-unshaven-young-darkskinned-male-260nw-640011838.jpg')
    marnie = User(
        username='marnie', public_email='marnie@aa.io', email='marnie@aa.io', password='password', city='Richmond', state='KY', zipcode='40475', lat=37.747857, lon=-84.294654, profile_pic='https://image.shutterstock.com/image-photo/happy-cheerful-young-woman-wearing-260nw-613759379.jpg')
    bobbie = User(
        username='bobbie', public_email='bobbie@aa.io', email='bobbie@aa.io', password='password', city='Beverly Hills', state='CA', zipcode='90210', lat=34.0696501, lon=-118.3963062, profile_pic='https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
