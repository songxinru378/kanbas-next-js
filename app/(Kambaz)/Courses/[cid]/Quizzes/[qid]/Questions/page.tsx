"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, FormControl, Row, Col, Dropdown } from "react-bootstrap";
import * as client from "../../../../client";
import { FaTrash, FaEdit, FaCheckCircle, FaBan, FaPlus } from "react-icons/fa";
import GreenCheckmark from "../../../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizQuestionsEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  //const [title, setTitle] = ;

  
  // load quizzes and questions
  const fetchQuizAndQuestions = async () => {
    if (!qid) return;
    const q = await client.getQuizById(qid as string); // quiz
    const qList = await client.findQuestionsForQuiz(qid as string);  //questions
    setQuiz(q);
    setQuestions(qList);
    await computeAndSavePoints(q, qList);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuizAndQuestions();
  }, [qid]);

 
  // CRUD Actions
  const addQuestion = async () => {
    const newQ = await client.createQuestion(qid as string, {
        quiz: qid,
        title: "New Question",
        type: "multiple-choice",
        points: 0,
        answers: [],
        choices: [
      { text: "Option 1", isCorrect: true },
      { text: "Option 2", isCorrect: false },
    ],
    });
    const updatedQuestionsList = [...questions, newQ]
    setQuestions(updatedQuestionsList);
    await computeAndSavePoints(quiz, updatedQuestionsList);
  };

  const saveQuestion = async (question: any) => {
    await client.updateQuestion(question);
  };

  const deleteQuestion = async (questionId: string) => {
    if (!confirm("Delete this question?")) return;
    await client.deleteQuestion(questionId);
    const updatedList = questions.filter((q) => q._id !== questionId);
    setQuestions(updatedList);
    await computeAndSavePoints(quiz, updatedList);
  };

  // Navigate tabs
  const goToDetails = () =>
    router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`);

  const goToQuestions = () =>
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);

  const computeAndSavePoints = async (quiz: any, list: any []) => {
    if (!quiz) return;
    const total = list.reduce(
        (sum, q) => sum + (q.points ?? 0), 0
    );
    const updatedQuiz = await client.updateQuiz({
        ...quiz, points: total,
    });
    setQuiz(updatedQuiz);
  }

  if (loading || !quiz)
    return <div className="mt-4">Loading...</div>;

  return (
    <div className="mt-4">

      {/* TOP STATUS BAR */}
       <div className="d-flex justify-content-end align-items-center gap-4 text-secondary mb-3">
              <span className="fw-semibold text-dark">Points {quiz.points ?? 0}</span>
              <span className="text-secondary d-flex align-items-center gap-1">
                {quiz.published ? (
                  <>
                    <GreenCheckmark /> Published
                  </>
                ) : (
                  <>
                    <FaBan /> Not Published
                  </>
                )}
              </span>
              <Button variant="secondary" size="sm" className="">
                <IoEllipsisVertical className="fs-5" />
              </Button>
            </div>
     

      {/* TABS */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className="nav-link" onClick={goToDetails}>
            Details
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={goToQuestions}>
            Questions
          </button>
        </li>
      </ul>

      {/* QUESTION LIST */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="secondary" size="lg" onClick={addQuestion} >
          + New Question
        </Button>
      </div>

      {/* LIST */}
      {questions.length === 0 && (
        <div className="text-muted ms-1">
          No questions yet – click <strong>Add Question</strong>
        </div>
      )}

      <div className="d-flex flex-column gap-3">
        {questions.map((question, index) => (
          <div
            key={question._id}
            className="border rounded p-3 d-flex justify-content-between align-items-center"
          >
            <div className="w-75">
              <FormControl
                className="fw-bold fs-5 mb-2"
                value={question.title}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q._id === question._id
                        ? { ...q, title: e.target.value }
                        : q
                    )
                  )
                }
                onBlur={() => saveQuestion(question)}
              />

              <Row className="text-muted small">
                <Col>
                  <span>Type: {question.type}</span>
                </Col>
                <Col>
                  <span>Points: {question.points ?? 0}</span>
                </Col>
              </Row>
            </div>

            <div className="d-flex gap-3">
              <Button
                variant="outline-primary"
                onClick={() =>
                  router.push(
                    `/Courses/${cid}/Quizzes/${qid}/Questions/${question._id}`
                  )
                }
              >
                <FaEdit />
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => deleteQuestion(question._id)}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <hr className="mt-5" />

      <div className="d-flex justify-content-end gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
        >
          Back
        </Button>
        <Button
          variant="danger"
          size="lg"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
