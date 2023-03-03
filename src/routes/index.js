import routesConfig from "../config/routes";
import ManagerAddSubjectPage from "../pages/manager/subjects/ManagerAddSubjectPage";
import ManagerSubjectsPage from "../pages/manager/subjects/ManagerSubjectsPage";
import ManagerUpdateSubjectPage from "../pages/manager/subjects/ManagerUpdateSubjectPage";
// import ManagerProfilePage from "../pages/manager/ManagerProfilePage";
import LoginPage from "../pages/LoginRegister/LoginPage";
import RegisterPage from "../pages/LoginRegister/RegisterPage";
import ManagerQuizzesPage from "../pages/manager/quizzes/ManagerQuizzesPage";
import ManagerAddQuiz from "../pages/manager/quizzes/ManagerAddQuiz";
import ManagerUpdateQuiz from "../pages/manager/quizzes/ManagerUpdateQuiz";
import ManagerQuestionsPage from "../pages/manager/questions/ManagerQuestionsPage";
import ManagerAddQuestionsPage from "../pages/manager/questions/ManagerAddQuestionsPage";
import ManagerUpdateQuestionPage from "../pages/manager/questions/ManagerUpdateQuestionPage";
import UserProfilePage from "../pages/users/UserProfilePage";
import UserQuizzesPage from "../pages/users/UserQuizzesPage";
import UserQuizManualPage from "../pages/users/UserQuizManualPage";
import UserQuestionsPage from "../pages/users/UserQuestionsPage";
import UserQuizResultPage from "../pages/users/UserQuizResultPage";
import UserJoinClassesPage from "../pages/users/UserJoinClassesPage";

import ManagerSubClassesPage from "../pages/manager/subClasses/ManagerSubClassesPage";
import ManagerAddSubClass from "../pages/manager/subClasses/ManagerAddSubClass";
import ManagerUpdateSubClass from "../pages/manager/subClasses/ManagerUpdateSubClass";

import ManagerQuizManual from "../pages/manager/quizzes/ManagerQuizManual";
import ManagerStartQuiz from "../pages/manager/quizzes/ManagerStartQuiz";
import ManagerQuizResultPage from "../pages/manager/quizResults/ManagerQuizResultPage";

import AdminProfilePage from "../pages/admin/AdminProfilePage";
import AdminAddAccountPage from "../pages/admin/AdminAddAccountPage";
import AdminManagerAccountPage from "../pages/admin/AdminManagerAccountPage";
import AdminChangeInfoAccount from "../pages/admin/AdminChangeInfoAccount";
import AdminManagerSubClassPage from "../pages/admin/AdminManagerSubClassPage"; 
import AdminChangeCreateBy from "../pages/admin/AdminChangeCreateBy";

const publicRoutes = [
  { path: routesConfig.home, component: LoginPage },
  { path: routesConfig.login, component: LoginPage },
  { path: routesConfig.register, component: RegisterPage },

  { path: routesConfig.managerProfile, component: UserProfilePage },

  { path: routesConfig.managerSubjects, component: ManagerSubjectsPage },
  { path: routesConfig.managerAddSubject, component: ManagerAddSubjectPage },
  {
    path: routesConfig.managerUpdateSubjectId,
    component: ManagerUpdateSubjectPage,
  },
  { path: routesConfig.managerSubClasses, component: ManagerSubClassesPage },
  { path: routesConfig.managerAddSubClass, component: ManagerAddSubClass },
  {
    path: routesConfig.managerUpdateSubClassId,
    component: ManagerUpdateSubClass,
  },
  { path: routesConfig.managerQuizzes, component: ManagerQuizzesPage },
  { path: routesConfig.managerAddQuiz, component: ManagerAddQuiz },
  { path: routesConfig.managerUpdateQuizId, component: ManagerUpdateQuiz },
  { path: routesConfig.managerQuizManual, component: ManagerQuizManual },
  { path: routesConfig.managerStartQuiz, component: ManagerStartQuiz },
  { path: routesConfig.managerQuizResult, component: ManagerQuizResultPage },

  { path: routesConfig.managerQuestions, component: ManagerQuestionsPage },
  { path: routesConfig.managerAddQuestion, component: ManagerAddQuestionsPage },
  {
    path: routesConfig.managerUpdateQuestion,
    component: ManagerUpdateQuestionPage,
  },

  { path: routesConfig.profile, component: UserProfilePage },
  { path: routesConfig.quizzes, component: UserQuizzesPage },
  { path: routesConfig.quiz, component: UserQuizzesPage },
  { path: routesConfig.quizManual, component: UserQuizManualPage },
  { path: routesConfig.questions, component: UserQuestionsPage },
  { path: routesConfig.quizResults, component: UserQuizResultPage },
  { path: routesConfig.joinClasses, component: UserJoinClassesPage },

  { path: routesConfig.adminProfile, component: AdminProfilePage },
  { path: routesConfig.adminAddAccount, component: AdminAddAccountPage },
  { path: routesConfig.adminManagerAccount, component: AdminManagerAccountPage },
  { path: routesConfig.adminManagerSubClass, component: AdminManagerSubClassPage },
  { path: routesConfig.adminChangeInfoAccount, component: AdminChangeInfoAccount },
  { path: routesConfig.adminChangeCreateBy, component: AdminChangeCreateBy },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
