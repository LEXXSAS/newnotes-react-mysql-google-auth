import $api from '../http';
export default class FileService {
  static uploadFile(formData) {
    return $api.post(`${import.meta.env.VITE_API_URL}/api/upload/file`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type":"multipart/form-data",
      }
    })
  }
}
