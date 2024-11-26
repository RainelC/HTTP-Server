function validateData(data, model) {
  for (let key in model) {
    if (!data.hasOwnProperty(key)) {
      return {
        error: true,
        status: 400,
        errorDes: `Falta la propiedad '${key}'.`,
      };
    }
    if (typeof data[key] !== model[key]) {
      return {
        error: true,
        status: 400,
        errorDes: `La propiedad '${key}' debe ser de tipo '${
          model[key]
        }', pero se recibió '${typeof model[key]}'.`,
      };
    }

    for(let key in data){
      if(!model.hasOwnProperty(key)){
        return {
          error: true,
          status: 400,
          errorDes: `La propiedad '${key}' no es requerida para este elemento.`,
        };
    }
  }

    if (typeof data[key] === "string" && data[key].trim().length === 0) {
      return {
        error: true,
        status: 400,
        errorDes: `La propiedad '${key}' no debe estar vacio.`,
      };
    }

    if (data[key] === null || data[key] === undefined) {
      return {
        error: true,
        status: 400,
        errorDes: `La propiedad '${key}' no debe estar vacio.`,
      };
    }
  }

  return {
    error: false,
    status: 200,
  };
}

function validateDuplicate(data, alldata) {
  for (let idata of alldata) {
      if (data['title'] === idata['title']) {
        return true;
      }
  }
  return false;
}

module.exports = {
  valiData: validateData,
  valiDuplicate: validateDuplicate,
};
