from app.models import db, Request


def seed_requests():
    request1 = Request(
        latitude = '32.7555° N',
        longitude = '97.3308° W',
        location_range = 50,
        title = 'Lawn care',
        description = 'I am requesting lawn care for anyone who may need it.  request what you can.',
        user_id = 1
    )
    request2 = Request(
        latitude = '32.7767° N',
        longitude = '96.7970° W',
        location_range = 50,
        title = 'Plumbing',
        description = 'I am requesting plumbing work for anyone who may need it.  request what you can.',
        user_id = 2
    )
    request3 = Request(
        latitude = '29.7604° N° N',
        longitude = '95.3698° W',
        location_range = 50,
        title = 'Car Mechanic',
        description = 'I am requesting oil changes for anyone who may need it.  request what you can.',
        user_id = 3
    )
    request4 = Request(
        latitude = '30.2672° N',
        longitude = '97.7431° W',
        location_range = 50,
        title = 'Computer set up',
        description = 'I am requesting computer set up for anyone who may need it.  request what you can.',
        user_id = 2
    )
    request5 = Request(
        latitude = '31.5493° N',
        longitude = '97.1467° W',
        location_range = 50,
        title = 'Gardening',
        description = 'I am requesting gardening for anyone who may need it.  request what you can.',
        user_id = 1
    )

    db.session.add(request1)
    db.session.add(request2)
    db.session.add(request3)
    db.session.add(request4)
    db.session.add(request5)

    db.session.commit()



def undo_requests():
    db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
    db.session.commit()
