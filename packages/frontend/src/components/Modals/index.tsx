import { Login } from "../../modules/Auth/Login/Login.component"
import { Signup } from "../../modules/Auth/Signup/Signup.component"
import { DeleteAccountConfirm } from "../../modules/EditProfile/DeleteAccountSection/subComponent/DeleteAccountConfirm/DeleteAccountConfirm.component"
import { ModalDef } from "../Modal/ModalDef/ModalDef.component"
import { MODAL_ID } from "./modals.constants"

export const ModalDefinitions = () => {
  return (
    <>
      <ModalDef id={MODAL_ID.LOGIN} component={<Login />} />
      <ModalDef id={MODAL_ID.SIGNUP} component={<Signup />} />
      <ModalDef id={MODAL_ID.CONFIRM_DELETE_ACCOUNT} component={<DeleteAccountConfirm />} />
    </>
  )
}