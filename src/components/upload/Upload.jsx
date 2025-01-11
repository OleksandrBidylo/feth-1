import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import uploadIcon from "../../assets/images/icon-upload.svg";
import iconInfo from "../../assets/images/icon-info.svg";
import ticket from "../../assets/images/pattern-ticket.svg";
import logo from "../../assets/images/logo-full.svg";
import gitIcon from "../../assets/images/icon-github.svg";
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
  const id = nanoid(5).toUpperCase();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short name ✖")
      .max(40, "Too long name ✖")
      .required("Name is required ✖"),
    email: Yup.string()
      .min(3, "Too short email ✖")
      .max(40, "Too long email ✖")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is incorrect ✖"
      )
      .required("It's required field ✖"),
    gitName: Yup.string()
      .min(6, "Too short GitHub name ✖")
      .max(40, "Too long GitHub name ✖")
      .matches(/^@[a-zA-Z0-9._%+-]+$/, "Uncorrect GitHub name ✖")
      .required("It's required field ✖"),
    photo: Yup.mixed().required("Upload a photo ✖"),
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

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFieldValue("photo", file);
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
            {({ setFieldValue, errors, touched }) => (
              <Form className="flex flex-col">
                <label className="mb-2">Upload Avatar</label>
                {!preview && (
                  <div
                    style={{
                      width: 460,
                      height: 150,
                    }}
                    className="border-2 bg-cr border-dashed border-gray-500 rounded-xl flex flex-col justify-center items-center"
                    type="button"
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, setFieldValue)}
                  >
                    <div className="button-cr mb-3  rounded-xl border-2 border-gray-600 w-14 h-14 flex justify-center">
                      <img width={30} height={30} src={uploadIcon} />
                    </div>
                    <p className="text-xl font-medium text-gray-400 ">
                      Drag and drop or click to upload
                    </p>
                  </div>
                )}

                {preview && (
                  <div
                    style={{
                      width: 460,
                      height: 150,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }}
                    className="flex flex-col justify-center items-center border-2 border-dashed border-gray-500 rounded-xl"
                  >
                    <img
                      className="mb-3 w-14 h-14  rounded-xl border-2 border-gray-600"
                      src={preview}
                    />

                    <div className="flex gap-1">
                      <button
                        className="underline button-cr font-custom border border-transparent p-1 text-base font-light rounded-md "
                        onClick={() => removePhoto(setFieldValue)}
                      >
                        Remove image
                      </button>
                      <button
                        className="button-cr font-custom border border-transparent p-1 text-sm font-light rounded-md "
                        type="button"
                        onClick={openFileDialog}
                      >
                        Change photo
                      </button>
                    </div>
                  </div>
                )}

                {touched.photo && !errors.photo ? (
                  <div className="text-green-500 mb-10 mt-2 text-sm">
                    Photo is uploaded ✔
                  </div>
                ) : touched.photo && errors.photo ? (
                  <div className="text-red-500 mb-10 mt-2 text-sm">
                    {errors.photo}
                  </div>
                ) : (
                  <div className="mb-10 mt-2 text-sm flex gap-1">
                    <img src={iconInfo} />
                    <p>Upload your photo (JPG or PNG)</p>
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

                {touched.name && !errors.name ? (
                  <div className="text-green-500 mb-2">Name is valid ✔</div>
                ) : touched.name && errors.name ? (
                  <div className="text-red-500 mb-2">{errors.name}</div>
                ) : (
                  <label className="mb-2">Full Name</label>
                )}
                <Field
                  style={{
                    width: 460,
                    height: 54,
                  }}
                  className="bg-cr border rounded-xl border-gray-500 pl-2 mb-5"
                  placeholder="John Doe"
                  type="text"
                  name="name"
                />

                {touched.email && !errors.email ? (
                  <div className="text-green-500 mb-2">Email is valid ✔</div>
                ) : touched.email && errors.email ? (
                  <div className="text-red-500 mb-2">{errors.email}</div>
                ) : (
                  <label className="mb-2">Email Adress</label>
                )}
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

                {touched.gitName && !errors.gitName ? (
                  <div className="text-green-500 mb-2">
                    GitHub Username is valid ✔
                  </div>
                ) : touched.gitName && errors.gitName ? (
                  <div className="text-red-500 mb-2">{errors.gitName}</div>
                ) : (
                  <label className="mb-2">GitHub Username</label>
                )}
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
                  className="btn btn-error font-bold font-custom text-lg mb-11"
                  type="submit"
                >
                  Generate My Ticket
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="relative">
          <img src={ticket} />
          <div className="top-6 left-6 absolute text-right">
            <img className="w-72" src={logo} />
            <p className=" text-lg font-normal">Jan 31, 2025 / Austin, TX</p>
          </div>
          <div className="absolute bottom-6 left-6 flex gap-3">
            <img src={preview} className=" h-20 w-20 rounded-xl" />
            <div>
              <p className="text-4xl font-medium">{formData.name}</p>
              <div className="flex gap-2">
                <img src={gitIcon} />
                <p className="text-lg font-normal">{formData.gitName}</p>
              </div>
            </div>
          </div>
          <p className="absolute top-28 right-0 rotate-90 text-gray-400 text-4xl font-medium">
            #{id}
          </p>
        </div>
      )}
    </div>
  );
};

export default Upload;
