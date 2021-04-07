import fs from 'fs';
import PackageJson from "../models/PackageJson";

export default function GetPackageJSON(): PackageJson|undefined {
    if (!fs.existsSync('package.json')) {
        return undefined
    }

    return JSON.parse(fs.readFileSync('package.json').toString());
}
