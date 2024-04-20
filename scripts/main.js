import { convertAndSaveAudio } from "light-audio-converter";

// Function to toggle element visibility
function toggleElementVisibility(elementId, display = "block") {
  document.getElementById(elementId).style.display = display;
}

// Function to handle file drop
function handleFileDrop(event) {
  event.preventDefault();
  toggleElementVisibility("read-file", "none");

  const file = event.dataTransfer.files[0];
  const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
  const fileName = file.name;

  document.getElementById("file-name").textContent = fileName;
  document.getElementById("file-size").textContent = `${fileSize} MB`;
  toggleElementVisibility("after-upload");

  // Trigger the change event on the file input element
  const fileInput = document.getElementById("input-file");
  fileInput.files = event.dataTransfer.files;
  fileInput.dispatchEvent(new Event("change"));
}

// Function to handle file dragover
function handleDragOver(event) {
  event.preventDefault();
}

// Event listeners for drag and drop
document.getElementById("read-file").addEventListener("drop", handleFileDrop);
document
  .getElementById("read-file")
  .addEventListener("dragover", handleDragOver);

// Event listener for file input change
document
  .getElementById("input-file")
  .addEventListener("change", function (event) {
    // Hide File Read section
    toggleElementVisibility("read-file", "none");

    // Show convert button and hide download button
    toggleElementVisibility("convert-button");
    toggleElementVisibility("download-button", "none");

    const file = event.target.files[0];
    const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
    const fileName = file.name;

    document.getElementById("file-name").textContent = fileName;
    document.getElementById("file-size").textContent = `${fileSize} MB`;
    toggleElementVisibility("after-upload");
  });

// Event listener for convert button click
document
  .getElementById("convert-button")
  .addEventListener("click", function () {
    const inputFilePath = document.getElementById("input-file").files[0];
    const outputFormat = document.getElementById("output").value;
    let outputFileName = document
      .getElementById("output-file-name")
      .value.trim();
    const defaultOutputName = outputFileName.replace(/\s+/g, "_"); // Replace spaces with underscores

    if (outputFileName === "") {
      outputFileName = defaultOutputName;
    }

    const outputFilePath = `./${outputFileName}.${outputFormat}`;

    // Convert and save audio
    convertAndSaveAudio(inputFilePath, outputFormat, outputFilePath)
      .then((metadata) => {
        console.log("Audio conversion successful:", metadata);
        alert("Audio conversion successful!");

        // Show download button and hide convert button
        toggleElementVisibility("download-button");
        toggleElementVisibility("convert-button", "none");

        const downloadButton = document.getElementById("download-button");
        downloadButton.style.backgroundColor = "#7868e6";
        downloadButton.addEventListener("click", function downloadAudio() {
          const a = document.createElement("a");
          a.href = metadata.data;
          a.download = defaultOutputName ? defaultOutputName : metadata.name; // Set the downloaded file name
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      })
      .catch((error) => {
        console.error("Error occurred during audio conversion:", error);
        alert("Error occurred during audio conversion. Please try again.");
      });
  });

// Event listener for remove icon click
document.getElementById("remove-icon").addEventListener("click", function () {
  // Clear file input
  document.getElementById("input-file").value = "";
  // Hide sections
  toggleElementVisibility("after-upload", "none");
  toggleElementVisibility("convert-button", "none");
  toggleElementVisibility("read-file", "flex");
});

// Event listener for output format change
document.getElementById("output").addEventListener("change", function () {
  // Show convert button and hide download button
  toggleElementVisibility("convert-button");
  toggleElementVisibility("download-button", "none");
});
