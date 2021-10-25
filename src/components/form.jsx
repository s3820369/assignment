import Transcript from "./transcript";
import {useState} from "react";

function Form() {


    const [isTranscript, setIsTranscript] = useState(false);

    // form initial states
    const [name, SetName] = useState('');
    const [number, SetNUmber] = useState('');
    const [program, SetProgram] = useState('');
    const [courses] = useState([
        {course: 'Discrete structure in computing', credit: 12, score: 86, grade: 4},
        {course: 'Introduction to computer systems', credit: 12, score: 74, grade: 3},
        {course: 'Programming techniques', credit: 12, score: 95, grade: 4},
        {course: 'User-centered design', credit: 12, score: 94, grade: 4},
        {course: 'Security in computing and information technology', credit: 12, score: 78, grade: 3},
        {course: 'Further programming', credit: 12, score: 82, grade: 4},
        {course: 'Database concepts', credit: 12, score: 75, grade: 3},
        {course: 'Introduction to analytics', credit: 12, score: 93, grade: 4},
    ])

    //error status
    const [nameError, setNameError] = useState(null);
    const [numberError, setNumberError] = useState(null);
    const [programError, setProgramError] = useState(null);

    //handle student name with validation
    const handleName = (e) => {
        SetName(e.target.value);
        if (e.target.value === '') {
            setNameError('Required field.');
        } else {
            setNameError('');
        }
        if (e.target.value.length > 0) {
            if (checkNameCase(e.target.value)) {
                setNameError('First letter of name should be uppercase.');
            } else {
                setNameError('');
                const regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
                if (!regexp.test(e.target.value)) {
                    setNameError('Enter first and last name.');
                } else {
                    setNameError('');
                }
            }
        }
    }

    //check if first letter of name UpperCase
    function checkNameCase(str) {
        var splitStr = str.split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            if (splitStr[i].charAt(0) !== splitStr[i].charAt(0).toUpperCase()) {
                return true;
            }
        }
    }

    //handle student number with validation
    const handleNumber = (e) => {
        SetNUmber(e.target.value);
        const regexp = /^\d+$/;
        if (e.target.value.length !== 7 || parseInt(e.target.value.charAt(0)) !== 3 || !regexp.test(e.target.value)) {
            setNumberError('Invalid Number.');
        } else {
            setNumberError('');
        }
    }

    //handle Program with validation
    const handleProgram = (e) => {
        SetProgram(e.target.value);
        if (e.target.value.charAt(0) !== 'B' || e.target.value.length < 3) {
            setProgramError('Invalid Program.');
        } else {
            setProgramError('');
        }
    }

    // courses list
    const getCourses = courses.map((item, index) =>
        <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.course}</td>
            <td>{item.score}</td>
        </tr>
    );

    // generate transcript
    const generateTranscript = () => {
        if (nameError === '' && numberError === '' && programError === '') {
            setIsTranscript(true);
        } else {
            if (nameError !== '')
                setNameError('Required feild.');
            if (numberError !== '')
                setNumberError('Required feild.');
            if (programError !== '')
                setProgramError('Required feild.');
        }

    }


    return (
        <>
            {!isTranscript ?
                <div className="container">
                    <div className="text-center my-4">
                        <h2>Student Form</h2>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Full name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handleName}
                            value={name}
                        />
                        <span className="alert-danger">{nameError}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Student number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="number"
                            onChange={handleNumber}
                            value={number}
                        />
                        <span className="alert-danger">{numberError}</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Program name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="program"
                            onChange={handleProgram}
                            value={program}
                        />
                        <span className="alert-danger">{programError}</span>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getCourses}
                        </tbody>
                    </table>
                    <div className="text-center my-4">
                        <button onClick={generateTranscript} className="btn btn-success">Genarate Transcript</button>
                    </div>
                </div>
                :
                <Transcript
                    name={name}
                    number={number}
                    program={program}
                    courses={courses}
                />
            }
        </>
    );


}

export default Form;