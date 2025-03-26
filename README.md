---

# Tanks Blitz Equipment Finder

This script identifies all tanks equipped with special equipment (consumables and provisions) in **Tanks Blitz** (the Lesta version of **World of Tanks Blitz**) and generates a clearly formatted text file displaying the results. The script is designed to remain functional across multiple game updates, as it dynamically reads the game files from the currently installed version.

## **System Requirements**

- **Tanks Blitz** must be installed on your C: Drive, as the script does not support other installation locations at this time.
- If you wish to use the source code instead of the compiled executable, you will need knowledge of running TypeScript code in a Node.js environment.
- While **optional**, it is recommended to use a translator mod, such as the one created by `_YTSH_` and `GonnaHetzMe`. A link to a modding community Discord server can be found [here](https://discord.gg/kEgTtvRdqQ).

You can download the script from the official release page [here](https://github.com/fabilhaft22/Tanks-Blitz-Equipment-Finder/releases/tag/v1.0).

---

## **How to Use the Script**

Upon running the script, it will generate two `.txt` files listing the tanks associated with each piece of equipment. The files will be created in the same directory where the script is executed. For example, if you place the script in any folder and run it, the text files will be saved in that folder.

---

## **How It Works**

The game files contain specific data that identifies which tanks have special consumables. This script is designed to read those files and present the information in an easily readable format.

The script searches for the necessary files within the **Tanks Blitz** directory, specifically:  
- `provisions/common.xml.dvpl`
- `consumables/common.xml.dvpl`
- `Strings/ru.yaml.dvpl`

It copies these files, decompresses them, and extracts the relevant information to identify which tanks use which special equipment.

**Important**: The script only copies and decompresses the files—**it does not alter your game files in any way**.

---

## **Using the Source Code**

To run the script from source code rather than the compiled executable, follow these steps:

1. Set up a Node.js environment (there are numerous guides available online to help you install and configure Node.js).
2. Set up a TypeScript compiler. (You can refer to resources like ChatGPT for assistance on how to run TypeScript code in Node.js).
3. Install the required packages:

### **Install `lz4`**:
```
npm install lz4
```

### **Install `crc`**:
```
npm install crc
```

---
