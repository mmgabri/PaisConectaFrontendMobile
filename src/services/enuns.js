const enunsTipoAnuncio = (code) => {
    var desc = '';
    switch (code) {
        case "DOACAO": desc = "Doação"; break;
        case "VENDA": desc = "Venda"; break;
        default: desc = ""
    }
    return desc;
}

const enunsTipoCategoria = (code) => {
    var desc = '';
    switch (code) {
        case "LIVRO": desc = "Livro"; break;
        case "UNIFORME": desc = "Uniforme"; break;
        case "MATERIAL_ESCOLAR": desc = "Material escolar"; break;
        default: desc = ""
    }
    return desc;
}

export {
    enunsTipoAnuncio, enunsTipoCategoria
}