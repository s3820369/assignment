import React, {useEffect, useMemo} from "react";

function Transcript({name, number, program, courses}) {
    //saved into the localStorage
    useEffect(() => {
        localStorage.setItem('StudentName', name);
        localStorage.setItem('StudentNumber', number);
        localStorage.setItem('StudentProgram', program);
        localStorage.setItem('StudentCourses', JSON.stringify(courses));
    });

    // render courses list
    const getCourses = courses.map((item, index) =>
        <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.course}</td>
            <td>{item.score}</td>
        </tr>
    );

    // use useMemo for GPA calculation
    const calculateGpa = useMemo(() => {
        return getGpa(courses);
    }, [courses]);
    /*
    React has a built-in hook called useMemo that allows you to memoize expensive functions so that you can
    avoid calling them on every render. You simple pass in a function and an array of inputs and useMemo will
    only recompute the memoized value when one of the inputs has changed.
    */

    // Gpa calculation logic
    function getGpa(courses) {
        let totalCP = 0;
        let totalGP = 0;
        for (let i = 0; i < courses.length; i++) {
            totalCP += courses[i].credit;
            totalGP += courses[i].grade * courses[i].credit;
        }
        return totalGP / totalCP;
    }

    return (
        <>
            <div className="container">
                <div className="text-center my-4">
                    <h2>Transcript</h2>
                </div>
                <div className="mb-4">
                    <div><strong>Full name : </strong>{name}</div>
                    <div><strong>Student number : </strong>{number}</div>
                    <div><strong>Program name : </strong>{program}</div>
                </div>
                <hr/>
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
                    <h6>GPA : <strong>{calculateGpa}</strong></h6>
                </div>
            </div>
        </>
    );
}

export default Transcript;