export const Timeout = {
    _timeout: undefined as undefined|NodeJS.Timeout,
    _callback: function (
        callback: { (): void },
    ) {
        callback();
        this._timeout = undefined;
    },

    start: function (
        callback: { (): void },
        ms: number,
    ) {
        if (typeof this._timeout === "number") {
            this.cancel();
        }

        this._timeout = setTimeout(
            () => this._callback(callback),
            ms,
        );
    },

    cancel: function () {
        clearTimeout(this._timeout);
    },
}