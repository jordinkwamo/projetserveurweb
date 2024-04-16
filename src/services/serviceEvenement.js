import axios from "axios";

const useEvenement = () => {
  const getAllEvenement = async () => {
    const evenements = await axios.get(`${import.meta.env.VITE_BASE_URL}/evenements`);
    return evenements.data;
  };
  const ajoutEvenement = async (evenement) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/evenements`,evenement);
   
 };
 const deleteEvenement = async (id) =>{
  await  axios.delete(`${import.meta.env.VITE_BASE_URL}/evenements/${id}`);
 };


  return { getAllEvenement, ajoutEvenement, deleteEvenement };
};

export default useEvenement;
