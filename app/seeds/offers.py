from app.models import db, Offer


def seed_offers():
    offer1 = Offer(
        latitude = '32.7555° N',
        longitude = '97.3308° W',
        location_range = 50,
        title = 'Lawn care',
        description = 'I am offering lawn care for anyone who may need it.  Offer what you can.',
        user_id = 1
    )
    offer2 = Offer(
        latitude = '32.7767° N',
        longitude = '96.7970° W',
        location_range = 50,
        title = 'Plumbing',
        description = 'I am offering plumbing work for anyone who may need it.  Offer what you can.',
        user_id = 2
    )
    offer3 = Offer(
        latitude = '29.7604° N° N',
        longitude = '95.3698° W',
        location_range = 50,
        title = 'Car Mechanic',
        description = 'I am offering oil changes for anyone who may need it.  Offer what you can.',
        user_id = 3
    )
    offer4 = Offer(
        latitude = '30.2672° N',
        longitude = '97.7431° W',
        location_range = 50,
        title = 'Computer set up',
        description = 'I am offering computer set up for anyone who may need it.  Offer what you can.',
        user_id = 2
    )
    offer5 = Offer(
        latitude = '31.5493° N',
        longitude = '97.1467° W',
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
