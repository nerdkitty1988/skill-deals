from app.models import db, Offer


def seed_offers():
    offer1 = Offer(
        city='Wallis',
        state='TX',
        zipcode='77485',
        lon= -96.063934,
        lat= 29.634144,
        location_range = 50,
        title = 'Lawn care',
        description = 'I am offering lawn care for anyone who may need it.  Offer what you can.',
        user_id = 1
    )
    offer2 = Offer(
        city='Richmond',
        state='TX',
        zipcode='77469',
        lon=-95.760783,
        lat=29.582181,
        location_range = 50,
        title = 'Plumbing',
        description = 'I am offering plumbing work for anyone who may need it.  Offer what you can.',
        user_id = 2
    )
    offer3 = Offer(
        city='Richmond',
        state='KY',
        zipcode='40475',
        lon=-84.294654,
        lat=37.747857,
        location_range = 50,
        title = 'Car Mechanic',
        description = 'I am offering oil changes for anyone who may need it.  Offer what you can.',
        user_id = 3
    )
    offer4 = Offer(
        city='Berea',
        state='KY',
        zipcode='40403',
        lon=-84.25683700,
        lat=37.57328100,
        location_range = 50,
        title = 'Computer set up',
        description = 'I am offering computer set up for anyone who may need it.  Offer what you can.',
        user_id = 2
    )
    offer5 = Offer(
        city='Somersworth',
        state='NH',
        zipcode='03878',
        lon=-70.88509800,
        lat=43.25324400,
        location_range = 50,
        title = 'Gardening',
        description = 'I am offering gardening for anyone who may need it.  Offer what you can.',
        user_id = 1
    )

    db.session.add(offer1)
    db.session.add(offer2)
    db.session.add(offer3)
    db.session.add(offer4)
    db.session.add(offer5)

    db.session.commit()


def undo_offers():
    db.session.execute('TRUNCATE offers RESTART IDENTITY CASCADE;')
    db.session.commit()
