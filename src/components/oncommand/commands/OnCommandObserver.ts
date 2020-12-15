interface OnCommandObserver {
    readonly name:string
    notify(command:string, ...args:string[]):void
}

export default OnCommandObserver;
