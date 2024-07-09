document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value;
      searchUsers(query);
    });
  
    // Function to search users by name
    function searchUsers(query) {
      const userSearchUrl = `https://api.github.com/search/users?q=${query}`;
      fetch(userSearchUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  
    // Function to display users in the DOM
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}">Show Repos</button>
        `;
        userList.appendChild(userItem);
  
        // Add event listener for the Show Repos button
        const showReposButton = userItem.querySelector('button');
        showReposButton.addEventListener('click', (e) => {
          const username = e.target.dataset.username;
          fetchUserRepos(username);
        });
      });
    }
  
    // Function to fetch user repositories
    function fetchUserRepos(username) {
      const userReposUrl = `https://api.github.com/users/${username}/repos`;
      fetch(userReposUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(repos => {
        displayRepos(repos);
      })
      .catch(error => console.error('Error fetching repos:', error));
    }
  
    // Function to display repositories in the DOM
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  