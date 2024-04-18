export const debounce = (callback, delay) => {
    let timeoutId = null
    const debouncedFunction = (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args)
        }, delay)
    }
    debouncedFunction.cancel = () => {
        clearTimeout(timeoutId)
    }
    return debouncedFunction
}

