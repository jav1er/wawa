import { useState, useEffect, useRef } from "react"
import { default as NextImage } from "next/image"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/router"
import validateLink from "../../helpers/validateLink"
import getUserRegister from "../../helpers/getUserRegister"
import useHttpPostHook from "../../hooks/useHttpPostHook"
import { APIS, END_POINTS } from "../../util/constants"
import { useQueryClient } from "@tanstack/react-query"

const schema = yup
  .object({
    avatar: yup.string(),
    username: yup
      .string()
      .required("Este campo es requerido")
      .min(3, "debe colocar minimo 3 caracteres")
      .max(20, "Este debe llevar maximo 20 caracteres")
      .matches(/^[a-zA-Z]+$/, "Solo se admiten letras"),
    name: yup
      .string()
      .required("Este campo es requerido")
      .min(3, "debe colocar minimo 3 caracteres")
      .max(20, "Este debe llevar maximo 20 caracteres")
      .matches(/^[a-zA-Z]+$/, "Solo se admiten letras"),
    surname: yup
      .string()
      .required("Este campo es requerido")
      .min(3, "debe colocar minimo 3 caracteres")
      .max(20, "Este debe llevar maximo 20 caracteres")
      .matches(/^[a-zA-Z]+$/, "Solo se admiten letras"),
  })
  .required()

export default function RegisterForm() {
  const queryClient = useQueryClient()
  const butttonRegister = useRef(null)
  const [imgSelected, setImgSelected] = useState(null)
  const [dateFormPrepared, setDateFormPrepared] = useState(null)
  const [customParams, setCustomParams] = useState("")

  const { response, error, isLoading } = useHttpPostHook(
    `${APIS.MOCKAPI_POSTS}${END_POINTS.USER_REGISTRATION}`,
    dateFormPrepared,
  )
  const router = useRouter()

  const goLogin = () => {
    router.push("/")
  }

  const {
    register,
    setError,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: "https://avatarfiles.alphacoders.com/305/305582.jpg",
      username: "",
      name: "",
      surname: "",
    },
  })

  const registerDataUser = async () => {
    const isUserExistsDbs = await validateUser()
    if (isUserExistsDbs || Object.keys(errors).length || !isValid) {
      return
    }
    const capturedFormData = getValues()
    const userDataRegister = {
      createdAt: new Date().getTime(),
      ...capturedFormData,
    }
    setDateFormPrepared(userDataRegister)
  }

  const onSubmit = async () => {
    registerDataUser()
  }

  const handleimgSelected = async url => {
    const imgValidated = await validateLink(url)
    setImgSelected(imgValidated)
  }

  const validateUser = async () => {
    butttonRegister.current.disabled = true
    const { data } = await getUserRegister(customParams)
    butttonRegister.current.disabled = false
    const hasData = data.length > 0

    if (hasData) {
      setError("username", {
        type: "manual",
        message: "Este usuario ya existe, ingrese otro",
      })
      return true
    }

    if (!hasData) {
      clearErrors("username")
      return false
    }
  }

  useEffect(() => {
    if (response?.statusText == "Created") {
      alert("registro exitoso puede hacer login")
      setTimeout(_ => router.push("/"), 1000)
    }
  }, [dateFormPrepared, response, router])

  useEffect(() => {
    if (customParams.username) {
      registerDataUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customParams.username])

  return (
    <>
      <section className="formSectionRegister">
        <div className="container">
          <div className="wrapper">
            <h1 className="title">Registrar usuario </h1>
          </div>
          <div className="content-register">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-register"
            >
              <div className="formGroup">
                <input
                  placeholder="url img"
                  className="input"
                  type="text"
                  {...register("avatar", {
                    onBlur: async e => {
                      handleimgSelected(e.target.value)
                    },
                  })}
                />
                {errors.avatar?.message && (
                  <p className="message">{errors.avatar?.message}</p>
                )}
              </div>
              {imgSelected && (
                <div className="showImg">
                  <NextImage
                    src={imgSelected}
                    alt="title"
                    width={125}
                    height={125}
                    className="post-image"
                    priority
                  />
                </div>
              )}
              <div className="formGroup">
                <input
                  ref={register}
                  placeholder="username*"
                  className="input"
                  type="text"
                  autoComplete="off"
                  {...register("username", {
                    onBlur: ({ target: { value } }) => {
                      !errors?.username && setCustomParams({ username: value })
                    },
                  })}
                  name="username"
                />
                {errors.username?.message && (
                  <p className="message">{errors.username?.message}</p>
                )}
              </div>

              <div className="formGroup">
                <input
                  placeholder="name*"
                  className="input"
                  type="text"
                  autoComplete="off"
                  {...register("name")}
                />
                {errors.name?.message && (
                  <p className="message">{errors.name?.message}</p>
                )}
              </div>

              <div className="formGroup">
                <input
                  placeholder="surname*"
                  className="input"
                  type="text"
                  autoComplete="off"
                  {...register("surname")}
                />
                {errors.surname?.message && (
                  <p className="message">{errors.surname?.message}</p>
                )}
              </div>

              <button
                ref={butttonRegister}
                disabled={!isValid || Object.keys(errors).length}
                type="submit"
                className={
                  !Object.keys(errors).length && isValid && !isLoading
                    ? "button"
                    : "disabled"
                }
              >
                {isLoading ? <div className="loader"></div> : "Registrar"}
              </button>
            </form>
            <div className="contentLogin">
              <span onClick={goLogin}> login </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
