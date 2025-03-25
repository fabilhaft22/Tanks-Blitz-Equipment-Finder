import * as fs from "fs";
import { decompressDVPLToString } from "./DecompressDVPL";
import { findRealTankName, findRealConsumableName, findRealProvisionName} from "./findRealName"

const { findProvisionsDVPLFile, findConsumablesDVPLFile, findStringsDVPLFile } = require('./searchDVPLFiles.js');

function readProvisions() : string{
    return decompressDVPLToString(findProvisionsDVPLFile())
}

function readConsumables() : string{
    return decompressDVPLToString(findConsumablesDVPLFile())
}
function readStrings() : string {
    return decompressDVPLToString(findStringsDVPLFile());
}

function findTanksUsingItem(itemName: string, fileContent: string) : string[] {
    //find the string of tanks using the item by reducing the string by predefined parameters
    let tanksString = fileContent.slice(fileContent.indexOf(itemName));
    tanksString = tanksString.slice((tanksString.indexOf("<name>") + 6), tanksString.indexOf("</name>"))
    return tanksString.split(" ");
}


const consumableNames : string[] = [
    "improvedAfterburning", //super speedboost
    "fireControlSystem", //reticle calibration
    "newAutoloader", //shell reload boost
    "shieldKit", //reactive armor
    "tungstentip" //tungsten
] 
const provisionNames : string[] = [
    "smallHPStock", //small sandbags
    "largeHPStock", //big sandbags
    "gear_oil", //normal gear oil
    "improved_gear_oil", //big gear oil
    "gun_powder" //the shell velocity thing idk its name
]




async function main(){
    let commonProv : string = "";
    let commonCons : string = "";
    let strings : string = "";
    
    try {
        commonProv = readProvisions();
        commonCons = readConsumables();
        strings = readStrings();
    } catch (error) {
        console.log(error)

        console.log("If you have the game installed, maybe check if the needed files are corrupted and try running the script again")
        return;
    }
    

    if(fs.existsSync("./consumables.txt")){
        fs.rmSync("./consumables.txt")
    }
    
    if(fs.existsSync("./provisions.txt")){
        fs.rmSync("./provisions.txt")
    }
    
    for(let i = 0; i < consumableNames.length; i++){
        fs.appendFileSync("./consumables.txt", `**${findRealConsumableName(consumableNames[i], strings)}:**\n`)
        const tanks = findTanksUsingItem(consumableNames[i], commonCons)
        for(let j = 0; j < tanks.length; j++){
            fs.appendFileSync("./consumables.txt", `${findRealTankName(tanks[j], strings)}\n`)
        }
        fs.appendFileSync("./consumables.txt", `\n`)
    }

    for(let i = 0; i < provisionNames.length; i++){
        fs.appendFileSync("./provisions.txt", `**${findRealProvisionName(provisionNames[i], strings)}:**\n`)
        const tanks = findTanksUsingItem(provisionNames[i], commonProv)
        for(let j = 0; j < tanks.length; j++){
            fs.appendFileSync("./provisions.txt", `${findRealTankName(tanks[j], strings)}\n`)
        }
        fs.appendFileSync("./provisions.txt", `\n`)
    }

    console.log("#### Success, check for consumables.txt and provisions.txt in the same directory you called this script from!")

}

//call main to start the script
main();
