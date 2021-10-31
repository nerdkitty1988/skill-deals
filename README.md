<br />
<p align="center">
    <img src="https://github.com/nerdkitty1988/skill-deals/blob/main/react-app/src/components/NavBar/logo.jpg" alt="Logo" style="background-color:white">

  <h3 align="center">Skill Deals</h3>

  <p align="center">
   Skill deals is an app to connect people who would like to barter services.  Users can either post an offer of a service they would trade, or they can post a request for a service they are in need of.  If the user finds an offer or request they are interested in, there is a messaging feature enabled to connect the users in a private chat room for conversations.
    <br />
    <a href="https://github.com/nerdkitty1988/skill-deals/wiki"><strong>Skill Deals Wiki »</strong></a>
    <br />
    <br />
    <a href="https://skill-deals.herokuapp.com/">Live Site Here</a>
  </p>
</p>


## Overall Structure

### Back End
The app was built using Flask, SQLAlchemy, and Python on the back end with a PostgreSQL database. The backend structure is RESTful API. Model associations are used to minimize database queries to the backend, assuring speed and reliability.

### Front End
The front end is built with React and Javascript while utilizing Redux architecture, producing a lightning-fast user interface and calling upon dynamically rendered components.

### Built With

* [React](https://reactjs.org/)
* [JavaScript](https://www.javascript.com/)
* [Python](https://docs.python.org/3/)
* [Redux](https://redux.js.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [PostgreSQL](https://www.postgresql.org/docs/current/)
* [CSS](http://www.css3.info/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Installation

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/nerdkitty1988/skill-deals.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.



## Usage
### Only registered users can use the site.  Splash page before sign in or sign up:
![SplashPage](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/splash-ss.png)
### An easy-to-use login with a pre-configured Demo User:
![Login](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/login-ss.png)
### Users can create their own account with an easy sign up:
![Signup](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/signup-ss.png)
### Once logged in, you can see a navigation bar to help guide you around the site.  On the navigation bar, there is a dropdown menu to view user profile, messages, or to log out:
![DropDown](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/dropdown-ss.png)
### Home lets the user View requests and offers close to them:
![Home](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/home-ss.png)
### Or view all requests or offers in their own pages:
![AllOffers](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/offers-ss.png)
### Go into the individual trade to view more details, and a clickable link to the author's profile:
![SingleTrade](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/singletrade-ss.png)
### Create your own offers or requests:
![CreateTrade](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/newtrade-ss.png)
### Rate other users based on user experience:
![Reviews](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/review-ss.png)
### View your own profile to edit or delete user trades, or to edit your profile:
![Profile](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/profile-ss.png)
### Or view other users profiles to rate users, or see their other offers and requests:
![UserProfile](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/userprofile-ss.png)
### Chat with other users to work out fine details of your trade
![Messages](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/chat-ss.png)
### Search to find trades or users:
![Search](https://github.com/nerdkitty1988/skill-deals/blob/main/githubImg/searchresults-ss.png)

## Challenges

- This app features the Haversine formula for calculating distance.  While I can't take credit for the amazing formula, implementing it without drastically slowing my site was a hurdle.

- This app also features a messaging feature.  This feature did not need to be robust, and also needed to be custom fit for the app.  I built my own messaging page with private chat rooms without the use of websockets (yet).  This was a challenge, but I do plan on expanding this feature.

- This app is a mixture of dynamic elements and rendered ones.  A large challenge was finding the right combination of useEffect functions and their dependency arrays.

- This app also features multiple modals.  Implementing those so that the data was passed between them was a bit of a blocker.  I was able to also implement these with a mixture of dynamic and rendered elements.




## Contact

* Jami Travers- [LinkedIn](https://www.linkedin.com/in/jami-travers-3393711aa/) - [GitHub](https://github.com/nerdkitty1988)


Project Link: [https://skill-deals.herokuapp.com/](https://skill-deals.herokuapp.com/)
