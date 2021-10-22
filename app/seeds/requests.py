from app.models import db, Request


def seed_requests():
    request1 = Request(
        city='Wallis',
        state='TX',
        zipcode='77485',
        lon= -96.063934,
        lat= 29.634144,
        location_range = 50,
        title = 'Lawn care',
        description = 'I am requesting lawn care for anyone who may need it.  request what you can.',
        user_id = 1
    )
    request2 = Request(
        city='Richmond',
        state='TX',
        zipcode='77469',
        lon=-95.760783,
        lat=29.582181,
        location_range = 50,
        title = 'Plumbing',
        description = 'I am requesting plumbing work for anyone who may need it.  request what you can.',
        user_id = 2
    )
    request3 = Request(
        city='Richmond',
        state='KY',
        zipcode='40475',
        lon=-84.294654,
        lat=37.747857,
        location_range = 50,
        title = 'Car Mechanic',
        description = 'I am requesting oil changes for anyone who may need it.  request what you can.',
        user_id = 3
    )
    request4 = Request(
        city='Berea',
        state='KY',
        zipcode='40403',
        lon=-84.25683700,
        lat=37.57328100,
        location_range = 50,
        title = 'Computer set up',
        description = 'I am requesting computer set up for anyone who may need it.  request what you can.',
        user_id = 2
    )
    request5 = Request(
        city='Somersworth',
        state='NH',
        zipcode='03878',
        lon=-70.88509800,
        lat=43.25324400,
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
