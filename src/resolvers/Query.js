async function guide(parent, args, context){
    const where = args.filter ? {
        OR: [
            {expertise: { contains: args.filter}}
        ]
    } : {}

    // Get the data from the database here
    const guides = "Hi"

    return {
        guides
    }
}

module.exports = {
    guide,
}