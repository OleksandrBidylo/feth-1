import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import uploadIcon from "../../assets/images/icon-upload.svg";
import iconInfo from "../../assets/images/icon-info.svg";
import * as Yup from "yup";

const Upload = ({ onSendData }) => {
  const initialValues = {
    name: "",
    email: "",
    gitName: "",
    photo: null,
  };
  const [submited, setSubmited] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState(null);
  const id = nanoid(10).toUpperCase();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short name !")
      .max(25, "Too long name !")
      .required("Name is required"),
    email: Yup.string()
      .min(3, "Too short email !")
      .max(25, "Too long email !")
      .matches(/@/, /./)
      .required("It's required field"),
    gitName: Yup.string()
      .min(3, "Too short GitHub name !")
      .max(25, "Too long GitHub name !")
      .matches(/@/, "uncorrect GitHub name")
      .required("It's required field"),
    photo: Yup.mixed().required("Upload a photo !"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("photo", file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const removePhoto = (setFieldValue) => {
    setPreview(null);
    setFieldValue("photo", null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const openFileDialog = () => {
    inputRef.current.click();
  };

  const handleSubmit = (values, { resetForm }) => {
    setFormData(values);
    setSubmited(true);
    resetForm();
    sendData(values);
  };

  const sendData = (values) => {
    if (onSendData) {
      onSendData({
        submited: true,
        formData: values,
      });
    }
  };

  return (
    <div className="z-10 relative flex flex-col justify-center items-center mt-10 font-custom">
      {!submited ? (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, errors }) => (
              <Form className="flex flex-col">
                <label className="mb-2">Upload Avatar</label>
                {!preview && (
                  <div
                    style={{
                      width: 460,
                      height: 126,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }}
                    className="border-2 border-dashed border-gray-500 rounded-xl flex flex-col justify-center items-center"
                    type="button"
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      className="mb-3 p-2 rounded-xl border border-gray-600"
                    >
                      <img width={30} height={30} src={uploadIcon} />
                    </div>
                    <p className="text-xl font-medium text-gray-400">
                      Drag and drop or click to upload
                    </p>
                  </div>
                )}

                {preview && (
                  <div className="flex">
                    <img className="w-40 h-32" src={preview} />
                    <button type="button" onClick={openFileDialog}>
                      Change photo
                    </button>
                    <button onClick={() => removePhoto(setFieldValue)}>
                      Remove
                    </button>
                  </div>
                )}
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-red-500 mt-2 text-xs mb-10"
                />
                {!errors.photo && (
                  <div className="mb-10 mt-2 flex items-center text-center gap-1">
                    <img src={iconInfo} style={{ width: 16, height: 16 }} />

                    <p className="text-xs">Upload your photo (JPG or PNG).</p>
                  </div>
                )}

                <input
                  ref={inputRef}
                  accept="image/*"
                  className="hidden"
                  type="file"
                  name="photo"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mb-2  "
                />
                {!errors.name && <label className="mb-2">Full Name</label>}
                <Field
                  style={{
                    width: 460,
                    height: 54,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  className="border rounded-xl border-gray-500 pl-2 mb-5"
                  placeholder="John Doe"
                  type="text"
                  name="name"
                />
                <label className="mb-2">Email Address</label>
                <Field
                  style={{
                    width: 460,
                    height: 54,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  className="border rounded-xl border-gray-500 pl-2 mb-5"
                  placeholder="johndoe@email.com"
                  type="email"
                  name="email"
                />
                <label className="mb-2">GitHub Username</label>
                <Field
                  style={{
                    width: 460,
                    height: 54,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  className="border rounded-xl border-gray-500 pl-2 mb-5"
                  placeholder="@johndoe132"
                  type="text"
                  name="gitName"
                />
                <button
                  className="btn btn-error font-bold font-custom text-lg"
                  type="submit"
                >
                  Generate My Ticket
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>
          <img width={250} src={preview} />
          <p>{formData.name}</p>
          <p className="text-3xl">{formData.gitName}</p>
          <p>#{id}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
