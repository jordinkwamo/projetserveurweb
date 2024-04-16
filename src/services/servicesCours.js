import axios from "axios";

const useCours = () => {
  const getAllCours = async () => {
    const cours = await axios.get(`${import.meta.env.VITE_BASE_URL}/cours`);
    return cours.data;
  };
  const ajoutCours = async (cours) => {
     await axios.post(`${import.meta.env.VITE_BASE_URL}/cours`,cours);
    
  };
  const deleteCours = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/cours/${id}`);
  }

  return { getAllCours , ajoutCours ,deleteCours};
};

export default useCours;
