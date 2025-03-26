export function findRealTankName(tankName : string, strings : string) : string{
    //define the tank string that has to be found
    const searchFor = determineTankString(tankName)

    //reduce the string to just the needed substring and return it
    let realString = strings.slice((strings.indexOf(searchFor) + searchFor.length + 3))

    realString = realString.slice(0, realString.indexOf(`"`))

    if(realString.length > 1) return realString

    return `${tankName} (couldnt find real name)`
}

function determineTankString(tankName : string) : string{
    //replace the nation string with a string that can be searched for in the strings.yaml.dvpl (for some reason these nation beginnings are different there.)
    let nation = tankName.slice(0, tankName.indexOf(":"));

    if(nation == "uk") return `_vehicles:${tankName.slice(tankName.indexOf(":") + 1)}"` //for some odd reason british tanks can have either "uk" or "gb" as entrypoint, so in this case try to find the tank without those.
    
    return `"#${nation}_vehicles:${tankName.slice(tankName.indexOf(":") + 1)}"`
}

export function findRealConsumableName(consumableName : string, strings : string) : string{
    let searchFor = "";


    //for some fucking reason tungsten has a different identifier aswell
    if(consumableName == "tungstentip") searchFor = `"#artefacts:tungstentip/name":`
    
    else searchFor = `"consumables/${consumableName}/Name":`;

    let realString = strings.slice((strings.indexOf(searchFor) + searchFor.length + 2))
    realString = realString.slice(0, realString.indexOf(`"`))


    realString = `${realString} (codename: ${consumableName})`

    return realString
}

export function findRealProvisionName(provisionName : string, strings : string) : string{

    let searchFor = "";
    if(provisionName == "smallHPStock" || provisionName == "largeHPStock") searchFor = `"provisions/${provisionName}/Name":`;
    else searchFor = `"#artefacts:${provisionName}/name":`


    let realString = strings.slice((strings.indexOf(searchFor) + searchFor.length + 2))

    realString = realString.slice(0, realString.indexOf(`"`))

    realString = `${realString} (codename: ${provisionName})`

    return realString
}