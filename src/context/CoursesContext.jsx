import React, { createContext, useState, useEffect, useContext } from "react";

// إنشاء الـ Context
const CoursesContext = createContext();

// توفير الـ Context عبر الـ Provider
export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // تحميل البيانات من localStorage عند أول تحميل للتطبيق
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    if (storedCourses) {
      setCourses(storedCourses);
    }
  }, []);

  // حفظ الكورسات في localStorage كلما حصل تغيير
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  // إضافة كورس
  const addCourse = (course) => {
    setCourses((prevCourses) => [...prevCourses, course]);
  };

  // تعديل كورس
  const updateCourse = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  // حذف كورس
  const deleteCourse = (id) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CoursesContext.Provider>
  );
};

// Hook لاستخدام الـ Context في الكمبوننتات
export const useCourses = () => useContext(CoursesContext);
