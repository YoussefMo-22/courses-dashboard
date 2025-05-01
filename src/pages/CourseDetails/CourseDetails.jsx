import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const foundCourse = courses.find(c => c.id === id);
    setCourse(foundCourse);
  }, [id]);

  if (!course) {
    return <div className="text-center py-20 text-xl">Course not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Left side: Text content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">{course.name}</h1>

          <section className="text-lg text-gray-700 mb-8 leading-relaxed">
            {course.description}
          </section>

          <section className="text-gray-800 text-base space-y-2 mb-10">
            <p><span className="font-semibold">Start Date:</span> {course.startDate}</p>
            <p><span className="font-semibold">End Date:</span> {course.endDate}</p>
            <p><span className="font-semibold">Price:</span> ${course.price}</p>
          </section>

          <div className="flex gap-4">
            <Link
              to="/courses"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900"
            >
              Back to Courses
            </Link>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              onClick={() => toast('Enrollment is successful!')}
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="flex-1">
          <img
            src={course.image}
            alt={course.name}
            className="w-full max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
