import { Api } from "../../../dist/models";
import * as t from "../../../dist/api/quiz/types";
import * as v from "../../../dist/validation";
import { db } from "../../db";

export class quizservice {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "Topics";
		// this.getAll = this.getAll.bind(this);
		this.get_topics = this.get_topics.bind(this);
		this.get_quetions = this.get_quetions.bind(this);
		// this.update = this.update.bind(this);
		// this.delete = this.delete.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	// async getAll(
	// 	patientId: string,
	// 	limit: number | null | undefined,
	// 	direction: Api.DirectionParamEnum | undefined,
	// 	sortByField: string | null | undefined
	// ): Promise<t.GetAppointmentsGetAllResponse> {
	// 	try {
	// 		const appointmentsQuerySnap = await db.collectionGroup(`Appointments`).where("patientId", "==", patientId).get();
	// 		const appointments: Api.AppointmentDto[] = appointmentsQuerySnap.docs
	// 			.map((doc: { data: () => any; }) => doc.data())
	// 			.map((json: any) => v.modelApiAppointmentDtoFromJson("appointments", json));
	// 		console.log("appointments", appointments)
	// 		return {
	// 			status: 200,
	// 			body: {
	// 				items: appointments,
	// 				totalCount: appointments.length,
	// 			},
	// 		};
	// 	} catch (error) {
	// 		console.error(error);
	// 		return {
	// 			status: 404,
	// 			body: { message: `something went wrong` }
	// 		}
	// 	}
	// }

	async get_topics(): Promise<t.GetExamTopicsResponse> {
		try {
			// const topicRef = db.collection(`${this.collectionName}/`).doc();
			// const topicid = topicRef.id
			const quizDocSnap = (await db.collectionGroup(`Topics`).get());
			console.log("eqwretry",quizDocSnap)
			const topics: Api.Topics[] = quizDocSnap.docs
				.map((doc: { data: () => any; }) => doc.data())
				.map((json: any) => v.modelApiTopicsFromJson("quizDocSnap", json));
			const Topicsresults = "v.modelApiTopicsFromJson(, quizDocSnap.data());"
			// console.log("topics",topics)
			return {
				status: 200,
				body: {
					items: topics,
					totalCount: topics.length,

				},
				        
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-topics-found")) {
				return {
					status: 404,
					body: {
						message: "no-topics-found",
					},
				};
			}
			return {
				status: 404,
				body: { message: `something went wrong` }
			}
		}
	}
	async get_quetions(id: string): Promise<t.GetExamTopicResponse> {
		try {
			const appointmentRef = await(db.collection(`${this.collectionName}/${id}/details`)).get();
			// console.log(appointmentRef)
			// const ID = appointmentRef.id
			// console.log(ID)
			const quetions: Api.Quetions[] = appointmentRef.docs
				.map((doc: { data: () => any; }) => doc.data())
				// .map((json: any) => v.modelApiQuetionsFromJson("quetions", json));
			// const quetions = v.modelApiQuetionsFromJson("quetions", quetionsDocSnap.data());
			// console.log(quetions)
			return {
				status: 200,
				body: {
					items:quetions
					
				}
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("n0-quetions-found")) {
				return {
					status: 404,
					body: {
						message: "No quetions found with given id",
					},
				};
			}
			return {
				status: 404,
				body: { message: `something went wrong` }
			}
		}
	}
}

// 	async create(request: Api.AppointmentDto | undefined): Promise<t.PostAppointmentsCreateResponse> {
// 		try {
// 			if (!request) {
// 				throw new Error("invalid-inputs");
// 			}

// 			if (!request.patientId) {
// 				throw new Error("no-Id-found");
// 			}
// 			if (await this._checkslotExists(request.appointmentDate, request.slotTime)) {
// 				throw new Error("slot-already-bokked");

// 			}
// 			const appointmentRef = db.collection(`${this.collectionName}/${request.patientId}/Appointments`).doc();
// 			request.slotId = appointmentRef.id
// 			const appointRequest = v.modelApiAppointmentDtoFromJson("appointments", request);
// 			try {
// 				const patient = await this._checkUserExists(request.patientId);
// 				await appointmentRef.set({
// 					...appointRequest,
// 					appointmentStatus: true,
// 					createdAt: new Date().toISOString(),
// 				});
// 				return {
// 					status: 201,
// 					body: appointRequest,
// 				};
// 			} catch (error: any) {
// 				if (error.toString().match("no-patient-found")) {
// 					throw new Error("no-patient-found");
// 				}
// 				throw error;
// 			}
// 		} catch (error: any) {
// 			console.error(error);
// 			if (error.toString().match("invalid-inputs")) {
// 				return {
// 					status: 422,
// 					body: {
// 						message: "Invalid request",
// 					},
// 				};
// 			}

