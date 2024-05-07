// Horizontal scrolling
let backgroundContainer = document.querySelector("#background-container");
backgroundContainer.addEventListener("wheel", function (mouseScroll) {
  mouseScroll.preventDefault();
  backgroundContainer.scrollLeft += mouseScroll.deltaY;
});

// Airtable API
const airtableToken = "patDxyprgeKgSu7gP.5e8d74b49ec46bcd0ec171cf905b659c3d3e74fe0fbe5dd1d4252b60bfd638d4";
const airtableBaseUrl = "https://api.airtable.com/v0";
const airtableBaseId = "apppkcq6q875cTDkb";
const airtableTableName = "Assets";
const airtableUrl = `${airtableBaseUrl}/${airtableBaseId}/${airtableTableName}`;

// Get references to DOM elements
const containerElements = {
  "circulation": document.querySelector("#circulation-container"),
  "foul waters": document.querySelector("#foul-waters-container"),
  "i am liquid": document.querySelector("#i-am-liquid-container"),
  "jade submerged": document.querySelector("#jade-submerged-container"),
  "daisy suit": document.querySelector("#daisy-suit-container"),
  "ni wo": document.querySelector("#ni-wo-container"),
  "analog": document.querySelector("#analog-container")
};

// Fetch data from Airtable
fetch(airtableUrl, {
  headers: {
    Authorization: `Bearer ${airtableToken}`,
  },
})
.then((response) => 
  response.json())
  .then((data) => {
    console.log(data);
    const records = data.records || [];
    records.forEach((record) => {
      const title = record.fields.Title;
      const imageUrl = record.fields.Assets?.[0]?.url; // Use optional chaining
      const project = record.fields.Project;

      // Create container element
      const containerElement = document.createElement("div");
      containerElement.classList.add("container");
      containerElement.style.position = "absolute";

      // Random positioning
      const randomLeft = Math.random() * window.innerWidth * 0.1;
      const randomTop = Math.random() * window.innerWidth * 0.1;
      const randomLeft2 = Math.random() * window.innerWidth * 0.4;
      const randomTop2 = Math.random() * window.innerWidth * 0.3;
      if (["circulation", "foul waters", "i am liquid", "jade submerged", "daisy suit", "ni wo"].includes(project)) {
        containerElement.style.left = randomLeft + "px";
        containerElement.style.top = randomTop + "px";
      } else if (project === "analog") {
        containerElement.style.left = randomLeft2 + "px";
        containerElement.style.top = randomTop2 + "px";
      }

      // Create image element
      const imageElement = document.createElement("img");
      imageElement.classList.add("image");
      imageElement.setAttribute("src", imageUrl || ""); // Ensure imageUrl is not undefined

      // Append image to appropriate container
      const container = containerElements[project];
      if (container) {
        container.appendChild(containerElement);
        containerElement.appendChild(imageElement);
      }

      if (project === "analog") {
        imageElement.classList.add("analog-image");
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching data from Airtable:", error);
  });
