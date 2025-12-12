"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {Alert,Button,Card,CardBody,CardHeader,Col,Form,FormCheck,FormControl,FormGroup,FormLabel,Row,} from "react-bootstrap";
import * as client from "../../../../client";

type AnswersMap = Record<string, any>;
type ResultsMap = Record<string, boolean>;

export default function TakeQuizPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<ResultsMap>({});
  const [message, setMessage] = useState<string | null>(null);
  const [noMoreAttempts, setNoMoreAttempts] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPoints = questions.reduce(
    (sum, q) => sum + (q.points || 0),
    0
  );
  // answer helpers 
  const selectMC = (questionId: string, index: number) => {
    if (submitted || noMoreAttempts) return;
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const selectTF = (questionId: string, value: boolean) => {
    if (submitted || noMoreAttempts) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const selectBlank = (questionId: string, value: string) => {
    if (submitted || noMoreAttempts) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // scoring 
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

  // load quiz + questions + attempt info
  useEffect(() => {
    const init = async () => {
      if (!qid) return;

      try {
        const [qz, qs] = await Promise.all([
          client.getQuizById(qid as string),
          client.findQuestionsForQuiz(qid as string),
        ]);
        setQuiz(qz);
        setQuestions(qs);
        // try starting a new attempt
        try {
          await client.startAttempt(qid as string);
        } catch (err: any) {
          const status = err?.response?.status;
          if (status === 403) {
            // no more attempts → show last attempt read-only
            setNoMoreAttempts(true);
            setMessage(
              "You have used all your attempts. Showing your last submission."
            );

            const lastAttempt = await client.getLatestAttemptForQuiz(
              qid as string
            );
            if (lastAttempt && Array.isArray(lastAttempt.answers)) {
              const map: AnswersMap = {};
              lastAttempt.answers.forEach((a: any) => {
                if (a.questionId) {
                  map[a.questionId] = a.answer;
                }
              });

              const { total, res } = grade(qs, map);
              setAnswers(map);
              setScore(total);
              setResults(res);
              setSubmitted(true);
            }
          } else if (status === 401) {
            setMessage("You must be logged in to take this quiz.");
          } else {
            setMessage("Could not start a new attempt.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [qid]);

  // submit
  const handleSubmit = async () => {
    if (!qid) return;

    const { total, res } = grade(questions, answers);
    setScore(total);
    setResults(res);
    setSubmitted(true);

    const answersArray = questions.map((q) => ({
      questionId: q._id,
      answer: answers[q._id] ?? null,
    }));

    try {
      await client.submitAttempt(qid as string, answersArray, total);
      setMessage("Your attempt has been submitted.");
    } catch {
      setMessage("There was a problem submitting your attempt.");
    }
  };

  // optional retake 
  const handleRetake = async () => {
    if (!qid) return;
    try {
      await client.startAttempt(qid as string);
      setAnswers({});
      setResults({});
      setScore(0);
      setSubmitted(false);
      setNoMoreAttempts(false);
      setMessage("New attempt started.");
      setCurrentIndex(0);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 403) {
        setNoMoreAttempts(true);
        setMessage("No more attempts allowed for this quiz.");
      } else {
        setMessage("Could not start a new attempt.");
      }
    }
  };

  if (loading || !quiz) return <div className="mt-5">Loading...</div>;

  const current = questions[currentIndex];

  return (
    <div className="mt-4" id="wd-take-quiz-page">
      {/* header */}
      <h3>{quiz.title}</h3>

      <div className="mb-3 text-muted">
        Points: {totalPoints}
        {submitted && (
          <>
            {" "}
            | Your score: <b>{score}/{totalPoints}</b>
          </>
        )}
      </div>

      <h5>Quiz Instructions</h5>
      <div className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
        {quiz.description || ""}
      </div>

      {message && (
        <Alert variant="info" className="mb-3">
          {message}
        </Alert>
      )}

      <Row>
        {/* left -question view */}
        <Col md={9}>
          {current && (
            <Card className="mb-3">
              <CardHeader>
                <span>Question {currentIndex + 1}</span>
                <span className="float-end">{current.points ?? 0} pts</span>
              </CardHeader>

              <CardBody>
                <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
                  {current.questionHtml}
                </div>

                {/* multiple choice */}
                {current.type === "multiple-choice" && (
                  <Form>
                    {current.choices?.map((c: any, i: number) => {
                      const selected = answers[current._id] === i;
                      return (
                        <FormCheck
                          key={i}
                          type="radio"
                          name={current._id}
                          label={<span>{c.text}</span>}
                          checked={selected}
                          disabled={submitted || noMoreAttempts}
                          onChange={() => selectMC(current._id, i)}
                          className="mb-1"
                        />
                      );
                    })}
                    {submitted && (
                      <div className="mt-2 small">
                        Correct answer:{" "}
                        <span>{current.choices?.find((c:any) => c.isCorrect)?.text}</span>
                      </div>
                    )}
                  </Form>
                )}

                {/* true/false */}
                {current.type === "true-false" && (
                  <Form>
                    <FormCheck
                      type="radio"
                      name={current._id}
                      label="True"
                      checked={answers[current._id] === true}
                      disabled={submitted || noMoreAttempts}
                      onChange={() => selectTF(current._id, true)}
                    />
                    <FormCheck
                      type="radio"
                      name={current._id}
                      label="False"
                      checked={answers[current._id] === false}
                      disabled={submitted || noMoreAttempts}
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

                {/* fill in the blank */}
                {current.type === "fill-in-blank" && (
                  <FormGroup>
                    <FormLabel>Your Answer:</FormLabel>
                    <FormControl
                      value={answers[current._id] || ""}
                      disabled={submitted || noMoreAttempts}
                      onChange={(e) =>
                        selectBlank(current._id, e.target.value)
                      }
                    />
                    {submitted && (
                      <div className="mt-2 small">
                        Correct answers:{" "}
                        {(current.answers || []).join(", ")}
                      </div>
                    )}
                  </FormGroup>
                )}

                {/* correct/incorrect label */}
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
          )}

          {/* nav buttons */}
          <div className="d-flex gap-2 mb-3">
            <Button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          </div>
        </Col>

        {/* right—question links */}
        <Col md={3}>
          <Card className="p-3 sticky-top" style={{ top: 90 }}>
            <h6 className="fw-semibold mb-2">Questions</h6>
            <div className="d-flex flex-column">
              {questions.map((q, i) => (
                <a
                  key={q._id}
                  className="mb-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentIndex(i)}
                >
                  Question {i + 1}
                </a>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* bottom actions */}
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="outline-secondary"
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}`)
          }
        >
          Back to Quiz Details
        </Button>

        <div className="d-flex gap-2">
          {submitted && !noMoreAttempts && quiz.multipleAttempts && (
            <Button variant="outline-secondary" onClick={handleRetake}>
              Take Again
            </Button>
          )}
          {!submitted && !noMoreAttempts && (
            <Button variant="danger" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
