import commander from 'commander'
import Args from '../models/Args'

export default function ParseArguments () {
  commander.option('info', 'Show package.json info')
  commander.option('install', 'Add package and install it')
  commander.option('-p, --path <path>', 'Path to package.json', '.')
  commander.version('1.0.5', '-v , --version')
  commander.name('package-cli')
  commander.usage('<command>')
  if (process.argv.length === 2) {
    commander.help()
  }
  const parsed = commander.parse(process.argv)

  const optionsTyped = parsed.opts() as Args
  if (!optionsTyped.info && !optionsTyped.install) {
    commander.help()
  }

  if (parsed.args.length > 0) {
    commander.usage(`can't recognize command ${parsed.args.join(' ')}`)
    commander.help()
  }

  return parsed.opts()
}
