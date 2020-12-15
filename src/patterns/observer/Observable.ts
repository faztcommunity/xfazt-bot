interface Observable<TObserver> {
    readonly observers:Set<TObserver>
    add_observer(observer:TObserver): this
    remove_observer(observer:TObserver): this
}

export default Observable;
