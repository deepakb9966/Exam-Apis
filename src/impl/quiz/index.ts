import { quizservice } from "./impl";
import * as t from "../../../dist/api/quiz/types";

const service = new quizservice();

export const quizServiceImpl: t.QuizApi = {
	getExamTopic: service.get_quetions,
	getExamTopics: service.get_topics,
	// getAppointmentsGet: service.get,
	// getAppointmentsGetAll: service.getAll,
	// putAppointmentsUpdate: service.update,
};
