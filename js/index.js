document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const searchInput = document.getElementById('search').value;
      
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchInput}`);
        const data = await response.json();
        
        // Clear previous results
        userList.innerHTML = '';
        
        data.items.forEach(user => {
          const li = document.createElement('li');
          const username = user.login;
          const avatarUrl = user.avatar_url;
          const profileUrl = user.html_url;
          
          li.innerHTML = `
            <img src="${avatarUrl}" alt="${username}" width="50" height="50">
            <a href="${profileUrl}" target="_blank">${username}</a>
          `;
          
          li.addEventListener('click', async () => {
            try {
              const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
              const reposData = await reposResponse.json();
              
              // Clear previous results
              reposList.innerHTML = '';
              
              reposData.forEach(repo => {
                const repoLi = document.createElement('li');
                repoLi.textContent = repo.name;
                reposList.appendChild(repoLi);
              });
            } catch (error) {
              console.error('Error fetching repositories:', error);
            }
          });
          
          userList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });
  });
  