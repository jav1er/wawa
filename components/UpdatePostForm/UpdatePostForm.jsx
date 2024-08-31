import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { default as NextImage } from "next/image"
//import { getDataUser } from "../../hooks/useInformationClient";
import { LOCAL_STORAGE_KEYS, APIS, END_POINTS } from "../../util/constants"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import validateLink from "../../helpers/validateLink"
import useData from "../../hooks/useData"
import * as yup from "yup"
//import UpdateGetPosts from "../../helpers/updatePosts";
import useUpdatePosts from "../../hooks/useUpdatePosts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updatePost } from "../../helpers/updatePost"

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

function UpdatePostForm() {
  ////console.log("UpdatePostForm");
  const { objCollection: dataLoggedUser } = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_LOGGED,
  )
  const { objCollection: dataLocationUser } = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_LOCATION,
  )
  const [dateFormPrepared, setDateFormPrepared] = useState(null)
  const [imgSelected, setImgSelected] = useState(null)

  const {
    tanStackAdminTableRowSelect,
    setModalVisibility,
    tanStackAdminTableState,
  } = useData()

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
      image:tanStackAdminTableRowSelect.image,
      author: tanStackAdminTableRowSelect.author,
      ruta: tanStackAdminTableRowSelect.ruta,
      pnt_origen: tanStackAdminTableRowSelect.pnt_origen,
      pnt_destino: tanStackAdminTableRowSelect.pnt_destino,
      precio: tanStackAdminTableRowSelect.precio,
      capacidad_autobus: tanStackAdminTableRowSelect.capacidad_autobus,
      hora_salida: tanStackAdminTableRowSelect.hora_salida,
      hora_llegada: tanStackAdminTableRowSelect.hora_llegada,
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
  const { mutate, error, isLoading } = useMutation(updatePost)

  const onSubmit = async capturedFormData => {
    if (isValid) {
      const updatePost = {
        id: tanStackAdminTableRowSelect.id,
        createdAt: new Date().getTime(),
        author: tanStackAdminTableRowSelect.author,
        location: tanStackAdminTableRowSelect.location,
        ...capturedFormData,
      }

      mutate(updatePost, {
        onSuccess: resposeData => {
          const currentPageIndex = tanStackAdminTableState.pagination.pageIndex
          const currentPageSize = tanStackAdminTableState.pagination.pageSize
          const currentIdPost = tanStackAdminTableState.rowSelection.id
          const queryResult = queryClient.getQueryData({
            queryKey: [
              "tableData",
              { pageIndex: currentPageIndex, pageSize: currentPageSize },
            ],
          })

          const modifiedRows = queryResult.rows.map(item => {
            if (item.id === currentIdPost) {
              return resposeData
            }
            return item
          })
          queryClient.setQueryData(
            [
              "tableData",
              { pageIndex: currentPageIndex, pageSize: currentPageSize },
            ],
            data => ({
              ...data,
              rows: modifiedRows,
            }),
          )
          setModalVisibility(x => !x)
        },
      })
    }
  }

  return (
    <>
      <span className="modal-title">Actualice su Ruta</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-update-post"
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
            {isLoading ? <div className="loader"></div> : "Actualizar"}
          </button>
        </div>
      </form>
    </>
  )
}

export default memo(UpdatePostForm)

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
//export default UpdatePostForm;
