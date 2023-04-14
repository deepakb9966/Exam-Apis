import { QuizApi } from "../../dist/api/quiz/types";
import { ApiImplementation } from "../../dist/types";
import { quizServiceImpl } from "./quiz";

export class ServiceImplementation implements ApiImplementation {
	// appointments: AppointmentsApi | undefined;
	quiz: QuizApi = quizServiceImpl;
}
