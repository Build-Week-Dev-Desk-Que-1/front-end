import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { DeleteTicketModal } from "./DeleteTicketModal";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { TicketContext } from "../contexts/TicketContext";

const formSchema = yup.object().shape({
  title: yup.string().min(4),
  category: yup
    .string()
    .oneOf(["Equipment", "People", "Track", "Finances", "Other"]),
});

const CreateTicket = () => {
  const history = useHistory();
  const { setTickets, tickets, user } = useContext(TicketContext);

  //formstate
  const [formState, setFormState] = useState({
    id: "",
    title: "",
    category: "",
    tried: "",
    description: "",
  });

  //modal state
  const [modalState, setModalState] = useState(false);

  //state to disable button
  const [disableButton, setDisableButton] = useState(true);

  //validation
  function validateChange(e) {
    yup
      .reach(
        formSchema.nullable(),
        e.target.type === "textarea" ? null : e.target.name
      )
      .validate(e.target.value);
  }

  //activate button
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setDisableButton(!valid);
    });
  }, [formState]);

  function handleModalState() {
    setModalState(!modalState);
  }

  function handleChange(e) {
    e.persist();
    validateChange(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setTickets([...tickets, formState]);

    axiosWithAuth().post(
      "https://devdeskapi.herokuapp.com/tickets/",
      formState
    );

    setFormState({
      title: "",
      category: "",
      tried: "",
      description: "",
    });

    history.push("/protected");
  }

  return (
    //modal
    <div className='ticket-box'>
      <DeleteTicketModal
        modalState={modalState}
        setModalState={setModalState}
      />
      <h1> Let's submit a help Ticket.</h1>
      <h4>
        <span >*</span> Required Fields
        <button onClick={handleModalState} />
      </h4>

      <form onSubmit={handleSubmit}>
        <h3>
          <span >*</span>What's going on?
        </h3>

        <input name='title' value={formState.title} onChange={handleChange} />

        <h3>
          <span >*</span>What is this issue about?
        </h3>
        <select
          name='category'
          value={formState.category}
          onChange={handleChange}
        >
          <option>Select a topic</option>
          <option value='Equipment'>Equipment</option>
          <option value='People'>People</option>
          <option value='Track'>Track</option>
          <option value='Finances'>Finances</option>
          <option value='Other'>Other</option>
        </select>

        <h3>What have you tried?</h3>
        <textarea
          type='textarea'
          name='tried'
          value={formState.tried}
          onChange={handleChange}
        />
        <h3>Anything else we should know about?</h3>
        <textarea
          type='textarea'
          name='description'
          value={formState.description}
          onChange={handleChange}
        />

        <button  disabled={disableButton}>
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;