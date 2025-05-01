import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCoursesFromLocalStorage,
  deleteCourseFromLocalStorage,
} from '../../utils/coursesLocalStorage';

const ITEMS_PER_PAGE = 6;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const courses = getCoursesFromLocalStorage();
    setCourses(courses);
  }, []);

  const handleDelete = (id) => {
    deleteCourseFromLocalStorage(id);
    setCourses(getCoursesFromLocalStorage());
  };

  // Price Filter Logic
  const filterByPrice = (course) => {
    switch (priceFilter) {
      case 'low':
        return course.price <= 50;
      case 'medium':
        return course.price > 50 && course.price <= 150;
      case 'high':
        return course.price > 150;
      default:
        return true;
    }
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByPrice(course)
    );
  });

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Courses</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by course name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-md w-full sm:w-1/3"
        />

        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded-md w-full sm:w-1/4"
        >
          <option value="">All Price Ranges</option>
          <option value="low">Low (Less than $50)</option>
          <option value="medium">Medium ($51 - $150)</option>
          <option value="high">High (More than $150)</option>
        </select>

        <Link
          to="/courses/add"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Add New Course
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:shadow-2xl duration-300"
          >
            <Link to={`/courses/${course.id}`} className="cursor-pointer">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <div className="p-4 flex flex-col h-full">
              <h3 className="text-lg font-bold mb-2">{course.name}</h3>
              <p className="text-sm text-gray-700 mb-2">{course.description}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Start:</strong> {course.startDate}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>End:</strong> {course.endDate}</p>
              <p className="text-sm text-gray-800 font-medium mb-2"><strong>Price:</strong> ${course.price}</p>

              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/courses/edit/${course.id}`}
                  className="text-blue-600 font-medium hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-600 font-medium hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === idx + 1
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;

