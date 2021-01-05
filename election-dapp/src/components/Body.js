import React, { useState } from "react";

const Body = ({ candidate1, candidate2, votecandidate }) => {
  const [Candidate, setCandidate] = useState("");

  const onchange = (e) => {
    setCandidate(e.target.value);
    console.log(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (Candidate.id !== 0) votecandidate(Number(Candidate));
    else window.alert("there is error in submission");
  };

  return (
<div class="Align" >  
<div class='pl-4 pr-4 '> <div class="border border-warning "><h1 class=" text-danger mr-auto"><b>Live Election Results</b></h1></div></div>
<div class="container-sm  pt-4 ">          
  <table class=" table table-dark table-striped table-hover table-bordered ">
    <thead>
      <tr>
        <th>Candidate Id</th>
        <th>Candidate Name</th>
        <th>Votes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{candidate1.id}</td>
        <td>{candidate1.name}</td>
        <td>{candidate1.voteCount}</td>
      </tr>
      <tr>
        <td>{candidate2.id}</td>
        <td>{candidate2.name}</td>
        <td>{candidate2.voteCount}</td>
      </tr>
    </tbody>
  </table>
</div>
<div className="my-5 mr-auto ml-auto text-left" style={{ width: "70%" }}>
        <h5 class='navtitle-color'>Cast Your Vote:</h5>
        <form onSubmit={onsubmit}>
          <select name="candidate" className="form-control" onChange={onchange}>
            <option defaultValue value="">
              Select
            </option>
            <option value="1">{candidate1.name}</option>
            <option value="2">{candidate2.name}</option>
          </select>
          <button className="btn btn-primary mt-2 btn-md w-100">
          Vote Candidate{""} {Candidate}
          </button>
        </form>
      </div>
  </div>
  );
};

export default Body;
