#!/usr/bin/env node
import GetPackageJSON from "./src/files/files";
import Package from "./src/models/Package";


const file: Package|undefined = GetPackageJSON();
console.log(file? file.name : 'Файл package.json не найден')
