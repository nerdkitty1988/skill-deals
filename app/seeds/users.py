from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', public_email='demo@aa.io', private_email='demo@aa.io', password='password', latitude='42.3601° N', longitude='71.0589° W', profile_pic='https://image.shutterstock.com/image-photo/handsome-unshaven-young-darkskinned-male-260nw-640011838.jpg')
    marnie = User(
        username='marnie', public_email='marnie@aa.io', private_email='marnie@aa.io', password='password', latitude='29.7604° N', longitude='95.3698° W', profile_pic='https://image.shutterstock.com/image-photo/happy-cheerful-young-woman-wearing-260nw-613759379.jpg')
    bobbie = User(
        username='bobbie', public_email='bobbie@aa.io', private_email='bobbie@aa.io', password='password', latitude='37.7749° N', longitude='122.4194° W', profile_pic='https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=')

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
