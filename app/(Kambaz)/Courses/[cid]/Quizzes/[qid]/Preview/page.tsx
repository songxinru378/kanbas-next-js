"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as client from "../../../../client";

type AnswersMap = Record<string, any>;
type ResultsMap = Record<string, boolean>;
export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<ResultsMap>({});
  const [score, setScore] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuizAndQuestions = async () => {
      if (!qid) return;
      setQuiz(await client.getQuizById(qid as string));
      setQuestions(await client.findQuestionsForQuiz(qid as string));
      setLoading(false);
      
    };

  useEffect(() => {
    fetchQuizAndQuestions();
  }, [qid]);

  const current = questions[currentIndex];
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const selectMC = (qid: string, index: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [qid]: index })
  } ;
  const selectTF = (qid: string, value: boolean) => setAnswers({ ...answers, [qid]: value });
  const selectBlank = (qid: string, value: string) => setAnswers({ ...answers, [qid]: value });

  const submitQuiz = () => {
    const { total, res } = grade(questions, answers);
    setScore(total);
    setResults(res);
    setSubmitted(true);
  };

  const isCorrect = (q: any, given:any) => {
    if (given == null || given === "") return false;
    if (q.type === "multiple-choice") {
        const correctIndex = q.choices?.findIndex((c: any) => c.isCorrect);
        return correctIndex === given;
    }
    if (q.type === "true-false") {
        return given === q.correctAnswer;
    }
    if (q.type === "fill-in-blank") {
        const normalized = String(given).trim().toLowerCase();
        return (q.answers ?? []).some(
        (a: string) => a.trim().toLowerCase() === normalized
        );
    }
    return false;
  }
  const grade = (qs: any[], ans: AnswersMap) => {
    let total = 0;
    const res: ResultsMap = {};

    qs.forEach((q) => {
        const correct = isCorrect(q, ans[q._id]);
        res[q._id] = correct;
        if (correct) total += q.points || 0;
    })
    return { total, res };
  };

  if (loading || !quiz) return <div className="mt-5">Loading...</div>;

  return (
    <div className="mt-4">

      <h3>{quiz.title}</h3>
      <Card className="mb-3">
        <CardBody className="py-2 bg-danger-subtle text-danger">
          This is a preview of the published quiz.
        </CardBody>
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
        {/* left side: question view */}
        <Col md={9}>
          <Card className="mb-3">
            <CardHeader>
              <span>Question {currentIndex + 1}</span> 
              <span className="float-end">{current?.points ?? 0} pts</span>
            </CardHeader>
            <CardBody>
              <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
                {current?.questionHtml}
              </div>
              {/* input options */}
              {current?.type === "multiple-choice" && (
                <Form>
                  {current.choices?.map((c: any, i: number) => (
                    <FormCheck key={i} type="radio"
                      name={current._id}
                      label={c.text}
                      checked={answers[current._id] === i}
                      disabled={submitted}
                      onChange={() => selectMC(current._id, i)}
                    />
                  ))}
                   {submitted && (
                      <div className="mt-2 small">
                        Correct answer:{" "}
                        <span>{current.choices?.find((c:any) => c.isCorrect)?.text}</span>
                      </div>
                    )}
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
                  {submitted && (
                      <div className="mt-2 small">
                        Correct answer:{" "}
                        <b>{current.correctAnswer ? "True" : "False"}</b>
                      </div>
                    )}
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
                  {submitted && (
                      <div className="mt-2 small">
                        Correct answers:{" "}
                        {(current.answers || []).join(", ")}
                      </div>
                    )}
                </FormGroup>
              )}

              {submitted && (
                  <div className="mt-3 small fw-semibold">
                    {results[current._id] ? (
                      <span className="text-success">Correct</span>
                    ) : (
                      <span className="text-danger">Incorrect</span>
                    )}
                  </div>
                )}
            </CardBody>
          </Card>

          {/* nav buttons */}
          <div className="d-flex gap-2 mb-3">
            <Button disabled={currentIndex === 0} onClick={() => setCurrentIndex(i => i - 1)}>
              Previous
            </Button>
            <Button disabled={currentIndex === questions.length - 1} onClick={() => setCurrentIndex(i => i + 1)}>
              Next
            </Button>
          </div>
        </Col>

        {/* right: questions links */}
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

      {/* bottom actions */}
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
