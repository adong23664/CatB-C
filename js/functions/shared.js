// functions/shared.js

import { getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// Function to fetch and set image URL
export function setImageFromStorage(imageRef, className) {
  getDownloadURL(imageRef)
    .then((url) => {
      const imgElement = document.querySelector(`img.${className}`);
      if (imgElement) {
        imgElement.src = url;
      }
    })
    .catch((error) => {
      console.error(`Error getting ${className} image URL:`, error);
    });
}

/**
 * 從 Firestore 中獲取入住規則
 * @param {Firestore} db - 已初始化的 Firestore 實例
 * @returns {Promise<Array>} - 返回包含所有規則對象的數組
 */
export async function getStayRules(db) {
  try {
    // 獲取 "StayRules" 集合中的 "rules" 文件
    const docRef = doc(db, "StayRules", "rules");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 獲取文件數據
      const data = docSnap.data();

      // 直接返回數組形式的規則數據
      return data.rule || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching stay rules:", error);
    throw error;
  }
}
