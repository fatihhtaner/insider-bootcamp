const container = document.querySelector(".ins-api-users");
const STORAGE_KEY = "cachedUsers";
const EXPIRY_KEY = "cachedUsersExpiry";
const API_URL = "https://jsonplaceholder.typicode.com/users";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const style = document.createElement("style");
style.textContent = `
  .user-card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    margin: 15px 0;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .user-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .user-card h3 {
    margin: 0 0 12px 0;
    color: #2c3e50;
    font-size: 1.3em;
    font-weight: 600;
  }
  
  .user-card p {
    margin: 8px 0;
    color: #555;
    font-size: 0.95em;
    line-height: 1.4;
  }
  
  .user-card p strong {
    color: #34495e;
    font-weight: 600;
  }
  
  .user-card button {
    margin-top: 15px;
    padding: 8px 16px;
    color: white;
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .user-card button:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
  }
  
  .user-card button:active {
    transform: translateY(0);
  }
  
  .no-users {
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    padding: 40px 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 2px dashed #bdc3c7;
  }
  
  .error-message {
    color: #e74c3c;
    background-color: #fadbd8;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #e74c3c;
    font-weight: 500;
  }
`;
document.head.appendChild(style);

function deleteUser(id) {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  users = users.filter((user) => user.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  renderUsers(users);
}

function renderUsers(users) {
  container.innerHTML = "";
  if (users.length === 0) {
    container.innerHTML = '<div class="no-users">Kullanıcı bulunamadı.</div>';
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Adres:</strong> ${user.address.street}, ${user.address.city}</p>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.addEventListener("click", () => deleteUser(user.id));

    card.appendChild(deleteBtn);
    container.appendChild(card);
  });
}

async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API yanıtı başarısız");
    const users = await res.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(EXPIRY_KEY, Date.now().toString());
    renderUsers(users);
  } catch (err) {
    container.innerHTML = `<div class="error-message">Veri alınamadı: ${err.message}</div>`;
  }
}

function init() {
  const cachedUsers = localStorage.getItem(STORAGE_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (cachedUsers && expiry && Date.now() - parseInt(expiry) < ONE_DAY_MS) {
    const users = JSON.parse(cachedUsers);
    renderUsers(users);
  } else {
    fetchUsers();
  }
}

init();
