"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      setQuiz(await client.getQuizById(qid as string));
      setQuestions(await client.findQuestionsForQuiz(qid as string));
      setLoading(false);
    };
    load();
  }, [qid]);

  const current = questions[currentIndex];
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const selectMC = (qid: string, index: number) => setAnswers({ ...answers, [qid]: index });
  const selectTF = (qid: string, value: boolean) => setAnswers({ ...answers, [qid]: value });
  const selectBlank = (qid: string, value: string) => setAnswers({ ...answers, [qid]: value });

  const submitQuiz = () => {
    let result = 0;
    questions.forEach(q => {
      const ans = answers[q._id];
      if (ans == null || ans === "") return;

      if (q.type === "multiple-choice") {
        const correct = q.choices?.findIndex((c: any) => c.isCorrect) === ans;
        if (correct) result += q.points || 0;
      }

      if (q.type === "true-false" && ans === q.correctAnswer)
        result += q.points || 0;

      if (q.type === "fill-in-blank") {
        const match = q.answers?.some((a: string) => a.toLowerCase() === ans?.toLowerCase());
        if (match) result += q.points || 0;
      }
    });

    setScore(result);
    setSubmitted(true);
  };

  if (loading || !quiz) return <div className="mt-5">Loading...</div>;

  return (
    <div className="mt-4">

      <h3>{quiz.title}</h3>
      <Card className="mb-3">
        <Card.Body className="py-2 bg-danger-subtle text-danger">
          This is a preview of the published quiz.
        </Card.Body>
      </Card>

      <div className="mb-3 text-muted">
        Points: {totalPoints}
        {submitted && <> | Your score: <b>{score}/{totalPoints}</b></>}
      </div>

      <h5>Quiz Instructions</h5>
      <div className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
        {quiz.description || ""}
      </div>

      <Row>

        {/* LEFT SIDE — QUESTION VIEW */}
        <Col md={9}>
          <Card className="mb-3">
            <Card.Header>
              <span>Question {currentIndex + 1}</span> 
              <span className="float-end">{current?.points ?? 0} pts</span>
            </Card.Header>

            <Card.Body>
              <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
                {current?.questionHtml}
              </div>

              {/* Input Options */}
              {current?.type === "multiple-choice" && (
                <Form>
                  {current.choices?.map((c: any, i: number) => (
                    <FormCheck
                      key={i}
                      type="radio"
                      name={current._id}
                      label={c.text}
                      checked={answers[current._id] === i}
                      disabled={submitted}
                      onChange={() => selectMC(current._id, i)}
                    />
                  ))}
                </Form>
              )}

              {current?.type === "true-false" && (
                <Form>
                  <FormCheck
                    type="radio"
                    name={current._id}
                    label="True"
                    checked={answers[current._id] === true}
                    disabled={submitted}
                    onChange={() => selectTF(current._id, true)}
                  />
                  <FormCheck
                    type="radio"
                    name={current._id}
                    label="False"
                    checked={answers[current._id] === false}
                    disabled={submitted}
                    onChange={() => selectTF(current._id, false)}
                  />
                </Form>
              )}

              {current?.type === "fill-in-blank" && (
                <FormGroup>
                  <FormLabel>Your Answer:</FormLabel>
                  <FormControl
                    value={answers[current._id] || ""}
                    disabled={submitted}
                    onChange={(e) => selectBlank(current._id, e.target.value)}
                  />
                </FormGroup>
              )}
            </Card.Body>
          </Card>

          {/* Nav Buttons */}
          <div className="d-flex gap-2 mb-3">
            <Button disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)}>
              Previous
            </Button>
            <Button disabled={currentIndex === questions.length - 1} onClick={() => setCurrentIndex(i => i + 1)}>
              Next
            </Button>
          </div>
        </Col>

        {/* RIGHT — QUESTION LINKS ONLY */}
        <Col md={3}>
          <Card className="p-3 sticky-top" style={{ top: 90 }}>
            <h6 className="fw-semibold mb-2">Questions</h6>
            <div className="d-flex flex-column">
              {questions.map((q, i) => (
                <a key={q._id} className="mb-1" style={{ cursor: "pointer" }} onClick={() => setCurrentIndex(i)}>
                  Question {i + 1}
                </a>
              ))}
            </div>
          </Card>
        </Col>

      </Row>

      {/* Bottom Actions */}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)}>
          Keep Editing This Quiz
        </Button>

        <div className="d-flex gap-2">
          {submitted && <Button onClick={() => { setSubmitted(false); setAnswers({}); setCurrentIndex(0); }}>Preview Again</Button>}
          <Button variant="danger" disabled={submitted} onClick={submitQuiz}>Submit Quiz</Button>
        </div>
      </div>
    </div>
  );
}
