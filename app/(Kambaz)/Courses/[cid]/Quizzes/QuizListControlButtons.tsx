import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";

export default function QuizListControlButtons({ quiz, onDelete, onEdit, onTogglePublish, }: {
  quiz: any;
  onEdit: (quiz: any) => void;
  onDelete: (quiz: any) => void;
  onTogglePublish: (quiz: any) => void;
}) {

    const handleTogglePublishIcon = () => {
        onTogglePublish(quiz);
    }
    
  return (
    <div className="d-flex float-end">
      <span title={quiz.published ? "Published - click to unpublish" : "Unpublished - click to publish"}
        onClick={handleTogglePublishIcon}>
            {quiz.published ? <GreenCheckmark /> : <FaBan className="text-danger fs-4 me-2" />}
        </span>


      <Dropdown className="float-end me-2"> 
        <DropdownToggle variant="light" bsPrefix="p-0 m-0 border-0 bg-transparent">
            <IoEllipsisVertical className="fs-4"/>
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={() => onEdit(quiz)}> Edit </DropdownItem>
            <DropdownItem onClick={() => onDelete(quiz)}>Delete</DropdownItem>
            <DropdownItem onClick={() => onTogglePublish(quiz)}>
                {quiz.published ? "Unpublish": "Publish"}
            </DropdownItem>
        </DropdownMenu>

      </Dropdown>
      
    </div>
  );
}
