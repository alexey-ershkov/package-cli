export default interface NpmPackageInfo {
    name: string,
    version: string,
    description?: string
    links?: {
        npm?: string
    }
}
