import deporteService from '../services/deportes-service.js';

export const findAll = async (req, res) => {
  try {
    const result = await deporteService.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('id', id)
    const result = await deporteService.findOne(id);

    console.log('result', result)

    res.json(result);

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};

export const create = (req, res) => {
  try {
    const deporte = req.body;

    // como recomendacion, no enviar el body directamente al servicio
    const result = deporteService.create({
      name: deporte.name,
      price: deporte.price,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const deporte = req.body;

    const result = deporteService.update(id, {
      name: deporte.name,
      price: deporte.price,
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await deporteService.remove(id);
    res.json({ message: 'Deporte eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
