// This module provides utility functions to manage courses in localStorage.
// It includes functions to retrieve, save, add, update, and delete courses.

// Retrieve all courses from localStorage
export const getCoursesFromLocalStorage = () => {
    const courses = localStorage.getItem("courses");
    return courses ? JSON.parse(courses) : [];
  };
  
  // Save courses to localStorage
  export const saveCoursesToLocalStorage = (courses) => {
    localStorage.setItem("courses", JSON.stringify(courses));
  };
  
  // Add a new course to localStorage
  export const addCourseToLocalStorage = (newCourse) => {
    const courses = getCoursesFromLocalStorage();
    courses.push(newCourse);
    saveCoursesToLocalStorage(courses);
  };
  
  // Update an existing course in localStorage
  export const updateCourseInLocalStorage = (updatedCourse) => {
    const courses = getCoursesFromLocalStorage();
    const updatedCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    saveCoursesToLocalStorage(updatedCourses);
  };
  
  // Delete a course from localStorage
  export const deleteCourseFromLocalStorage = (courseId) => {
    const courses = getCoursesFromLocalStorage();
    const filteredCourses = courses.filter((course) => course.id !== courseId);
    saveCoursesToLocalStorage(filteredCourses);
  };
  