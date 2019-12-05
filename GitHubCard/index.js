/* Step 1: using axios, send a GET request to the following URL 
           (replacing the place with your Github name):
           https://api.github.com/users/<your name>
*/

let myData = 'hi';

axios
  .get('https://api.github.com/users/ljh-c')
  .then(response => {
    const newCard = cardMaker(response.data);
    document.querySelector('.cards').appendChild(newCard);
  })
  .catch(error => {
    console.log('Data was not returned', error);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

// const component = cardMaker(myData);

// const cards = document.querySelector('.cards');
// cards.appendChild(component);

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// * * * * * * * * MANUAL LIST OF FOLLOWERS: START

// const followersArray = ['samscha', 'MosesSupposes', 'Ramonta-Lee', 'zakmayfield', 'krisdmonroe'];

// followersArray.forEach(user => {
//   axios
//     .get(`https://api.github.com/users/${user}`)
//     .then(response => {
//       const newCard = cardMaker(response.data);
//       document.querySelector('.cards').appendChild(newCard);
//     })
//     .catch(error => {
//       console.log('Data was not returned', error);
//     });
// });

// * * * * * * * * MANUAL LIST OF FOLLOWERS: END

// * * * * * * * * PROGRAMMED LIST OF FOLLOWERS: START

axios
  .get('https://api.github.com/users/ljh-c/followers')
  .then(response => {
    const followers = response.data.map(user => user.url);
    console.log(followers);
    return followers;
  })
  .then(result => {
    result.forEach(api => {
      axios.get(api)
      .then(response => {
        console.dir(response);
        const newCard = cardMaker(response.data);
        document.querySelector('.cards').appendChild(newCard);
      });
    })
  })
  .then(() => {
    const myCard = document.querySelector('.card');
    console.log(myCard);

    const myDiv = document.createElement('div');
    myDiv.classList.add('calendar-wrapper');
    myCard.after(myDiv);

    const calendarParts = makeCalendarComponents();
    myDiv.appendChild(calendarParts[0]);
    myDiv.appendChild(calendarParts[1]);
  })
  .catch(error => {
    console.log('Data was not returned', error);
  });

// * * * * * * * * PROGRAMMED LIST OF FOLLOWERS: END

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardMaker(data) {
  const card = document.createElement('div');
  card.classList.add('card');

  const avatar = document.createElement('img');
  avatar.src = `${data.avatar_url}`;
  avatar.addEventListener('click', () => {
    card.classList.toggle('expand');
  });
  card.appendChild(avatar);

  const cardInfo = document.createElement('div');
  card.appendChild(cardInfo);

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = `${data.name}`;
  cardInfo.appendChild(name);

  const handle = document.createElement('p');
  handle.classList.add('username');
  handle.textContent = `${data.login}`;
  cardInfo.appendChild(handle);

  const location = document.createElement('p');
  location.textContent = `Location: ${data.location}`;
  cardInfo.appendChild(location);

  const profile = document.createElement('p');
  cardInfo.appendChild(profile);

  const pageLink = document.createElement('a');
  pageLink.href = `${data.html_url}`;
  pageLink.textContent = `${data.html_url}`;
  profile.appendChild(pageLink);

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${data.followers}`;
  cardInfo.appendChild(followers);

  const following = document.createElement('p');
  following.textContent = `Following: ${data.following}`;
  cardInfo.appendChild(following);

  const bio = document.createElement('p');
  bio.textContent = `${data.bio}`;
  cardInfo.appendChild(bio);
  
  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

  // * * * * * * * * GITHUB CONTRIBUTIONS: STRETCH

function makeCalendarComponents() {
  const calendar = document.createElement('div');
  calendar.classList.add('calendar');
  calendar.textContent = 'Loading data...';

  const script = document.createElement('script');
  script.innerHTML = `new GitHubCalendar(".calendar", "ljh-c", { responsive: true })`;

  return [calendar, script];
}