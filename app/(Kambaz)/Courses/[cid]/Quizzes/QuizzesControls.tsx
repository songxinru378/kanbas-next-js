import { Button, FormControl, InputGroup} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsPlus, BsSearch } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizzesControls({ addQuiz, canAdd = false,} : { addQuiz:() => void; canAdd?: boolean;}) {

    return (
         <div id="wd-quizzes-controls" >
    <div>
      {canAdd && (
        <>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-quiz-vertical">
        <IoEllipsisVertical className="fs-4" />
     </Button>
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quiz-btn" onClick={addQuiz}>
       <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Quiz
     </Button>
     </>)}
     
     </div>
     <InputGroup className="w-auto float-start">
        <InputGroupText>
          <BsSearch />
        </InputGroupText>
        <FormControl
          type="text"
          placeholder="Search..."
         
        />
      </InputGroup>
   </div>
    )

}