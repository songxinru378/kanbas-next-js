"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


import { useDispatch, useSelector, } from "react-redux";
import * as client from "../../client";
import { RootState } from "../../../store";
import { current } from "@reduxjs/toolkit";
import { FaPlus } from "react-icons/fa";
import { setQuizzes } from "./reducer";
import QuizListControlButtons from "./QuizListControlButtons";
import QuizzesControls from "./QuizzesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiNotePencilLight } from "react-icons/pi";
import { RxRocket } from "react-icons/rx";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = !!currentUser && (currentUser as any ).role === "FACULTY";
  const isStudent = !!currentUser && (currentUser as any).role === "STUDENT";

  const fetchQuizzes = async () => {
    if (!cid) return;
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  }
  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const onCreateQuiz = async () => {
    if (!cid) return;
    const quiz = await client.createQuiz(cid as string);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  }

  const onEditQuiz = (quiz: any) => {
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
  }

  const onDeleteQuiz = async (quiz: any) => {
  const ok = window.confirm("Are you sure you want to remove this quiz?");
  if (!ok) return;
  await client.deleteQuiz(quiz._id);
  dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quiz._id)));
};

  const handleTogglePublish = async (quiz: any) => {
    //await client.updateQuiz({...quiz, published: !quiz.published});
    await client.publishQuiz(quiz._id, !quiz.published);
    await fetchQuizzes();
  }
  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();

    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.until ? new Date(quiz.until) : null;

    if (from && now < from)
    return "Not available until " + from.toLocaleDateString();

    if (until && now > until)
      return "Closed";

    return "Available";
  };

  return (
    <div id="wd-quizzes-page">
      <QuizzesControls addQuiz={onCreateQuiz} canAdd={isFaculty}></QuizzesControls> <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroupItem className="wd-quizzes p-0 mb-5 fs-5 border-gray">
          <div className="wd-quizzes-title p-3 ps-2 bg-secondary">
            <MdOutlineArrowDropDown className="me-2 fs-3" />
            Quizzes
          </div>
           <ListGroup className="wd-quiz-list rounded-0">
            {quizzes
            .filter((quiz: any) => !isStudent || quiz.published)
            .map(quiz => (
              <ListGroupItem key={quiz._id} className="wd-quiz-list-item p-3 ps-2">
                <div className="d-flex">
                  
                  <RxRocket className="me-2 fs-3" color="green" />

        <div className="flex-grow-1">
          <a className="wd-quiz-title" onClick={() => onEditQuiz(quiz)}>{quiz.title}</a>
          <div className="small text-secondary mt-1">
            <span className="fw-semibold">{getAvailabilityStatus(quiz)}</span>

            {quiz.due && (
              <>
                <span className="mx-2">|</span>
                <span className="fw-semibold">Due </span>
                <span>{quiz.due}</span>
              </>
            )}

            {quiz.points != null && (
              <>
                <span className="mx-2">|</span>
                <span>{quiz.points} pts</span>
              </>
            )}

            {quiz.questionCount != null && (
              <>
                <span className="mx-2">|</span>
                <span>{quiz.questionCount} Questions</span>
              </>
            )}

            {(currentUser as any)?.role === "STUDENT" && quiz.score != null && (
              <>
              <span className="mx-2">|</span>
              <span>Score: {quiz.score}</span>
              </>
            )}
          </div>
        </div>

        {isFaculty && (
          <QuizListControlButtons
            quiz={quiz}
            onEdit={onEditQuiz}
            onDelete={onDeleteQuiz}
            onTogglePublish={handleTogglePublish}
          />
        )}
      </div>

              </ListGroupItem>
            ))
             }
           </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}