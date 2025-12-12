"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {Button,Col,Form,FormCheck,FormControl,FormGroup,FormLabel,FormSelect,Row,} from "react-bootstrap";
import * as client from "../../../../../client";
import { FaTrash, FaArrowRight } from "react-icons/fa";

type QuestionType = "multiple-choice" | "true-false" | "fill-in-blank";

export default function QuestionEditorPage() {
  const { cid, qid, questionId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any | null>(null);
  const [question, setQuestion] = useState<any | null>(null);

  // load data 
  const fetchQuestion = async () => {
      if (!qid || !questionId) return;
      const quizData = await client.getQuizById(qid as string);
      setQuiz(quizData);
      const questionData = await client.getQuestionById(questionId as string);
      setQuestion(questionData);
    };
  useEffect(() => {
    fetchQuestion();
  }, [qid, questionId]);

  // helpers 
  const updateField = (field: string, value: any) => {
    setQuestion((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (value: QuestionType) => {
    setQuestion((prev: any) => {
      if (!prev) return prev;
      if (value === "multiple-choice") {
        return {
          ...prev,
          type: value,
          choices:
            prev.choices && prev.choices.length
              ? prev.choices
              : [
                  { text: "Option 1", isCorrect: true },
                  { text: "Option 2", isCorrect: false },
                ],
          correctAnswer: undefined,
          answers: [],
        };
      }
      if (value === "true-false") {
        return {
          ...prev,
          type: value,
          correctAnswer:
            typeof prev.correctAnswer === "boolean"
              ? prev.correctAnswer
              : true,
          choices: [],
          answers: [],
        };
      }
      // fill-in-blank
      return {
        ...prev,
        type: value,
        answers:
          prev.answers && prev.answers.length ? prev.answers : [""],
        choices: [],
        correctAnswer: undefined,
      };
    });
  };

  // MCQ helpers
  const updateChoiceText = (index: number, text: string) => {
    setQuestion((prev: any) => {
      const choices = [...(prev.choices || [])];
      choices[index] = { ...choices[index], text };
      return { ...prev, choices };
    });
  };
  const setCorrectChoice = (index: number) => {
    setQuestion((prev: any) => {
      const choices = (prev.choices || []).map(
        (c: any, i: number) => ({ ...c, isCorrect: i === index })
      );
      return { ...prev, choices };
    });
  };
  const addChoice = () => {
    setQuestion((prev: any) => {
      const choices = [...(prev.choices || [])];
      choices.push({
        text: `Option ${choices.length + 1}`,
        isCorrect: false,
      });
      return { ...prev, choices };
    });
  };
  const removeChoice = (index: number) => {
    setQuestion((prev: any) => {
      const choices = [...(prev.choices || [])];
      choices.splice(index, 1);
      if (!choices.length) {
        choices.push({ text: "Option 1", isCorrect: true });
      }
      return { ...prev, choices };
    });
  };

  // fill-in-blank helpers
  const updateAnswer = (index: number, text: string) => {
    setQuestion((prev: any) => {
      const answers = [...(prev.answers || [])];
      answers[index] = text;
      return { ...prev, answers };
    });
  };

  const addAnswer = () => {
    setQuestion((prev: any) => {
      const answers = [...(prev.answers || [])];
      answers.push("");
      return { ...prev, answers };
    });
  };

  const removeAnswer = (index: number) => {
    setQuestion((prev: any) => {
      const answers = [...(prev.answers || [])];
      answers.splice(index, 1);
      if (!answers.length) answers.push("");
      return { ...prev, answers };
    });
  };

  // save / cancel / delete
  const handleSave = async () => {
    if (!question) return;
    await client.updateQuestion(question);
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  const handleDelete = async () => {
    if (!question) return;
    const ok = window.confirm("Delete this question?");
    if (!ok) return;
    await client.deleteQuestion(question._id);
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  if (!quiz || !question) {
    return <div className="mt-4">Loading...</div>;
  }

  const type = question.type as QuestionType;

  return (
    <div className="mt-3">
      <div className="border rounded p-3">

        {/* top bar: title, type, points */}
        <Row className="align-items-center mb-3">
          <Col md={7} className="d-flex gap-2">
            <FormControl value={question.title || ""}
              onChange={(e) => updateField("title", e.target.value)}/>
            <FormSelect  value={type} className="w-auto"
              onChange={(e) =>
                handleTypeChange(e.target.value as QuestionType)}>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="fill-in-blank">Fill In the Blank</option>
            </FormSelect>
          </Col>
          <Col md={5} className="text-end">
            <span className="me-2">pts:</span>
            <FormControl type="number" value={question.points ?? 0}
              onChange={(e) =>
                updateField("points", Number(e.target.value) || 0)}
              className="d-inline-block w-25"/>
          </Col>
        </Row>

        {/* helper text */}
        <div className="text-muted mb-3">
            {question.type === "multiple-choice" && "Enter your question and multiple answers, then select the correct answer."}
            {question.type === "true-false" && "Enter your question, then select the correct answer."}
            {question.type === "fill-in-blank" && "Enter the question, then list all accepted correct answers."}
        </div>

        {/* question text */}
        <div className="mb-2 fw-semibold">Question:</div>
        <FormGroup className="mb-4">
          <FormControl as="textarea" rows={4} value={question.questionHtml || ""}
            onChange={(e) => updateField("questionHtml", e.target.value)}/>
        </FormGroup>

        {/* answers header */}
        <div className="mb-2 fw-semibold">Answers:</div>

        {/* multiple choice */}
        {type === "multiple-choice" && (
          <>
            {question.choices &&
              question.choices.map(
                (choice: any, index: number) => {
                  const isCorrect = !!choice.isCorrect;
                  return (
                    <Row key={index} className="mb-2 align-items-center">
                      <Col md={3} className="d-flex align-items-center">
                      <label className="">
                      <input type="radio" name="mc-correct" className="me-2" checked={isCorrect}
                        onChange={() => setCorrectChoice(index)}/>
                        {isCorrect && (
                          <FaArrowRight className="me-1 text-success"/>
                        )}
                        <span className={ isCorrect ? "text-success fw-semibold" : ""}>
                          {isCorrect ? "Correct Answer" : "Possible Answer"}
                        </span>
                        </label>
                      </Col>
                      <Col md={7}>
                        <FormControl value={choice.text || ""} onChange={(e) => updateChoiceText(index, e.target.value)}/>
                      </Col>
                      <Col md={2} className="text-end">
                        <Button variant="outline-danger" size="sm" onClick={() => removeChoice(index)}>
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  );
                }
              )}
            <div className="text-end mt-2">
              <Button variant="link" className="text-danger text-decoration-none" onClick={addChoice}>
                + Add Another Answer
              </Button>
            </div>
          </>
        )}

        {/* true/false */}
        {type === "true-false" && (
          <div className="mb-4">
            <Row className="mb-1">
              <Col md={3} className="d-flex align-items-center flex-nowrap">
              <label className="d-flex align-items-center flex-nowrap">
              <FormCheck type="radio" name="tf-correct" label=""
                  checked={question.correctAnswer === true}
                  onChange={() => updateField("correctAnswer", true)}/>
                {question.correctAnswer === true && (
                    <>
                    <span className="me-1 text-success fw-semibold">Correct Answer</span>
                    <FaArrowRight className="me-1 text-success"/>
                    </>)}
                    <span className={ question.correctAnswer === true ? "text-success fw-semibold" : ""}>
                        True</span>
                </label>
              </Col>
            </Row>

            <Row className="mb-1">
              <Col md={3} className="d-flex align-items-center flex-nowrap">
              <label className="d-flex align-items-center flex-nowrap">
              <FormCheck type="radio" name="tf-correct" label="" checked={question.correctAnswer === false}
                onChange={() => updateField("correctAnswer", false)}/>
                {question.correctAnswer === false && (
                    <>
                    <span className="me-1 text-success fw-semibold">Correct Answer</span>
                    <FaArrowRight className="me-1 text-success" />
                    </>)}
                <span className={ question.correctAnswer === false ? "text-success fw-semibold" : ""}>
                False
                </span>
                </label>
                </Col>
            </Row>
          </div>
        )}

        {/* fill in the blank */}
        {type === "fill-in-blank" && (
          <>
            {question.answers &&
              question.answers.map((ans: string, index: number) => (
                <Row key={index} className="mb-2 align-items-center">
                  <Col md={3}>
                    <span>Possible Answer:</span>
                  </Col>
                  <Col md={7}>
                    <FormControl value={ans}
                      onChange={(e) => updateAnswer(index, e.target.value)}/>
                  </Col>
                  <Col md={2} className="text-end">
                    <Button variant="outline-danger" size="sm" onClick={() => removeAnswer(index)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              ))}

            <div className="text-end mt-2">
              <Button variant="link" className="text-danger text-decoration-none" onClick={addAnswer}>
                + Add Another Answer
              </Button>
            </div>
          </>
        )}

        {/* bottom buttons */}
        <hr className="mt-4" />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Update Question
          </Button>
        </div>
      </div>

      {/* delete button under card */}
      <div className="mt-3">
        <Button variant="outline-danger" size="sm" onClick={handleDelete}>
          Delete Question
        </Button>
      </div>
    </div>
  );
}
