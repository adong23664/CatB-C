// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

// Import shared functions
import { setImageFromStorage } from "./functions/shared.js";
import { getStayRules } from "./functions/shared.js";
// Your web app's Firebase configuration for Firestore
const firebaseConfig = {
  apiKey: "AIzaSyAabejiknO69OWAU2OaU3iKsYWgIEawMRE",
  authDomain: "catbnc-e583c.firebaseapp.com",
  projectId: "catbnc-e583c",
  storageBucket: "catbnc-e583c.appspot.com",
  messagingSenderId: "929185190979",
  appId: "1:929185190979:web:68c8f2d487502e570570f6",
  measurementId: "G-X5SH7RX72T",
};

// Firebase configuration for Storage
const storageConfig = {
  apiKey: "AIzaSyCeguOEfQFPuXi7bNTBpzVqQcurKgSwRRU",
  authDomain: "catbncpic.firebaseapp.com",
  projectId: "catbncpic",
  storageBucket: "catbncpic.appspot.com",
  messagingSenderId: "1053848658368",
  appId: "1:1053848658368:web:b4631f82d7dfc1ffd3e825",
  measurementId: "G-NFFWHD2E1S",
};

// Initialize Firebase for Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase for Storage
const storageApp = initializeApp(storageConfig, "storageApp");
const storage = getStorage(storageApp);

// Firestore: Fetch and display content
const docRef = doc(db, "WebContent", "OurStory");
getDoc(docRef)
  .then((docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);

      // Update title content
      const storyTitle = document.querySelector(".myTitle");
      storyTitle.innerHTML = data.title;

      // Update story content
      const storyDiv = document.querySelector(".story");
      storyDiv.innerHTML = ""; // Clear previous content

      // Iterate through content and display
      data.content.forEach((section) => {
        const paragraph = document.createElement("p");
        paragraph.className = "text-center featured-block-text";

        let paragraphText = section.text;

        // Bold each highlighted word
        section.highlight.forEach((word) => {
          const regex = new RegExp(`(${word})`, "g");
          paragraphText = paragraphText.replace(regex, "<strong>$1</strong>");
        });

        paragraph.innerHTML = paragraphText;
        storyDiv.appendChild(paragraph);
      });
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.error("Error getting document:", error);
  });

// Storage: Fetch and set image URLs
const bathImageRef = ref(storage, "bath.jpg");
const environmentImageRef = ref(storage, "environment.jpg");
const equipmentImageRef = ref(storage, "equipment.jpg");

setImageFromStorage(bathImageRef, "bath");
setImageFromStorage(environmentImageRef, "environment");
setImageFromStorage(equipmentImageRef, "equipment");
/////////////////////////////////////////////////////////////////////////////////////////////////
async function renderStayRules() {
  try {
    // 獲取rules data
    const rules = await getStayRules(db);

    // 獲取誒面上用於渲染規則的容器
    const rulesContainer = document.querySelector("#stay-rules-list");

    // 清空容器内容
    rulesContainer.innerHTML = "";

    // 遍歷rules data 創建 DOM 元素
    rules.forEach((rule) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");

      const title = document.createElement("h5");
      title.textContent = rule.ruleTitle;

      const detail = document.createElement("p");
      detail.textContent = rule.ruleDetail;

      listItem.appendChild(title);
      listItem.appendChild(detail);

      rulesContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error rendering stay rules:", error);
  }
}

// 執行renderStayRules
document.addEventListener("DOMContentLoaded", renderStayRules);
