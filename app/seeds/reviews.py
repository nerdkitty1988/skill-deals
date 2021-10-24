from app.models import db, Review
from faker import Faker

fake = Faker()


def seed_reviews():
    for i in range(50):
        db.session.add(
            Review(
                author_id = fake.pyint(min_value=1, max_value=21),
                reviewed_user_id = fake.pyint(min_value=1, max_value=21),
                rating = fake.pyint(min_value=1, max_value=10),
                comment = fake.paragraph(nb_sentences=10, variable_nb_sentences=True),
            )
        )

    db.session.commit()



def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
