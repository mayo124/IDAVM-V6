import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentByGrNumber, updateStudent } from "../../utils/getDataFromGr";

const UpdateUser = () => {
  const { grNumber } = useParams();
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [classOfStudent, setClassOfStudent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getStudentByGrNumber(grNumber);
        if (data) {
          setUserData(data);
          setClassOfStudent(Number(data.class));
        }
      } catch (error) {
        setErrorMessage("Error fetching user data.");
      }
    };
    fetchUserData();
  }, [grNumber]);

  const initialValues = userData || {
    grNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    grade: "",
    class: "",
    adhaarCard: "",
    enrollmentCode: "",
    contactDetails: {
      motherEmail: "",
      motherMobile: "",
      fatherEmail: "",
      fatherMobile: "",
    },
    medical: {
      sex: "",
      bloodGroup: "",
      height: "",
      allergies: "",
      medicalConsent: false,
    },
    lunchPreferences: {
      lunchRequired: false,
      dietaryPreference: "Non-Jain",
    },
    permissions: {
      artRoom: false,
      compLab: false,
      eLibrary: false,
    },
    grp1: [],
    grp2MathsEconomics: "",
    grp2ScienceEcology: "",
    grp3: "",
    HLPProgram: {
      dayOfParticipation: "Monday",
      duration: "",
    },
    misc: {
      nationality: "",
      Religion: "",
      motherName: "",
      fatherName: "",
    },
    address: {
      flatNo: "",
      building: "",
      street: "",
      pincode: "",
    },
    hlp: "",
  };

  const handleSubmit = async (values) => {
    setErrorMessage(null);
    try {
      const AllValues = {
        ...values,
        class: String(classOfStudent),
        grp1:
          classOfStudent < 9
            ? ["English", "Social Science", "Marathi"]
            : ["English", "Social Science"],
      };

      const response = await updateStudent(grNumber, AllValues);
      if (response && response.error) {
        setErrorMessage("An error occurred while updating user data.");
        window.scrollTo(0, 0);
      } else {
        navigate("/admin/users");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrorMessage("An error occurred. Please try again.");
      window.scrollTo(0, 0);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="w-full max-w-2xl p-6 space-y-6 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Update User
          </h2>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-200 text-red-600 p-2 rounded-md text-center mb-4">
              {errorMessage}
            </div>
          )}

          {/* GR Number */}
          <div>
            <label className="block text-gray-600">GR Number</label>
            <Field
              type="text"
              name="grNumber"
              disabled
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none bg-gray-100"
            />
          </div>

          {/* Personal Details */}
          <h3 className="text-xl font-semibold text-gray-700">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">First Name *</label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Middle Name</label>
              <Field
                type="text"
                name="middleName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Last Name *</label>
              <Field
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Grade *</label>
              <Field
                as="select"
                name="grade"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Field>
            </div>
            <div>
              <label className="block text-gray-600">Class *</label>
              <Field
                as="select"
                name="class"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                value={classOfStudent}
                onChange={(e) => {
                  setClassOfStudent(Number(e.target.value));
                }}
              >
                <option value="">Select Class</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
            </div>
            <div>
              <label className="block text-gray-600">AdhaarCard *</label>
              <Field
                type="number"
                name="adhaarCard"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Enrollment Code *</label>
              <Field
                type="text"
                name="enrollmentCode"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Details */}
          <h3 className="text-xl font-semibold text-gray-700">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Mother's Email *</label>
              <Field
                type="email"
                name="contactDetails.motherEmail"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                Mother's Contact Number *
              </label>
              <Field
                type="text"
                name="contactDetails.motherMobile"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Father's Email *</label>
              <Field
                type="email"
                name="contactDetails.fatherEmail"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                Father's Contact Number *
              </label>
              <Field
                type="text"
                name="contactDetails.fatherMobile"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Medical Information */}
          <h3 className="text-xl font-semibold text-gray-700">
            Medical Information
          </h3>
          <div>
            <label className="block text-gray-600">Sex</label>
            <Field
              as="select"
              name="medical.sex"
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Blood Group</label>
              <Field
                as="select"
                name="medical.bloodGroup"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Field>
            </div>
            <div>
              <label className="block text-gray-600">Height</label>
              <Field
                type="text"
                name="medical.height"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600">Allergies</label>
              <Field
                type="text"
                name="medical.allergies"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600">Medical Consent</label>
              <Field
                type="checkbox"
                name="medical.medicalConsent"
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* Lunch Preferences */}
          <h3 className="text-xl font-semibold text-gray-700">
            Lunch Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Lunch Required</label>
              <Field
                type="checkbox"
                name="lunchPreferences.lunchRequired"
                className="w-6 h-6"
              />
            </div>
            <div>
              <label className="block text-gray-600">Dietary Preference</label>
              <Field
                as="select"
                name="lunchPreferences.dietaryPreference"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="Non-Jain">Non-Jain</option>
                <option value="Jain">Jain</option>
              </Field>
            </div>

            {/* Subject groups */}
            {classOfStudent >= 9 ? (
              <>
                <div>
                  <label className="block text-gray-600">
                    ICSE Group 1 list * (these subjects are compulsory)
                  </label>
                  <div>English</div>
                  <div>Social Science</div>
                  {classOfStudent < 9 && <div>Marathi</div>}
                </div>
                <div>
                  <label className="block text-gray-600">
                    ICSE Group 2 list (Mathematics/Economics) *
                  </label>
                  <Field
                    as="select"
                    name="grp2MathsEconomics"
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Group</option>
                    <option value="Maths">Maths</option>
                    <option value="Economics">Economics</option>
                  </Field>
                </div>

                <div>
                  <label className="block text-gray-600">
                    ICSE Group 2 list (Science/Ecology) *
                  </label>
                  <Field
                    as="select"
                    name="grp2ScienceEcology"
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Group</option>
                    <option value="Science">Science</option>
                    <option value="Ecology">Ecology</option>
                  </Field>
                </div>
                <div>
                  <label className="block text-gray-600">
                    ICSE Group 3 list *
                  </label>
                  <Field
                    as="select"
                    name="grp3"
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Group</option>
                    <option value="Computer Applications">
                      Computer Applications
                    </option>
                    <option value="Economic Applications">
                      Economic Applications
                    </option>
                    <option value="Commercial Applications">
                      Commercial Applications
                    </option>
                    <option value="Environmental Applications">
                      Environmental Applications
                    </option>
                    <option value="Art">Art</option>
                    <option value="Artificial inteligence and robotics">
                      Artificial inteligence and robotics
                    </option>
                    <option value="Cookery">Cookery</option>
                    <option value="Performing Arts (Dance, Drama, Music)">
                      Performing Arts (Dance, Drama, Music)
                    </option>
                    <option value="Physical Education">
                      Physical Education
                    </option>
                    <option value="Yoga">Yoga</option>
                  </Field>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-gray-600">HLP</label>
                <Field
                  type="text"
                  name="misc.hlp"
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Miscellaneous Information */}
          <h3 className="text-xl font-semibold text-gray-700">
            Miscellaneous Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Nationality</label>
              <Field
                type="text"
                name="misc.nationality"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Religion</label>
              <Field
                as="select"
                name="misc.Religion"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Religion</option>
                <option value="Sanatan">Sanatan</option>
                <option value="Jainism">Jainism</option>
                <option value="Sikhi">Sikhi</option>
                <option value="Islam">Islam</option>
                <option value="Cristanity">Cristanity</option>
                <option value="Judisum">Judisum</option>
                <option value="Budhisim">Budhisim</option>
                <option value="Agnostic">Agnostic</option>
                <option value="Atheist">Atheist</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Field>
            </div>
            <div>
              <label className="block text-gray-600">Mother's Name</label>
              <Field
                type="text"
                name="misc.motherName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Father's Name</label>
              <Field
                type="text"
                name="misc.fatherName"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Address Information */}
          <h3 className="text-xl font-semibold text-gray-700">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Flat No</label>
              <Field
                type="text"
                name="address.flatNo"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Building</label>
              <Field
                type="text"
                name="address.building"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Street</label>
              <Field
                type="text"
                name="address.street"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600">Pincode</label>
              <Field
                type="text"
                name="address.pincode"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Permissions & Extracurricular Activities */}
          <h3 className="text-xl font-semibold text-gray-700">
            Permissions & Extracurricular Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Art Room Permission</label>
              <Field
                type="checkbox"
                name="permissions.artRoom"
                className="w-6 h-6"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                Computer Lab Permission
              </label>
              <Field
                type="checkbox"
                name="permissions.compLab"
                className="w-6 h-6"
              />
            </div>
            <div>
              <label className="block text-gray-600">
                E-Library Permission
              </label>
              <Field
                type="checkbox"
                name="permissions.eLibrary"
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* HLP Program */}
          <h3 className="text-xl font-semibold text-gray-700">HLP Program</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">
                Day of Participation
              </label>
              <Field
                as="select"
                name="HLPProgram.dayOfParticipation"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </Field>
            </div>
            <div>
              <label className="block text-gray-600">Duration</label>
              <Field
                type="text"
                name="HLPProgram.duration"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-6 hover:bg-blue-700 transition-colors duration-300"
          >
            Update
          </button>
        </Form>
      </Formik>

      <button
        onClick={() => navigate("/admin/users")}
        className="mt-6 bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors duration-300"
      >
        Back to Users
      </button>
    </div>
  );
};

export default UpdateUser;
