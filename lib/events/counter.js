let counter = 0

export const count = () => {
    const current = counter

    counter += 1

    return current
}