const usernameInput = document.querySelector('.search-bar__username');
const searchBtn = document.querySelector('.search');
const noResultsEl = document.querySelector('.search__no-results');
const modeSwitchBtn = document.querySelector('.mode-switch');

modeSwitchBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const modeText = modeSwitchBtn.children[0];
  const modeImg = modeSwitchBtn.children[1];
  if (modeText.textContent === 'DARK') {
    modeText.textContent = 'LIGHT';
    modeImg.src = 'assets/icon-sun.svg';
  } else {
    modeText.textContent = 'DARK';
    modeImg.src = 'assets/icon-moon.svg';
  }
});

searchBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  userData(`https://api.github.com/users/${username}`);
});

usernameInput.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    const username = usernameInput.value;
    userData(`https://api.github.com/users/${username}`);
  }
  noResultsEl.classList.remove('active');
});

async function userData(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    displayUserData(await response.json());
  } else {
    noResultsEl.classList.add('active');
  }
}

function displayUserData(data) {
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoProfileImage = document.querySelector('.user-info__profile-img');
  const userInfoUsername = document.querySelector('.user-info__username');
  const userInfoDateJoined = document.querySelector('.user-info__date-joined');
  const userInfoBio = document.querySelector('.user-info__bio');
  const userInfoRepos = document.querySelector('.user-info__repos');
  const userInfoFollowers = document.querySelector('.user-info__followers');
  const userInfoFollowing = document.querySelector('.user-info__following');
  const userInfoLocation = document.querySelector('.user-info__location');
  const userInfoTwitter = document.querySelector('.user-info__twitter');
  const userInfoWebsite = document.querySelector('.user-info__website');
  const userInfoCompany = document.querySelector('.user-info__company');
  
  if (data) {
    userInfoUsername.textContent = data.login;
    userInfoUsername.parentElement.href = data.html_url;
    userInfoProfileImage.src = data.avatar_url;
    userInfoDateJoined.textContent = formatDate(data.created_at);
    userInfoRepos.textContent = data.public_repos;
    userInfoFollowers.textContent = data.followers;
    userInfoFollowing.textContent = data.following;


    let possiblyNullAttributesArrays = [[data.name, userInfoName], [data.bio, userInfoBio], [data.location, userInfoLocation], [data.twitter_username, userInfoTwitter], [data.blog, userInfoWebsite], [data.company, userInfoCompany]]

    possiblyNullAttributesArrays.forEach(x => {
      const attribute = x[0];
      const element = x[1];
      if (attribute === null || attribute.length === 0) {
        addRemoveNotAvailClass(element, 'add')
        element.textContent = 'Not Available';
        if (element.parentElement.tagName === 'A') element.parentElement.href = '#'
      } else {
        addRemoveNotAvailClass(element, 'remove')
        element.textContent = attribute;
        if (element.parentElement.tagName === 'A') {
          if (element.classList.contains('user-info__twitter')){
            element.parentElement.href = `https://twitter.com/${data.twitter_username}`;
          } else if (element.classList.contains('user-info__website')) {
            element.parentElement.href = attribute;
          } else if (element.classList.contains('user-info__company')) {
            element.parentElement.href = attribute;
          }
        }
      }
    });
  }
};

function addRemoveNotAvailClass(element, op) {
  if (element.classList.contains('user-info__location') ||
  element.classList.contains('user-info__twitter') ||
  element.classList.contains('user-info__website') ||
  element.classList.contains('user-info__company')) {
    if (op === 'add') {
      element.parentElement.parentElement.parentElement.classList.add('not-avail');
    } else {
      element.parentElement.parentElement.parentElement.classList.remove('not-avail');
    }
  } else {
    if (op === 'add') {
      element.classList.add('not-avail');
    } else {
      element.classList.remove('not-avail');
    }
  }
};


function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date[8]+date[9]} ${months[Number(date[5]+date[6])-1]} ${date[0]+date[1]+date[2]+date[3]}`;
};

userData(`https://api.github.com/users/Developer-felix`);