console.log('Idemooo');

const usernameInput = document.querySelector('.username');
const searchBtn = document.querySelector('.submit');


searchBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  userData(`https://api.github.com/users/${username}`);
});

async function userData(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    displayUserData(await response.json());
  } else {
    console.log('NEMAMO TOG USERA');
  }
}

function displayUserData(data) {
  if (data) {
    console.log('IMAMO DATU', data);
  }
}