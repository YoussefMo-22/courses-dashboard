// / src/pages/CourseForm/CourseForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCourseToLocalStorage, updateCourseInLocalStorage } from '../../utils/coursesLocalStorage';
import { toast } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the necessary CSS for toastify

function CourseForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    price: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const courses = JSON.parse(localStorage.getItem("courses"));
      const courseToEdit = courses.find((course) => course.id === id);
      if (courseToEdit) {
        setFormData(courseToEdit);
        setImagePreview(courseToEdit.image);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: imageURL,
      }));
      setImagePreview(imageURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate the form data
    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      toast.error("All fields are required.");
      return;
    }
  
    // Check date logic
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error("Start date cannot be after end date.");
      return;
    }
  
    if (id) {
      updateCourseInLocalStorage(formData);
      toast.success("Course updated successfully!");
    } else {
      const newCourse = {
        ...formData,
        id: Date.now().toString(),
      };
      addCourseToLocalStorage(newCourse);
      toast.success("Course added successfully!");
    }
  
    navigate("/courses");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">{id ? "Edit Course" : "Add New Course"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Course Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
       
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Course Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {imagePreview && (
          <div className="my-4 flex justify-end items-center w-full">
            <img src={imagePreview} alt="Preview" className="w-1/3 h-72 object-cover rounded-md" />
          </div>
        )}
        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
        >
          {id ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
