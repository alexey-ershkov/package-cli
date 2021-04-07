#!/usr/bin/env node
import ParseArguments from "./src/utils/parseArguments";
import Args from "./src/models/Args";
import InfoHandler from "./src/handlers/info";
import InstallHandler from "./src/handlers/install";


const args = ParseArguments() as Args;
if (args.info) {
    InfoHandler();
}
if (args.install) {
    InstallHandler();
}
