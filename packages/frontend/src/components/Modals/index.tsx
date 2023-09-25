import { Login } from "../../modules/Auth/Login/Login.component"
import { Signup } from "../../modules/Auth/Signup/Signup.component"
import { AvatarCrop } from "../../modules/EditProfile/AvatarSection/AvatarCrop/AvatarCrop.component"
import { ModalDef } from "../Modal/ModalDef/ModalDef.component"
import { MODAL_ID } from "./modals.constants"

export const ModalDefinitions = () => {
  return (
    <>
      <ModalDef id={MODAL_ID.LOGIN} component={<Login />} />
      <ModalDef id={MODAL_ID.AVATAR_CROP} component={<AvatarCrop src="https://media.istockphoto.com/id/840907962/fr/photo/plage-de-la-mer-des-cara%C3%AFbes-%C3%A0-playa-del-carmen.jpg?s=612x612&w=0&k=20&c=zkPLd23L0EQBvZnTt7Baz7rSN6zs40WlM8dlLHO2too=" />} />
      <ModalDef id={MODAL_ID.SIGNUP} component={<Signup />} />
    </>
  )
}