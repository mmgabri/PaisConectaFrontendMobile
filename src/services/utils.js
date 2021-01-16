const formatValor = (valor) => {
    return "R$ " + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

export {
    formatValor
}