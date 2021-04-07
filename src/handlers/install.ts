import GetPackageJSON from "../utils/getPackageJSON";
import chalk from "chalk";
import inquirer from "inquirer";
import {exec} from "child_process";
import SearchAnswers from "../models/SearchAnswers";
import * as util from "util";
import NpmPackageInfo from "../models/NpmPackageInfo";
import SelectAnswers from "../models/SelectAnswers";
import ora from "ora";

const asyncExec = util.promisify(exec);

function searchInput() {
    let input = [];
    input.push({
        name: "search",
        type: "input",
        message: "Input package name you want to install",
    })

    return inquirer.prompt(input);
}

function selectInput(info: NpmPackageInfo[]) {

    let input = [];
    input.push({
        type: 'list',
        name: 'selected_package',
        message: 'Choose package:',
        choices: info.map((info) => {
            return info.name
        }, []),
        default: info[0].name
    })

    input.push({
        type: 'list',
        name: 'dep_type',
        message: 'Choose dependency type:',
        choices: ['Production', 'Development'],
        default: 'Production'
    })

    return inquirer.prompt(input);
}

export default function InstallHandler(path?:string) {
    const package_info = GetPackageJSON(path);
    if (!package_info) {
        console.log(`${chalk.red.bold('Error:')} no package.json found in this directory`);
        return;
    }

    const spinner = ora();
    spinner.color = 'blue';

    searchInput()
        .then((answers) => {
            spinner.start('Searching')
            const typedAnswers = answers as SearchAnswers;
            return asyncExec(`npm search --json ${typedAnswers.search}`);
        })
        .then(({stdout, stderr}) => {
            if (stderr) {
                return Promise.reject(new Error(stderr));
            }

            spinner.stop();
            if (stdout === "\n]\n\n") {
                return Promise.reject(new Error('No packages found'));
            }

            return selectInput(JSON.parse(stdout));
        })
        .then(answers => {
            const typedAnswers = answers as SelectAnswers;
            spinner.start('Installing')
            if (typedAnswers.dep_type === 'Production') {
                return asyncExec(`npm i ${typedAnswers.selected_package}`);
            } else {
                return asyncExec(`npm i ${typedAnswers.selected_package} -D`)
            }
        })
        .then(({stdout, stderr}) => {
            if (stderr) {
                return Promise.reject(new Error(stderr));
            }
            if (stdout.includes('up to date')) {
                spinner.fail(chalk.bold.yellow('ALREADY INSTALLED'));
            } else {
                spinner.succeed(chalk.bold.green("PACKAGE INSTALLED"));
            }
        })

        .catch(err => {
            console.error(`${chalk.red.bold('Error: ')} ${err.message}`);
        })
}
