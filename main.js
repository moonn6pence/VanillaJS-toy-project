const body = document.querySelector("body");

// menu

const menu = document.querySelector(".menu");
const menuOutBtn = document.querySelector(".menu__outBtn");
const menuOnBtn = document.querySelector(".menu__onBtn");

menuOutBtn.addEventListener("click", () => {
  menu.classList.remove("active");
  menuOnBtn.classList.add("active");
});

menuOnBtn.addEventListener("click", () => {
  menu.classList.add("active");
  menuOnBtn.classList.remove("active");
});

// modal

const modalTestBtn = document.querySelector(".modal-testBtn");
const modalOverlay = document.querySelector(".modal-overlay");
const modalWindow = document.querySelector(".modal-window");
const modalShutDown = document.querySelector(".modal-shutDown");
const modalWidth = modalWindow.getBoundingClientRect().width;
const modalHeight = modalWindow.getBoundingClientRect().height;

showModal = () => {
  modalWindow.style.transform = `translate(${
    (window.innerWidth - modalWidth) / 2
  }px,${(window.innerHeight - modalHeight) / 2 + window.scrollY}px)`;
  body.style.overflowY = "hidden";
  modalOverlay.classList.add("active");
};

hideModal = () => {
  body.style.overflowY = "scroll";
  modalOverlay.classList.remove("active");
};

modalTestBtn.addEventListener("click", () => {
  showModal();
});

modalOverlay.addEventListener("click", (event) => {
  const target = event.target;
  const targetNode = target.nodeName;
  if (
    targetNode === "BUTTON" ||
    targetNode === "I" ||
    target.matches(".modal-overlay")
  ) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (modalOverlay.classList.contains("active") && event.key === "Escape") {
    hideModal();
  }
});

// slider

const sliderContainer = document.querySelectorAll(".slider-container");
const sliderPrevBtn = document.querySelector(".slider-prevBtn");
const sliderNextBtn = document.querySelector(".slider-nextBtn");
const sliderAllItems = document.querySelector(".slider-items");
const sliderItems = document.querySelectorAll(".slider-item");
const sliderTotal = sliderItems.length;
let curItemIndex = 0;
let pos = 0;

sliderItems.forEach((item) => {
  item.style.left = `${pos}%`;
  pos += 100;
});

sliderPrevBtn.addEventListener("click", () => {
  if (curItemIndex === 0) {
    return;
  }
  sliderAllItems.style.transform = `translateX(${--curItemIndex * -100}%)`;
});

sliderNextBtn.addEventListener("click", () => {
  if (curItemIndex === sliderTotal - 1) {
    return;
  }
  sliderAllItems.style.transform = `translateX(${++curItemIndex * -100}%)`;
});

// drag and drop

const dndZone1 = document.querySelector(".zone-1");
const dndZone2 = document.querySelector(".zone-2");
const dndItem1 = document.querySelector(".dnd-item1");
const dndItem2 = document.querySelector(".dnd-item2");

function onDragStart(event) {
  event.dataTransfer.setData("text", event.target.classList);
  event.dataTransfer.dropEffect = "move";
}

function onDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function onDrop(event) {
  const itemClass = event.dataTransfer.getData("text");
  const item = document.querySelector(`.${itemClass}`);
  const dropZone = event.target;

  event.currentTarget.style.borderColor = "";

  item.style.left = `${event.offsetX}px`;
  item.style.top = `${event.offsetY}px`;
  dropZone.appendChild(item);

  event.dataTransfer.clearData();
}

function onDragEnter(event) {
  event.currentTarget.style.borderColor = "#fff";
}

function onDragLeave(event) {
  event.currentTarget.style.borderColor = "";
}

dndItem1.ondragstart = onDragStart;

dndZone1.ondragover = onDragOver;
dndZone1.ondrop = onDrop;
dndZone1.ondragenter = onDragEnter;
dndZone1.ondragleave = onDragLeave;

dndItem2.ondragstart = onDragStart;

dndZone2.ondragover = onDragOver;
dndZone2.ondrop = onDrop;
dndZone2.ondragenter = onDragEnter;
dndZone2.ondragleave = onDragLeave;

// file upload

const fileList = document.querySelector(".upload-list");

function showFiles(file) {
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "list-item");
  listItem.innerHTML = `
    <span class = "item-title">${file.name}</span>
    <i class="fas fa-trash-alt"></i>
  `;
  fileList.appendChild(listItem);
}

const uploadZone = document.querySelector(".upload-zone");
uploadZone.ondrop = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const data = event.dataTransfer;
  if (data.items) {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].kind === "file") {
        let file = data.items[i].getAsFile();
        showFiles(file);
        console.log(file);
      }
    }
  }
};
uploadZone.ondragover = (event) => {
  event.preventDefault();
};

fileList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "I") {
    fileList.removeChild(target.parentNode);
  }
});
