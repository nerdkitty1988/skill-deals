from app.models import db, Request
from faker import Faker

fake = Faker()


def seed_requests():
    for i in range(50):
        db.session.add(
            Request(
                title = fake.job(),
                description = fake.paragraph(nb_sentences=5, variable_nb_sentences=False),
                user_id = fake.pyint(min_value=1, max_value=20)
            )
        )


    db.session.commit()


def undo_requests():
    db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
    db.session.commit()
