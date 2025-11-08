import { Button, FormControl, InputGroup} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsPlus, BsSearch } from "react-icons/bs";

export default function AssignmentsControls( {addAssignment}:{addAssignment:() => void;}) {

 return (
   <div id="wd-assignments-controls" >
    <div>
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn" onClick={addAssignment}>
       <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
     
     <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group">
        <BsPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Group
     </Button></div>
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
);}
