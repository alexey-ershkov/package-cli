import chalk from "chalk";

import GetPackageJSON from "../utils/getPackageJSON";
import PackageJson from "../models/PackageJson";

function getDepsStr(deps: { [key: string]: string } | string[]): string {
    if (Array.isArray(deps)) {
        return deps.reduce((output, name) => {
            return output += `\n${name}`
        }, '')
    } else {
        return Object.entries(deps).reduce((output, [name, version]) => {
            return output += `\n${chalk.bold(name)} v${version.slice(1)}`;
        }, '')
    }
}

function genInfoOutput(info: PackageJson) {
    let output = chalk.blue.bold(info.name);
    output += chalk.blue(` v${info.version}`);

    let depsEmpty = true;
    if (info.description) {
        output += `\n${info.description}`;
    }

    if (info.dependencies) {
        depsEmpty = false;
        output += `\n\n${chalk.green.bold('Dependencies:')}`;
        output += getDepsStr(info.dependencies);
    }

    if (info.devDependencies) {
        depsEmpty = false;
        output += `\n\n${chalk.yellow.bold('Dev dependencies:')}`;
        output += getDepsStr(info.devDependencies);
    }

    if (info.bundledDependencies || info.peerDependencies || info.optionalDependencies) {
        depsEmpty = false;
        output += `\n\n${chalk.bold('Other dependencies(peer, bundle, optional)')}`;
        output += info.bundledDependencies ? getDepsStr(info.bundledDependencies) : '';
        output += info.peerDependencies ? getDepsStr(info.peerDependencies) : '';
        output += info.optionalDependencies ? getDepsStr(info.optionalDependencies) : '';
    }

    if (depsEmpty) {
        output += `\n\n${chalk.red('No dependencies found in project')}`
    }

    return output
}

export default function InfoHandler(path: string) {
    const package_info = GetPackageJSON(path);
    if (!package_info) {
        console.log(`${chalk.red.bold('Error:')} no package.json found in this directory`);
        return;
    }
    console.log(genInfoOutput(package_info));
}
