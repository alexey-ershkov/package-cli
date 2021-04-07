import fs from 'fs';
import PackageJson from "../models/PackageJson";
import path from "path";

export default function GetPackageJSON(path_to_file: string = '.'): PackageJson|undefined {
    const filepath = path.join(process.cwd(),path_to_file, 'package.json');
    console.log(filepath)
    if (!fs.existsSync(filepath)) {
        return undefined
    }

    return JSON.parse(fs.readFileSync(filepath).toString());
}
