from app.models import db, Offer
from faker import Faker

fake = Faker()


def seed_offers():

    for i in range(50):
        db.session.add(
            Offer(
                title = fake.job(),
                description = fake.paragraph(nb_sentences=5, variable_nb_sentences=False),
                user_id = fake.pyint(min_value=1, max_value=20)
            )
        )


    db.session.commit()


def undo_offers():
    db.session.execute('TRUNCATE offers RESTART IDENTITY CASCADE;')
    db.session.commit()