// 			if (error.toString().match("no-Id-found")) {
// 				return {
// 					status: 422,
// 					body: {
// 						message: "No id found in request",
// 					},
// 				};
// 			}

// 			if (error.toString().match("slot-already-bokked")) {
// 				return {
// 					status: 422,
// 					body: {
// 						message: "appointment already exists with given date and time",
// 					},
// 				};
// 			}
// 			return {
// 				status: 404,
// 				body: { message: `something went wrong` }
// 			}
// 		}
// 	}

// 	async update(request: Api.AppointmentDto | undefined): Promise<t.PutAppointmentsUpdateResponse> {
// 		try {
// 			if (!request) {
// 				throw new Error("invalid-inputs");
// 			}

// 			if (!request.patientId) {
// 				throw new Error("no-patientId-found");
// 			}

// 			if (!request.slotId) {
// 				throw new Error("no-slotId-found");
// 			}
// 			if (await this._checkslotExists(request.appointmentDate, request.slotTime)) {
// 				throw new Error("slot-already-bokked");

// 			}

// 			const appointmentRequest = JSON.parse(JSON.stringify(request))
// 			const appointmentRef = db.collection(`${this.collectionName}/${request.patientId}/Appointments`).doc(request.slotId);
// 			await appointmentRef.update({
// 				...appointmentRequest,
// 				updatedAt: new Date().toISOString(),
// 			});
// 			return {
// 				status: 200,
// 				body: {
// 					...appointmentRequest,
// 				},
// 			};
// 		} catch (error: any) {
// 			console.error(error);
// 			if (error.toString().match("invalid-inputs")) {
// 				return {
// 					status: 422,
// 					body: {
// 						message: "Invalid request",
// 					},
// 				};
// 			}

// 			if (error.toString().match("no-slotId-found")) {
// 				return {
// 					status: 422,
// 					body: {
// 						message: "No slotId found in request",
// 					},
// 				};
// 			}
// 			if (error.toString().match("slot-already-bokked")) {
// 				return {
// 					status: 422,
// 					body: {
// 						message: "appointment already exists with given date and time",
// 					},
// 				};
// 			}

// 			return {
// 				status: 422,
// 				body: {
// 					message: "no slotId found with given info",
// 				},
// 			};
// 		}
// 	}

// 	async delete(patientId: string, slotId: string): Promise<t.DeleteAppointmentsDeleteResponse> {
// 		try {
// 			await this._checkUserExists(slotId);
// 			const appointmentRef = (await db.collectionGroup(`Appointments`).where("slotId", "==", slotId).where("patientId", "==", patientId).get()).docs[0].ref
// 			await appointmentRef.update({
// 				appointmentStatus: false,
// 				updatedAt: new Date().toISOString(),
// 			});
// 			return {
// 				status: 200,
// 				body: {
// 					...appointmentRef,
// 					message: "appointment deleted successfully",
// 					patientId: patientId,
// 					slotId: slotId,


// 				},
// 			};
// 		} catch (error: any) {
// 			console.error(error?.response?.status);
// 			return {
// 				status: 404,
// 				body: {

// 					message: "appointment already deleted or no appointment found",
// 				},
// 			};
// 		}
// 	}

// 	private async _checkUserExists(patientId: string) {
// 		const response = await db.collection("PATIENTS").doc(patientId).get();
// 		console.log("PATIENTS", response)
// 		if (!response) {
// 			throw new Error("no-patient-found");
// 		}
// 		return response.data();
// 	}
// 	private async _checkslotExists(appointmentDate: string, slotTime: string) {
// 		try {
// 			const appD = (await db.collectionGroup(`Appointments`).where("appointmentDate", "==", appointmentDate).get())
// 			const slTime = (await db.collectionGroup(`Appointments`).where("slotTime", "==", slotTime).get()).docs[0].ref
// 			console.log("appD:", appD)
// 			console.log("slTime:", slTime)
// 			// db.collection("PATIENTS").get().then((querySnapshot) => {
// 			// querySnapshot.forEach((doc) => {
// 			// console.log(`${doc.id} => ${doc.data()}`);});
// 			// });
// 			if (appD && slTime) {
// 				return 1
// 			}

// 		}
// 		catch {

// 			return 0

// 		}

// 	}
// }
