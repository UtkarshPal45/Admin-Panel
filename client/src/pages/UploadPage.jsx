import { useState, useCallback } from "react"
import Navbar from "../components/Navbar"
import { CheckCircle, AlertCircle, Upload, FileText } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { uploadList } from "../services/api"


const UploadPage = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        setError("Please upload a CSV file")
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError("")
      setSuccessMessage("")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      setSuccessMessage("")
      return;
    }
  
    setUploading(true);
    setError("");
    setSuccessMessage("")
  
    try {
      const response = await uploadList(file); // Call API function
      console.log("Upload successful:", response);
      setSuccessMessage(`File "${file.name}" was uploaded successfully!`)
      setFile(null);

      document.querySelector('input[type="file"]').value = ""; // Reset file input
    } catch (err) {
      setError(err.message || "Failed to upload file");
      setSuccessMessage("")
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">Upload CSV</h1>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-medium">Upload List</h2>

        
          {successMessage && (
            <div className="mb-6 flex items-center gap-2 rounded-md bg-green-50 p-4 text-sm text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <div
            {...getRootProps()}
            className={`mb-6 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center transition-colors hover:border-gray-400 ${
              isDragActive ? "border-black bg-gray-100" : ""
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-4 h-8 w-8 text-gray-400" />
            <p className="mb-1 text-lg font-medium">Drag & Drop or Click to Upload</p>
            <p className="text-sm text-gray-500">Only CSV files are supported</p>
          </div>

          {file && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm">
              <FileText className="h-4 w-4" />
              <span>{file.name}</span>
            </div>
          )}

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setFile(null)
                setError("")
                setSuccessMessage("")
              }}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white ${
                !file || uploading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800"
              }`}
            >
              {uploading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload File
                </>
              )}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-lg font-medium">CSV Format Guidelines</h2>
            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium">
                <FileText className="h-4 w-4" />
                Required Columns
              </h3>
              <p className="mb-2 text-sm text-gray-600">Your CSV file should include the following columns:</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>name - Full name of the contact</li>
                <li>email - Valid email address</li>
                <li>phone - Phone number with country code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage

