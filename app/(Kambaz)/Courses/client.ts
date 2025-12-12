import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENT_API = `${HTTP_SERVER}/api/assignments`;
const QUIZZES_API   = `${HTTP_SERVER}/api/quizzes`;
const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
 const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
 return response.data;
};
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(
        `${COURSES_API}/${courseId}/assignments`
    );
    return response.data;
};

export const findAssignmentsById = async (assignmentId:string) => {
    const response = await axios.get(
        `${ASSIGNMENT_API}/${assignmentId}`
    );
    return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const response = await axiosWithCredentials.put(
        `${ASSIGNMENT_API}/${assignment._id}`,
        assignment
    );
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${ASSIGNMENT_API}/${assignmentId}`
    );
    return data;
};

export const enrollInCourse = async ( courseId:string) => {
    const response = await axiosWithCredentials.post(
        `${USERS_API}/current/courses/${courseId}`
    );
    return response.data;
};

export const unenrollFromCourse = async ( courseId: string) => {
    const response = await axiosWithCredentials.delete(
        `${USERS_API}/current/courses/${courseId}`
    );
    return response.data;
}

export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};

export const findQuizzesForCourse = async (courseId:string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}

export const createQuiz = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    {}
  );
  return response.data;
};

export const getQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const publishQuiz = async (quizId: string, published: boolean) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`,
    { published }
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const getQuestionById = async (questionId: string) => {
    const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}

export const findQuestionsByPartialTitle = async (quizId: string, text: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions?text=${text}`);
    return response.data;
}

export const findQuestionsByType = async (quizId: string, type: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions?type=${type}`);
    return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question, 
  );
  return response.data;
};

export const updateQuestion = async (question: any) => {
  const response = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${questionId}`
  );
  return response.data;
};

export const startAttempt = async (quizId: string) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/start`
  );
  return response.data;
};

export const submitAttempt = async (
  quizId: string,
  answers: any[],
  score: number
) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/submit`,
    { answers, score }
  );
  return response.data;
};

export const getLatestAttemptForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/result`
  );
  return response.data;
};