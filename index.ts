#!/usr/bin/env node
import ParseArguments from "./src/utils/parseArguments";
import Args from "./src/models/Args";
import InfoHandler from "./src/handlers/info";


const args = ParseArguments() as Args;
if (args.info) {
    InfoHandler();
}
