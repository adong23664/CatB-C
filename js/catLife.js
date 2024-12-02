import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const storage = getStorage();
const listRef = ref(storage, "Cat/"); // 'pets/' 是存放照片的資料夾名稱
const container = document.getElementById("pet-cards-container");

// 從 Firebase Storage 取得照片 URL 並生成 Bootstrap 卡片
listAll(listRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef)
        .then((url) => {
          const proxiedUrl = `https://cors-anywhere.herokuapp.com/${url}`;
          const card = document.createElement("div");
          card.className = "col-lg-3 col-md-4 col-sm-6 mb-4";

          card.innerHTML = `
            <div class="card">
              <img src="${proxiedUrl}" class="card-img-top" alt="Pet Image">
              <div class="card-body">
                <h5 class="card-title">寵物照片</h5>
                <p class="card-text">這是您的寵物照片。</p>
              </div>
            </div>
          `;

          container.appendChild(card);
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Error listing images:", error);
  });
