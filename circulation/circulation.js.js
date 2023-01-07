//horizontal scrolling
let backgroundContainer = document.querySelector(".child-background-container");
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
const cContainerElement = document.querySelector(
    "#circulation-child-container"
  );
 
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
    const containerElement = document.createElement("div");
    const project = records[index].fields.Project;
    containerElement.classList.add("container");
    containerElement.style.position = "relative";
     //create image element
     const imageElement = document.createElement("img");
     imageElement.classList.add("child-image");
     imageElement.setAttribute("src", imageUrl);
     if (project=="circulation") {
     cContainerElement.appendChild(containerElement);
      containerElement.appendChild(imageElement);}
     }
    });