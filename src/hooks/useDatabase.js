import { useContext } from "react"
import { DatabaseContext } from "../contexts/DatabaseContext"


export const useDatabase = () => useContext(DatabaseContext)