function showNewUserOnScreen(user) {
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id="${user._id}">
      <span>Name: ${user.name}</span>
      <span>Email: ${user.email}</span>
      <span>Phone: ${user.mobile}</span>
      <button onclick="deleteUser('${user._id}')">Delete User</button>
      <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${user.mobile}')">Edit User</button>
    </li>`;
  
    parentNode.insertAdjacentHTML('beforeend', childHTML);
  }
  
  function editUser(userId, name, email, mobile) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('mobile').value = mobile;
  
    
    const userIdInput = document.createElement('input');
    userIdInput.type = 'hidden';
    userIdInput.name = 'userId';
    userIdInput.value = userId;
    document.getElementById('my-form').appendChild(userIdInput);
  }
  
  function deleteUser(userId) {
    
  }
  
  function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.mobile.value;
    const userId = event.target.userId.value; 
  
    const obj = {
      name,
      email,
      mobile,
    };
  
    if (userId) {
     
      axios
        .put(`https://crudcrud.com/api/9a308f5019bf4607859368db73e5ae6a/appiontmentData/${userId}`, obj)
        .then((response) => {
         
        })
        .catch((error) => {
         
        });
    } else {
     
      axios
        .post('https://crudcrud.com/api/9a308f5019bf4607859368db73e5ae6a/appiontmentData', obj)
        .then((response) => {
          showNewUserOnScreen(response.data);
        })
        .catch((error) => {
          
        });
    }
  
    
    document.getElementById('my-form').reset();
    const userIdInput = document.querySelector('input[name="userId"]');
    if (userIdInput) {
      userIdInput.remove();
    }
  }
  

  document.getElementById('my-form').addEventListener('submit', saveToLocalStorage);
  

  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/9a308f5019bf4607859368db73e5ae6a/appiontmentData")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          showNewUserOnScreen(response.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  });
  