const routesConfig = {
    home: "/",
    login: "/login",
    register: "/register",

    managerProfile: "/managerProfile",

    managerSubjects: "/managerSubjects",
    managerAddSubject: "/managerAddSubject",
    managerUpdateSubjectId: "/managerUpdateSubject/:subId",

    managerSubClasses: "/managerSubClasses",
    managerAddSubClass: "/managerAddSubClass",
    managerUpdateSubClassId: "/managerUpdateSubClass/:subClassId",

    managerQuizzes: "/managerQuizzes",
    managerAddQuiz: "/managerAddQuiz",
    managerUpdateQuizId: "/managerUpdateQuiz/:quizId",
    managerQuizManual: "/managerQuizManual/",
    managerStartQuiz: "/managerStartQuiz/",
    managerQuizResult: "/managerQuizResults/",
    
    managerQuestions: "/managerQuestions",
    managerAddQuestion: "/managerAddQuestion",
    managerUpdateQuestion: "/managerUpdateQuestion/:quesId",
    
    profile: "/profile",
    quizzes: "/quizzes",
    quiz: "/quiz/*",
    quizManual: "/quizManual/",
    questions: "/questions/",
    quizResults: "/quizResults/",
    joinClasses: "/classes",

    adminProfile: "/adminProfile",
    adminAddAccount: "/adminAddAccount",
    adminManagerAccount: "/adminManagerAccount",
    adminManagerSubClass: "/adminManagerSubClass",
    adminChangeInfoAccount: "/adminChangeInfoAccount",
    adminChangeCreateBy: "/adminChangeCreateBy",
}

export default routesConfig