// lib/validations.js - Simple form validation functions

// Helper: check if string is empty or whitespace
function isEmpty(str) {
  return !str || str.toString().trim().length === 0;
}

// Simple email check: has @ and a dot after @, no spaces
function isValidEmail(email) {
  if (isEmpty(email)) return false;
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf('@');
  const dotIndex = trimmed.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && !trimmed.includes(' ');
}

// Validate teacher interest registration form
export function validateInterestForm(input) {
  const data = input || {};
  const errors = {};

  // Teacher name
  const teacherName = data.teacher_name ? data.teacher_name.toString().trim() : '';
  if (!teacherName) {
    errors.teacher_name = 'Full name is required.';
  } else if (teacherName.length < 2) {
    errors.teacher_name = 'Full name must be at least 2 characters.';
  } else if (teacherName.length > 120) {
    errors.teacher_name = 'Full name must be under 120 characters.';
  }

  // School name
  const schoolName = data.school_name ? data.school_name.toString().trim() : '';
  if (!schoolName) {
    errors.school_name = 'School name is required.';
  } else if (schoolName.length < 2) {
    errors.school_name = 'School name must be at least 2 characters.';
  } else if (schoolName.length > 150) {
    errors.school_name = 'School name must be under 150 characters.';
  }

  // Email
  const email = data.email ? data.email.toString().trim().toLowerCase() : '';
  if (!email || !isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone
  const phone = data.phone ? data.phone.toString().trim() : '';
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (phone.length < 7 || phone.length > 30) {
    errors.phone = 'Phone number must be between 7 and 30 characters.';
  }

  // Trip ID
  const tripId = data.trip_id ? data.trip_id.toString().trim() : '';
  if (!tripId) {
    errors.trip_id = 'Please select a trip.';
  }

  // Number of students
  const studentNum = parseInt(data.number_of_students, 10);
  if (isNaN(studentNum) || studentNum < 1) {
    errors.number_of_students = 'Please enter at least 1 student.';
  } else if (studentNum > 500) {
    errors.number_of_students = 'Maximum 500 students per group.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    success: isValid,
    errors,
    data: isValid
      ? {
          teacher_name: teacherName,
          school_name: schoolName,
          email,
          phone,
          trip_id: tripId,
          number_of_students: studentNum,
        }
      : null,
  };
}

// Validate admin login form
export function validateLoginForm(input) {
  const data = input || {};
  const email = data.email ? data.email.toString().trim().toLowerCase() : '';
  const password = data.password ? data.password.toString() : '';

  if (!email || !isValidEmail(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (!password) {
    return { success: false, message: 'Password is required.' };
  }

  return {
    success: true,
    data: {
      email,
      password,
    },
  };
}

// Validate trip creation & editing form
export function validateTripForm(input) {
  const data = input || {};
  const errors = {};

  const name = data.name ? data.name.toString().trim() : '';
  if (!name || name.length < 3) {
    errors.name = 'Trip name must be at least 3 characters.';
  }

  const destination = data.destination ? data.destination.toString().trim() : '';
  if (!destination) {
    errors.destination = 'Destination is required.';
  }

  const category = data.category ? data.category.toString().trim() : '';
  if (!category) {
    errors.category = 'Category is required.';
  }

  const duration = data.duration ? data.duration.toString().trim() : '';
  if (!duration) {
    errors.duration = 'Duration is required (e.g. 7 Days / 6 Nights).';
  }

  const description = data.description ? data.description.toString().trim() : '';
  if (!description || description.length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  }

  let slug = data.slug ? data.slug.toString().trim().toLowerCase() : '';
  if (!slug && name) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  // Cover image URL (fallback to clean unsplash educational travel photo)
  const defaultImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
  const imageUrl = data.image_url && data.image_url.toString().trim()
    ? data.image_url.toString().trim()
    : defaultImage;

  // Cohort & Batch specifications
  const targetGrades = data.target_grades && data.target_grades.toString().trim()
    ? data.target_grades.toString().trim()
    : 'Grades 6 – 12';

  const groupSize = data.group_size && data.group_size.toString().trim()
    ? data.group_size.toString().trim()
    : '15 – 50 Students';

  // Highlights (array of strings)
  let highlights = [];
  if (Array.isArray(data.highlights)) {
    highlights = data.highlights.map((h) => h.toString().trim()).filter(Boolean);
  } else if (typeof data.highlights === 'string') {
    highlights = data.highlights
      .split('\n')
      .map((h) => h.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);
  }

  if (highlights.length === 0) {
    highlights = [
      'Curriculum-linked learning objectives',
      'Dedicated educational guides & safety officers',
      'All-inclusive travel, accommodation, and meals',
    ];
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    success: isValid,
    errors,
    data: isValid
      ? {
          name,
          slug,
          destination,
          category,
          duration,
          description,
          image_url: imageUrl,
          target_grades: targetGrades,
          group_size: groupSize,
          highlights,
          active: data.active !== false && data.active !== 'false',
        }
      : null,
  };
}


