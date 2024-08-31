import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { default as NextImage } from "next/image"
import { LOCAL_STORAGE_KEYS, APIS, END_POINTS } from "../../util/constants"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import validateLink from "../../helpers/validateLink"
import useData from "../../hooks/useData"
import * as yup from "yup"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost } from "../../helpers/createPost"

const schema = yup
  .object({
    image: yup.string(),
    ruta: yup.string().required("Este campo es requerido"),
    pnt_origen: yup.string().required("Este campo es requerido"),
    pnt_destino: yup.string().required("Este campo es requerido"),
    precio: yup.string().required("Este campo es requerido"),
    capacidad_autobus: yup.string().required("Este campo es requerido"),
    hora_salida: yup
      .string()
      .required("Este campo es requerido")
      .min(2, "debe colocar minimo 2 caracteres")
      .max(6, "Este debe llevar maximo 6 caracteres"),
    hora_llegada: yup
      .string()
      .required("Este campo es requerido")
      .min(2, "debe colocar minimo 2 caracteres")
      .max(6, "Este debe llevar maximo 6 caracteres"),

  })
  .required()

function CreatePostForm() {
  ////console.log("CreatePostForm");
  const { objCollection: dataLoggedUser } = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_LOGGED,
  )
  const { objCollection: dataLocationUser } = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_LOCATION,
  )
  const [dateFormPrepared, setDateFormPrepared] = useState(null)
  const [imgSelected, setImgSelected] = useState(null)

  const { setModalVisibility, setNumberPublications } =
    useData()

  const handleimgSelected = useCallback(async url => {
    const imgValidated = await validateLink(url)
    //////console.log(imgValidated);
    setImgSelected(imgValidated)
  }, [])

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      image:
        "https://imgs.search.brave.com/Cor06piWqvjhvu2W1UsR2LZiRcVaEwFqsQWa_0jsvh8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM2/NTIyMDExL3Bob3Rv/L3doaXRlLWJ1cy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/U2xKSWR4Sm1rck44/MndiVXEyMzRrbDBM/NmtkY3NFZVg5Q01O/MjhlTDVjZz0",
      ruta: "",
      //origen: "",
    },
  })

  const rutas = [
    "Seleccione...",
    "Ruta 1",
    "Ruta 2",
    "Ruta 3",
    "Ruta 4",
    "Ruta 4",
  ]
  const origenes = [
    "Seleccione...",
    "Origen 6",
    "Origen 7",
    "Origen 8",
    "Origen 9",
    "Origen 10",
  ]
  const destinos = [
    "Seleccione...",
    "destino 20",
    "destino 21",
    "destino 20",
    "destino 25",
    "destino 60",
  ]
  const precios = ["Seleccione...", "20", "40", "60", "80", "100"]

  const capacidad = [ "Seleccione...", "20", "40", "60"]

  const queryClient = useQueryClient()
  const { mutate, error, isLoading } = useMutation(createPost)

  const onSubmit = async capturedFormData => {
    //console.log(capturedFormData)

    if (isValid) {
      const newPost = {
        createdAt: new Date().getTime(),
        author: dataLoggedUser.username,
        location: dataLocationUser?.region
          ? dataLocationUser.region
          : undefined,
        ...capturedFormData,
      }

      mutate(newPost, {
        onSuccess: responseData => {
          setNumberPublications(currentNumber => currentNumber + 1)
          setModalVisibility(false)
          queryClient.refetchQueries(["tableData"])
        },
      })
    }
  }

  return (
    <>
      <span className="modal-title">Crear Ruta</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-create-post"
      >
        <div className="formGroup">
          <input
            placeholder="url img"
            className="input"
            type="text"
            {...register("image", {
              onBlur: e => handleimgSelected(getValues("image"), e),
            })}
          />
          {errors.image?.message && (
            <p className="message">{errors.image?.message}</p>
          )}
        </div>

        {imgSelected && (
          <div className="showImg">
            <NextImage
              src={imgSelected}
              alt="title"
              width={200}
              height={200}
              className="post-image"
              priority
            />
          </div>
        )}

        <div className="formGroup">
          <label>Ruta</label>
          <select
            className="select-status"
            {...register("ruta")}
          >
            <OptionList list={rutas} />
          </select>
          {errors.ruta?.message && (
            <p className="message">{errors.ruta?.message}</p>
          )}
        </div>

        <div className="formGroup">
          <label>Origen</label>
          <select
            className="select-status"
            {...register("pnt_origen")}
          >
            <OptionList list={origenes} />
          </select>
        </div>
        <div className="formGroup">
          <label>Destino</label>
          <select
            className="select-status"
            {...register("pnt_destino")}
          >
            <OptionList list={destinos} />
          </select>
        </div>
        <div className="formGroup">
          <label> Precio</label>
          <select
            className="select-status"
            {...register("precio")}
          >
            <OptionList list={precios} />
          </select>
        </div>
        <div className="formGroup">
          <label> Capacidad</label>
          <select
            className="select-status"
            {...register("capacidad_autobus")}
          >
            <OptionList list={capacidad} />
          </select>
        </div>
        <div className="formGroup">
          <input
            ref={register}
            placeholder="hora_llegada*"
            className="input"
            type="text"
            autoComplete="off"
            {...register("hora_llegada")}
            name="hora_llegada"
          />
          {errors.hora_llegada?.message && (
            <p className="message">{errors.hora_llegada?.message}</p>
          )}
        </div>

        <div className="formGroup">
          <input
            ref={register}
            placeholder="hora_salida*"
            className="input"
            type="text"
            autoComplete="off"
            {...register("hora_salida")}
            name="hora_salida"
          />
          {errors.hora_salida?.message && (
            <p className="message">{errors.hora_salida?.message}</p>
          )}
        </div>
        <div className="actions">
          <button
            disabled={!isValid}
            type="submit"
            className={isValid && !isLoading ? "button" : "disabled"}
          >
            {isLoading ? <div className="loader"></div> : "Crear"}
          </button>
        </div>
      </form>
    </>
  )
}

export default memo(CreatePostForm)

export function OptionList({ list }) {
  return list.map((currentValue, i) => (
    <option
      className={currentValue === "Seleccione..." && "disabled-select"}
      key={i}
      value={currentValue === "Seleccione..." ? "" : currentValue}
    >
      {currentValue}
    </option>
  ))
}
//export default CreatePostForm;
