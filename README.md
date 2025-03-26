# Tanks Blitz Equipment Finder

This script finds all tanks that have special equipment (consumables and provisions) in Tanks Blitz (Lesta version of World of Tanks Blitz) and shows them in an easy to read text file. 
The script will stay working for multiple game updates, because it dynamically reads the game files of the currently installed game version.


**Requirements to use this script**

- You have to have Tanks Blitz installed on your C: Drive, other locations are not supported by this script yet.
- If you want to use the source code instead of just getting the exe, you will need to know how to run Typescript code in a node environment.

You can find the script [here](https://github.com/fabilhaft22/Tanks-Blitz-Equipment-Finder/releases/tag/v1.0).


### **Script usage**

If you run the script, it will create two text files (.txt) and list the tanks for every equipment in the directory you ran the script from.
So for example, if you put the script in a any folder and run it, the text files will be created in the same folder.

### **How it works**

In the game files there are specific files that define which tanks have special consumables.
This script can read that and make it easily readable for the user.

The script looks for the files it needs in the Tanks Blitz directory (provisions/common.xml.dvpl, consumables/common.xml.dvpl and Strings/ru.yaml.dvpl).
It then copies these files and decompresses them into readable content. From there it just finds the predefined equipments and looks for which tanks use it.

Due to the script taking a copy of the files, **IT DOES NOT** change anything about your game files. It just takes a copy and decompresses that copy.



### **If you want to use the source code instead of the exe, you will need to follow these steps:**

- Setup a node environment (there are enough guides on how to get node.js working)
- Setup a typescript compiler (you can just ask chatgpt on how to run typescript code in node)

- Install the following packages:
  
**lz4**
```
npm install lz4
```

**crc**
```
npm install crc
```
