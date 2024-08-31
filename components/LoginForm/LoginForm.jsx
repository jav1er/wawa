import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useData from "../../hooks/useData";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import getUserRegister from "../../helpers/getUserRegister";
import useGetPostNumber from "../../hooks/useGetPostNumber";
import useClearData from "../../hooks/useClearData";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Este campo es requerido")
      .min(3, "Debe colocar minimo 3 caracteres")
      .max(20, "Este debe llevar maximo 20 caracteres")
      .matches(/^[a-zA-Z]+$/, "Solo se admiten letras"),
  })
  .required();

export default function LoginForm() {
  useClearData();
  const { setUserData } = useData()
  
  const { setLocalStorage: setUserLoggedStorage } =
    useLocalStorage("user-logged");

  const router = useRouter();

  const goRegister = () => {
    router.push("/register");
  };

  const goDashBoard = () => {
    router.push("/dashboard");
  };


  const goAdminPanel = () => {
    router.push("/admin_panel");
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
  });

  const validateUser = async (dataform) => {
    const { data } = await getUserRegister(dataform);

    const hasData = data.length > 0;

    if (hasData) {
      ////console.log(data);
      setUserLoggedStorage(data[0]);
      setUserData(data[0])
      goDashBoard();
      return;
    }

    alert("El usuario no existe, registrese");
    //goRegister();
  };

  const onSubmit = async (data) => {
    ////console.log(data);
    if (isValid) {
      validateUser(data);
    }
  };

  return (
    <>
      <section className="formSection">
        <div className="container">
          <div className="wrapper">
            <h1 className="title">Ingrese</h1>
          </div>
          <div className="content-form">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="formGroup  ">
                <div className="input-content">
                  <input
                    placeholder="@username"
                    className="input"
                    type="text"
                    {...register("username")}
                  />

                  {<p className="message">{errors.username?.message}</p>}
                </div>

                <div className="actions">
                  <button disabled={!isValid} type="submit" className="button">
                    Entrar
                  </button>
                </div>
              </div>
            </form>
            <div className="contentRegister">
              <button onClick={goRegister} className="button">
                Registrese
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
