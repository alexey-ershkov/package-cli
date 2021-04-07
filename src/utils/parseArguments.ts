import commander from "commander";

//TODO Add find package.json in other dirs

export default function ParseArguments() {
    commander.option('info', 'Show package.json info');
    commander.option('install', 'Add package and install it (with @types if typescript)');
    commander.version('1.0.0' , '-v , --version');
    commander.name('package-cli')
    commander.usage('<command>');
    if (process.argv.length === 2){
        commander.help();
    }
    const parsed = commander.parse(process.argv);

    if (parsed.args.length > 0) {
        commander.usage(`can't recognize command ${parsed.args.join(' ')}`);
        commander.help()
    }

    return parsed.opts()
}
