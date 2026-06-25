import { useSelector } from "react-redux"

export default function HeaderAuth() {
    const { username } = useSelector((state) => state.auth)
    console.log(username)

    return (
        <></>
    )
}