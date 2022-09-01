import express from "express"
import { addbootcamp , deletebootcamp , updatebootcamp ,getbootcamps} from "../controllers/bootcapm.js"

const router = express.Router()


router.route("/")
.get(getbootcamps)
.post(addbootcamp)


router.route("/:id")
.put(updatebootcamp)
.delete(deletebootcamp)


export default router