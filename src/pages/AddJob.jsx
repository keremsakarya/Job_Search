import { v4 } from "uuid"
import AutoInput from "../components/AutoInput"
import Select from "../components/Select"
import SubmitButton from "../components/SubmitButton"
import { statusOpt, typeOpt } from "../constants"
import api from "../utils/api"
import { useDispatch } from "react-redux"
import { createJob, } from "../app/slices/jobSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AddJob = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //* form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault()
    // formData oluştur
    const formData = new FormData(e.target)

    // input lardaki verilerden bir nesne oluşturur
    const newJobData = Object.fromEntries(formData.entries())

    // tarih ve id ekle
    newJobData.id = v4()
    newJobData.date = Date.now()

    // oluşturduğumuz veriyi api ye kaydet
    api.post("/jobs", newJobData).then(() => {
      toast.success("İş başarıyla eklenildi.")
      // store a veriyi kaydet
      dispatch(createJob(newJobData))
      // anasayfaya yönlendir
      navigate("/")
    }).catch(() => toast.error("İş eklenilmedi."))
  }

  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <AutoInput label="Pozisyon" name="position" />
          <AutoInput label="Şirket" name="company" />
          <AutoInput label="Lokasyon" name="location" />

          <Select label={"Durum"} options={statusOpt} name="status" />
          <Select label={"Tür"} options={typeOpt} name="type" />

          <div>
            <SubmitButton type="submit" text="Oluştur" />
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob