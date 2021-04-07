import fs from 'fs';
import Package from "../models/Package";

export default function GetPackageJSON(): Package|undefined {
    if (!fs.existsSync('package.json')) {
        return undefined
    }

    return JSON.parse(fs.readFileSync('package.json').toString());
}
