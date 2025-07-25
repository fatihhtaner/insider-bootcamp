const appendLocation = "#user-container";

const API_URL = "https://randomuser.me/api/?results=10";

const STORAGE_KEY = "userData";
const SESSION_KEY = "buttonUsed";

const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Storage read error:", error);
    return null;
  }
};

const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Storage write error:", error);
  }
};

const isDataExpired = (timestamp) => {
  const now = Date.now();
  const expireTime = 5 * 60 * 1000;
  return now - timestamp > expireTime;
};

const createUserCard = (user) => {
  const card = document.createElement("div");
  card.className = "user-card";
  card.style.cssText = `
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;

  const userHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <img src="${user.picture.medium}" alt="${user.name.first}" style="border-radius: 50%; width: 60px; height: 60px;">
            <div>
                <h3 style="margin: 0 0 5px 0; color: #333;">${user.name.first} ${user.name.last}</h3>
                <p style="margin: 0 0 3px 0; color: #666;">${user.email}</p>
                <p style="margin: 0; color: #888;">${user.location.city}, ${user.location.country}</p>
            </div>
        </div>
    `;

  card.innerHTML = userHTML;

  const button = document.createElement("button");
  button.textContent = "Sil";
  button.style.cssText = `
        background: #ff4757;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: auto;
    `;
  button.addEventListener("click", () => {
    deleteUser(user.login.uuid);
  });

  card.querySelector("div").appendChild(button);

  return card;
};

const createReloadButton = () => {
  const button = document.createElement("button");
  button.id = "reload-users-btn";
  button.textContent = "Kullanıcıları Yeniden Yükle";
  button.style.cssText = `
        background: #2ed573;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        margin: 20px 0;
        display: block;
    `;

  button.addEventListener("click", () => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.setItem(SESSION_KEY, "true");
      loadUsers();
      button.style.display = "none";
    }
  });

  return button;
};

const displayUsers = (users) => {
  const container = document.querySelector(appendLocation);
  if (!container) {
    console.error(`Selector "${appendLocation}" bulunamadı!`);
    return;
  }

  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #666;">Kullanıcı bulunamadı.</p>';
    return;
  }

  users.forEach((user) => {
    container.appendChild(createUserCard(user));
  });
};

const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
};

const loadUsers = async () => {
  const storedData = getStorageData(STORAGE_KEY);

  if (storedData && !isDataExpired(storedData.timestamp)) {
    console.log("Veriler localStorage'dan yüklendi");
    displayUsers(storedData.users);
    return;
  }

  console.log("API'den yeni veriler çekiliyor...");
  const users = await fetchUsers();

  if (users) {
    const dataToStore = {
      users: users,
      timestamp: Date.now(),
    };
    setStorageData(STORAGE_KEY, dataToStore);
    displayUsers(users);
  } else {
    console.error("Kullanıcı verileri alınamadı!");
  }
};

const deleteUser = (userId) => {
  const storedData = getStorageData(STORAGE_KEY);
  if (!storedData) return;

  const updatedUsers = storedData.users.filter(
    (user) => user.login.uuid !== userId
  );

  if (updatedUsers.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    displayUsers([]);

    const container = document.querySelector(appendLocation);
    if (container && !document.getElementById("reload-users-btn")) {
      container.appendChild(createReloadButton());
    }
  } else {
    const updatedData = {
      users: updatedUsers,
      timestamp: storedData.timestamp,
    };
    setStorageData(STORAGE_KEY, updatedData);
    displayUsers(updatedUsers);
  }
};

const observeButtonChanges = () => {
  const container = document.querySelector(appendLocation);
  if (!container) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const reloadButton = document.getElementById("reload-users-btn");
        if (reloadButton && sessionStorage.getItem(SESSION_KEY)) {
          reloadButton.style.display = "none";
        }
      }
    });
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
  });
};

const init = () => {
  console.log("Kullanıcı yönetim sistemi başlatılıyor...");
  console.log(`Veriler "${appendLocation}" selector'ına eklenecek`);

  observeButtonChanges();

  loadUsers();

  console.log('Kullanıcıları silmek için "Sil" butonlarını kullanabilirsiniz.');
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

window.deleteUser = deleteUser;
window.loadUsers = loadUsers;
