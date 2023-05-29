import catalog from "./catalogList.js";
const tabsBox = document.querySelector(".tabs-box");
const prevTabs = document.querySelector(".prev-tabs");
const nextTabs = document.querySelector(".next-tabs");
const catalogueSection = document.querySelector(".catalogue-section");
document.querySelector(".catalogue-box").onclick = (e) => {
  document
    .querySelector(".catalogue-box")
    .classList.toggle("catalogue-box_anim");
  if (document.querySelector(".catalogue-box_anim")) {
    catalogueSection.style.visibility = "visible";
    document.querySelector(".column-1").style.visibility = "visible";
    // document.querySelector(".column-2").style.visibility = "visible";
    document.querySelector(".wall-box").style.visibility = "visible";
  } else {
    const buttonsItemsArr = document.querySelectorAll(".button-item");
    buttonsItemsArr.forEach((item, i) => {
      // item.style.background = "#E6DCFF"
      item.classList.remove("button-item_anim-2");
      item.classList.remove("button-item_anim");
      // item.style.background = "#FFFFFF"
    });
    document.querySelector(".column-1").style.visibility = "hidden";
    document.querySelector(".column-2").style.visibility = "hidden";
    catalogueSection.style.visibility = "hidden";
    document.querySelector(".wall-box").style.visibility = "hidden";
    document.querySelector(".column-3").style.visibility = "hidden";
  }
};
let valuePxTabs = 0;
let prevInterval;
let nextInterval;
let checkAnswerColumnOpen = false;
document.addEventListener("mouseover", (e) => {
  const { target } = e;
  if (target.className == "next-tabs") {
    nextInterval = setInterval(() => {
      valuePxTabs = valuePxTabs -= 15;
      valuePxTabs <= -322
        ? clearInterval(nextInterval)
        : (tabsBox.style.left = valuePxTabs + "px");
    }, 50);
  } else if (target.className == "prev-tabs") {
    prevInterval = setInterval(() => {
      valuePxTabs = valuePxTabs += 15;
      valuePxTabs >= 10
        ? clearInterval(prevInterval)
        : (tabsBox.style.left = valuePxTabs + "px");
    }, 50);
  }
});
document.addEventListener("mouseout", (e) => {
  const { target } = e;
  if (target.className == "next-tabs") {
    clearInterval(nextInterval);
  } else if (target.className == "prev-tabs") {
    clearInterval(prevInterval);
  }
});
let indexTabs = 0;
let indexTabsTwo = 0;
let indexTabsThree = 0;
let checkAnswer;
const columnFunc = (text, place, num, answers) => {
  const buttonItem = document.createElement("button");
  const imgArrow = document.createElement("img");
  const buttonText = document.createElement("p");
  imgArrow.setAttribute("src", "icons/catalogue-arrow.svg");
  buttonItem.classList.add("button-item");
  buttonText.classList.add("button-item_text");
  buttonText.textContent = text;
  buttonItem.append(buttonText);
  if (num == 1) {
    buttonItem.id = indexTabs;
    buttonText.id = indexTabs;
    place.append(buttonItem);
    indexTabs++;
  } else if (num == 2) {
    buttonItem.id = indexTabsTwo;
    buttonText.id = indexTabsTwo;
    buttonItem.classList.add("item-column-2");
    if (!answers) {
      buttonItem.append(imgArrow);
      checkAnswerColumnOpen = false
    } else {
      checkAnswerColumnOpen = true
    }
    place.append(buttonItem);
    indexTabsTwo++;
  } else if (num == 3) {
    buttonItem.id = indexTabsThree;
    buttonText.id = indexTabsThree;
    place.append(buttonItem);
    indexTabsThree++;
  } else if (num == 4) {
    buttonItem.id = indexTabsTwo;
    buttonText.id = indexTabsTwo;
    buttonItem.classList.add("item-column-2");
    // buttonItem.append(imgArrow);
    place.append(buttonItem);
  }
};
let textColumnOne = [
  "Игры и игрушки",
  "Цифровые товары",
  "Медицинские изделия",
  "Творчество",
  "Сувениры",
  "Канцелярские товары",
  "Продукты питания",
  // "Ортопедические изделия",
  // "Мать и дитя",
  // "Одежда, обувь и аксессуары",
  // "Оптика",
  // "Детское питание",
  // "Спортивные товары",
  // "Товары для активного отдыха",
]; //14
textColumnOne.forEach((item, i) =>
  columnFunc(item, document.querySelector(".column-1"), 1, false)
);
let checkTagetId;
let checkTagetIdTwo;
document.querySelector(".column-1").addEventListener("click", (e) => {
  const { target } = e;
  document.querySelector(".column-2").style.visibility = "visible";
  const buttonsItemsArr = document.querySelectorAll(".button-item");
  buttonsItemsArr.forEach((item, i) => {
    if (target.id == i) {
      // item.style.background = "#E6DCFF"
      item.classList.add("button-item_anim");
      item.classList.remove("button-item_anim-2");
    } else {
      item.classList.add("button-item_anim-2");
      item.classList.remove("button-item_anim");
      // item.style.background = "#FFFFFF"
    }
  });
  document.querySelector(".column-2").innerHTML = "";
  document.querySelector(".column-3").style.visibility = "hidden";
  catalog[target.id].forEach((item, i, arr) => {
    if (item.answers.length == 0) {
      checkAnswer = true;
    } else {
      checkAnswer = false;
    }
    columnFunc(item.text, document.querySelector(".column-2"), 2, checkAnswer);
    if (i == arr.length - 1) {
      indexTabsTwo = 0;
    }
    checkTagetId = target.id;
  });
});
document.querySelector(".column-2").addEventListener("click", (e) => {
  const { target } = e;
  const buttonsItemsArr = document
    .querySelector(".column-2")
    .querySelectorAll(".button-item");
  buttonsItemsArr.forEach((item, i) => {
    if (target.id == i) {
      // item.style.background = "#E6DCFF"
      item.classList.add("button-item_anim");
      item.classList.remove("button-item_anim-2");
    } else {
      item.classList.add("button-item_anim-2");
      item.classList.remove("button-item_anim");
      // item.style.background = "#FFFFFF"
    }
  });
  if (catalog[checkTagetId][target.id].answers.length == 0) {
    document.querySelector(".column-3").style.visibility = "hidden";
    location.replace(catalog[checkTagetId][target.id].href);
  } else {
    document.querySelector(".column-3").style.visibility = "visible";
  }
  document.querySelector(".column-3").innerHTML = "";
  catalog[checkTagetId][target.id].answers.forEach((item, i, arr) => {
    columnFunc(item, document.querySelector(".column-3"), 3, false);
    if (i == arr.length - 1) {
      indexTabsThree = 0;
    }
    console.log(arr.length);
    if(arr.length == 0){
      console.log("object");
    }
    checkTagetIdTwo = target.id;
  });
});
document.querySelector(".column-3").addEventListener("click", (e) => {
  const { target } = e;
  location.replace(catalog[checkTagetId][checkTagetIdTwo].href[target.id]);
});
