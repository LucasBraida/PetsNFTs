const containerVariant = {
    hidden: { opacity: 0 },
    show:{
        opacity: [0,0,1],
        y: [100,50,0],
        transition:{ duration: 0.8, ease: 'easeInOut', staggerChildren: 2}
    }
}
const variantItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

export {containerVariant, variantItem}
