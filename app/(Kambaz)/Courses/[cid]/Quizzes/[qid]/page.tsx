"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import * as client from "../../../client";
import { RootState } from "@/app/(Kambaz)/store";

export default function QuizDetailsPage() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)

    const [quiz, setQuiz] = useState<any | null>(null);
    const [totalPoints, setTotalPoints] = useState<number>(0);

    const isFaculty = !!currentUser && (currentUser as any ).role === "FACULTY";
    const isStudent = !!currentUser && (currentUser as any ).role === "STUDENT";

    const fetchQuiz = async () => {
        if (!qid) return;
        const q = await client.getQuizById(qid as string);
        setQuiz(q);

        const questions = await client.findQuestionsForQuiz(qid as string);
        const total = questions.reduce(
            (sum: number, q: any) => sum + (q.points || 0), 0
        ) || q.points || 0;
        setTotalPoints(total);
    }

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const handlePreview = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`);
    };

    const handleEdit = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`);
    }

    const handleStartQuiz = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/Take`);
    }

    const formatDateTime = (value?: string) => {
        if (!value) return "";
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value; 
        return d.toLocaleString();
    };

    if (!quiz) return <div className="mt-3">Loading...</div>;

    return (
        <div id="wd-quiz-details-page" className="mt-3">
            <div className="mb-3 d-flex justify-content-end gap-2">
                {isFaculty && (
                    <>
                    <Button variant="secondary" onClick={handlePreview}>Preview</Button>
                    <Button variant="secondary" onClick={handleEdit}>Edit</Button>
                    </>
                )}

                {isStudent && (
                    <Button variant="danger" onClick={handleStartQuiz}>Start Quiz</Button>
                )}
            </div>

            <div>
                <h3 className="mb-4">{quiz.title}</h3>
                <Table borderless size="sm" className="w-auto">
                    <tbody>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Quiz Type</td>
                            <td>{quiz.type || "Graded Quiz"} </td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Points</td>
                            <td>{totalPoints}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Assignment Group</td>
                            <td>{quiz.assignmentGroup || "Quizzes"} </td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Shuffle Answers</td>
                            <td>{quiz.shuffleAnswers ?? true ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Time Limit</td>
                            <td>{quiz.timeLimit ?? 20} Minutes</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Multiple Attempts</td>
                            <td>{quiz.multipleAttempts ?? false ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">How Many Attempts</td>
                            <td>{quiz.maxAttempts ?? 1}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Show Correct Answers</td>
                            <td>{quiz.showCorrectAnswers || "Immediately"} </td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Access Code</td>
                            <td>{quiz.accessCode || "None"}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">One Question at a Time</td>
                            <td>{quiz.oneAtATime ?? true ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Webcam Required</td>
                            <td>{quiz.webcamRequired ?? false ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="fw-semibold text-end pe-4">Lock Questions After Answering</td>
                            <td>{quiz.lockAfterAnswer ?? false ? "Yes" : "No"}</td>
                        </tr>
                    </tbody>
                </Table>

                <Table bordered size="sm" className="mt-4">
                    <thead>
                        <tr>
                            <th>Due</th>
                            <th>For</th>
                            <th>Available From</th>
                            <th>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{quiz.due}</td>
                            <td>Everyone</td>
                            <td>{quiz.availableFrom}</td>
                            <td>{quiz.until}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </div>
    )


}