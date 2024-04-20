# Audio Converter

This is a simple web application that allows users to convert audio files between different formats using the `light-audio-converter` library. Users can upload audio files, select the desired output format, and convert the files with ease.

## Features

- Drag and drop functionality for uploading audio files.
- Select from a variety of output formats including MP3, WAV, AAC, OGG, FLAC, AIFF, WMA, and M4A.
- Convert audio files seamlessly with a simple click of a button.
- Download the converted audio file directly from the browser.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/mohit9889/audio-converter-ui.git
```

2. Navigate to the project directory:

```bash
cd audio-converter-ui
```

3. Install dependencies using npm:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173/` to access the application.

## Usage

1. Drag and drop an audio file into the designated area or click on the area to browse and select a file from your local system.

2. After selecting the input file, choose the desired output format from the dropdown menu.

3. Optionally, you can provide a custom output file name. If left blank, the default file name will be used.

4. Click on the "Convert" button to start the conversion process.

5. Once the conversion is complete, the download button will appear. Click on it to download the converted audio file.

## Dependencies

- light-audio-converter: A lightweight audio conversion library for Node.js.
