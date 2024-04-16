import axios from "axios";

const useEtudiant = () => {
  //Creer une fonction recupere la liste des etudiants
  const getAllStudents = async () => {
    try {
      const etudiants = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/etudiants`
      );
       console.log('LA liste', etudiants.data.data)
      return etudiants.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
      throw error; // Renvoyer l'erreur pour une gestion ultérieure
    }
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/etudiants/${id}`);
  };

  const getStudentById = async (id) => {
    const etudiant = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/etudiants/${id}`
    );
    return etudiant.data;
  };
  const addStudent = async (etudiant) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/etudiants`, etudiant);
  };

  const updateStudent = async (id, etudiant) => {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/etudiants/${id}`,
      etudiant
    );
  };

  return {
    getAllStudents,
    deleteStudent,
    getStudentById,
    addStudent,
    updateStudent,
  };
};

export default useEtudiant;
