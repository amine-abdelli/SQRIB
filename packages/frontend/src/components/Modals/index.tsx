import { Login } from "../../modules/Auth/Login/Login.component"
import { Signup } from "../../modules/Auth/Signup/Signup.component"
import { ModalDef } from "../Modal/ModalDef/ModalDef.component"
import { MODAL_ID } from "./modals.constants"

export const ModalDefinitions = () => {
  return (
    <>
      <ModalDef id={MODAL_ID.LOGIN} component={<Login />} />
      <ModalDef id={MODAL_ID.SIGNUP} component={<Signup />} />
    </>
  )
}