const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
const resultArray = document.querySelectorAll(".resultant");

draggableElements.forEach((elem) => {
  elem.innerHTML = Math.round(Math.random() * 99);
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.target.className += " picked";
  event.dataTransfer.setData("text", event.target.innerHTML); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}
function dragEnd(event) {
  // event.target.className -= " picked";
  event.target.classList.remove("picked");
}

//Events fired on the drop target

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if (!event.target.classList.contains("dragging")) {
    event.target.className += " dragging";
  }
  event.preventDefault();
  // console.log(test.innerHTML);
  if (!event.target.classList.contains("choosed")) {
    console.log("Choosed item is dragged over");
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  // This is in order to prevent the browser default handling of the data
  if (!event.target.hasChildNodes()) {
    event.preventDefault();
  }

  event.target.classList.remove("droppable-hover");

  let test = document.querySelector(".picked");

  event.target.appendChild(test);
  var counter = 0;
  resultArray.forEach((element) => {
    if (element.hasChildNodes()) {
      counter++;
    }
  });

  droppableElements.forEach((element) => {
    //console.log("total elements");
  });
  const submitButton = document.querySelector(".check");
  if (counter === 5) {
    submitButton.style.display = "inline-block";
  } else {
    submitButton.style.display = "none";
  }
}
//function when button is pressed
function submitPressed() {
  console.log("submit key is pressed.");
  var checker = -1;
  var res = 0;
  resultArray.forEach((element) => {
    if (element.hasChildNodes()) {
      if (element.firstChild.innerHTML > checker) {
        console.log("greater");
        checker = element.firstChild.innerHTML;
      } else {
        res = 1;
      }
    }
  });
  const resultText = document.querySelector(".answer");
  const restartButton = document.querySelector(".restart");
  restartButton.style.display = "block";
  if (res == 0) {
    resultText.style.display = "block";
  } else {
    resultText.innerHTML = "Wrong Answer";
    resultText.style.display = "block";
    resultText.style.color = "red";
  }
}
