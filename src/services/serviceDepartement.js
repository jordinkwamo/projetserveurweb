import axios from "axios";

const useDepartement = () => {
  // Créer une fonction pour récupérer la liste des départements
  const getAllDepartements = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/departements`
    );
    return response.data;
  };

  // Supprimer un département par son ID
  const deleteDepartement = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/departements/${id}`);
  };

  // Récupérer un département par son ID
  const getDepartementById = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/departements/${id}`
    );
    return response.data;
  };

  // Ajouter un nouveau département
  const addDepartement = async (department) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/departements`, department);
  };

  // Mettre à jour un département existant par son ID
  const updateDepartement = async (id, department) => {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/departements/${id}`,
      department
    );
  };

  return {
    getAllDepartements,
    deleteDepartement,
    getDepartementById,
    addDepartement,
    updateDepartement,
  };
};

export default useDepartement;
