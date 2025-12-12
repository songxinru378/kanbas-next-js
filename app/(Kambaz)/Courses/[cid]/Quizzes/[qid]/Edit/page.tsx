"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  FormSelect,
  FormCheck,
  CardBody,
  Card,
} from "react-bootstrap";
import * as client from "../../../../client";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../../../Modules/GreenCheckmark";
import { FaBan } from "react-icons/fa6";

export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    type: "Graded Quiz",            
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneAtATime: true,
    webcamRequired: false,
    lockAfterAnswer: false,
    due: "",
    availableFrom: "",
    until: "",                      
    published: false,
    course: cid,
    points: 0,
  });

  const fetchQuiz = async () => {
    if (!qid) 
      return;
    const data = await client.getQuizById(qid as string);
    setQuiz((prev: any) => ({
      ...prev,
      ...data,
      
    }));;
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const handleChange = (field: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!cid || !qid) return;
    const updated = await client.updateQuiz(quiz);
    router.push(`/Courses/${cid}/Quizzes/${updated._id || qid}`);
  };

  const handleSaveAndPublish = async () => {
    if (!cid || !qid) return;
    await client.updateQuiz({ ...quiz, published: true });
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    if (!cid) return;
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleDetailsTab = () => {
    if (!cid || !qid) return;
    router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const handleQuestionsTab = () => {
    if (!cid || !qid) return;
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  if (!quiz.title) {
    return <div className="mt-3">Loading...</div>;
  }

  return (
    <div id="wd-quiz-editor-page" className="mt-4">
      {/* top-right status bar */}
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
        <Button variant="secondary" size="sm" >
          <IoEllipsisVertical className="fs-5" />
        </Button>
      </div>

      {/* tabs */}
     
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className="nav-link active"
              type="button"
              onClick={handleDetailsTab}
            >
              Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              type="button"
              onClick={handleQuestionsTab}
            >
              Questions
            </button>
          </li>
        </ul>
      

      {/* form */}
      <Form className="mt-3">
        <FormGroup className="mb-3" controlId="wd-quiz-title-input">
          <FormControl
            type="text"
            placeholder="Quiz title"
            value={quiz.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-4" controlId="wd-quiz-description-input">
          <FormLabel>Quiz Instructions</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            value={quiz.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </FormGroup>

        <Row className="mt-3 g-3">
          <Col>
          <FormLabel className="float-end" column sm={6}>Quiz Type</FormLabel></Col>
          <Col md={6}>
            <FormGroup controlId="wd-quiz-type">
              <FormSelect
                value={quiz.type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </FormSelect>
            </FormGroup>
          </Col>
          </Row>
          <Row className="mt-3 g-3">
          <Col>
          <FormLabel className="float-end" column sm={6}>Assignment Group</FormLabel></Col>
          <Col md={6}>
            <FormGroup controlId="wd-quiz-assignment-group">
              <FormSelect
                value={quiz.assignmentGroup}
                onChange={(e) =>
                  handleChange("assignmentGroup", e.target.value)
                }
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </FormSelect>
            </FormGroup>
            {/* options */}
            <Row className="mt-3 g-3">
                <div className="border rounded p-3 mb-4">
          <div className="fw-semibold mb-2">Options</div>
          <Row className="mb-3 mt-3 g-3 align-items-center">
            <Col md={4}>
              <FormCheck
                type="checkbox"
                id="wd-quiz-shuffle-answers"
                label="Shuffle Answers"
                checked={!!quiz.shuffleAnswers}
                onChange={(e) =>
                  handleChange("shuffleAnswers", e.target.checked)
                }
              />
            </Col></Row>
            <Row className="mt-3 g-3">
            <Col md={4} className="d-flex align-items-center">
              <FormCheck
                type="checkbox"
                id="wd-quiz-time-limit-check"
                label="Time Limit"
                checked={quiz.timeLimit != null && quiz.timeLimit > 0}
                onChange={(e) =>
                  handleChange(
                    "timeLimit",
                    e.target.checked ? quiz.timeLimit || 20 : 0
                  )
                }
              />
            </Col>
            <Col md={4} className="d-flex align-items-center ">
                <FormControl
                  type="text"
                  value={quiz.timeLimit ?? 20}
                  onChange={(e) =>
                    handleChange("timeLimit", Number(e.target.value) || 0)
                  }
                />
                <span className="ms-2">Minutes</span>
            </Col></Row>
            <Row className="mt-3 g-3">
            <Col md={4}>
              <FormCheck
                type="checkbox"
                id="wd-quiz-multiple-attempts"
                label="Allow Multiple Attempts"
                checked={!!quiz.multipleAttempts}
                onChange={(e) =>
                  handleChange("multipleAttempts", e.target.checked)
                }
              />
            </Col>
            <Col md={4} className="d-flex">
                <FormControl
                  type="number"
                  value={quiz.maxAttempts ?? 1}
                  onChange={(e) =>
                    handleChange(
                      "maxAttempts",
                      Number(e.target.value) || 1
                    )
                  }
                  disabled={!quiz.multipleAttempts}
                />
                <span className="ms-2">Attempts</span>
            </Col>
          </Row>
          <Row className="mt-3 g-3">
            <Col md={6}>
              <FormGroup controlId="wd-quiz-show-correct-answers">
                <FormLabel>Show Correct Answers</FormLabel>
                <FormControl
                  type="text"
                  value={quiz.showCorrectAnswers || ""}
                  onChange={(e) =>
                    handleChange("showCorrectAnswers", e.target.value)
                  }
                  placeholder="e.g., Immediately"
                />
              </FormGroup>
            </Col></Row>
            <Row className="mt-3 g-3">
            <Col md={6}>
              <FormGroup controlId="wd-quiz-access-code">
                <FormLabel>Access Code</FormLabel>
                <FormControl
                  type="text"
                  value={quiz.accessCode || ""}
                  onChange={(e) => handleChange("accessCode", e.target.value)}
                  placeholder="Leave blank for none"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mt-3 g-3">
            <Col md={4}>
              <FormCheck
                type="checkbox"
                id="wd-quiz-one-question-at-a-time"
                label="One Question at a Time"
                checked={!!quiz.oneAtATime}
                onChange={(e) =>
                  handleChange("oneAtATime", e.target.checked)
                }
              />
            </Col>
            <Row className="mt-3 g-3">
            <Col md={4}>
              <FormCheck
                type="checkbox"
                id="wd-quiz-webcam-required"
                label="Webcam Required"
                checked={!!quiz.webcamRequired}
                onChange={(e) =>
                  handleChange("webcamRequired", e.target.checked)
                }
              />
            </Col></Row>
            <Row className="mt-3 g-3">
            <Col md={4}>
              <FormCheck
                type="checkbox"
                id="wd-quiz-lock-questions"
                label="Lock Questions After Answering"
                checked={!!quiz.lockAfterAnswer}
                onChange={(e) =>
                  handleChange("lockAfterAnswer", e.target.checked)
                }
              />
            </Col></Row>
          </Row>
        </div>
            </Row>
          </Col>
        </Row>

        {/* Assign box */}
        <div className="borderless rounded p-3 mb-4">
            <Row className="mt-3 g-3">
                <Col>
                <FormLabel className="float-end" column sm={2}>Assign</FormLabel>
                </Col>
                <Col md={6}>
                <Card>
                    <CardBody>
                        <FormLabel htmlFor="wd-assign-to" className="fw-semibold">Assign to</FormLabel>
                        <FormControl id="wd-assign-to" type="text" 
                        defaultValue={"Everyone"}></FormControl>
                        <br/>
                        <FormLabel htmlFor="wd-quiz-due-date" className="fw-semibold">Due</FormLabel>
                        <FormControl id="wd-due-date" type="datetime-local"
                        value={quiz.due || ""}
                        onChange={(e) => handleChange("due", e.target.value)}></FormControl>
                        <br />
                        <Row>
                            <Col>
                        <FormLabel htmlFor="wd-quiz-available-from" className="fw-semibold">Available from</FormLabel>
                        <FormControl type="datetime-local" value={quiz.availableFrom || ""}
                        onChange={(e) =>
                        handleChange("availableFrom", e.target.value)}></FormControl>
                        </Col>
                        <Col>
                        <FormLabel htmlFor="wd-quiz-available-until" className="fw-semibold">Until</FormLabel>
                        <FormControl id="wd-quiz-available-until" type="datetime-local" value={quiz.until || ""} 
                        onChange={(e) => handleChange("until", e.target.value)} ></FormControl></Col>
                        </Row>


                    </CardBody>
                </Card>
                </Col>

            </Row>
            <br/>
        </div>

        {/* buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={handleSaveAndPublish}>
            Save &amp; Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}
