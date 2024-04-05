// el servicio se encargar de procesar la información y guardarla en un archivo JSON
import { v4 as uuidv4 } from 'uuid';
import { readJson, writeJson } from "../helper/jsonHelper.js";

const filePath = "./src/data/deportes.json";

const findAll = () => {
  return readJson(filePath);
};

const findOne = (id) => {
  // leemos el archivo JSON
  const deportes = readJson(filePath);

  // buscamos el deporte por ID
  const deporte = deportes.find((deporte) => deporte.id === id);

  // si no encontramos el deporte lanzamos un error
  if (!deporte) {
    throw new Error("Deporte no encontrado");
  }

  return deporte;
};

const create = (nuevoDeporte) => {
  // leemos el archivo JSON
  const deportes = readJson(filePath);

  // al guardar le asignamos un ID único
  nuevoDeporte.id = uuidv4();

  // agregamos el nuevo deporte al array de deportes
  deportes.push(nuevoDeporte);

  // guardamos el array de deportes en el archivo JSON
  writeJson(filePath, deportes);

  return nuevoDeporte;
};

const update = (id, deporte) => {
  // leemos el archivo JSON
  const deportes = readJson(filePath);

  // obtenemos el deporte a modificar
  const oldDeporte = findOne(id);

  // buscamos el index del deporte a modificar
  const index = deportes.findIndex((deporte) => deporte.id === id);

  deportes[index] = { ...oldDeporte, ...deporte };

  writeJson(filePath, deportes);
  return deportes[index];
};

const remove = async (id) => {
  const deportes = readJson(filePath);
  const index = deportes.findIndex((deporte) => deporte.id === id);

  if (index === -1) {
    throw new Error("Deporte no encontrado");
  }

  deportes.splice(index, 1);
  writeJson(filePath, deportes);
};

export default { findAll, findOne, create, update, remove };