export default interface PackageJson {
    name: string,
    version: string,
    description?: string
    dependencies?: {[key: string]: string}
    devDependencies?: {[key: string]: string}
    bundledDependencies?: string[]
    peerDependencies?: {[key: string]: string}
    optionalDependencies?: {[key: string]: string}
}
