//horizontal scrolling
let backgroundContainer = document.querySelector("#background-container");
backgroundContainer.addEventListener("wheel", function (mouseScroll) {
  //console.log("mouse scrolled for", mouseScroll);
  mouseScroll.preventDefault();
  backgroundContainer.scrollLeft =
    backgroundContainer.scrollLeft + mouseScroll.deltaY;
});

//step 1: variables
const airtableApiKey = "keyBaUp0xKPE8ASU2";
const airtableDatabaseUrl =
  "https://api.airtable.com/v0/apppkcq6q875cTDkb/Table%201";
const authenticatedUrl = airtableDatabaseUrl + "?api_key=" + airtableApiKey;

//step 2: get references to DOM
const circulationContainerElement = document.querySelector(
  "#circulation-container"
);
const foulWatersContainerElement = document.querySelector(
  "#foul-waters-container"
);
const iAmLiquidContainerElement = document.querySelector(
  "#i-am-liquid-container"
);
const jadeSubmergedContainerElement = document.querySelector(
  "#jade-submerged-container"
);
const daisySuitContainerElement = document.querySelector(
  "#daisy-suit-container"
);
const niWoContainerElement = document.querySelector("#ni-wo-container");
const analogContainerElement = document.querySelector("#analog-container");

//step 3: application
//fetch the data
const fetchPromise = fetch(authenticatedUrl);
const jsonPromise = fetchPromise.then((response) => {
  return response.json();
});
//get each set of images into their containers
jsonPromise.then((data) => {
  console.log(data);
  const records = data.records;
  for (let index = 0; index < records.length; index++) {
    const title = records[index].fields.Title;
    const imageUrl = records[index].fields.Assets[0].url;
    const project = records[index].fields.Project;
    //create container element
    const containerElement = document.createElement("div");
    containerElement.classList.add("container");
    const randomLeft = Math.random() * window.innerWidth * 0.1;
    const randomTop = Math.random() * window.innerWidth * 0.1;
    const randomLeft2 = Math.random() * window.innerWidth * 0.4;
    const randomTop2 = Math.random() * window.innerWidth * 0.3;
    containerElement.style.position = "absolute";
    if (
      project == "circulation" ||
      project == "foul waters" ||
      project == "i am liquid" ||
      project == "jade submerged" ||
      project == "daisy suit" ||
      project == "ni wo"
    ) {
      containerElement.style.left = randomLeft + "px";
      containerElement.style.top = randomTop + "px";
    } else if (project == "analog") {
      containerElement.style.left = randomLeft2 + "px";
      containerElement.style.top = randomTop2 + "px";
    }

    //create image element
    const imageElement = document.createElement("img");
    imageElement.classList.add("image");
    imageElement.setAttribute("src", imageUrl);
    //add container element to DOM
    //add image element in containers
    if (project == "circulation") {
      circulationContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    } else if (project == "foul waters") {
      foulWatersContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    } else if (project == "i am liquid") {
      iAmLiquidContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    } else if (project == "jade submerged") {
      jadeSubmergedContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    } else if (project == "daisy suit") {
      daisySuitContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    } else if (project == "ni wo") {
      niWoContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    } else if (project == "analog") {
      analogContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);
    }

    if (project == "analog") {
      imageElement.classList.add("analog-image");
    }
  }
});

