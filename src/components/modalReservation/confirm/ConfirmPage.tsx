import { useSelector } from "react-redux"
import { IState } from "../../../store/store"
import Cancel from "./Cancel"
import Confirm from "./Confirm"
import Modify from "./Modify"

const ConfirmPage = () => {

    const confirmValue = useSelector((state:IState) => state.reservation.modalReservationConfirm)

    return (
        <>
            {confirmValue === 'confirm' ? <Confirm /> : null}
            {confirmValue === 'modify' ? <Modify /> : null}
            {confirmValue === 'cancel' ? <Cancel /> : null}
        </>
    )
}

export default ConfirmPage