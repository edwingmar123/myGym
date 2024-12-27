import { useState } from "react";

// Definir un tipo para los datos del formulario
interface FormData {
  [key: string]: string | undefined;
}

const useForm = (initialState: FormData = {}) => {
  const [datosFormulario, setDatosFormulario] = useState<FormData>(initialState);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  // Maneja la carga de imagen (por ejemplo, para la URL de una imagen de perfil)
  const handleUpload = (url: string) => {
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      imagen: url,
    }));
  };

  // Resetea los datos del formulario
  const reset = () => {
    setDatosFormulario(initialState);
  };

  return [datosFormulario, handleChange, reset, handleUpload] as const;
};

export default useForm;
