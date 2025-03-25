const fs = require('fs');
const path = require('path');

// Function to read directory contents synchronously
function readDirectorySync(directoryPath) {
    try {
        // Check if the path exists
        if (fs.existsSync(directoryPath)) {
            // Read the directory synchronously and return the filenames
            return fs.readdirSync(directoryPath);
        } else {
            throw new Error(`Directory not found: ${directoryPath}. Do you actually have Tanks Blitz installed?`);
        }
    } catch (err) {
        console.error('Error reading directory:', err.message);
        return []; // Return an empty array if there's an error
    }
}

const absolutePathToSubDirectory = "C:\\Games\\Tanks_Blitz\\Data\\XML\\item_defs\\vehicles\\common";

// Function to find the consumables DVPL file
function findConsumablesDVPLFile() { // Returns the absolute path to the consumables DVPL file
    const files = readDirectorySync(absolutePathToSubDirectory);
    // Find index of the consumables directory and then go into the directory
    const index = files.indexOf("consumables");

    // Construct absolute path to consumables file
    const dvplFilePath = `${absolutePathToSubDirectory}\\${files[index]}\\common.xml.dvpl`;

    console.log(dvplFilePath);

    return dvplFilePath;
}

// Function to find the provisions DVPL file
function findProvisionsDVPLFile() { // Returns the absolute path to the provisions DVPL file
    const files = readDirectorySync(absolutePathToSubDirectory);
    // Find index of the provisions directory and then go into the directory
    const index = files.indexOf("provisions");

    // Construct absolute path to provisions file
    const dvplFilePath = `${absolutePathToSubDirectory}\\${files[index]}\\common.xml.dvpl`;

    console.log(dvplFilePath);

    return dvplFilePath;
}

function findStringsDVPLFile() { // Returns the absolute path to the provisions DVPL file
    const absolutePathToStringDirectory = "C:\\Games\\Tanks_Blitz\\Data\\Strings"
    const files = readDirectorySync(absolutePathToStringDirectory);
    // Find index of the provisions directory and then go into the directory
    const index = files.indexOf("ru.yaml.dvpl");

    // Construct absolute path to provisions file
    const dvplFilePath = `${absolutePathToStringDirectory}\\${files[index]}`;

    console.log(dvplFilePath);

    return dvplFilePath;
}

// Export the functions for use in other files
module.exports = { findProvisionsDVPLFile, findConsumablesDVPLFile, findStringsDVPLFile };
